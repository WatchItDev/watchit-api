'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const ts_mixer_1 = require('ts-mixer');
const query_1 = require('./query');
const commands_1 = require('./commands');
/**
 * Combine query + commands in a single DataSource
 */
class UsersDS extends (0, ts_mixer_1.Mixin)(
  query_1.UsersQuery,
  commands_1.UsersCommands,
) {}
exports.default = UsersDS;
//# sourceMappingURL=index.js.map
