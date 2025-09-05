'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const ts_mixer_1 = require('ts-mixer');
const query_1 = require('./query');
const commands_1 = require('./commands');
class Web3DS extends (0, ts_mixer_1.Mixin)(
  query_1.Web3Query,
  commands_1.Web3Commands,
) {}
exports.default = Web3DS;
//# sourceMappingURL=index.js.map
