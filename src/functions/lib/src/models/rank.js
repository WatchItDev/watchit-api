'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.makeRank = makeRank;
function makeRank(input) {
  const now = Date.now();
  return {
    ...input,
    createdAt: now,
    updatedAt: now,
  };
}
//# sourceMappingURL=rank.js.map
