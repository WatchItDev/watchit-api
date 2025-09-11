import { HarvestingGraph, RootAgent } from './ai/graphs';
import { App, FireStore } from './firebase';
import { Functions } from './firebase/functions';
import { Prisma } from './prisma';

export const Externals = () => ({
  App,
  Prisma,
  FireStore,
  Functions,
  RootAgent,
  HarvestingGraph,
});

export default Externals;
export type ExternalsType = ReturnType<typeof Externals>;
