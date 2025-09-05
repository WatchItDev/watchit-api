'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TipsQuery = void 0;
const manager_1 = require('../manager');
class TipsQuery extends manager_1.DataSourceManager {
  async getTipsForPost(postId, limit = 100) {
    return this.fs('tips').query(
      [{ field: 'postId', op: '==', value: postId }],
      { orderBy: { field: 'createdAt', direction: 'desc' }, limit },
    );
  }
  async getUserTipsHistory(address, limit = 100) {
    return this.fs('tips').query(
      [{ field: 'baker', op: '==', value: address }],
      { orderBy: { field: 'createdAt', direction: 'desc' }, limit },
    );
  }
  async getCreatorTips(address, limit = 100) {
    return this.fs('tips').query(
      [{ field: 'creator', op: '==', value: address }],
      { orderBy: { field: 'createdAt', direction: 'desc' }, limit },
    );
  }
}
exports.TipsQuery = TipsQuery;
//# sourceMappingURL=query.js.map
