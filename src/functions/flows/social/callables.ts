import 'reflect-metadata';
import { onCall } from 'firebase-functions/v2/https';
import { HttpsError } from 'firebase-functions/v1/https';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { enhanceFunction } from '../../manager';
import type { User, Post, Comment } from '../../../schema/types';
import {
    FollowDto,
    LikePostDto,
    BookmarkPostDto,
    LikeCommentDto,
} from './decorators';

export const follow = onCall(
    { region: 'auto' },
    enhanceFunction(
        async ({ ds }, req): Promise<{ user: User }> => {
            const dto = plainToInstance(FollowDto, req.data);
            await validateOrReject(dto).catch((errs) => {
                throw new HttpsError(
                    'invalid-argument',
                    'Validation failed: ' + JSON.stringify(errs)
                );
            });

            await ds.Social.followUser(dto.me, dto.target);
            const targetUser = await ds.Users.getUser(dto.target);
            console.log(`➡️ ${dto.me} followed ${dto.target}`);
            return { user: targetUser! };
        }
    )
);

export const unfollow = onCall(
    { region: 'auto' },
    enhanceFunction(
        async ({ ds }, req): Promise<{ user: User }> => {
            const dto = plainToInstance(FollowDto, req.data);
            await validateOrReject(dto).catch((errs) => {
                throw new HttpsError(
                    'invalid-argument',
                    'Validation failed: ' + JSON.stringify(errs)
                );
            });

            await ds.Social.unfollowUser(dto.me, dto.target);
            const targetUser = await ds.Users.getUser(dto.target);
            console.log(`⛔️ ${dto.me} unfollowed ${dto.target}`);
            return { user: targetUser! };
        }
    )
);

export const likePost = onCall(
    { region: 'auto' },
    enhanceFunction(
        async ({ ds }, req): Promise<{ post: Post }> => {
            const dto = plainToInstance(LikePostDto, req.data);
            await validateOrReject(dto).catch((errs) => {
                throw new HttpsError(
                    'invalid-argument',
                    'Validation failed: ' + JSON.stringify(errs)
                );
            });

            await ds.Social.likePost(dto.me, dto.postId);
            const post = await ds.Posts.getPost(dto.postId);
            console.log(`❤️ ${dto.me} liked post ${dto.postId}`);
            return { post: post! };
        }
    )
);

export const unlikePost = onCall(
    { region: 'auto' },
    enhanceFunction(
        async ({ ds }, req): Promise<{ post: Post }> => {
            const dto = plainToInstance(LikePostDto, req.data);
            await validateOrReject(dto).catch((errs) => {
                throw new HttpsError(
                    'invalid-argument',
                    'Validation failed: ' + JSON.stringify(errs)
                );
            });

            await ds.Social.unlikePost(dto.me, dto.postId);
            const post = await ds.Posts.getPost(dto.postId);
            console.log(`💔 ${dto.me} unliked post ${dto.postId}`);
            return { post: post! };
        }
    )
);

export const bookmarkPost = onCall(
    { region: 'auto' },
    enhanceFunction(
        async ({ ds }, req): Promise<{ post: Post }> => {
            const dto = plainToInstance(BookmarkPostDto, req.data);
            await validateOrReject(dto).catch((errs) => {
                throw new HttpsError(
                    'invalid-argument',
                    'Validation failed: ' + JSON.stringify(errs)
                );
            });

            await ds.Social.bookmarkPost(dto.me, dto.postId);
            const post = await ds.Posts.getPost(dto.postId);
            console.log(`🔖 ${dto.me} bookmarked post ${dto.postId}`);
            return { post: post! };
        }
    )
);

export const unbookmarkPost = onCall(
    { region: 'auto' },
    enhanceFunction(
        async ({ ds }, req): Promise<{ post: Post }> => {
            const dto = plainToInstance(BookmarkPostDto, req.data);
            await validateOrReject(dto).catch((errs) => {
                throw new HttpsError(
                    'invalid-argument',
                    'Validation failed: ' + JSON.stringify(errs)
                );
            });

            await ds.Social.unbookmarkPost(dto.me, dto.postId);
            const post = await ds.Posts.getPost(dto.postId);
            console.log(`❎ ${dto.me} unbookmarked post ${dto.postId}`);
            return { post: post! };
        }
    )
);

export const likeComment = onCall(
    { region: 'auto' },
    enhanceFunction(
        async ({ ds }, req): Promise<{ comment: Comment }> => {
            const dto = plainToInstance(LikeCommentDto, req.data);
            await validateOrReject(dto).catch((errs) => {
                throw new HttpsError(
                    'invalid-argument',
                    'Validation failed: ' + JSON.stringify(errs)
                );
            });

            await ds.Social.likeComment(dto.me, dto.commentId);
            const comment = await ds.Comments.getComment(dto.commentId);
            console.log(`👍 ${dto.me} liked comment ${dto.commentId}`);
            return { comment: comment! };
        }
    )
);

export const unlikeComment = onCall(
    { region: 'auto' },
    enhanceFunction(
        async ({ ds }, req): Promise<{ comment: Comment }> => {
            const dto = plainToInstance(LikeCommentDto, req.data);
            await validateOrReject(dto).catch((errs) => {
                throw new HttpsError(
                    'invalid-argument',
                    'Validation failed: ' + JSON.stringify(errs)
                );
            });

            await ds.Social.unlikeComment(dto.me, dto.commentId);
            const comment = await ds.Comments.getComment(dto.commentId);
            console.log(`👎 ${dto.me} unliked comment ${dto.commentId}`);
            return { comment: comment! };
        }
    )
);
