import sharp from 'sharp';
import { fetchIpfsImage, uploadBufferToIpfs } from './ipfs';

type Preset = 'profile' | 'cover' | 'poster' | 'square' | 'wallpaper' | 'generic';

export interface ProcessOptions {
    source: string;
    preset: Preset;
    tag?: string;
}

function presetToResize(preset: Preset): sharp.ResizeOptions {
    switch (preset) {
        case 'profile':   return { width: 256,  height: 256,  fit: 'cover' };
        case 'cover':     return { width: 1200, height: 400,  fit: 'cover' };
        case 'poster':    return { width: 720,  height: 1080, fit: 'cover' };
        case 'square':    return { width: 1024, height: 1024, fit: 'cover' };
        case 'wallpaper': return { width: 1920, height: 1080, fit: 'cover' };
        default:          return { width: 1280, height: 720,  fit: 'inside', withoutEnlargement: true };
    }
}

export async function processImageFromIpfs({
                                               source,
                                               preset,
                                               tag,
                                           }: ProcessOptions): Promise<{
    optimizedUri: string;
    originalUri: string;
    width: number;
    height: number;
}> {
    const { buffer: original } = await fetchIpfsImage(source);

    const resizeCfg = presetToResize(preset);
    const optimized = await sharp(original).rotate().resize(resizeCfg).webp({ quality: 82 }).toBuffer();

    const meta = await sharp(optimized).metadata();
    const w = meta.width || 0;
    const h = meta.height || 0;

    const pinMeta = tag ? { name: `opt-${tag}`, keyvalues: { preset } } : undefined;
    const optimizedUri = await uploadBufferToIpfs(optimized, `optimized.webp`, 'image/webp', pinMeta);

    const originalUri = source.startsWith('ipfs://') ? source : `ipfs://${source.split('/').pop()}`;

    return { optimizedUri, originalUri, width: w, height: h };
}

export function inferPresetFromTitle(title?: string | null): Preset {
    const t = (title || '').toLowerCase();
    if (t.includes('poster')) return 'poster';
    if (t.includes('square')) return 'square';
    if (t.includes('wallpaper')) return 'wallpaper';
    return 'generic';
}
