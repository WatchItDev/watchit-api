'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.TipsCommands = void 0;
const manager_1 = require('../manager');
const crypto_1 = __importDefault(require('crypto'));
class TipsCommands extends manager_1.DataSourceManager {
  async createTip(record) {
    const dao = this.fs('tips');
    const now = Date.now();
    const base = {
      postId: record.postId,
      creator: record.creator,
      baker: record.baker,
      amount: record.amount,
      txHash: record.txHash ?? null,
      message: record.message ?? null,
      createdAt: record.createdAt ?? now,
    };
    if (record.txHash) {
      const stableId = `${base.baker}_${record.txHash}`;
      if (!(await dao.exists(stableId))) {
        await dao.create(stableId, { ...base, id: stableId });
      }
      return await dao.get(stableId);
    }
    const id = crypto_1.default.randomUUID();
    await dao.create(id, { ...base, id });
    return await dao.get(id);
  }
}
exports.TipsCommands = TipsCommands;
//# sourceMappingURL=commands.js.map
