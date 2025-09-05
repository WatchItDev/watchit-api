'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.HarvestingGraph = void 0;
const messages_1 = require('@langchain/core/messages');
const langgraph_1 = require('@langchain/langgraph');
const harvester_1 = require('../agents/harvester');
const models_1 = require('../models');
const openAIKey = process.env.API_OPENAI_API_KEY;
/**
 * An instance of the GPT-4o language model configured with the provided OpenAI API key and a temperature of 0.
 *
 * @remarks
 * The temperature parameter controls the randomness of the model's output. A value of 0 makes the output more deterministic.
 *
 * @see {@link https://platform.openai.com/docs/guides/text-generation}
 */
const llm = (0, models_1.GPT4o)({ apiKey: openAIKey, temperature: 0 });
const HarvestingState = langgraph_1.Annotation.Root({
  cleaned: langgraph_1.Annotation,
  raw: langgraph_1.Annotation,
});
const harvestNode = async (state) => {
  const expert = new harvester_1.Harvester(llm, harvester_1.Schema);
  const message = new messages_1.HumanMessage(state.raw);
  const cleaned = await expert.call([message]);
  return { cleaned };
};
const HarvestingGraph = (config = {}) => {
  return new langgraph_1.StateGraph(HarvestingState)
    .addNode('harvest_node', harvestNode)
    .addEdge('__start__', 'harvest_node')
    .addEdge('harvest_node', '__end__')
    .compile(config);
};
exports.HarvestingGraph = HarvestingGraph;
//# sourceMappingURL=harvesting.js.map
