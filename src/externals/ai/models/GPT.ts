import type { Model } from '@/externals/ai/types';
import type { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { ChatOpenAI } from '@langchain/openai';

export function GPT5(config: any): Model {
  if (!('apiKey' in config)) throw new Error('OPENAI_API_KEY environment variable is not set.');

  return {
    build: (): BaseChatModel =>
      new ChatOpenAI({
        ...config,
        model: 'gpt-5',
      }),
  };
}

export function GPT4o(config: any): Model {
  if (!('apiKey' in config)) throw new Error('OPENAI_API_KEY environment variable is not set.');

  return {
    build: (): BaseChatModel =>
      new ChatOpenAI({
        ...config,
        model: 'gpt-4o',
      }),
  };
}

export function GPT4oMini(config: any): Model {
  if (!('apiKey' in config)) throw new Error('OPENAI_API_KEY environment variable is not set.');

  return {
    build: (): BaseChatModel =>
      new ChatOpenAI({
        ...config,
        model: 'gpt-4o-mini',
      }),
  };
}
