import { ServiceManager } from './manager';
import type { AddXPInput } from "@/schema/types";

export class XPService extends ServiceManager {
    addXP = (input: AddXPInput) =>
        this.ext.Functions().xp.addXP(input).then(r => r.data.success);

    getHistory = (address: string, limit?: number, offset?: number) =>
        this.ds.XP.getHistory(address, limit, offset);
}
