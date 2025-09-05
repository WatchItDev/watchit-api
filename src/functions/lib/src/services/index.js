'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Services = void 0;
const profile_1 = require('./profile');
const posts_1 = require('./posts');
const comments_1 = require('./comments');
const feeds_1 = require('./feeds');
const likes_1 = require('./likes');
const bookmarks_1 = require('./bookmarks');
const follows_1 = require('./follows');
const xp_1 = require('./xp');
const logs_1 = require('./logs');
const ranks_1 = require('./ranks');
const perks_1 = require('./perks');
const leaderboard_1 = require('./leaderboard');
const tips_1 = require('./tips');
const Services = ({ ds, ext }) => ({
  Profile: new profile_1.ProfileService({ ds, ext }),
  Posts: new posts_1.PostService({ ds, ext }),
  Comments: new comments_1.CommentService({ ds, ext }),
  Feeds: new feeds_1.FeedsService({ ds, ext }),
  Likes: new likes_1.LikesService({ ds, ext }),
  Bookmarks: new bookmarks_1.BookmarkService({ ds, ext }),
  Follows: new follows_1.FollowService({ ds, ext }),
  XP: new xp_1.XPService({ ds, ext }),
  Logs: new logs_1.LogService({ ds, ext }),
  Ranks: new ranks_1.RanksService({ ds, ext }),
  Perks: new perks_1.PerksService({ ds, ext }),
  Leaderboard: new leaderboard_1.LeaderboardService({ ds, ext }),
  Tips: new tips_1.TipsService({ ds, ext }),
});
exports.Services = Services;
//# sourceMappingURL=index.js.map
