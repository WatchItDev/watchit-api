'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const ts_mixer_1 = require('ts-mixer');
const commands_1 = require('./commands');
const query_1 = require('./query');
class LogsDS extends (0, ts_mixer_1.Mixin)(
  commands_1.LogsCommands,
  query_1.LogsQuery,
) {}
exports.default = LogsDS;
//# sourceMappingURL=index.js.map
