'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.makeNewLog = makeNewLog;
const crypto_1 = require('crypto');
function makeNewLog(data) {
  return {
    id: `${(0, crypto_1.randomUUID)()}`,
    ...data,
    createdAt: Date.now(),
  };
}
//# sourceMappingURL=log.js.map
