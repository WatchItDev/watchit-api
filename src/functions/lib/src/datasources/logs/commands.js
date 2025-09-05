'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.LogsCommands = void 0;
const manager_1 = require('../manager');
const log_1 = require('../../models/log');
class LogsCommands extends manager_1.DataSourceManager {
  async logEvent(author, data) {
    const record = (0, log_1.makeNewLog)({ ...data, author });
    await this.fs('eventLogs').create(record.id, record);
  }
}
exports.LogsCommands = LogsCommands;
//# sourceMappingURL=commands.js.map
