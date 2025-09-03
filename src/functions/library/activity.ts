// activityLogger.ts
import { makeNewLog } from "../../models/log";
import type { Ctx } from "../manager";

// ---------- String enums "zero-cost" ----------
export const EventType = {
  LIKE_CREATED: "LIKE_CREATED",
  LIKE_REMOVED: "LIKE_REMOVED",
  BOOKMARK_CREATED: "BOOKMARK_CREATED",
  BOOKMARK_REMOVED: "BOOKMARK_REMOVED",
  FOLLOW_CREATED: "FOLLOW_CREATED",
  FOLLOW_REMOVED: "FOLLOW_REMOVED",
  POST_CREATED: "POST_CREATED",
  POST_UPDATED: "POST_UPDATED",
  POST_HIDDEN: "POST_HIDDEN",
  COMMENT_CREATED: "COMMENT_CREATED",
  COMMENT_UPDATED: "COMMENT_UPDATED",
  COMMENT_HIDDEN: "COMMENT_HIDDEN",
  USER_REGISTERED: "USER_REGISTERED",
  USER_UPDATED: "USER_UPDATED",
  RANK_UP: "RANK_UP",
  PERK_CLAIM: "PERK_CLAIM",
  XP_GAINED: "XP_GAINED",
  XP_BURNED: "XP_BURNED",
  MMC_TRANSFER: "MMC_TRANSFER",
} as const;

export const TargetType = {
  POST: "POST",
  COMMENT: "COMMENT",
  USER: "USER",
  RANK: "RANK",
  PERK: "PERK",
} as const;

export const Currency = {
  XP: "XP",
  MMC: "MMC",
} as const;

type Meta = Record<string, unknown>;
export type TargetType = (typeof TargetType)[keyof typeof TargetType];
export type EventType = (typeof EventType)[keyof typeof EventType];
export type Currency = (typeof Currency)[keyof typeof Currency];
export type LogRecord = ReturnType<typeof makeNewLog>;

type EventMap = {
  [EventType.LIKE_CREATED]: {
    author: string;
    targetId: string;
    targetType: TargetType;
    meta?: Meta;
  };
  [EventType.LIKE_REMOVED]: {
    author: string;
    targetId: string;
    targetType: TargetType;
  };

  [EventType.BOOKMARK_CREATED]: {
    author: string;
    targetId: string;
    targetType: typeof TargetType.POST;
    meta?: Meta;
  };
  [EventType.BOOKMARK_REMOVED]: {
    author: string;
    targetId: string;
    targetType: typeof TargetType.POST;
  };

  [EventType.FOLLOW_CREATED]: {
    author: string;
    targetId: string;
    targetType: typeof TargetType.USER;
    meta?: Meta;
  };
  [EventType.FOLLOW_REMOVED]: {
    author: string;
    targetId: string;
    targetType: typeof TargetType.USER;
  };

  [EventType.POST_CREATED]: {
    author: string;
    targetId: string;
    targetType: typeof TargetType.POST;
  };
  [EventType.POST_UPDATED]: {
    author: string;
    targetId: string;
    targetType: typeof TargetType.POST;
  };
  [EventType.POST_HIDDEN]: {
    author: string;
    targetId: string;
    targetType: typeof TargetType.POST;
  };

  [EventType.COMMENT_CREATED]: {
    author: string;
    targetId: string;
    targetType: typeof TargetType.COMMENT;
  };
  [EventType.COMMENT_UPDATED]: {
    author: string;
    targetId: string;
    targetType: typeof TargetType.COMMENT;
  };
  [EventType.COMMENT_HIDDEN]: {
    author: string;
    targetId: string;
    targetType: typeof TargetType.COMMENT;
  };

  [EventType.USER_REGISTERED]: { author: string };
  [EventType.USER_UPDATED]: { author: string };

  [EventType.RANK_UP]: {
    author: string;
    targetId: string;
    targetType: typeof TargetType.RANK;
  };
  [EventType.PERK_CLAIM]: {
    author: string;
    targetId: string;
    targetType: typeof TargetType.PERK;
  };

  [EventType.XP_GAINED]: {
    author: string;
    amount: number;
    currency: typeof Currency.XP;
  };
  [EventType.XP_BURNED]: {
    author: string;
    amount: number;
    currency: typeof Currency.XP;
  };
  [EventType.MMC_TRANSFER]: {
    author: string;
    amount: number;
    currency: typeof Currency.MMC;
  };
};

