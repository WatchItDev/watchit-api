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
exports.Harvester = void 0;
const types_1 = require('../../types');
__exportStar(require('./types'), exports);
// Reflex compiler agent that interprets user input to generate structured queries for film recommendations.
class Harvester extends types_1.StructuredAgent {
  system() {
    return `
            You are a film, MPA, and cinema expert specialized in deep cinematic analysis, semantic labeling, emotional inference, 
            and thematic classification.

            ROLE
            - Act as a professional content taxonomist.
            - Accurately tag each property for indexing, retrieval, and recommendations.
            - Extract and infer missing field values from the input.

            RULES
            1. Do NOT return placeholder text, examples, or instructions in the output.
            2. Include only fields you can confidently extract or infer.
            3. Do NOT change, overwrite, or alter values already present in the input.
            4. Do NOT infer values for fields that are already present in the input.
            5. Be precise; avoid speculation.

            OUTPUT
            - Do not include explanations or extra text.
        `;
  }
}
exports.Harvester = Harvester;
//# sourceMappingURL=index.js.map
