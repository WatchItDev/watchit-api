// economy.ts
import type { UsersDsType } from '@/datasources/users';
import type { Web3DSType } from '@/datasources/web3';
import type { XPDSType } from '@/datasources/xp';
import type { Ctx } from '@/functions/manager';
import { makeXpEntry } from '../../models/xp';
import { ActivityLibType } from './activity';

// ---- Zero-cost string enums ----
export const XPAction = {
  SYS: 'SYS',
  RANK_UP_BONUS: 'RANK_UP_BONUS',
  PERK_REWARD: 'PERK_REWARD',
  // Add more domain actions here: LIKE, POST_CREATE, RANK_UP, etc.
  // LIKE: "LIKE",
  // POST_CREATE: "POST_CREATE",
} as const;

type DSUsersPort = Pick<UsersDsType, 'getUser'>;
type DSXpPort = Pick<XPDSType, 'addEntry'>;
type DSWeb3Port = Pick<Web3DSType, 'transfer'>;
export type XPAction = (typeof XPAction)[keyof typeof XPAction];

type DS = {
  Users: DSUsersPort;
  XP: DSXpPort;
  Web3: DSWeb3Port;
};

// ---- API ----
type RewardsDeps = Pick<Ctx, 'ds' | 'ext' | 'activity'> & {
  ds: DS; // narrow ds to the subset we actually use
  activity?: ActivityLibType; // activity is optional
};

/**
 * Provides reward-related operations such as adding XP to a user and transferring MMC.
 *
 * @param ds - Data sources required for user and transaction operations.
 * @param activity - Optional activity event handlers for XP and MMC actions.
 * @returns An object containing reward functions:
 * - `addXp`: Adds XP to a user, records an entry, and emits an activity event.
 * - `transferMMC`: Transfers MMC to a user and emits an activity event.
 */
export const rewards = ({ ds, activity }: RewardsDeps) => {
  return {
    /**
     * Add XP to a user and record an entry.
     * Throws if `addr` is empty or `amount <= 0`.
     * Returns the created entry or `null` if user does not exist.
     */
    addXp: async (
      addr: string,
      amount: number,
      action: XPAction = XPAction.SYS,
      description = '',
    ) => {
      if (!addr?.trim()) {
        throw new Error("addXp: 'addr' is required");
      }
      if (!Number.isFinite(amount) || amount <= 0) {
        throw new Error("addXp: 'amount' must be a number > 0");
      }

      const u = await ds.Users.getUser(addr);
      if (!u) return null;

      const entry = makeXpEntry({
        user: addr,
        action,
        description,
        amount,
        before: u.xpBalance,
        totalBefore: u.xpTotal,
      });

      // Best-effort side effect (should not break if activity fails)
      try {
        Promise.resolve([ds.XP.addEntry(entry), activity?.xpGained?.(addr, amount)]);
      } catch (e) {
        console.warn('activity.xpGained failed', e);
      }

      return entry;
    },

    /**
     * Transfer MMC to the given address and emit activity event.
     * Throws if transfer fails.
     */
    transferMMC: async (addr: string, amount: number) => {
      if (!addr?.trim()) {
        throw new Error("transferMMC: 'addr' is required");
      }
      if (!Number.isFinite(amount) || amount <= 0) {
        throw new Error("transferMMC: 'amount' must be a number > 0");
      }

      const res = await ds.Web3.transfer(addr, amount);
      await activity?.mmcTransfer?.(addr, amount);
      console.log(`${amount} MMC sent to ${addr}`);
      return res;
    },
  };
};

export type RewardsLibType = ReturnType<typeof rewards>;
