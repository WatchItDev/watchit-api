import * as externals      from '../externals';
import { FireStore as FS } from '../externals';
import { DataSources }     from '../datasources';
import { Services, ServicesType } from '../services';
import { economy } from './processors/economy';
import { rankEngine } from './processors/rank';
import { perkEngine } from './processors/perk';
import { gameEngine } from './processors/game';
import { progressEngine } from './processors/progress';
import { activityLogger } from './processors/activity';

/* ------------------------------------------------------------------
   1. Build the canonical context ONE time per module load
   ------------------------------------------------------------------ */
export interface Ctx {
    ds:  ReturnType<typeof DataSources>;
    ext: typeof externals;
    services: ServicesType;
    eco: ReturnType<typeof economy>;
    rank: ReturnType<typeof rankEngine>;
    perk: ReturnType<typeof perkEngine>;
    game: ReturnType<typeof gameEngine>;
    progress: ReturnType<typeof progressEngine>;
    activity: ReturnType<typeof activityLogger>;
}

function buildCtx(): Ctx {
    const ds  = DataSources(FS());
    const ext = externals;
    const services = Services({ ds, ext });
    const activity = activityLogger({ ds });

    return {
        ds,
        ext,
        services,
        eco:  economy({ ds, ext, activity }),
        rank: rankEngine({ ds, ext, activity }),
        perk: perkEngine({ ds, ext, activity }),
        game: gameEngine({ ds, ext, activity }),
        progress: progressEngine({ ds }),
        activity: activityLogger({ ds }),
    };
}

const singletonCtx = buildCtx();

/* ------------------------------------------------------------------
   2. Generic wrappers
   ------------------------------------------------------------------ */
export function enhanceTrigger<
    E = any,
    R = void
>(handler: (ctx: Ctx, event: E) => Promise<R> | R) {
    return async (event: E): Promise<R> => handler(singletonCtx, event);
}

export function enhanceFunction<
    Args extends any[],
    Result
>(fn: (ctx: Ctx, ...args: Args) => Promise<Result>) {
    return async (...p: Args): Promise<Result> => fn(singletonCtx, ...p);
}
