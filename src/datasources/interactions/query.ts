import { DataSourceManager } from '@/datasources/manager';

export class InteractionsQuery extends DataSourceManager {
    async userLikedPost(user: string, postId: string): Promise<boolean> {
        const liked = await this.fs<any>(`posts/${postId}/likes`).get(user);
        return !!liked;
    }

    async userBookmarkedPost(user: string, postId: string) {
        const bm = await this.fs<any>(`posts/${postId}/bookmarks`).get(user);
        return !!bm;
    }
}
