/**
 * scripts/seedRanksPerks.cjs  –  Rank + Perk catalog seeder
 * ------------------------------------------------------------------
 *  Ranks : 8  (Watcher → Guardian)
 *  Perks : 24 (17 gameplay/economy + 7 cosmetics rank-up)
 *
 *  node scripts/seedRanksPerks.cjs
 * -----------------------------------------------------------------*/

const { db, batchWrite } = require('./_init.cjs');   // ← tu helper
const now = Date.now();

/* ───────────────────────────── 1 · RANKS ───────────────────────────── */
const ranksRaw = [
    ['watcher',     'Watcher',     'water',    0   ],
    ['fan',         'Fan',         'fire',     150 ],
    ['engager',     'Engager',     'wind',     500 ],
    ['supporter',   'Supporter',   'amethyst', 1200],
    ['spotlighter', 'Spotlighter', 'ruby',     2500],
    ['scout',       'Scout',       'topaz',    5000],
    ['storykeeper', 'Storykeeper', 'silver',   13000],
    ['guardian',    'Guardian',    'gold',     20000],
];

const ranks = ranksRaw.map(([id, name, theme, xp], i) => ({
    id,
    name,
    badgeUrl  : `https://cdn.watchit/badges/${theme}.png`,
    colorTheme: theme,
    minXp     : xp,
    order     : i + 1,
    createdAt : now,
    updatedAt : now,
}));

/* ───────────────────────────── 2 · PERKS ───────────────────────────── */
const perk = (cfg) => ({
    id           : cfg.id,
    name         : cfg.name,
    uiHint       : cfg.uiHint ?? '',
    category     : cfg.category,
    minRankId    : cfg.minRankId,
    unlockRule   : cfg.unlockRule,
    executionRule: cfg.executionRule,
    reward       : cfg.reward,
    enabled      : true,
    createdAt    : now,
    updatedAt    : now,
});

/** Helper: XP drip with cooldown */
const xpDrip = (id, name, action, amount, cooldownSec, uiHint, minRank = 'watcher') =>
    perk({
        id,
        name,
        uiHint,
        category    : 'GAMIFICATION',
        minRankId   : minRank,
        unlockRule  : { on: 'ACTION', action },
        executionRule: { type: 'ON_COOLDOWN', cooldownSec },
        reward      : { action: 'ADD_XP', amount },
    });

/* ── A · Rank-up cosmetics (badge toast – no reward) ───────────────── */
const rankPerks = ranks
    .filter((r) => r.id !== 'watcher')
    .map((r) =>
        perk({
            id           : `rankup-${r.id}`,
            name         : `Welcome to ${r.name}`,
            uiHint       : 'New badge unlocked',
            category     : 'SOCIAL',
            minRankId    : r.id,
            unlockRule   : { on: 'RANK_UP', rankId: r.id },
            executionRule: { type: 'IMMEDIATE' },
            reward       : { action: 'ADD_XP', amount: 0 },
        }),
    );

