'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const ts_mixer_1 = require('ts-mixer');
const query_1 = require('./query');
const commands_1 = require('./commands');
class CommentsDS extends (0, ts_mixer_1.Mixin)(
  query_1.CommentsQuery,
  commands_1.CommentsCommands,
) {}
exports.default = CommentsDS;
//# sourceMappingURL=index.js.map
