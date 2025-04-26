import { DataSourceManager } from '../manager';
import type { Post, CreatePostInput } from '../../schema/types';
import { FieldValue } from 'firebase-admin/firestore';
import {makeNewPost} from '../../models/post';

export class PostsCommands extends DataSourceManager {
    async createPost(
        authorAddress: string,
        input: CreatePostInput
    ): Promise<Post> {
        const dao    = this.fs<Post>('posts') as any
        const ref    = dao.ref.doc()
        const id     = ref.id

        const record = makeNewPost(id, authorAddress, input)

        await ref.set(record)
        return record
    }

    async updatePost(
        postId: string,
        patch: Partial<Omit<Post, 'id' | 'authorAddress' | 'createdAt'>>
    ): Promise<Post | null> {
        await this.fs<Post>('posts').update(postId, {
            ...patch,
            updatedAt: Date.now(),
        });
        return this.fs<Post>('posts').get(postId);
    }

    async deletePost(postId: string): Promise<void> {
        await this.fs<Post>('posts').delete(postId);
    }

    async bumpField(
        postId: string,
        field: keyof Pick<Post,'commentCount'|'likeCount'|'bookmarkCount'|'viewCount'>,
        delta: number
    ): Promise<void> {
        const dao = this.fs<Post>('posts') as any;
        await dao.ref.doc(postId)
            .update({ [field]: FieldValue.increment(delta) });
    }
}
