'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.activity =
  exports.Currency =
  exports.TargetType =
  exports.EventType =
    void 0;
const log_1 = require('../../models/log');
// ---------- String enums "zero-cost" ----------
exports.EventType = {
  LIKE_CREATED: 'LIKE_CREATED',
  LIKE_REMOVED: 'LIKE_REMOVED',
  BOOKMARK_CREATED: 'BOOKMARK_CREATED',
  BOOKMARK_REMOVED: 'BOOKMARK_REMOVED',
  FOLLOW_CREATED: 'FOLLOW_CREATED',
  FOLLOW_REMOVED: 'FOLLOW_REMOVED',
  POST_CREATED: 'POST_CREATED',
  POST_UPDATED: 'POST_UPDATED',
  POST_HIDDEN: 'POST_HIDDEN',
  COMMENT_CREATED: 'COMMENT_CREATED',
  COMMENT_UPDATED: 'COMMENT_UPDATED',
  COMMENT_HIDDEN: 'COMMENT_HIDDEN',
  USER_REGISTERED: 'USER_REGISTERED',
  USER_UPDATED: 'USER_UPDATED',
  RANK_UP: 'RANK_UP',
  PERK_CLAIM: 'PERK_CLAIM',
  XP_GAINED: 'XP_GAINED',
  XP_BURNED: 'XP_BURNED',
  MMC_TRANSFER: 'MMC_TRANSFER',
};
exports.TargetType = {
  POST: 'POST',
  COMMENT: 'COMMENT',
  USER: 'USER',
  RANK: 'RANK',
  PERK: 'PERK',
};
exports.Currency = {
  XP: 'XP',
  MMC: 'MMC',
};
/**
 * Provides a set of activity logging functions for various user actions within the application.
 *
 * @param ds - The data source context containing logging capabilities.
 * @returns An object with methods to emit activity events for likes, bookmarks, follows, posts, comments, users, ranks, perks, and balances.
 *
 * @remarks
 * Each method emits a specific event type and logs the activity using the provided data source.
 * The `emit` function validates the presence of an `author` and constructs a log record for the event.
 *
 * @example
 * ```typescript
 * const activityLogger = activity({ ds });
 * await activityLogger.likeCreated('user123', 'post456', TargetType.POST);
 * ```
 */
const activity = ({ ds }) => {
  const emit = async (type, payload) => {
    const author = payload?.author;
    if (typeof author !== 'string' || !author.trim()) {
      throw new Error(`activity.emit(${type}): 'author' required`);
    }
    const rec = (0, log_1.makeNewLog)({ type, ...payload });
    await ds.Logs.logEvent(rec.author ?? '', rec);
    return rec;
  };
  return {
    emit,
    // Likes
    likeCreated: (author, targetId, targetType, meta = {}) =>
      emit(exports.EventType.LIKE_CREATED, {
        author,
        targetId,
        targetType,
        meta,
      }),
    likeRemoved: (author, targetId, targetType) =>
      emit(exports.EventType.LIKE_REMOVED, { author, targetId, targetType }),
    // Bookmarks
    bookmarkCreated: (author, postId, meta = {}) =>
      emit(exports.EventType.BOOKMARK_CREATED, {
        author,
        targetId: postId,
        targetType: exports.TargetType.POST,
        meta,
      }),
    bookmarkRemoved: (author, postId) =>
      emit(exports.EventType.BOOKMARK_REMOVED, {
        author,
        targetId: postId,
        targetType: exports.TargetType.POST,
      }),
    // Follows
    followCreated: (author, targetUserId, meta = {}) =>
      emit(exports.EventType.FOLLOW_CREATED, {
        author,
        targetId: targetUserId,
        targetType: exports.TargetType.USER,
        meta,
      }),
    followRemoved: (author, targetUserId) =>
      emit(exports.EventType.FOLLOW_REMOVED, {
        author,
        targetId: targetUserId,
        targetType: exports.TargetType.USER,
      }),
    // Posts
    postCreated: (author, postId) =>
      emit(exports.EventType.POST_CREATED, {
        author,
        targetId: postId,
        targetType: exports.TargetType.POST,
      }),
    postUpdated: (author, postId) =>
      emit(exports.EventType.POST_UPDATED, {
        author,
        targetId: postId,
        targetType: exports.TargetType.POST,
      }),
    postHidden: (author, postId) =>
      emit(exports.EventType.POST_HIDDEN, {
        author,
        targetId: postId,
        targetType: exports.TargetType.POST,
      }),
    // Comments
    commentCreated: (author, commentId) =>
      emit(exports.EventType.COMMENT_CREATED, {
        author,
        targetId: commentId,
        targetType: exports.TargetType.COMMENT,
      }),
    commentUpdated: (author, commentId) =>
      emit(exports.EventType.COMMENT_UPDATED, {
        author,
        targetId: commentId,
        targetType: exports.TargetType.COMMENT,
      }),
    commentHidden: (author, commentId) =>
      emit(exports.EventType.COMMENT_HIDDEN, {
        author,
        targetId: commentId,
        targetType: exports.TargetType.COMMENT,
      }),
    // Users
    userRegistered: (author) =>
      emit(exports.EventType.USER_REGISTERED, { author }),
    userUpdated: (author) => emit(exports.EventType.USER_UPDATED, { author }),
    // Ranks / Perks
    rankUp: (author, rankId) =>
      emit(exports.EventType.RANK_UP, {
        author,
        targetId: rankId,
        targetType: exports.TargetType.RANK,
      }),
    perkClaimed: (author, perkId) =>
      emit(exports.EventType.PERK_CLAIM, {
        author,
        targetId: perkId,
        targetType: exports.TargetType.PERK,
      }),
    // Balances
    xpGained: (author, amount) =>
      emit(exports.EventType.XP_GAINED, {
        author,
        amount,
        currency: exports.Currency.XP,
      }),
    xpBurned: (author, amount) =>
      emit(exports.EventType.XP_BURNED, {
        author,
        amount,
        currency: exports.Currency.XP,
      }),
    mmcTransfer: (author, amount) =>
      emit(exports.EventType.MMC_TRANSFER, {
        author,
        amount,
        currency: exports.Currency.MMC,
      }),
  };
};
exports.activity = activity;
//# sourceMappingURL=activity.js.map
