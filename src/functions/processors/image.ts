/* processors/image.ts */
import sharp from 'sharp';
import { fetchImage, uploadBufferToIpfs, extractCid } from './ipfs';

type Preset = 'profile' | 'cover' | 'poster' | 'square' | 'wallpaper' | 'generic';

export interface ProcessOptions {
    source: string;
    preset: Preset;
    tag?: string;
    mode: 'ipfs' | 'http'; // ← NUEVO
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

export async function processImage({
                                       source,
                                       preset,
                                       tag,
                                       mode,
                                   }: ProcessOptions): Promise<{
    optimizedUri: string;
    originalUri: string;
    width: number;
    height: number;
}> {
    console.log(`[processImage] mode=${mode} preset=${preset} src=${source}`);

    const { buffer: original, originalUri } = await fetchImage(source, mode);

    const resizeCfg = presetToResize(preset);
    const optimized = await sharp(original).rotate().resize(resizeCfg).webp({ quality: 82 }).toBuffer();

    const meta = await sharp(optimized).metadata();
    const w = meta.width || 0;
    const h = meta.height || 0;

    const pinMeta = tag ? { name: `opt-${tag}`, keyvalues: { preset } } : undefined;
    const optimizedUri = await uploadBufferToIpfs(optimized, `optimized.webp`, 'image/webp', pinMeta);

    return { optimizedUri, originalUri, width: w, height: h };
}

export function inferPresetFromTitle(title?: string | null): Preset {
    const t = (title || '').toLowerCase();
    if (t.includes('poster')) return 'poster';
    if (t.includes('square')) return 'square';
    if (t.includes('wallpaper')) return 'wallpaper';
    return 'generic';
}
