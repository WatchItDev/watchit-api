import { getFunctions, httpsCallable } from "firebase/functions";
import { App } from "./app";
const Functions = () => {
  const fn = getFunctions(App().getClient(), "auto");
  if (false) {
    const host = process.env.EMULATOR_HOST ?? "127.0.0.1";
    connectFunctionsEmulator(fn, host, 5001);
  }
  return {
    users: {
      create: httpsCallable(
        fn,
        "usersCallable-usersCreate"
      ),
      update: httpsCallable(
        fn,
        "usersCallable-usersUpdate"
      )
    },
    posts: {
      create: httpsCallable(
        fn,
        "postsCallable-postsCreate"
      ),
      update: httpsCallable(
        fn,
        "postsCallable-postsUpdate"
      ),
      delete: httpsCallable(
        fn,
        "postsCallable-postsDelete"
      ),
      incrementView: httpsCallable(
        fn,
        "postsCallable-postsIncrementView"
      )
    },
    comments: {
      create: httpsCallable(
        fn,
        "commentsCallable-commentsCreate"
      ),
      update: httpsCallable(
        fn,
        "commentsCallable-commentsUpdate"
      ),
      delete: httpsCallable(
        fn,
        "commentsCallable-commentsDelete"
      )
    }
  };
};
export {
  Functions
};
//# sourceMappingURL=functions.js.map