import { HumanMessage } from "@langchain/core/messages";
import { Annotation, StateGraph } from "@langchain/langgraph";
import { Schema, Harvester } from "@/externals/ai/agents/harvester";
import { GPT4o } from "@/externals/ai/models";

const openAIKey = process.env.API_OPENAI_API_KEY;
/**
 * An instance of the GPT-4o language model configured with the provided OpenAI API key and a temperature of 0.
 *
 * @remarks
 * The temperature parameter controls the randomness of the model's output. A value of 0 makes the output more deterministic.
 *
 * @see {@link https://platform.openai.com/docs/guides/text-generation}
 */
const llm = GPT4o({ apiKey: openAIKey, temperature: 0 });

const HarvestingState = Annotation.Root({
  cleaned: Annotation<typeof Schema>,
  raw: Annotation<string>,
});

const harvestNode = async (state: typeof HarvestingState.State) => {
  const expert = new Harvester(llm, Schema);
  const message = new HumanMessage(state.raw);
  const cleaned = await expert.call([message]);
  return { cleaned };
};

export const HarvestingGraph = (config: any = {}) => {
  return new StateGraph(HarvestingState)
    .addNode("harvest_node", harvestNode)
    .addEdge("__start__", "harvest_node")
    .addEdge("harvest_node", "__end__")
    .compile(config);
};

export type HarvestingGraphType = ReturnType<typeof HarvestingGraph>;
