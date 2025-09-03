import { App, FireStore } from "./firebase";
import { Functions } from "./firebase/functions";
import { RootAgent } from "./ai/graphs/root";
export const Externals = () => ({
  App,
  FireStore,
  Functions,
  RootAgent,
});

export default Externals;
export type ExternalsType = ReturnType<typeof Externals>;
