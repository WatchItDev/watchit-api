'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const ts_mixer_1 = require('ts-mixer');
const commands_1 = require('./commands');
const query_1 = require('./query');
class XPDS extends (0, ts_mixer_1.Mixin)(
  commands_1.XPCommands,
  query_1.XPQuery,
) {}
exports.default = XPDS;
//# sourceMappingURL=index.js.map
