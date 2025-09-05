'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.toggle = toggle;
async function toggle(isOn, add, del) {
  const run = (fns) =>
    Promise.all((Array.isArray(fns) ? fns : [fns]).map((fn) => fn()));
  if (await isOn()) {
    await run(del);
    return false;
  }
  await run(add);
  return true;
}
//# sourceMappingURL=toggle.js.map
