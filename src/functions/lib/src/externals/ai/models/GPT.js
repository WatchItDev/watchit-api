'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.GPT5 = GPT5;
exports.GPT4o = GPT4o;
exports.GPT4oMini = GPT4oMini;
const openai_1 = require('@langchain/openai');
function GPT5(config) {
  if (!('apiKey' in config))
    throw new Error('OPENAI_API_KEY environment variable is not set.');
  return {
    build: () =>
      new openai_1.ChatOpenAI({
        ...config,
        model: 'gpt-5',
      }),
  };
}
function GPT4o(config) {
  if (!('apiKey' in config))
    throw new Error('OPENAI_API_KEY environment variable is not set.');
  return {
    build: () =>
      new openai_1.ChatOpenAI({
        ...config,
        model: 'gpt-4o',
      }),
  };
}
function GPT4oMini(config) {
  if (!('apiKey' in config))
    throw new Error('OPENAI_API_KEY environment variable is not set.');
  return {
    build: () =>
      new openai_1.ChatOpenAI({
        ...config,
        model: 'gpt-4o-mini',
      }),
  };
}
//# sourceMappingURL=GPT.js.map
