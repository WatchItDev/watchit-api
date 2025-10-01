import { GraphQLError } from 'graphql';
import type { JWTPayload, JWTVerifyResult } from 'jose';
import { createRemoteJWKSet, jwtVerify } from 'jose';

const JWKS_URL = process.env.API_WEB3_AUTH_SOCIAL_JWKS!;
const AUD = process.env.API_WEB3AUTH_CLIENT_ID!;
const JWKS = createRemoteJWKSet(new URL(JWKS_URL));

export async function parseToken(ctx: GQL.ContextType): Promise<JWTVerifyResult<JWTPayload>> {
  const header = ctx.req.headers.authorization ?? '';
  const token = header.replace(/^Bearer\s+/i, '');
  if (!token) throw new GraphQLError('UNAUTHENTICATED');

  try {
    // need await here if we want to capture the error
    return await jwtVerify(token, JWKS, { audience: AUD });
  } catch (e) {
    throw new GraphQLError('INVALID_TOKEN');
  }
}

export function withRequireAuth<T extends (...a: any[]) => any>(resolver: T): T {
  return (async (parent, args, ctx: GQL.ContextType, info) => {
    const {
      payload: { email },
    } = await parseToken(ctx);

    const user = await ctx.dataSources.User.getUser({
      email: email as string,
    });

    if (!user) throw new GraphQLError('USER_NOT_FOUND');
    return resolver(parent, args, { ...ctx, user }, info);
  }) as T;
}
