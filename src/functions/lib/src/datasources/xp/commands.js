'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.XPCommands = void 0;
const manager_1 = require('../manager');
class XPCommands extends manager_1.DataSourceManager {
  async addEntry(entry) {
    await this.fs('xpEntries').create(entry.id, entry);
  }
}
exports.XPCommands = XPCommands;
//# sourceMappingURL=commands.js.map
