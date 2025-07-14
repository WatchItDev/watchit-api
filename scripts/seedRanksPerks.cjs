// IGNORE THIS SCRIPT
const { db, batchWrite } = require('./_init.cjs')
const now = Date.now()

/* ───────────────────────── helpers ────────────────────────────── */
const preview = r => ({
    ADD_XP : `+${r.amount ?? 0} XP`,
    ADD_MMC: `+${r.amount ?? 0} MMC`,
    MINT_NFT: `NFT #${r.tokenId ?? ''}`,
}[r.action] ?? '')

const perk = cfg => ({
    id      : cfg.id,
    name    : cfg.name,
    uiHint  : cfg.uiHint ?? '',
    category: cfg.category,
    minRankId   : cfg.minRankId,
    unlockRule  : cfg.unlockRule,
    executionRule: cfg.executionRule,
    cooldownRemaining: cfg.cooldownRemaining ?? 0,
    reward       : cfg.reward,
    rewardPreview: cfg.rewardPreview ?? preview(cfg.reward),
    enabled      : true,
    createdAt: now,
    updatedAt: now,
})

const xpDrip = (id, name, action, amt, cdSec, hint, min='watcher') =>
    perk({
        id, name, uiHint: hint,
        category:'GAMIFICATION', minRankId:min,
        unlockRule:{ on:'ACTION', action },
        executionRule:{ type:'ON_COOLDOWN', cooldownSec:cdSec },
        reward:{ action:'ADD_XP', amount:amt },
    })

/* ───────────────────────────── 1 · RANKS ──────────────────────── */
const ranksRaw = [
    ['watcher','Watcher','water',0],
    ['fan','Fan','fire',150],
    ['engager','Engager','wind',500],
    ['supporter','Supporter','amethyst',1200],
    ['spotlighter','Spotlighter','ruby',2500],
    ['scout','Scout','topaz',5000],
    ['storykeeper','Storykeeper','silver',13000],
    ['guardian','Guardian','gold',20000],
]

const ranks = ranksRaw.map(([id,name,theme,xp],i)=>({
    id,name,
    badgeUrl:`https://cdn.watchit/badges/${theme}.png`,
    colorTheme:theme,
    minXp:xp,
    order:i+1,
    createdAt:now,
    updatedAt:now,
}))

/* ───────────────────────────── 2 · PERKS ──────────────────────── */
/* 2-A · rank-up (cosméticos)  */
const rankPerks = ranks.map(r => perk({
    id : `rankup-${r.id}`,
    name : r.id==='watcher'
        ? 'Welcome watcher – Bonus 50 XP'
        : `Welcome to ${r.name}`,
    uiHint : r.id==='watcher'? '+50 XP':'New badge unlocked',
    category:'GAMIFICATION',
    minRankId:r.id,
    unlockRule:{ on:'RANK_UP', rankId:r.id },
    executionRule:{ type:'IMMEDIATE' },
    reward:{ action:'ADD_XP', amount:r.id==='watcher'?50:0 },
}))

/* 2-B · Bonus 50 MMC al crear la cuenta (Watcher) */
const watcherMmcPerk = perk({
    id:'rankup-watcher-mmc',
    name:'Welcome watcher – 50 MMC',
    category:'ECONOMY',
    minRankId:'watcher',
    unlockRule:{ on:'RANK_UP', rankId:'watcher' },
    executionRule:{ type:'IMMEDIATE' },
    reward:{ action:'ADD_MMC', amount:50 },
    uiHint:'+50 MMC',
})

/* 2-C · Boosts iniciales para Watcher (5) */
const watcherBoosts = [
    perk({
        id:'first-like-given',
        name:'First like given',
        category:'GAMIFICATION',  minRankId:'watcher',
        unlockRule:{ on:'ACTION', action:'LIKE_CREATED' },
        executionRule:{ type:'ON_CLAIM' },
        reward:{ action:'ADD_XP', amount:2 },
        uiHint:'+2 XP',
    }),
    perk({
        id:'first-comment-posted',
        name:'First comment',
        category:'GAMIFICATION',  minRankId:'watcher',
        unlockRule:{ on:'ACTION', action:'COMMENT_CREATED' },
        executionRule:{ type:'ON_CLAIM' },
        reward:{ action:'ADD_XP', amount:5 },
        uiHint:'+5 XP',
    }),
    perk({
        id:'bookmark-first-post',
        name:'First bookmark',
        category:'GAMIFICATION',  minRankId:'watcher',
        unlockRule:{ on:'ACTION', action:'BOOKMARK_CREATED' },
        executionRule:{ type:'ON_CLAIM' },
        reward:{ action:'ADD_XP', amount:3 },
        uiHint:'+3 XP',
    }),
    perk({
        id:'follow-first-user',
        name:'First follow',
        category:'GAMIFICATION',  minRankId:'watcher',
        unlockRule:{ on:'ACTION', action:'FOLLOW_CREATED' },
        executionRule:{ type:'ON_CLAIM' },
        reward:{ action:'ADD_XP', amount:3 },
        uiHint:'+3 XP',
    }),
    perk({
        id:'watch-5-videos',
        name:'Watch 5 full videos',
        category:'GAMIFICATION',  minRankId:'watcher',
        unlockRule:{
            on:'ACTION_COUNT',
            action:'VIDEO_WATCH_FULL',
            times:5, window:'∞',
        },
        executionRule:{ type:'ON_CLAIM' },
        reward:{ action:'ADD_XP', amount:10 },
        uiHint:'+10 XP',
    }),
]

