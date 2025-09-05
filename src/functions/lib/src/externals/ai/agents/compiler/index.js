'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __exportStar =
  (this && this.__exportStar) ||
  function (m, exports) {
    for (var p in m)
      if (p !== 'default' && !Object.prototype.hasOwnProperty.call(exports, p))
        __createBinding(exports, m, p);
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.Compiler = void 0;
const types_1 = require('../../types');
__exportStar(require('./types'), exports);
// Reflex compiler agent that interprets user input to generate structured queries for film recommendations.
class Compiler extends types_1.StructuredAgent {
  system() {
    return `
            You are a cinematic recommendation and analysis expert.

            PRINCIPLES
            - Prioritize emotional nuance, preferences, and narrative intention over keyword matching.
            - Use minimal constraints; avoid over-filtering.
            - Canonicalize eras to conceptual tags (“middle ages”→medieval, “80s”→retro, “set in the future”→futuristic).
            - Resolve contradictions in favor of the core intent.

            FILTERING LOGIC (QDRANT)
            - Valid keys: genres, themes, emotional_tone, narrative_style, sentiment, viewing_time, rate, year.
            - Explicit request → add its field key to 'must'.
            - Strongly implied constraint (e.g., “feel good”, “not too violent”) → add relevant key(s) to 'must'.

            VIEWING TIME & RATE
            - short/quick/under 1h → viewing_time="short"; long/deep dive/movie night → "long"; else → "medium".
            - If low intensity implied → adjust 'rate' (and possibly sentiment/emotional_tone); add "rate" to 'must' only if essential.

            QUERY TERMS
            - 1-15 words capturing mood, style, and themes; embedding-friendly; avoid field names/enums unless central.

            NON-INTERACTIVE
            - No clarifying questions. If info is insufficient, infer conservatively; leave arrays empty when unknown.

        `;
  }
}
exports.Compiler = Compiler;
//# sourceMappingURL=index.js.map
