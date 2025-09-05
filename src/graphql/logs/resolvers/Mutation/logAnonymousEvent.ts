import type { MutationResolvers } from '@/schema/types';

export const logAnonymousEvent: NonNullable<
  MutationResolvers['logAnonymousEvent']
> = async (_p, { input }, { services }) => {
  await services.Logs.logEvent('', input);
  return true;
};