/* 2-D · Perks “históricos” (24) – actualizados a los nuevos action-types */
const previousPerks = [
    /* Profile completed */
    perk({
        id:'profile-complete',
        name:'Profile completed',
        category:'GAMIFICATION',  minRankId:'watcher',
        unlockRule:{ on:'ACTION', action:'PROFILE_COMPLETED' },
        executionRule:{ type:'ON_CLAIM' },
        reward:{ action:'ADD_XP', amount:20 },
        uiHint:'+20 XP',
    }),

    /* First full video */
    perk({
        id:'first-full-video',
        name:'First full video',
        category:'GAMIFICATION',  minRankId:'watcher',
        unlockRule:{ on:'ACTION', action:'VIDEO_WATCH_FULL' },
        executionRule:{ type:'ON_CLAIM' },
        reward:{ action:'ADD_XP', amount:10 },
        uiHint:'+10 XP',
    }),

    /* Daily login (24 h) */
    xpDrip('daily-login','Daily login','DAILY_LOGIN',5,24*3600,'+5 XP / day'),

    /* +1 XP por like recibido en comentario */
    perk({
        id:'comment-like-received',
        name:'+1 XP per like',
        category:'GAMIFICATION',  minRankId:'watcher',
        unlockRule:{
            on:'ACTION_COUNT',
            action:'COMMENT_LIKE_RECEIVED',
            times:1, window:'∞',
        },
        executionRule:{ type:'ON_COOLDOWN', cooldownSec:0 },
        reward:{ action:'ADD_XP', amount:1 },
    }),

    /* 100 seguidores  → 20 MMC */
    perk({
        id:'followers-100',
        name:'100 Followers!',
        category:'ECONOMY',   minRankId:'fan',
        unlockRule:{
            on:'ACTION_COUNT',
            action:'FOLLOW_CREATED',
            times:100, window:'∞',
        },
        executionRule:{ type:'IMMEDIATE' },
        reward:{ action:'ADD_MMC', amount:20 },
        uiHint:'+20 MMC',
    }),

    /* Trivia perfect run */
    perk({
        id:'trivia-perfect',
        name:'Trivia Master',
        category:'GAMIFICATION',  minRankId:'engager',
        unlockRule:{ on:'ACTION', action:'TRIVIA_PERFECT' },
        executionRule:{ type:'IMMEDIATE' },
        reward:{ action:'ADD_XP', amount:30 },
        uiHint:'+30 XP',
    }),

    /* Guess-movie first win */
    perk({
        id:'guessmovie-first-win',
        name:'First Movie Guessed',
        category:'ECONOMY',   minRankId:'engager',
        unlockRule:{ on:'ACTION', action:'GUESS_MOVIE_WIN' },
        executionRule:{ type:'IMMEDIATE' },
        reward:{ action:'ADD_MMC', amount:5 },
        uiHint:'+5 MMC',
    }),

    /* Creator mode (Scout) */
    perk({
        id:'creator-mode',
        name:'Creator mode',
        category:'ACCESS',   minRankId:'scout',
        unlockRule:{ on:'RANK_UP', rankId:'scout' },
        executionRule:{ type:'IMMEDIATE' },
        reward:{ action:'ADD_XP', amount:0 },
        uiHint:'New posting tools',
    }),

    /* Wheel consolation */
    perk({
        id:'wheel-consolation',
        name:'Wheel Consolation',
        category:'GAMIFICATION',  minRankId:'watcher',
        unlockRule:{ on:'ACTION', action:'WHEEL_SPIN_LOSE' },
        executionRule:{ type:'ON_COOLDOWN', cooldownSec:1_200 },
        reward:{ action:'ADD_XP', amount:1 },
        uiHint:'+1 XP',
    }),

    /* Referral bonus */
    perk({
        id:'refer-friend',
        name:'Refer a friend',
        category:'ECONOMY',   minRankId:'watcher',
        unlockRule:{ on:'ACTION', action:'FRIEND_REFERRED' },
        executionRule:{ type:'IMMEDIATE' },
        reward:{ action:'ADD_MMC', amount:10 },
        uiHint:'+10 MMC',
    }),

    /* 10 bookmarks (recursivo, 1 h cd) */
    perk({
        id:'bookmark-10',
        name:'10 Bookmarks',
        category:'GAMIFICATION',  minRankId:'fan',
        unlockRule:{
            on:'ACTION_COUNT',
            action:'BOOKMARK_CREATED',
            times:10, window:'∞',
        },
        executionRule:{ type:'ON_COOLDOWN', cooldownSec:3_600 },
        reward:{ action:'ADD_XP', amount:8 },
        uiHint:'+8 XP',
    }),

    /* Live-stream access (Guardian) */
    perk({
        id:'livestream-access',
        name:'Live-stream Access',
        category:'ACCESS',   minRankId:'guardian',
        unlockRule:{ on:'RANK_UP', rankId:'guardian' },
        executionRule:{ type:'IMMEDIATE' },
        reward:{ action:'ADD_XP', amount:0 },
        uiHint:'Join live events',
    }),

    /* XP burn voucher */
    perk({
        id:'xp-burn-1k',
        name:'Convert 1 000 XP → 50 MMC',
        category:'ECONOMY',   minRankId:'supporter',
        unlockRule:{ on:'ACTION', action:'XP_BURN_1000' },
        executionRule:{ type:'IMMEDIATE' },
        reward:{ action:'ADD_MMC', amount:50 },
        uiHint:'+50 MMC',
    }),

    /* 7-day watch streak */
    perk({
        id:'watch-streak-7',
        name:'7-Day Watching Streak',
        category:'GAMIFICATION',  minRankId:'engager',
        unlockRule:{
            on:'ACTION_COUNT',
            action:'VIDEO_WATCH_FULL',
            times:7, window:'7d',
        },
        executionRule:{ type:'IMMEDIATE' },
        reward:{ action:'ADD_XP', amount:25 },
        uiHint:'+25 XP',
    }),

    /* Creator first post */
    perk({
        id:'creator-first-post',
        name:'First Post Published',
        category:'GAMIFICATION',  minRankId:'scout',
        unlockRule:{ on:'ACTION', action:'POST_CREATED' },
        executionRule:{ type:'IMMEDIATE' },
        reward:{ action:'ADD_XP', amount:15 },
        uiHint:'+15 XP',
    }),

    /* Wheel jackpot */
    perk({
        id:'wheel-jackpot',
        name:'Wheel Jackpot!',
        category:'ECONOMY',   minRankId:'watcher',
        unlockRule:{ on:'ACTION', action:'WHEEL_JACKPOT' },
        executionRule:{ type:'IMMEDIATE' },
        reward:{ action:'ADD_MMC', amount:100 },
        uiHint:'+100 MMC',
    }),

    /* VIP chat (7 daily-login) */
    perk({
        id:'vip-chat-access',
        name:'VIP Chat Access',
        category:'ACCESS',   minRankId:'fan',
        unlockRule:{
            on:'ACTION_COUNT',
            action:'DAILY_LOGIN',
            times:7, window:'∞',
        },
        executionRule:{ type:'IMMEDIATE' },
        reward:{ action:'ADD_XP', amount:0 },
        uiHint:'VIP Chat unlocked',
    }),
]

/* ───────────────────────── 3 · UNION FINAL ───────────────────── */
const perks = [
    ...previousPerks,
    ...rankPerks,
    watcherMmcPerk,
    ...watcherBoosts,
]

/* ──────────────────────── 4 · BATCH WRITE ────────────────────── */
console.log(`→ Seeding ${ranks.length} ranks & ${perks.length} perks…`)
;(async () => {
    const docs = [
        ...ranks.map(r => ({ ref: db.collection('ranks').doc(r.id),  data:r })),
        ...perks.map(p => ({ ref: db.collection('perks').doc(p.id), data:p })),
    ]
    await batchWrite(docs)
    console.log('✅  Seed finished – Firestore is ready.')
    process.exit(0)
})()
