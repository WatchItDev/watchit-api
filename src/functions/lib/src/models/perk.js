'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.rewardPreviewFrom = rewardPreviewFrom;
exports.makePerk = makePerk;
function rewardPreviewFrom(reward) {
  switch (reward.action) {
    case 'ADD_XP':
      return `+${reward.amount ?? 0} XP`;
    case 'ADD_MMC':
      return `+${reward.amount ?? 0} MMC`;
    case 'MINT_NFT':
      return `NFT #${reward.tokenId ?? ''}`;
    default:
      return '';
  }
}
function makePerk(input) {
  const now = Date.now();
  return {
    ...input,
    uiHint: input.uiHint ?? '',
    rewardPreview: rewardPreviewFrom(input.reward),
    enabled: input.enabled ?? true,
    collectedAt: null,
    availableAt: 0,
    cooldownRemaining: 0,
    executionRule: {
      ...input.executionRule,
      cooldownSec: input.executionRule.cooldownSec ?? 0, // fallback
    },
    createdAt: now,
    updatedAt: now,
    hooks: input.hooks ?? [],
  };
}
//# sourceMappingURL=perk.js.map
