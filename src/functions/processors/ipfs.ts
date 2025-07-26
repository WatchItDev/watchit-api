function looksLikeCidV0(s: string): boolean {
    return /^Qm[1-9A-HJ-NP-Za-km-z]{44,}$/.test(s);
}
function looksLikeCidV1(s: string): boolean {
    return /^b[abcdefghijklmnopqrstuvwxyz234567]{20,}$/i.test(s);
}
function looksLikeCid(s: string): boolean {
    return looksLikeCidV0(s) || looksLikeCidV1(s);
}

export function extractCid(input: string | null | undefined): string | null {
    if (!input) return null;

    const mIpfs = /^ipfs:\/\/([^/?#]+)$/.exec(input);
    if (mIpfs?.[1] && looksLikeCid(mIpfs[1])) return mIpfs[1];

    const mGw = /^https?:\/\/[^/]+\/ipfs\/([^/?#]+)(?:[/?#].*)?$/i.exec(input);
    if (mGw?.[1] && looksLikeCid(mGw[1])) return mGw[1];

    try {
        const u = new URL(input);
        const mContent = /^\/content\/([^/]+)(?:\/.*)?$/i.exec(u.pathname);
        if (mContent?.[1] && looksLikeCid(mContent[1])) return mContent[1];

        const parts = u.pathname.split('/').filter(Boolean);
        for (let i = parts.length - 1; i >= 0; i--) {
            const seg = parts[i]!;
            if (looksLikeCid(seg)) return seg;
        }
    } catch {
        console.error('Error trying to extract cid')
    }

    if (looksLikeCid(input)) return input;

    return null;
}

const GATEWAYS = [
    'https://ipfs.io/ipfs',
    'https://cloudflare-ipfs.com/ipfs',
    'https://dweb.link/ipfs',
    'https://w3s.link/ipfs',
    'https://nftstorage.link/ipfs',
    'https://gateway.pinata.cloud/ipfs',
];

function sleep(ms: number) {
    return new Promise(res => setTimeout(res, ms));
}

function withTimeout<T>(p: Promise<T>, ms = 20000): Promise<T> { // 20s por intento
    return new Promise((resolve, reject) => {
        const t = setTimeout(() => reject(new Error(`fetch timeout after ${ms}ms`)), ms);
        p.then(
            v => { clearTimeout(t); resolve(v); },
            e => { clearTimeout(t); reject(e); },
        );
    });
}

async function tryFetchOnce(url: string, timeoutMs: number) {
    const started = Date.now();
    const res = await withTimeout(
        fetch(url, {
            headers: {
                'User-Agent': 'watchit-image-bot/1.0 (+https://watchit.movie)',
                'Accept': 'image/*,application/octet-stream;q=0.8,*/*;q=0.5',
            },
        }),
        timeoutMs,
    );
    const elapsed = Date.now() - started;
    console.log(`  ↳ GET ${url} → ${res.status} in ${elapsed}ms`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const ab = await res.arrayBuffer();
    return {
        buffer: Buffer.from(ab),
        contentType: res.headers.get('content-type') || 'application/octet-stream',
    };
}

export async function fetchIpfsImage(
    src: string,
): Promise<{ buffer: Buffer; contentType: string; originalUri: string }> {
    const cid = extractCid(src);
    if (!cid) throw new Error(`Invalid IPFS source: ${src}`);

    const TIMEOUT_MS = 20000;
    const RETRIES_PER_GATEWAY = 2;
    let lastErr: unknown;

    console.log(`[fetchIpfsImage] cid=${cid}`);
    for (const base of GATEWAYS) {
        const url = `${base.replace(/\/+$/, '')}/${cid}`;
        console.log(`trying IPFS gateway: ${url}`);
        for (let attempt = 1; attempt <= RETRIES_PER_GATEWAY; attempt++) {
            try {
                const { buffer, contentType } = await tryFetchOnce(url, TIMEOUT_MS);
                return { buffer, contentType, originalUri: `ipfs://${cid}` };
            } catch (e: any) {
                lastErr = e;
                console.warn(`  ⚠️  attempt ${attempt}/${RETRIES_PER_GATEWAY} failed for ${url}: ${e?.message || e}`);
                const backoff = Math.min(1500 * Math.pow(2, attempt - 1), 4000) + Math.floor(Math.random() * 300);
                await sleep(backoff);
            }
        }
    }
    throw new Error(`IPFS fetch failed for ${cid}: ${String(lastErr)}`);
}

export async function fetchHttpImage(
    url: string,
): Promise<{ buffer: Buffer; contentType: string; originalUri: string }> {
    const res = await withTimeout(fetch(url), 8000);
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    const ab = await res.arrayBuffer();
    return {
        buffer: Buffer.from(ab),
        contentType: res.headers.get('content-type') || 'application/octet-stream',
        originalUri: url,
    };
}

function getPinataHeaders(): Record<string, string> {
    const jwt = process.env.API_PINATA_JWT;
    const key = process.env.API_PINATA_API_KEY;
    const sec = process.env.API_PINATA_SECRET_API_KEY;

    if (jwt) return { Authorization: `Bearer ${jwt}` };
    if (key && sec) return { pinata_api_key: key, pinata_secret_api_key: sec };
    throw new Error('Pinata credentials missing: set API_PINATA_JWT or API_PINATA_API_KEY + API_PINATA_SECRET_API_KEY');
}

export async function uploadBufferToIpfs(
    buffer: Buffer,
    filename = 'asset.bin',
    contentType = 'application/octet-stream',
    pinataMetadata?: { name?: string; keyvalues?: Record<string, string> },
): Promise<string> {
    const form = new FormData();
    const blob = new Blob([buffer], { type: contentType });
    form.append('file', blob, filename);
    if (pinataMetadata) form.append('pinataMetadata', JSON.stringify(pinataMetadata));

    const headers = getPinataHeaders();
    const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers,
        body: form as any,
    });

    if (!res.ok) {
        const t = await res.text().catch(() => '');
        throw new Error(`Pinata upload failed ${res.status}: ${t}`);
    }

    const data = (await res.json()) as { IpfsHash?: string };
    if (!data?.IpfsHash) throw new Error('Pinata response missing IpfsHash');

    return `ipfs://${data.IpfsHash}`;
}

export async function fetchImage(
    src: string,
    mode: 'ipfs' | 'http',
): Promise<{ buffer: Buffer; contentType: string; originalUri: string }> {
    console.log(`[fetchImage] mode=${mode} src=${src}`);
    return mode === 'http' ? fetchHttpImage(src) : fetchIpfsImage(src);
}
