import type { RewardsLibType } from './rewards';
import type { Ctx } from '@/functions/manager';
import { rewards } from './rewards';
import { PerkHook } from '@/models/perk';
import { XPAction } from './rewards';

type RunHooksCtx = { meta: any; user: string; state: any };
type When = 'BEFORE' | 'AFTER';

const runHooks = async (
  hooks: PerkHook[] | undefined,
  when: When,
  ctx: RunHooksCtx,
  ds: Ctx['ds'],
) => {
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

const applyReward = async (
  meta: any,
  addr: string,
  rewards: RewardsLibType,
) => {
  const { action, amount } = meta.reward;
  if (action === 'ADD_XP') {
    await rewards.addXp(addr, amount, XPAction.PERK_REWARD, meta.name);
  } else if (action === 'ADD_MMC') {
    await rewards.transferMMC(addr, amount);
  }
};

const apply = async (
  meta: any,
  addr: string,
  ds: Ctx['ds'],
  rewards: RewardsLibType,
) => {
  const state = await ds.Perks.getState(addr, meta.id);
  await runHooks(meta.hooks, 'BEFORE', { meta, user: addr, state }, ds);
  await applyReward(meta, addr, rewards);
  await runHooks(meta.hooks, 'AFTER', { meta, user: addr, state }, ds);
};

export const perks = ({
  ds,
  ext,
  activity,
}: Pick<Ctx, 'ds' | 'ext' | 'activity'>) => {
  const rewardsHandler = rewards({ ds, ext, activity });
  const getMeta = async (perkId: string) =>
    (await ds.Perks.getCatalog()).find((p: any) => p.id === perkId);

  return {
    autoApply: async (perkId: string, addr: string) => {
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

    claim: async (perkId: string, addr: string) => {
      const meta = await getMeta(perkId);
      if (meta) await apply(meta, addr, ds, rewardsHandler);
    },
  };
};

export type PerksLibType = ReturnType<typeof perks>;
