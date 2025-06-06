import { ServiceManager } from './manager';

export class XPService extends ServiceManager {
    getHistory(address: string, limit?: number, offset?: number) {
        this.ds.XP.getHistory(address, limit, offset);
    }
}