export const activityLogger = ({ ds }: Pick<Ctx, "ds">) => {
  const emit = async <T extends EventType>(type: T, payload: EventMap[T]) => {
    const author = (payload as any)?.author;
    if (typeof author !== "string" || !author.trim()) {
      throw new Error(`activityLogger.emit(${type}): 'author' required`);
    }

    const rec = makeNewLog({ type, ...payload });
    await ds.Logs.logEvent(rec.author ?? "", rec);
    return rec as LogRecord;
  };

  return {
    emit,

    // Likes
    likeCreated: (
      author: string,
      targetId: string,
      targetType: TargetType,
      meta: Meta = {},
    ) => emit(EventType.LIKE_CREATED, { author, targetId, targetType, meta }),
    likeRemoved: (author: string, targetId: string, targetType: TargetType) =>
      emit(EventType.LIKE_REMOVED, { author, targetId, targetType }),

    // Bookmarks
    bookmarkCreated: (author: string, postId: string, meta: Meta = {}) =>
      emit(EventType.BOOKMARK_CREATED, {
        author,
        targetId: postId,
        targetType: TargetType.POST,
        meta,
      }),
    bookmarkRemoved: (author: string, postId: string) =>
      emit(EventType.BOOKMARK_REMOVED, {
        author,
        targetId: postId,
        targetType: TargetType.POST,
      }),

    // Follows
    followCreated: (author: string, targetUserId: string, meta: Meta = {}) =>
      emit(EventType.FOLLOW_CREATED, {
        author,
        targetId: targetUserId,
        targetType: TargetType.USER,
        meta,
      }),
    followRemoved: (author: string, targetUserId: string) =>
      emit(EventType.FOLLOW_REMOVED, {
        author,
        targetId: targetUserId,
        targetType: TargetType.USER,
      }),

    // Posts
    postCreated: (author: string, postId: string) =>
      emit(EventType.POST_CREATED, {
        author,
        targetId: postId,
        targetType: TargetType.POST,
      }),
    postUpdated: (author: string, postId: string) =>
      emit(EventType.POST_UPDATED, {
        author,
        targetId: postId,
        targetType: TargetType.POST,
      }),
    postHidden: (author: string, postId: string) =>
      emit(EventType.POST_HIDDEN, {
        author,
        targetId: postId,
        targetType: TargetType.POST,
      }),

    // Comments
    commentCreated: (author: string, commentId: string) =>
      emit(EventType.COMMENT_CREATED, {
        author,
        targetId: commentId,
        targetType: TargetType.COMMENT,
      }),
    commentUpdated: (author: string, commentId: string) =>
      emit(EventType.COMMENT_UPDATED, {
        author,
        targetId: commentId,
        targetType: TargetType.COMMENT,
      }),
    commentHidden: (author: string, commentId: string) =>
      emit(EventType.COMMENT_HIDDEN, {
        author,
        targetId: commentId,
        targetType: TargetType.COMMENT,
      }),

    // Users
    userRegistered: (author: string) =>
      emit(EventType.USER_REGISTERED, { author }),
    userUpdated: (author: string) => emit(EventType.USER_UPDATED, { author }),

    // Ranks / Perks
    rankUp: (author: string, rankId: string) =>
      emit(EventType.RANK_UP, {
        author,
        targetId: rankId,
        targetType: TargetType.RANK,
      }),
    perkClaimed: (author: string, perkId: string) =>
      emit(EventType.PERK_CLAIM, {
        author,
        targetId: perkId,
        targetType: TargetType.PERK,
      }),

    // Balances
    xpGained: (author: string, amount: number) =>
      emit(EventType.XP_GAINED, { author, amount, currency: Currency.XP }),
    xpBurned: (author: string, amount: number) =>
      emit(EventType.XP_BURNED, { author, amount, currency: Currency.XP }),
    mmcTransfer: (author: string, amount: number) =>
      emit(EventType.MMC_TRANSFER, { author, amount, currency: Currency.MMC }),
  };
};

export type ActivityLogger = ReturnType<typeof activityLogger>;
