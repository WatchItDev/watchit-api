import 'reflect-metadata';
import { onCall } from 'firebase-functions/v2/https';
import { HttpsError } from 'firebase-functions/v1/https';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { enhanceFunction } from '../../manager';
import type { Post } from '../../../schema/types';
import {
    CreatePostDto,
    UpdatePostDto,
    IncrementViewDto,
} from './decorators';

export const postsCreate = onCall(
    { region: 'auto' },
    enhanceFunction(async ({ ds }, req): Promise<{ post: Post }> => {
        const input = plainToInstance(CreatePostDto, req.data);
        await validateOrReject(input).catch((errs) => {
            throw new HttpsError(
                'invalid-argument',
                'Validation failed: ' + JSON.stringify(errs)
            );
        });

        const post = await ds.Posts.createPost(
            input.authorAddress,
            input
        );

        console.log(`🆕 post created ${post.id}`);
        return { post };
    })
);

export const postsUpdate = onCall(
    { region: 'auto' },
    enhanceFunction(async ({ ds }, req): Promise<{ post: Post | null }> => {
        const input = plainToInstance(UpdatePostDto, req.data);
        await validateOrReject(input).catch((errs) => {
            throw new HttpsError(
                'invalid-argument',
                'Validation failed: ' + JSON.stringify(errs)
            );
        });

        const existing = await ds.Posts.getPost(input.postId);
        if (!existing) {
            throw new HttpsError('not-found', 'post not found');
        }

        const post = await ds.Posts.updatePost(input.postId, {
            content: input.content,
            title: input.title,
            description: input.description,
            cid: input.cid,
            visibility: input.visibility,
        });
        console.log(`✏️ post updated ${input.postId}`);
        return { post };
    })
);

export const postsDelete = onCall(
    { region: 'auto' },
    enhanceFunction(async ({ ds }, req): Promise<{ success: boolean }> => {
        const { postId } = req.data as { postId?: string };
        if (!postId) {
            throw new HttpsError('invalid-argument', 'postId required');
        }
        await ds.Posts.deletePost(postId);
        console.log(`❌ post deleted ${postId}`);
        return { success: true };
    })
);

export const postsIncrementView = onCall(
    { region: 'auto' },
    enhanceFunction(
        async ({ ds }, req): Promise<{ post: Post | null }> => {
            const input = plainToInstance(IncrementViewDto, req.data)
            await validateOrReject(input).catch((errs) => {
                throw new HttpsError(
                    'invalid-argument',
                    'Validation failed: ' + JSON.stringify(errs)
                )
            })
            const postId = input.postId
            await ds.Posts.bumpField(postId, 'viewCount', 1)
            const post = await ds.Posts.getPost(postId)
            console.log(`👀 viewCount ++ for post ${postId}`)
            return { post }
        }
    )
)