'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.PerksService = void 0;
const manager_1 = require('./manager');
class PerksService extends manager_1.ServiceManager {
  catalog = () => this.ds.Perks.getCatalog();
  createPerk = (i) => this.ds.Perks.createPerk(i);
  updatePerk = (id, p) => this.ds.Perks.updatePerk(id, p);
  deletePerk = (id) => this.ds.Perks.deletePerk(id);
  async unlockedByUser(addr, limit = 50, offset = 0) {
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
        const p = meta[s.perkId];
        return {
          ...s,
          perk: {
            ...p,
            cooldownRemaining:
              s.status === 'CLAIMED'
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
  async claim(addr, perkId) {
    const ok = await this.ds.Perks.claimPerk(addr, perkId);
    if (!ok) return false;
    await this.ds.Logs.logEvent(addr, {
      type: 'PERK_CLAIM',
      targetId: perkId,
      targetType: 'PERK',
    });
    return true;
  }
  refreshCooldown = (id) =>
    this.ds.Perks.updatePerkState(id, {
      status: 'AVAILABLE',
      collectedAt: null,
      availableAt: Date.now(),
    });
  resetCooldowns = async () => {
    const now = Date.now();
    const rows = await this.ds.Perks.expiredCooldowns(now);
    await Promise.all(rows.map((r) => this.refreshCooldown(r.id)));
    return rows.length;
  };
  hasPerk = (addr, perkId) => this.ds.Perks.hasPerk(addr, perkId);
}
exports.PerksService = PerksService;
//# sourceMappingURL=perks.js.map
