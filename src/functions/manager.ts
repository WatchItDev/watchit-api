import type { MediaLibType } from './library/mediakit';
import type { ActivityLibType } from './library/activity';
import type { ProgressLibType } from './library/progress';
import type { RewardsLibType } from './library/rewards';
import type { PerksLibType } from './library/perk';
import type { RankLibType } from './library/rank';
import type { ExternalsType } from '../externals';
import type { DataSourcesType } from '../datasources';
import type { ServicesType } from '../services';

import { Services } from '../services';
import { Externals } from '../externals';
import { DataSources } from '../datasources';

import { mediakit } from './library/mediakit';
import { rewards } from './library/rewards';
import { ranks } from './library/rank';
import { perks } from './library/perk';
import { progress } from './library/progress';
import { activity } from './library/activity';

export interface Ctx {
  ds: DataSourcesType;
  ext: ExternalsType;
  services: ServicesType;
  rank: RankLibType;
  perk: PerksLibType;
  media: MediaLibType;
  rewards: RewardsLibType;
  progress: ProgressLibType;
  activity: ActivityLibType;
}

function buildCtx(): Ctx {
  const ext = Externals();
  const ds = DataSources(ext.FireStore());
  const services = Services({ ds, ext });
  const args = { ds, ext, activity: activity({ ds }) };

  return {
    ds,
    ext,
    services,
    rank: ranks(args),
    perk: perks(args),
    rewards: rewards(args),
    progress: progress(args),
    activity: activity({ ds }),
    media: mediakit(args),
  };
}

const singletonCtx = buildCtx();

/* ----------------------------------------------------------------- */

export function enhanceFunction<E = any, R = void>(
  handler: (ctx: Ctx, event: E) => Promise<R> | R,
) {
  return async (event: E): Promise<R> => handler(singletonCtx, event);
}
