'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.makeUnlockedPerk = makeUnlockedPerk;
function makeUnlockedPerk(p) {
  const now = Date.now();
  return {
    id: `${p.user}-${p.perkId}`,
    createdAt: now,
    ...p,
    collectedAt: null,
    seen: [],
  };
}
//# sourceMappingURL=unlockedPerk.js.map
