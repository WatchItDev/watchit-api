// economy.ts
import { makeXpEntry } from "../../models/xp";
import type { Ctx } from "@/functions/manager";

// ---- Zero-cost string enums ----
export const XPAction = {
  SYS: "SYS",
  RANK_UP_BONUS: "RANK_UP_BONUS"
  // Add more domain actions here: LIKE, POST_CREATE, RANK_UP, etc.
  // LIKE: "LIKE",
  // POST_CREATE: "POST_CREATE",
} as const;
export type XPAction = typeof XPAction[keyof typeof XPAction];

// ---- Minimal ports extracted from ds/activity ----
type User = {
  address: string;
  xpBalance: number;
  xpTotal: number;
};

type DSUsersPort = {
  getUser: (addr: string) => Promise<User | null | undefined>;
};

type DSXpPort = {
  addEntry: (entry: ReturnType<typeof makeXpEntry>) => Promise<void>;
};

type DSSynapsePort = {
  transfer: (addr: string, amount: number) => Promise<unknown>;
};

type DS = {
  Users: DSUsersPort;
  XP: DSXpPort;
  SynapseDS: DSSynapsePort;
};

type ActivityPort = {
  xpGained?: (author: string, amount: number) => Promise<unknown> | unknown;
  mmcTransfer?: (author: string, amount: number) => Promise<unknown> | unknown;
};

// ---- API ----
type EconomyDeps = Pick<Ctx, "ds" | "ext" | "activity"> & {
  ds: DS;                  // narrow ds to the subset we actually use
  activity?: ActivityPort; // activity is optional
};

export const economy = ({ ds, activity }: EconomyDeps) => {
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
      description = "",
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

      await ds.XP.addEntry(entry);

      // Best-effort side effect (should not break if activity fails)
      try {
        await activity?.xpGained?.(addr, amount);
      } catch (e) {
        // console.warn("activity.xpGained failed", e);
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

      const res = await ds.SynapseDS.transfer(addr, amount);

      try {
        await activity?.mmcTransfer?.(addr, amount);
      } catch (e) {
        console.warn("activity.mmcTransfer failed", e);
      }

      console.log(`${amount} MMC sent to ${addr}`);
      return res;
    },
  };
};
