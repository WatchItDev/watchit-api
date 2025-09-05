'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.perks = void 0;
const rewards_1 = require('./rewards');
const rewards_2 = require('./rewards');
const runHooks = async (hooks, when, ctx, ds) => {
  if (!hooks) return;
  for (const h of hooks.filter((x) => x.when === when)) {
    if (h.type === 'RESET_PROGRESS') {
      await ds.Perks.upsertState({
        user: ctx.user,
        perkId: ctx.meta.id,
        progress: 0,
        target: ctx.state.target,
        status: 'LOCKED',
        availableAt: 0,
        cooldownSec: ctx.state.cooldownSec,
        seen: [],
      });
    } else if (h.type === 'RELOCK') {
      await ds.Perks.upsertState({
        ...ctx.state,
        status: 'LOCKED',
        progress: 0,
        availableAt: Date.now() + ctx.state.cooldownSec * 1000,
      });
    }
  }
};
const applyReward = async (meta, addr, rewards) => {
  const { action, amount } = meta.reward;
  if (action === 'ADD_XP') {
    await rewards.addXp(
      addr,
      amount,
      rewards_2.XPAction.PERK_REWARD,
      meta.name,
    );
  } else if (action === 'ADD_MMC') {
    await rewards.transferMMC(addr, amount);
  }
};
const apply = async (meta, addr, ds, rewards) => {
  const state = await ds.Perks.getState(addr, meta.id);
  await runHooks(meta.hooks, 'BEFORE', { meta, user: addr, state }, ds);
  await applyReward(meta, addr, rewards);
  await runHooks(meta.hooks, 'AFTER', { meta, user: addr, state }, ds);
};
const perks = ({ ds, ext, activity }) => {
  const rewardsHandler = (0, rewards_1.rewards)({ ds, ext, activity });
  const getMeta = async (perkId) =>
    (await ds.Perks.getCatalog()).find((p) => p.id === perkId);
  return {
    maybeAutoApply: async (perkId, addr) => {
      const meta = await getMeta(perkId);
      if (!meta || meta.executionRule.type !== 'IMMEDIATE') return;
      const state = await ds.Perks.getState(addr, perkId);
      if (!state || state.status !== 'AVAILABLE') return;
      await apply(meta, addr, ds, rewardsHandler);
      const hasRelock = meta.hooks?.some(
        (h) => h.when === 'AFTER' && h.type === 'RELOCK',
      );
      if (!hasRelock) {
        await ds.Perks.claimPerk(addr, perkId);
      }
    },
    claim: async (perkId, addr) => {
      const meta = await getMeta(perkId);
      if (meta) await apply(meta, addr, ds, rewardsHandler);
    },
  };
};
exports.perks = perks;
//# sourceMappingURL=perk.js.map
