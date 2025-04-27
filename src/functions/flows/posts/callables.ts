import { onCall } from 'firebase-functions/v2/https';
import { HttpsError } from 'firebase-functions/v1/https';
import { enhanceFunction } from '../../manager';
import type {
  Post,
  CreatePostInput,
  UpdatePostInput,
} from '../../../schema/types';

export const postsCreate = onCall(
  { region: 'auto' },
  enhanceFunction(async ({ ds }, req): Promise<{ post: Post }> => {
    const input = req.data as CreatePostInput;
    const post = await ds.Posts.createPost(input.authorAddress, input);
    console.log(`🆕 post created ${post.id}`);
    return { post };
  })
);

export const postsUpdate = onCall(
  { region: 'auto' },
  enhanceFunction(async ({ ds }, req): Promise<{ post: Post | null }> => {
    const input = req.data as UpdatePostInput;
    const existing = await ds.Posts.getPost(input.postId);
    if (!existing) {
      throw new HttpsError('not-found', 'post not found');
    }
    const post = await ds.Posts.updatePost(input.postId, input);
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
      const { postId } = req.data as { postId: string };
      await ds.Posts.updateCounterField(postId, 'viewCount', 1);
      const post = await ds.Posts.getPost(postId);
      console.log(`👀 viewCount ++ for post ${postId}`);
      return { post };
    }
  )
);