/* ── B · Gameplay · Economy · Access ───────────────────────────────── */
const perks = [
    /* Profile completion (immediate) */
    perk({
        id          : 'profile-complete',
        name        : 'Profile completed',
        category    : 'GAMIFICATION',
        minRankId   : 'watcher',
        unlockRule  : { on: 'ACTION', action: 'COMPLETE_PROFILE' },
        executionRule: { type: 'IMMEDIATE' },
        reward      : { action: 'ADD_XP', amount: 20 },
        uiHint      : '+20 XP',
    }),

    /* First full-video viewed */
    perk({
        id          : 'first-full-video',
        name        : 'First full video',
        category    : 'GAMIFICATION',
        minRankId   : 'watcher',
        unlockRule  : { on: 'ACTION', action: 'WATCH_FULL_VIDEO' },
        executionRule: { type: 'IMMEDIATE' },
        reward      : { action: 'ADD_XP', amount: 10 },
        uiHint      : '+10 XP',
    }),

    /* Daily login (24 h cooldown) */
    xpDrip(
        'daily-login',
        'Daily login',
        'DAILY_LOGIN',
        5,
        24 * 3600,
        '+5 XP / day',
        'watcher',
    ),

    /* Comment like received – unlimited, no cooldown */
    perk({
        id          : 'comment-like-received',
        name        : '+1 XP per like',
        category    : 'GAMIFICATION',
        minRankId   : 'watcher',
        unlockRule  : {
            on    : 'ACTION_COUNT',
            action: 'COMMENT_LIKE_RECEIVED',
            times : 1,
            window: '∞',
        },
        executionRule: { type: 'ON_COOLDOWN', cooldownSec: 0 },
        reward      : { action: 'ADD_XP', amount: 1 },
    }),

    /* 100 followers milestone – 20 MMC */
    perk({
        id          : 'followers-100',
        name        : '100 Followers!',
        category    : 'ECONOMY',
        minRankId   : 'fan',
        unlockRule  : {
            on    : 'ACTION_COUNT',
            action: 'GAIN_FOLLOWER',
            times : 100,
            window: '∞',
        },
        executionRule: { type: 'IMMEDIATE' },
        reward      : { action: 'ADD_MMC', amount: 20 },
        uiHint      : '+20 MMC',
    }),

    /* Trivia perfect run */
    perk({
        id          : 'trivia-perfect',
        name        : 'Trivia Master',
        category    : 'GAMIFICATION',
        minRankId   : 'engager',
        unlockRule  : { on: 'ACTION', action: 'TRIVIA_PERFECT' },
        executionRule: { type: 'IMMEDIATE' },
        reward      : { action: 'ADD_XP', amount: 30 },
        uiHint      : '+30 XP',
    }),

    /* Guess-movie first win */
    perk({
        id          : 'guessmovie-first-win',
        name        : 'First Movie Guessed',
        category    : 'ECONOMY',
        minRankId   : 'engager',
        unlockRule  : { on: 'ACTION', action: 'GUESS_MOVIE_WIN' },
        executionRule: { type: 'IMMEDIATE' },
        reward      : { action: 'ADD_MMC', amount: 5 },
        uiHint      : '+5 MMC',
    }),

    /* Creator mode access (rank Scout) */
    perk({
        id          : 'creator-mode',
        name        : 'Creator mode',
        category    : 'ACCESS',
        minRankId   : 'scout',
        unlockRule  : { on: 'RANK_UP', rankId: 'scout' },
        executionRule: { type: 'IMMEDIATE' },
        reward      : { action: 'ADD_XP', amount: 0 },
        uiHint      : 'New posting tools',
    }),

    /* Daily Wheel consolation */
    perk({
        id          : 'wheel-consolation',
        name        : 'Wheel Consolation',
        category    : 'GAMIFICATION',
        minRankId   : 'watcher',
        unlockRule  : { on: 'ACTION', action: 'WHEEL_SPIN_LOSE' },
        executionRule: { type: 'ON_COOLDOWN', cooldownSec: 1_200 },
        reward      : { action: 'ADD_XP', amount: 1 },
        uiHint      : '+1 XP',
    }),

    /* Referral bonus */
    perk({
        id          : 'refer-friend',
        name        : 'Refer a friend',
        category    : 'ECONOMY',
        minRankId   : 'watcher',
        unlockRule  : { on: 'ACTION', action: 'FRIEND_REFERRED' },
        executionRule: { type: 'IMMEDIATE' },
        reward      : { action: 'ADD_MMC', amount: 10 },
        uiHint      : '+10 MMC',
    }),

    /* Bookmark 10 posts – recurring, 1 h cooldown */
    perk({
        id          : 'bookmark-10',
        name        : '10 Bookmarks',
        category    : 'GAMIFICATION',
        minRankId   : 'fan',
        unlockRule  : {
            on    : 'ACTION_COUNT',
            action: 'BOOKMARK_CREATED',
            times : 10,
            window: '∞',
        },
        executionRule: { type: 'ON_COOLDOWN', cooldownSec: 3_600 },
        reward      : { action: 'ADD_XP', amount: 8 },
        uiHint      : '+8 XP',
    }),

    /* Live-stream access (rank Guardian) */
    perk({
        id          : 'livestream-access',
        name        : 'Live-stream Access',
        category    : 'ACCESS',
        minRankId   : 'guardian',
        unlockRule  : { on: 'RANK_UP', rankId: 'guardian' },
        executionRule: { type: 'IMMEDIATE' },
        reward      : { action: 'ADD_XP', amount: 0 },
        uiHint      : 'Join live events',
    }),

    /* 1 000 XP burn voucher */
    perk({
        id          : 'xp-burn-1k',
        name        : 'Convert 1 000 XP → 50 MMC',
        category    : 'ECONOMY',
        minRankId   : 'supporter',
        unlockRule  : { on: 'ACTION', action: 'XP_BURN_1000' },
        executionRule: { type: 'IMMEDIATE' },
        reward      : { action: 'ADD_MMC', amount: 50 },
        uiHint      : '+50 MMC',
    }),

    /* Watching streak – 7 days */
    perk({
        id          : 'watch-streak-7',
        name        : '7-Day Watching Streak',
        category    : 'GAMIFICATION',
        minRankId   : 'engager',
        unlockRule  : {
            on    : 'ACTION_COUNT',
            action: 'WATCH_FULL_VIDEO',
            times : 7,
            window: '7d',
        },
        executionRule: { type: 'IMMEDIATE' },
        reward      : { action: 'ADD_XP', amount: 25 },
        uiHint      : '+25 XP',
    }),

    /* Creator first post bonus */
    perk({
        id          : 'creator-first-post',
        name        : 'First Post Published',
        category    : 'GAMIFICATION',
        minRankId   : 'scout',
        unlockRule  : { on: 'ACTION', action: 'FIRST_POST' },
        executionRule: { type: 'IMMEDIATE' },
        reward      : { action: 'ADD_XP', amount: 15 },
        uiHint      : '+15 XP',
    }),

    /* Wheel jackpot */
    perk({
        id          : 'wheel-jackpot',
        name        : 'Wheel Jackpot!',
        category    : 'ECONOMY',
        minRankId   : 'watcher',
        unlockRule  : { on: 'ACTION', action: 'WHEEL_JACKPOT' },
        executionRule: { type: 'IMMEDIATE' },
        reward      : { action: 'ADD_MMC', amount: 100 },
        uiHint      : '+100 MMC',
    }),

    /* Daily login – 7-day streak → VIP chat */
    perk({
        id          : 'vip-chat-access',
        name        : 'VIP Chat Access',
        category    : 'ACCESS',
        minRankId   : 'fan',
        unlockRule  : {
            on    : 'ACTION_COUNT',
            action: 'DAILY_LOGIN',
            times : 7,
            window: '∞',
        },
        executionRule: { type: 'IMMEDIATE' },
        reward      : { action: 'ADD_XP', amount: 0 },
        uiHint      : 'VIP Chat unlocked',
    }),
];

/* Merge cosmetics */
perks.push(...rankPerks);

/* ───────────────────────────── 3 · BATCH WRITE ─────────────────────── */
console.log(`→ Seeding ${ranks.length} ranks & ${perks.length} perks…`);

(async () => {
    const docs = [
        ...ranks.map((r) => ({ ref: db.collection('ranks').doc(r.id), data: r })),
        ...perks.map((p) => ({ ref: db.collection('perksCatalog').doc(p.id), data: p })),
    ];
    await batchWrite(docs);
    console.log('✅  Seed finished – Firestore is ready.');
    process.exit(0);
})();
