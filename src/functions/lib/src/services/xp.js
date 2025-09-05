'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.XPService = void 0;
const manager_1 = require('./manager');
class XPService extends manager_1.ServiceManager {
  getHistory(address, limit, offset) {
    return this.ds.XP.getHistory(address, limit, offset);
  }
}
exports.XPService = XPService;
//# sourceMappingURL=xp.js.map
