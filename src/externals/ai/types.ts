import { z, ZodTypeAny } from 'zod';
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
  SystemMessagePromptTemplate,
} from '@langchain/core/prompts';
import type { BaseChatModel } from '@langchain/core/language_models/chat_models';
import type { BaseMessage } from '@langchain/core/messages';

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
      new MessagesPlaceholder('input'),
    ]);
  }

  abstract system(): string;

  async call(input: Array<BaseMessage>): Promise<S> {
    const structuredLLM = this.model.withStructuredOutput(this.schema, {
      strict: true,
    });
    const prompt = await this.prompt.invoke({ input: input });
    return structuredLLM.invoke(prompt.messages) as z.infer<S>;
  }
}
