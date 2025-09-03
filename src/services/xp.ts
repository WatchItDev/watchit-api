import { ServiceManager } from "./manager";

export class XPService extends ServiceManager {
  getHistory(address: string, limit?: number, offset?: number) {
    return this.ds.XP.getHistory(address, limit, offset);
  }
}
