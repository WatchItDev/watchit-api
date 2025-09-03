import { ServiceManager } from "./manager";
import { PerkInput } from "@/schema/types";

export class PerksService extends ServiceManager {
  catalog = () => this.ds.Perks.getCatalog();
  createPerk = (i: PerkInput) => this.ds.Perks.createPerk(i);
  updatePerk = (id: string, p: Partial<PerkInput>) =>
    this.ds.Perks.updatePerk(id, p);
  deletePerk = (id: string) => this.ds.Perks.deletePerk(id);
  async unlockedByUser(addr: string, limit = 50, offset = 0) {
    const [user, states, catalog, ranks] = await Promise.all([
      this.ds.Users.getUser(addr),
      this.ds.Perks.statesByUser(addr, limit, offset),
      this.ds.Perks.getCatalog(),
      this.ds.Ranks.catalog(),
    ]);
    if (!user) return [];

    const order = Object.fromEntries(ranks.map((r) => [r.id, r.order]));
    const meta = Object.fromEntries(catalog.map((p) => [p.id, p]));

    return states
      .filter((s) => {
        const p = meta[s.perkId];
        return p && (order[p.minRankId] ?? 0) <= (order[user.currentRank] ?? 0);
      })
      .map((s) => {
        const p = meta[s.perkId]!;
        return {
          ...s,
          perk: {
            ...p,
            cooldownRemaining:
              s.status === "CLAIMED"
                ? Math.max(0, Math.floor((s.availableAt - Date.now()) / 1000))
                : 0,
            executionRule: {
              ...p.executionRule,
              cooldownSec: p.executionRule.cooldownSec ?? 0,
            },
          },
        };
      })
      .slice(offset, offset + limit);
  }
  async claim(addr: string, perkId: string) {
    const ok = await this.ds.Perks.claimPerk(addr, perkId);
    if (!ok) return false;

    await this.ds.Logs.logEvent(addr, {
      type: "PERK_CLAIM",
      targetId: perkId,
      targetType: "PERK",
    });
    return true;
  }
  refreshCooldown = (id: string) =>
    this.ds.Perks.updatePerkState(id, {
      status: "AVAILABLE",
      collectedAt: null,
      availableAt: Date.now(),
    });
  resetCooldowns = async () => {
    const now = Date.now();
    const rows = await this.ds.Perks.expiredCooldowns(now);
    await Promise.all(rows.map((r) => this.refreshCooldown(r.id)));
    return rows.length;
  };
  hasPerk = (addr: string, perkId: string) =>
    this.ds.Perks.hasPerk(addr, perkId);
}
