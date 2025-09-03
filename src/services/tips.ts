import { ServiceManager } from "./manager";
import type { Tip, User } from "../schema/types";

export class TipsService extends ServiceManager {
  async createTip(
    baker: string,
    input: {
      postId: string;
      creator: string;
      amount: number;
      txHash?: string | null;
      message?: string | null;
    },
  ): Promise<Tip> {
    if (input.amount <= 0) throw new Error("Amount must be > 0");

    return this.ds.Tips.createTip({
      postId: input.postId,
      creator: input.creator,
      baker,
      amount: input.amount,
      txHash: input.txHash ?? null,
      message: input.message ?? null,
    });
  }

  getTipsForPost(postId: string, limit?: number) {
    return this.ds.Tips.getTipsForPost(postId, limit ?? 100);
  }

  async getTipsByBakerForPost(
    postId: string,
    limit = 50,
  ): Promise<
    Array<{
      baker: User;
      totalAmount: number;
      count: number;
      lastTipAt: number;
    }>
  > {
    const rows = await this.ds.Tips.getTipsForPost(postId, 1000);
    const agg = new Map<
      string,
      { total: number; count: number; last: number }
    >();

    for (const r of rows) {
      const key = r.baker;
      const prev = agg.get(key) ?? { total: 0, count: 0, last: 0 };
      const next = {
        total: prev.total + r.amount,
        count: prev.count + 1,
        last: Math.max(prev.last, r.createdAt as any),
      };
      agg.set(key, next);
    }

    const top = [...agg.entries()]
      .sort((a, b) => b[1].total - a[1].total)
      .slice(0, limit);

    const users = await Promise.all(
      top.map(([addr]) => this.ds.Users.getUser(addr)),
    );
    return top.map(([addr, v], i) => ({
      baker: users[i]! as User,
      totalAmount: v.total,
      count: v.count,
      lastTipAt: v.last,
    }));
  }

  getUserTipsHistory(address: string, limit?: number) {
    return this.ds.Tips.getUserTipsHistory(address, limit ?? 100);
  }

  getCreatorTips(address: string, limit?: number) {
    return this.ds.Tips.getCreatorTips(address, limit ?? 100);
  }
}
