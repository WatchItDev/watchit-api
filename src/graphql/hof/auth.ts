import { GraphQLError } from 'graphql';
import { jwtVerify, createRemoteJWKSet } from 'jose';
import type { JWTPayload } from 'jose';
import { GQL } from '@/types';

const JWKS_URL  = process.env.API_WEB3_AUTH_SOCIAL_JWKS!;
const AUD  = process.env.API_WEB3AUTH_CLIENT_ID!;
const JWKS = createRemoteJWKSet(new URL(JWKS_URL));

export function requireAuth<T extends (...a: any[]) => any>(resolver: T): T {
    return (async (parent, args, ctx: GQL.ContextType, info) => {
        // 1. Extract token from header
        const header = ctx.req.headers.authorization ?? '';
        const token  = header.replace(/^Bearer\s+/i, '');
        if (!token) throw new GraphQLError('UNAUTHENTICATED');

        // 2. Validate Web3Auth JWT
        let payload: JWTPayload;
        try {
            const res = await jwtVerify(token, JWKS, { audience: AUD })
            payload = res.payload;
        } catch { throw new GraphQLError('INVALID_TOKEN'); }

        const email = String(payload.email || '').toLowerCase();
        if (!email) throw new GraphQLError('EMAIL_MISSING');

        // 3. Search user by email
        const user = await ctx.dataSources.Users.getUserByEmail(email);
        if (!user) throw new GraphQLError('USER_NOT_FOUND');

        // 4. Inject `user` into context
        ctx.user = user;

        return resolver(parent, args, ctx, info);
    }) as T;
}
