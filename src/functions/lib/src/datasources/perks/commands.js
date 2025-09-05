'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.PerksCommands = void 0;
const manager_1 = require('../manager');
const unlockedPerk_1 = require('../../models/unlockedPerk');
const perk_1 = require('../../models/perk');
class PerksCommands extends manager_1.DataSourceManager {
  createPerk = (i) => this.fs('perks').create(i.id, (0, perk_1.makePerk)(i));
  updatePerk = (id, p) =>
    this.fs('perks')
      .update(id, { ...p, updatedAt: Date.now() })
      .then(() => this.fs('perks').get(id));
  deletePerk = (id) =>
    this.fs('perks')
      .delete(id)
      .then(() => true);
  async upsertState(s) {
    const dao = this.fs('userPerkState');
    const id = `${s.user}-${s.perkId}`;
    const exists = await dao.exists(id);
    const rec = (0, unlockedPerk_1.makeUnlockedPerk)(s);
    exists ? await dao.update(id, rec) : await dao.create(id, rec);
  }
  expiredCooldowns = (now) =>
    this.fs('userPerkState').query(
      [
        { field: 'status', op: '==', value: 'CLAIMED' },
        { field: 'availableAt', op: '<=', value: now },
      ],
      { limit: 500 },
    );
  updatePerkState = (id, patch) => this.fs('userPerkState').update(id, patch);
  async claimPerk(user, perkId) {
    const dao = this.fs('userPerkState');
    const [doc] = await dao.query(
      [
        { field: 'user', op: '==', value: user },
        { field: 'perkId', op: '==', value: perkId },
      ],
      { limit: 1 },
    );
    if (!doc) return false;
    if (doc.collectedAt) return false;
    if (Date.now() < doc.availableAt) return false;
    await dao.update(doc.id, { collectedAt: Date.now(), status: 'CLAIMED' });
    return true;
  }
  refreshCooldown = (id, next) =>
    this.fs('userPerkState').update(id, {
      status: 'LOCKED',
      collectedAt: null,
      availableAt: next,
    });
}
exports.PerksCommands = PerksCommands;
//# sourceMappingURL=commands.js.map
