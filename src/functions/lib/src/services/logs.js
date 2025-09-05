'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.LogService = void 0;
const manager_1 = require('./manager');
class LogService extends manager_1.ServiceManager {
  logEvent = (addr, payload) => this.ds.Logs.logEvent(addr, { ...payload });
  userEvents = (...args) => this.ds.Logs.eventsByUser(...args);
  targetEvents = (...args) => this.ds.Logs.eventsByTarget(...args);
  countPostViews = (postId) =>
    this.ds.Logs.countEvents('POST_VIEW', 'targetId', postId);
  countProfileViews = (addr) =>
    this.ds.Logs.countEvents('PROFILE_VIEW', 'targetId', addr);
}
exports.LogService = LogService;
//# sourceMappingURL=logs.js.map
