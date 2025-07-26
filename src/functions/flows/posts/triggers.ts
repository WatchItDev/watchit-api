import { onDocumentCreated, onDocumentUpdated } from 'firebase-functions/v2/firestore';
import { type Ctx, enhanceTrigger } from '../../manager';
import { processImageFromIpfs, inferPresetFromTitle } from '../../processors/image';
import { extractCid } from '../../processors/ipfs';

type MediaItem = {
    id?: string;
    cid?: string | null;
    url?: string | null;
    title?: string | null;
    type?: string | null;
    originalUrl?: string | null;
    originalCid?: string | null;
    width?: number;
    height?: number;
};

function isImageLike(type?: string | null): boolean {
    const t = (type || '').toLowerCase();
    return (
        t.includes('image') ||
        t.includes('poster') ||
        t.includes('square') ||
        t.includes('wallpaper') ||
        t.includes('profile') ||
        t.includes('cover')
    );
}

function derivePreset(item: MediaItem): Parameters<typeof processImageFromIpfs>[0]['preset'] {
    const t = (item.type || '').toLowerCase();
    if (t.includes('poster')) return 'poster';
    if (t.includes('square')) return 'square';
    if (t.includes('wallpaper')) return 'wallpaper';
    return inferPresetFromTitle(item.title);
}

function shouldProcessItem(item: MediaItem): boolean {
    const currentCid = extractCid(item.url || item.cid);
    if (!currentCid) return false;
    const originalCid = extractCid(item.originalUrl || item.originalCid);
    if (!originalCid) return true;
    return currentCid === originalCid;
}

function arrayNeedsProcessing(media?: MediaItem[] | null): boolean {
    return Array.isArray(media)
        ? media.some((m) => isImageLike(m?.type) && shouldProcessItem(m))
        : false;
}

async function processPostMediaArray(postId: string, media: MediaItem[]): Promise<MediaItem[] | null> {
    if (!Array.isArray(media) || !media.length) return null;

    let changed = false;
    const updated: MediaItem[] = [];

    for (let i = 0; i < media.length; i++) {
        const m = media[i] ?? {};
        if (!isImageLike(m.type) || !shouldProcessItem(m)) {
            updated.push(m);
            continue;
        }

        const source = m.url || m.cid || '';
        if (!source) {
            updated.push(m);
            continue;
        }

        try {
            const preset = derivePreset(m);
            const tag = `post-${postId}-${m.id ?? m.cid ?? i}`;
            const { optimizedUri, originalUri, width, height } = await processImageFromIpfs({
                source,
                preset,
                tag,
            });

            const optCid = extractCid(optimizedUri);
            const orgCid = extractCid(originalUri);

            const merged: MediaItem = {
                ...m,
                url: optimizedUri,
                cid: optCid ?? m.cid ?? null,
                originalUrl: originalUri,
                originalCid: orgCid ?? null,
                width,
                height,
            };

            updated.push(merged);
            changed = true;
            console.log(`🖼️ post ${postId} media[${i}] optimized -> ${optimizedUri}`);
        } catch (err) {
            console.warn(`⚠️  Failed to optimize post ${postId} media[${i}]:`, err);
            updated.push(m);
        }
    }

    return changed ? updated : null;
}

export const postCreated = onDocumentCreated(
    'posts/{postId}',
    enhanceTrigger(async ({ ds, activity }: Pick<Ctx, 'ds' | 'activity'>, event) => {
        const postId = event.params.postId;
        const p = await ds.Posts.getPost(postId);
        const auth = p?.author.address;
        if (!auth) {
            console.warn(`postCreated without author on ${postId}`);
            return;
        }

        await ds.Users.updateCounterField(auth, 'publicationsCount', +1);
        await activity.postCreated(auth, postId);
        console.log(`🔥 postCreated for ${postId}`);

        try {
            const snap = event.data!; // QueryDocumentSnapshot
            const media = (p as any)?.media as MediaItem[] | undefined;
            if (arrayNeedsProcessing(media)) {
                const next = await processPostMediaArray(postId, media ?? []);
                if (next) {
                    await snap.ref.update({ media: next, updatedAt: Date.now() });
                    console.log(`🖼️ processed post media for ${postId}`);
                }
            }
        } catch (err) {
            console.warn(`⚠️ processPostMedia (create) failed for ${postId}:`, err);
        }
    }),
);

export const postHidden = onDocumentUpdated(
    'posts/{postId}',
    enhanceTrigger(async ({ ds, activity }: Pick<Ctx, 'ds' | 'activity'>, event) => {
        const postId = event.params.postId;
        const change = event.data!; // Change<QueryDocumentSnapshot>
        const before = change.before.data() as any;
        const after = change.after.data() as any;
        const ref = change.after.ref;
        const auth = after?.author?.address;

        if (!before?.hidden && after?.hidden) {
            if (!auth) {
                console.warn(`postHidden without author on ${postId}`);
            } else {
                await ds.Users.updateCounterField(auth, 'publicationsCount', -1);
                console.log(`🔥 postHidden for ${postId}`);
                await activity.postHidden(auth, postId);
            }
        }

        await activity.postUpdated(auth, postId);

        try {
            const media = (after?.media ?? []) as MediaItem[];
            if (arrayNeedsProcessing(media)) {
                const next = await processPostMediaArray(postId, media);
                if (next) {
                    await ref.update({ media: next, updatedAt: Date.now() });
                    console.log(`🖼️ processed post media (update) for ${postId}`);
                }
            }
        } catch (err) {
            console.warn(`⚠️ processPostMedia (update) failed for ${postId}:`, err);
        }
    }),
);
