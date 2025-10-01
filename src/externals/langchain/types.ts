import type { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { type BaseMessage } from '@langchain/core/messages';
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
  SystemMessagePromptTemplate,
} from '@langchain/core/prompts';
import { z, ZodTypeAny } from 'zod';

export interface Model {
  build(): BaseChatModel;
}

export abstract class StructuredAgent<S extends ZodTypeAny> {
  protected model: BaseChatModel;
  protected prompt: ChatPromptTemplate;
  protected schema: S;

  constructor(model: Model, schema: S) {
    this.model = model.build();
    this.schema = schema;
    this.prompt = ChatPromptTemplate.fromMessages([
      SystemMessagePromptTemplate.fromTemplate(this.system()),
      new MessagesPlaceholder('messages'),
    ]);
  }

  abstract system(): string;

  async call(messages: Array<BaseMessage>): Promise<S> {
    const structuredLLM = this.model.withStructuredOutput(this.schema, {
      strict: true,
    });

    const prompt = await this.prompt.invoke({ messages });
    return structuredLLM.invoke(prompt.messages) as z.infer<S>;
  }
}
