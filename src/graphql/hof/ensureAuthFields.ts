import type { GQL } from '@/types';
import type { User } from '@/schema/types';
import { extractAuthData } from "@/helpers/auth";

export function ensureAuthFieldsOnGetUser<
    T extends (...args: any[]) => Promise<User | null>
>(resolver: T): T {
    return (async (parent, args, ctx: GQL.ContextType, info) => {
        const { userId, email } = await extractAuthData(ctx);

        // Execute getUser
        const user = await resolver(parent, args, ctx, info);
        if (!user || !args.input?.idSession) {
            return user;
        }

        // Inject auth fields
        const patch: Partial<User> = {};
        if (!user.id && userId) patch.id    = userId;
        if (!user.email && email) patch.email = email;

        // If there is auth fields pending update it!
        if (Object.keys(patch).length > 0) {
            await ctx.dataSources.Users.updateUser(args.input.address, patch);
            return { ...user, ...patch };
        }

        // If there is nothing to update return without modifications
        return user;
    }) as T;
}
