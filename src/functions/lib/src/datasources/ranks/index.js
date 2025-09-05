'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const ts_mixer_1 = require('ts-mixer');
const query_1 = require('./query');
const commands_1 = require('./commands');
class RanksDS extends (0, ts_mixer_1.Mixin)(
  query_1.RanksQuery,
  commands_1.RanksCommands,
) {}
exports.default = RanksDS;
//# sourceMappingURL=index.js.map
