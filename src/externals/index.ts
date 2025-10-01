import { Prisma } from '../infra/database';
import { App, FireStorage, FireStore } from './firebase';
import { HarvestingGraph, RootAgent } from './langchain/graphs';

export const Externals = () => ({
  App,
  Prisma,
  FireStore,
  FireStorage,
  RootAgent,
  HarvestingGraph,
});
