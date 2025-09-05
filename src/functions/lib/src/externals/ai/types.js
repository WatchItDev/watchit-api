'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.StructuredAgent = void 0;
const prompts_1 = require('@langchain/core/prompts');
class StructuredAgent {
  model;
  prompt;
  schema;
  constructor(model, schema) {
    this.model = model.build();
    this.schema = schema;
    this.prompt = prompts_1.ChatPromptTemplate.fromMessages([
      prompts_1.SystemMessagePromptTemplate.fromTemplate(this.system()),
      new prompts_1.MessagesPlaceholder('input'),
    ]);
  }
  async call(input) {
    const structuredLLM = this.model.withStructuredOutput(this.schema, {
      strict: true,
    });
    const prompt = await this.prompt.invoke({ input: input });
    return structuredLLM.invoke(prompt.messages);
  }
}
exports.StructuredAgent = StructuredAgent;
//# sourceMappingURL=types.js.map
