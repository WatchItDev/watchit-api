import { HarvestingGraph, RootAgent } from './ai/graphs';
import { App, FireStore, FireStorage } from './firebase';
import { Prisma } from './prisma';

export const Externals = () => ({
  App,
  Prisma,
  FireStore,
  FireStorage,
  RootAgent,
  HarvestingGraph,
});

export default Externals;
export type ExternalsType = ReturnType<typeof Externals>;
