'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.stripNulls = stripNulls;
exports.buildKeywords = buildKeywords;
function stripNulls(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v != null));
}
function buildKeywords(obj, prefixFields, wholeFields, minLen = 1) {
  const set = new Set();
  const normalize = (txt) =>
    txt
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .trim();
  wholeFields.forEach((f) => {
    const raw = obj[f];
    if (raw) set.add(raw.toLowerCase());
  });
  prefixFields.forEach((f) => {
    const raw = obj[f];
    if (!raw) return;
    normalize(raw)
      .split(/\s+/)
      .filter(Boolean)
      .forEach((word) => {
        for (let len = word.length; len >= minLen; len--) {
          set.add(word.slice(0, len));
        }
      });
  });
  return [...set];
}
//# sourceMappingURL=utils.js.map
