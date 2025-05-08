import { DataSourceManager } from '../manager';
import type {User} from "../../schema/types";

export class BookmarksQuery extends DataSourceManager {
    async isBookmarked(postId: string, me: string): Promise<boolean> {
        return this
            .fs<User>('users')
            .sub(me, 'bookmarks')
            .exists(postId);
    }
}
