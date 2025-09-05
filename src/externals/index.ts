import { App, FireStore } from './firebase';
import { Functions } from './firebase/functions';
import { RootAgent, HarvestingGraph } from './ai/graphs';

export const Externals = () => ({
  App,
  FireStore,
  Functions,
  RootAgent,
  HarvestingGraph,
});

export default Externals;
export type ExternalsType = ReturnType<typeof Externals>;
