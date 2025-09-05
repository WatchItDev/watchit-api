import { GQL } from '@/types';
import { extractAuthData } from '@/helpers/auth';
import { User } from '@/schema/types';

export function requireSocial<T extends (...a: any[]) => any>(resolver: T): T {
  return (async (parent, args, ctx: GQL.ContextType, info) => {
    const { userId, email } = await extractAuthData(ctx);

    ctx.user = {
      id: userId ?? '',
      email: email ?? '',
    } as User;

    return resolver(parent, args, ctx, info);
  }) as T;
}
