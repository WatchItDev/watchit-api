import { DataSourceManager } from '../manager';

export class FollowsCommands extends DataSourceManager {
    async toggleFollow(me: string, target: string): Promise<boolean> {
        const following = this.fs('users').sub(me, 'following');
        const exists    = await (following as any).ref.doc(target).get();

        if (exists.exists) {
            await following.delete(target);
            await this.fs('users').sub(target, 'followers').delete(me);
            return false;
        }
        await following.create(target, {});
        await this.fs('users').sub(target, 'followers').create(me, {});
        return true;
    }
}
