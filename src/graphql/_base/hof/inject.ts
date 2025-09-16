import { parseToken } from './auth';

export function withEmail<T extends (...a: any[]) => any>(resolver: T): T {
  return (async (parent, args, ctx: GQL.ContextType, info) => {
    const {
      payload: { email },
    } = await parseToken(ctx);
    return resolver(parent, args, { ...ctx, email }, info);
  }) as T;
}
