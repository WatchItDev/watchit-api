'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.enhanceFunction = enhanceFunction;
const services_1 = require('../services');
const externals_1 = require('../externals');
const datasources_1 = require('../datasources');
const mediakit_1 = require('./library/mediakit');
const rewards_1 = require('./library/rewards');
const rank_1 = require('./library/rank');
const perk_1 = require('./library/perk');
const progress_1 = require('./library/progress');
const activity_1 = require('./library/activity');
function buildCtx() {
  const ext = (0, externals_1.Externals)();
  const ds = (0, datasources_1.DataSources)(ext.FireStore());
  const services = (0, services_1.Services)({ ds, ext });
  const args = { ds, ext, activity: (0, activity_1.activity)({ ds }) };
  return {
    ds,
    ext,
    services,
    rank: (0, rank_1.ranks)(args),
    perk: (0, perk_1.perks)(args),
    rewards: (0, rewards_1.rewards)(args),
    progress: (0, progress_1.progress)(args),
    activity: (0, activity_1.activity)({ ds }),
    media: (0, mediakit_1.mediakit)(args),
  };
}
const singletonCtx = buildCtx();
/* ----------------------------------------------------------------- */
function enhanceFunction(handler) {
  return async (event) => handler(singletonCtx, event);
}
//# sourceMappingURL=manager.js.map
