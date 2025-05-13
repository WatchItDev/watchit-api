import { GraphQLError } from 'graphql';
import { GQL } from '@/types';
import {extractAuthData} from "@/helpers/auth";

export function requireAuth<T extends (...a: any[]) => any>(resolver: T): T {
    return (async (parent, args, ctx: GQL.ContextType, info) => {
        const { payload, userId } = await extractAuthData(ctx);
        if (!payload) { throw new GraphQLError('UNAUTHENTICATED'); }
        const user = await ctx.dataSources.Users.getUserById(userId);
        if (!user) throw new GraphQLError('USER_NOT_FOUND');

        ctx.user = user;

        return resolver(parent, args, ctx, info);
    }) as T;
}
