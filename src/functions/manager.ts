import type {ExternalsType} from "../externals";
import { Externals } from "../externals";
import { DataSources } from "../datasources";
import { Services, ServicesType } from "../services";
import { economy } from "./library/economy";
import { rankEngine } from "./library/rank";
import { perkEngine } from "./library/perk";
import { progressEngine } from "./library/progress";
import { activityLogger } from "./library/activity";

export interface Ctx {
  ds: ReturnType<typeof DataSources>;
  ext: ExternalsType;
  services: ServicesType;
  eco: ReturnType<typeof economy>;
  rank: ReturnType<typeof rankEngine>;
  perk: ReturnType<typeof perkEngine>;
  progress: ReturnType<typeof progressEngine>;
  activity: ReturnType<typeof activityLogger>;
}

function buildCtx(): Ctx {
  const ext = Externals();
  const ds = DataSources(ext.FireStore());
  const services = Services({ ds, ext });
  const activity = activityLogger({ ds });

  return {
    ds,
    ext,
    services,
    eco: economy({ ds, ext, activity }),
    rank: rankEngine({ ds, ext, activity }),
    perk: perkEngine({ ds, ext, activity }),
    progress: progressEngine({ ds, activity }),
    activity: activityLogger({ ds }),
  };
}

const singletonCtx = buildCtx();

/* ----------------------------------------------------------------- */

export function enhanceTrigger<E = any, R = void>(
  handler: (ctx: Ctx, event: E) => Promise<R> | R,
) {
  return async (event: E): Promise<R> => handler(singletonCtx, event);
}

export function enhanceFunction<Args extends any[], Result>(
  fn: (ctx: Ctx, ...args: Args) => Promise<Result>,
) {
  return async (...p: Args): Promise<Result> => fn(singletonCtx, ...p);
}
