import { HarvestingGraph, RootAgent } from './ai/graphs';
import { App, FireStore, FireStorage } from './firebase';
import { Functions } from './firebase/functions';
import { Prisma } from './prisma';

export const Externals = () => ({
  App,
  Prisma,
  FireStore,
  FireStorage,
  Functions,
  RootAgent,
  HarvestingGraph,
});

export default Externals;
export type ExternalsType = ReturnType<typeof Externals>;
