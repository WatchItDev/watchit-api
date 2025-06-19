import * as externals      from '../externals';
import { FireStore as FS } from '../externals';
import { DataSources }     from '../datasources';

/* ------------------------------------------------------------------
   1. Build the canonical context ONE time per module load
   ------------------------------------------------------------------ */
export interface Ctx {
    ds:  ReturnType<typeof DataSources>;
    ext: typeof externals;
    eco: ReturnType<typeof import('./processors/economy').economy>;
    rank: ReturnType<typeof import('./processors/rank').rankEngine>;
    perk: ReturnType<typeof import('./processors/perk').perkEngine>;
    game: ReturnType<typeof import('./processors/game').gameEngine>;
}

function buildCtx(): Ctx {
    const ds  = DataSources(FS());
    const ext = externals;
    const { economy }     = require('./processors/economy');
    const { rankEngine }  = require('./processors/rank');
    const { perkEngine }  = require('./processors/perk');
    const { gameEngine }  = require('./processors/game');

    return {
        ds,
        ext,
        eco:  economy({ ds, ext }),
        rank: rankEngine({ ds, ext }),
        perk: perkEngine({ ds, ext }),
        game: gameEngine({ ds, ext }),
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
