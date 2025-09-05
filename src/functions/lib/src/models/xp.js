'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.XpAction = void 0;
exports.makeXpEntry = makeXpEntry;
var XpAction;
(function (XpAction) {
  XpAction['REGISTER_BONUS'] = 'REGISTER_BONUS';
  XpAction['POST_CREATED'] = 'POST_CREATED';
  XpAction['COMMENT_CREATED'] = 'COMMENT_CREATED';
  XpAction['COMMENT_STREAK'] = 'COMMENT_STREAK';
})(XpAction || (exports.XpAction = XpAction = {}));
function makeXpEntry(p) {
  const now = Date.now();
  const id = `${p.user}-${now}`;
  const balanceAfter = p.before + p.amount;
  const totalAfter = p.totalBefore + (p.amount > 0 ? p.amount : 0);
  return {
    id,
    action: p.action,
    user: p.user,
    description: p.description,
    amount: p.amount,
    balanceBefore: p.before,
    balanceAfter,
    totalAfter,
    createdAt: now,
  };
}
//# sourceMappingURL=xp.js.map
