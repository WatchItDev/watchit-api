'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Externals = void 0;
const firebase_1 = require('./firebase');
const functions_1 = require('./firebase/functions');
const graphs_1 = require('./ai/graphs');
const Externals = () => ({
  App: firebase_1.App,
  FireStore: firebase_1.FireStore,
  Functions: functions_1.Functions,
  RootAgent: graphs_1.RootAgent,
  HarvestingGraph: graphs_1.HarvestingGraph,
});
exports.Externals = Externals;
exports.default = exports.Externals;
//# sourceMappingURL=index.js.map
