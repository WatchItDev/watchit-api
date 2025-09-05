'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.DataSources = void 0;
const users_1 = __importDefault(require('./users'));
const posts_1 = __importDefault(require('./posts'));
const comments_1 = __importDefault(require('./comments'));
const feeds_1 = __importDefault(require('./feeds'));
const bookmarks_1 = __importDefault(require('./bookmarks'));
const follows_1 = __importDefault(require('./follows'));
const likes_1 = __importDefault(require('./likes'));
const xp_1 = __importDefault(require('./xp'));
const web3_1 = __importDefault(require('./web3'));
const logs_1 = __importDefault(require('./logs'));
const ranks_1 = __importDefault(require('./ranks'));
const perks_1 = __importDefault(require('./perks'));
const tips_1 = __importDefault(require('./tips'));
const DataSources = (store) => ({
  Users: new users_1.default(store),
  Posts: new posts_1.default(store),
  Comments: new comments_1.default(store),
  Feeds: new feeds_1.default(store),
  Bookmarks: new bookmarks_1.default(store),
  Follows: new follows_1.default(store),
  Likes: new likes_1.default(store),
  XP: new xp_1.default(store),
  Web3: new web3_1.default(store),
  Logs: new logs_1.default(store),
  Ranks: new ranks_1.default(store),
  Perks: new perks_1.default(store),
  Tips: new tips_1.default(store),
});
exports.DataSources = DataSources;
//# sourceMappingURL=index.js.map
