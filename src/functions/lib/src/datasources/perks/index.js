'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const ts_mixer_1 = require('ts-mixer');
const query_1 = require('./query');
const commands_1 = require('./commands');
class PerksDS extends (0, ts_mixer_1.Mixin)(
  query_1.PerksQuery,
  commands_1.PerksCommands,
) {}
exports.default = PerksDS;
//# sourceMappingURL=index.js.map
