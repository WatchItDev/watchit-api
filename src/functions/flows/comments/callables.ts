import 'reflect-metadata';
import { onCall } from 'firebase-functions/v2/https';
import { HttpsError } from 'firebase-functions/v1/https';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { enhanceFunction } from '../../manager';
import type { Comment } from '../../../schema/types';
import { CreateCommentDto, UpdateCommentDto } from './decorators';

export const commentsCreate = onCall(
    { region: 'auto' },
    enhanceFunction(
        async ({ ds }, req): Promise<{ comment: Comment }> => {
            const input = plainToInstance(CreateCommentDto, req.data);
            await validateOrReject(input).catch((errs) => {
                throw new HttpsError(
                    'invalid-argument',
                    'Validation failed: ' + JSON.stringify(errs)
                );
            });

            const comment = await ds.Comments.createComment(
                input.authorAddress,
                input
            );
            console.log(`🆕 comment created ${comment.id}`);
            return { comment };
        }
    )
);

export const commentsUpdate = onCall(
    { region: 'auto' },
    enhanceFunction(
        async ({ ds }, req): Promise<{ comment: Comment | null }> => {
            const input = plainToInstance(UpdateCommentDto, req.data);
            await validateOrReject(input).catch((errs) => {
                throw new HttpsError(
                    'invalid-argument',
                    'Validation failed: ' + JSON.stringify(errs)
                );
            });

            const existing = await ds.Comments.getComment(input.commentId);
            if (!existing) {
                throw new HttpsError('not-found', 'comment not found');
            }

            const comment = await ds.Comments.updateComment(input);
            console.log(`✏️ comment updated ${input.commentId}`);
            return { comment };
        }
    )
);

export const commentsDelete = onCall(
    { region: 'auto' },
    enhanceFunction(
        async ({ ds }, req): Promise<{ success: boolean }> => {
            const { commentId } = req.data as { commentId?: string };
            if (!commentId) {
                throw new HttpsError('invalid-argument', 'commentId required');
            }
            await ds.Comments.deleteComment(commentId);
            console.log(`❌ comment deleted ${commentId}`);
            return { success: true };
        }
    )
);
