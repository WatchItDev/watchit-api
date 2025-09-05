'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TipsService = void 0;
const manager_1 = require('./manager');
class TipsService extends manager_1.ServiceManager {
  async createTip(baker, input) {
    if (input.amount <= 0) throw new Error('Amount must be > 0');
    return this.ds.Tips.createTip({
      postId: input.postId,
      creator: input.creator,
      baker,
      amount: input.amount,
      txHash: input.txHash ?? null,
      message: input.message ?? null,
    });
  }
  getTipsForPost(postId, limit) {
    return this.ds.Tips.getTipsForPost(postId, limit ?? 100);
  }
  async getTipsByBakerForPost(postId, limit = 50) {
    const rows = await this.ds.Tips.getTipsForPost(postId, 1000);
    const agg = new Map();
    for (const r of rows) {
      const key = r.baker;
      const prev = agg.get(key) ?? { total: 0, count: 0, last: 0 };
      const next = {
        total: prev.total + r.amount,
        count: prev.count + 1,
        last: Math.max(prev.last, r.createdAt),
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
      baker: users[i],
      totalAmount: v.total,
      count: v.count,
      lastTipAt: v.last,
    }));
  }
  getUserTipsHistory(address, limit) {
    return this.ds.Tips.getUserTipsHistory(address, limit ?? 100);
  }
  getCreatorTips(address, limit) {
    return this.ds.Tips.getCreatorTips(address, limit ?? 100);
  }
}
exports.TipsService = TipsService;
//# sourceMappingURL=tips.js.map
