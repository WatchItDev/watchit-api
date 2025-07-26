function getPinataHeaders(): Record<string, string> {
    const jwt = process.env.API_PINATA_JWT;
    const key = process.env.API_PINATA_API_KEY;
    const sec = process.env.API_PINATA_SECRET_API_KEY;

    if (jwt) return { Authorization: `Bearer ${jwt}` };
    if (key && sec) return { pinata_api_key: key, pinata_secret_api_key: sec };
    throw new Error('Pinata credentials missing: set API_PINATA_JWT or API_PINATA_API_KEY + API_PINATA_SECRET_API_KEY');
}

export function extractCid(input: string | null | undefined): string | null {
    if (!input) return null;

    const ipfsUri = input.match(/^ipfs:\/\/([^/?#]+)$/);
    if (ipfsUri) return ipfsUri[1] ?? null;

    const gw = input.match(/^https?:\/\/[^/]+\/ipfs\/([^/?#]+)(?:[/?#].*)?$/);
    if (gw) return gw[1] ?? null;

    const cidOnly = input.match(/^([a-zA-Z0-9]+)$/);
    if (cidOnly) return cidOnly[1] ?? null;

    return null;
}

const GATEWAYS = [
    process.env.IPFS_GATEWAY_BASE || 'https://ipfs.io/ipfs',
    'https://cloudflare-ipfs.com/ipfs',
    'https://gateway.pinata.cloud/ipfs'
];

function withTimeout<T>(p: Promise<T>, ms = 8000): Promise<T> {
    return new Promise((resolve, reject) => {
        const t = setTimeout(() => reject(new Error(`fetch timeout after ${ms}ms`)), ms);
        p.then(v => { clearTimeout(t); resolve(v); }, e => { clearTimeout(t); reject(e); });
    });
}

export async function fetchIpfsImage(
    src: string,
): Promise<{ buffer: Buffer; contentType: string; originalUri: string }> {
    const cid = extractCid(src);
    if (!cid) throw new Error(`Invalid IPFS source: ${src}`);

    let lastErr: unknown;
    for (const base of GATEWAYS) {
        const url = `${base.replace(/\/+$/, '')}/${cid}`;
        try {
            const res = await withTimeout(fetch(url), 8000);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const arrayBuffer = await res.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const contentType = res.headers.get('content-type') || 'application/octet-stream';
            return { buffer, contentType, originalUri: `ipfs://${cid}` };
        } catch (e) {
            lastErr = e;
        }
    }
    throw new Error(`IPFS fetch failed for ${cid}: ${String(lastErr)}`);
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
