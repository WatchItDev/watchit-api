import "reflect-metadata";
import * as externals from "../externals";
import { DataSources } from "../datasources";
function enhanceFunction(fn) {
  return async (...params) => {
    const store = externals.FireStore();
    const ds = DataSources(store);
    return fn({ ds, ext: externals }, ...params);
  };
}
function enhanceTrigger(handler) {
  return async (event) => {
    const store = externals.FireStore();
    const ds = DataSources(store);
    return handler({ ds, ext: externals }, event);
  };
}
export {
  enhanceFunction,
  enhanceTrigger
};
//# sourceMappingURL=manager.js.map