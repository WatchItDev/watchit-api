import type { MutationResolvers } from './../../../../schema/types';
export const humanMessage: NonNullable<
  MutationResolvers['humanMessage']
> = async (_parent, _arg, { req, externals, pubsub }) => {
  const agent = externals.RootAgent();
  const memory = await agent.memory();
  const graph = agent.graph({ checkpointer: memory });
  const configs = { configurable: { thread_id: '3' } };

  const answer = await graph.invoke({ userInput: _arg.input.message }, configs);
  pubsub.publish('ASSISTANT_CHAT', {
    onAiMessage: {
      message: { content: answer.assistant },
      done: answer.finish,
    },
  });
};
