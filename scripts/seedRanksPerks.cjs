const { db, batchWrite } = require('./_init.cjs')
const now = Date.now()

const preview = r => ({
    ADD_XP: `+${r.amount ?? 0} XP`,
    ADD_MMC: `+${r.amount ?? 0} MMC`,
}[r.action] ?? '')

const perk = cfg => ({
    id: cfg.id,
    name: cfg.name,
    uiHint: cfg.uiHint ?? '',
    category: cfg.category ?? 'GAMIFICATION',
    minRankId: cfg.minRankId,
    unlockRule: cfg.unlockRule,
    executionRule: cfg.executionRule ?? { type: 'IMMEDIATE' },
    reward: cfg.reward,
    rewardPreview: cfg.rewardPreview ?? preview(cfg.reward),
    hooks: cfg.hooks ?? [],
    enabled: true,
    createdAt: now,
    updatedAt: now,
})

const ranksConfig = {
    watcher: {
        theme: 'water', minXp: 0,
        perks: [
            /* rank‑up */
            perk({
                id: 'rankup-watcher',
                name: 'Welcome XP Boost',
                minRankId: 'watcher',
                unlockRule: { on: 'RANK_UP', rankId: 'watcher' },
                reward: { action: 'ADD_XP', amount: 50 },
                uiHint: '+50 XP',
            }),
            perk({
                id: 'rankup-watcher-mmc',
                name: 'Welcome MMC Boost',
                category: 'ECONOMY',
                minRankId: 'watcher',
                unlockRule: { on: 'RANK_UP', rankId: 'watcher' },
                reward: { action: 'ADD_MMC', amount: 50 },
                uiHint: '+50 MMC',
            }),

            /* primeras acciones */
            perk({
                id: 'like-1-watcher',
                name: 'First Like',
                minRankId: 'watcher',
                unlockRule: { on: 'ACTION', action: 'LIKE_CREATED' },
                executionRule: { type: 'ON_CLAIM' },
                reward: { action: 'ADD_XP', amount: 2 },
                uiHint: '+2 XP',
            }),
            perk({
                id: 'comment-1-watcher',
                name: 'First Comment',
                minRankId: 'watcher',
                unlockRule: { on: 'ACTION', action: 'COMMENT_CREATED' },
                executionRule: { type: 'ON_CLAIM' },
                reward: { action: 'ADD_XP', amount: 5 },
                uiHint: '+5 XP',
            }),
            perk({
                id: 'bookmark-1-watcher',
                name: 'First Bookmark',
                minRankId: 'watcher',
                unlockRule: { on: 'ACTION', action: 'BOOKMARK_CREATED' },
                executionRule: { type: 'ON_CLAIM' },
                reward: { action: 'ADD_XP', amount: 3 },
                uiHint: '+3 XP',
            }),
            perk({
                id: 'follow-1-watcher',
                name: 'First Follow',
                minRankId: 'watcher',
                unlockRule: { on: 'ACTION', action: 'FOLLOW_CREATED' },
                executionRule: { type: 'ON_CLAIM' },
                reward: { action: 'ADD_XP', amount: 3 },
                uiHint: '+3 XP',
            }),

            /* completar perfil */
            perk({
                id: 'profile-picture',
                name: 'Add Profile Picture',
                minRankId: 'watcher',
                unlockRule: { on: 'ACTION', action: 'PROFILE_PICTURE_ADDED' },
                executionRule: { type: 'ON_CLAIM' },
                reward: { action: 'ADD_XP', amount: 7 },
                uiHint: '+7 XP',
            }),
            perk({
                id: 'social-link',
                name: 'Add Social Link',
                minRankId: 'watcher',
                unlockRule: { on: 'ACTION', action: 'SOCIAL_LINK_ADDED' },
                executionRule: { type: 'ON_CLAIM' },
                reward: { action: 'ADD_XP', amount: 3 },
                uiHint: '+3 XP',
            }),

            /* daily claim */
            // perk({
            //     id: 'daily-claim-xp',
            //     name: 'Daily XP Claim',
            //     minRankId: 'watcher',
            //     unlockRule: { on: 'ALWAYS' },
            //     executionRule: { type: 'ON_COOLDOWN', cooldownSec: 86400 },
            //     reward: { action: 'ADD_XP', amount: 10 },
            //     uiHint: '+10 XP / day',
            // }),
            //
            // /* loop 5 likes */
            // perk({
            //     id:'like-5-loop',
            //     name:'Give 5 likes (∞)',
            //     minRankId:'watcher',
            //     unlockRule:{
            //         on:'ACTION_COUNT',
            //         action:'LIKE_CREATED',
            //         times:5,
            //         window:'∞',
            //         distinctBy:'TARGET',
            //     },
            //     executionRule:{ type:'ON_CLAIM' },
            //     reward:{ action:'ADD_XP', amount:7 },
            //     uiHint:'+7 XP / 5 likes',
            //     hooks:[ { when:'AFTER', type:'RESET_PROGRESS' } ],
            // }),
        ],
    },

    /* =====================  FAN  =================================== */
    fan: {
        theme: 'fire', minXp: 150,
        perks: [
            perk({
                id: 'rankup-fan-mmc',
                name: 'Welcome MMC Bonus',
                category: 'ECONOMY',
                minRankId: 'fan',
                unlockRule: { on: 'RANK_UP', rankId: 'fan' },
                executionRule: { type: 'ON_CLAIM' },
                reward: { action: 'ADD_MMC', amount: 10 },
                uiHint: '+10 MMC',
            }),

            /* visibilidad de rango */
            perk({
                id: 'public-rank',
                name: 'Public Rank Badge',
                category: 'ACCESS',
                minRankId: 'fan',
                unlockRule: { on: 'RANK_UP', rankId: 'fan' },
                executionRule: { type: 'IMMEDIATE' },
                reward: { action: 'ADD_XP', amount: 0 },
                rewardPreview: '',
                uiHint: 'Rank visible on profile',
            }),

            /* video repeatable */
            perk({
                id:'video-1-loop-fan',
                name:'Watch & Repeat',
                minRankId:'fan',
                unlockRule:{ on:'ACTION', action:'VIDEO_95' },
                executionRule:{ type:'ON_CLAIM' },
                reward:{ action:'ADD_XP', amount:10 },
                uiHint:'+10 XP / video',
                hooks:[ { when:'AFTER', type:'RELOCK' } ],
            }),

            /* contadores */
            perk({
                id: 'like-10-fan',
                name: 'Give 10 Likes',
                minRankId: 'fan',
                unlockRule: {
                    on: 'ACTION_COUNT',
                    action: 'LIKE_CREATED',
                    times: 10,
                    window: '∞',
                },
                executionRule: { type: 'ON_CLAIM' },
                reward: { action: 'ADD_XP', amount: 10 },
                uiHint: '+10 XP',
            }),
            perk({
                id: 'bookmark-5-fan',
                name: 'Save 5 Bookmarks',
                minRankId: 'fan',
                unlockRule: {
                    on: 'ACTION_COUNT',
                    action: 'BOOKMARK_CREATED',
                    times: 5,
                    window: '∞',
                    distinctBy: 'TARGET',
                },
                executionRule: { type: 'ON_CLAIM' },
                reward: { action: 'ADD_XP', amount: 8 },
                uiHint: '+8 XP',
            }),
            perk({
                id:'video-20-fan',
                name:'Watch 20 Videos',
                minRankId:'fan',
                unlockRule:{ on:'ACTION_COUNT', action:'VIDEO_95', times:20, window:'∞' },
                executionRule:{ type:'ON_CLAIM' },
                reward:{ action:'ADD_XP', amount:25 },
                uiHint:'+25 XP',
            }),
            perk({
                id: 'follow-5-fan',
                name: 'Follow 5 Profiles',
                minRankId: 'fan',
                unlockRule: {
                    on: 'ACTION_COUNT',
                    action: 'FOLLOW_CREATED',
                    times: 5,
                    window: '∞',
                    distinctBy: 'TARGET',
                },
                executionRule: { type: 'ON_CLAIM' },
                reward: { action: 'ADD_XP', amount: 15 },
                uiHint: '+15 XP',
            }),
        ],
    },

    /* =====================  ENGAGER  =============================== */
    engager: {
        theme: 'wind', minXp: 500,
        perks: [
            perk({
                id: 'rankup-engager-mmc',
                name: 'Welcome MMC Bonus',
                category: 'ECONOMY',
                minRankId: 'engager',
                unlockRule: { on: 'RANK_UP', rankId: 'engager' },
                executionRule: { type: 'ON_CLAIM' },
                reward: { action: 'ADD_MMC', amount: 25 },
                uiHint: '+25 MMC',
            }),

            /* earn XP for likes received */
            perk({
                id: 'incoming-like-engager',
                name: 'Earn XP from Likes Received',
                minRankId: 'engager',
                uiHint: '+1 XP',
                unlockRule: {
                    on: 'ACTION_COUNT',
                    action: 'LIKE_CREATED',
                    times: 10,
                    actor: 'OWNER',
                    distinctBy: 'TARGET',
                },
                executionRule: { type: 'ON_CLAIM' },
                reward: { action: 'ADD_XP', amount: 10 },
                hooks: [{ when: 'AFTER', type: 'RELOCK' }, { when: 'AFTER', type: 'RESET_PROGRESS' }],
            }),

            /* unlock mini‑games */
            perk({
                id: 'minigame-unlock',
                name: 'Unlock Mini-Games',
                category: 'ACCESS',
                minRankId: 'engager',
                unlockRule: { on: 'RANK_UP', rankId: 'engager' },
                executionRule: { type: 'ON_CLAIM' },
                reward: { action: 'ADD_XP', amount: 0 },
                rewardPreview: '',
                uiHint: 'Mini‑games available',
            }),

            perk({
                id:'video-50-engager',
                name:'Watch 50 Videos',
                minRankId:'engager',
                unlockRule:{ on:'ACTION_COUNT', action:'VIDEO_95', times:50, window:'∞' },
                executionRule:{ type:'ON_CLAIM' },
                reward:{ action:'ADD_XP', amount:40 },
                uiHint:'+40 XP',
            }),
            perk({
                id: 'follow-15-engager',
                name: 'Follow 15 Profiles',
                minRankId: 'engager',
                unlockRule: {
                    on: 'ACTION_COUNT',
                    action: 'FOLLOW_CREATED',
                    times: 15,
                    window: '∞',
                    distinctBy: 'TARGET',
                },
                executionRule: { type: 'ON_CLAIM' },
                reward: { action: 'ADD_XP', amount: 25 },
                uiHint: '+25 XP',
            }),
        ],
    },
    supporter: {
        theme: 'amethyst', minXp: 1200,
        perks: [
            perk({
                id: 'rankup-supporter-mmc',
                name: 'Welcome MMC Bonus',
                category: 'ECONOMY',
                minRankId: 'supporter',
                unlockRule: { on: 'RANK_UP', rankId: 'supporter' },
                executionRule: { type: 'ON_CLAIM' },
                reward: { action: 'ADD_MMC', amount: 30 },
                uiHint: '+30 MMC',
            }),
            // TODO agregar perk que permita ganar por hacer referidos
            perk({
                id:'video-100-supporter',
                name:'Watch 100 Videos',
                minRankId:'supporter',
                unlockRule:{ on:'ACTION_COUNT', action:'VIDEO_95', times:100, window:'∞' },
                executionRule:{ type:'ON_CLAIM' },
                reward:{ action:'ADD_XP', amount:75 },
                uiHint:'+75 XP',
            }),
            perk({
                id: 'follow-25-supporter',
                name: 'Follow 25 Profiles',
                minRankId: 'supporter',
                unlockRule: { on: 'ACTION_COUNT', action: 'FOLLOW_CREATED', times: 25, window: '∞' },
                executionRule: { type: 'ON_CLAIM' },
                reward: { action: 'ADD_XP', amount: 30 },
                uiHint: '+30 XP',
            }),
        ],
    },

    spotlighter: {
        theme: 'ruby', minXp: 2500,
        perks: [
            perk({
                id: 'rankup-spotlighter-mmc',
                name: 'Welcome MMC Bonus',
                category: 'ECONOMY',
                minRankId: 'spotlighter',
                unlockRule: { on: 'RANK_UP', rankId: 'spotlighter' },
                executionRule: { type: 'ON_CLAIM' },
                reward: { action: 'ADD_MMC', amount: 35 },
                uiHint: '+35 MMC',
            }),
            perk({
                id:'video-200-spotlighter',
                name:'Watch 200 Videos',
                minRankId:'spotlighter',
                unlockRule:{ on:'ACTION_COUNT', action:'VIDEO_95', times:200, window:'∞' },
                executionRule:{ type:'ON_CLAIM' },
                reward:{ action:'ADD_XP', amount:75 },
                uiHint:'+75 XP',
            }),
            perk({
                id: 'follow-40-spotlighter',
                name: 'Follow 40 Profiles',
                minRankId: 'spotlighter',
                unlockRule: { on: 'ACTION_COUNT', action: 'FOLLOW_CREATED', times: 40, window: '∞' },
                executionRule: { type: 'ON_CLAIM' },
                reward: { action: 'ADD_XP', amount: 19 },
                uiHint: '+19 XP',
            }),
        ],
    },
    scout: {
        theme: 'topaz', minXp: 5000,
        perks: [
            perk({
                id: 'rankup-scout-mmc',
                name: 'Welcome MMC Bonus',
                category: 'ECONOMY',
                minRankId: 'scout',
                unlockRule: { on: 'RANK_UP', rankId: 'scout' },
                executionRule: { type: 'ON_CLAIM' },
                reward: { action: 'ADD_MMC', amount: 40 },
                uiHint: '+40 MMC',
            }),
            perk({
                id:'video-300-scout',
                name:'Watch 300 Videos',
                minRankId:'scout',
                unlockRule:{ on:'ACTION_COUNT', action:'VIDEO_95', times:300, window:'∞' },
                executionRule:{ type:'ON_CLAIM' },
                reward:{ action:'ADD_XP', amount:102 },
                uiHint:'+102 XP',
            }),
            perk({
                id: 'follow-60-scout',
                name: 'Follow 60 Profiles',
                minRankId: 'scout',
                unlockRule: { on: 'ACTION_COUNT', action: 'FOLLOW_CREATED', times: 60, window: '∞' },
                executionRule: { type: 'ON_CLAIM' },
                reward: { action: 'ADD_XP', amount: 28 },
                uiHint: '+28 XP',
            }),
            perk({
                id: 'post-10-scout',
                name: 'Publish 10 Posts',
                minRankId: 'scout',
                unlockRule: { on: 'ACTION_COUNT', action: 'POST_CREATED', times: 10, window: '∞' },
                executionRule: { type: 'ON_CLAIM' },
                reward: { action: 'ADD_XP', amount: 11 },
                uiHint: '+11 XP',
            }),
        ],
    },

    storykeeper: {
        theme: 'silver', minXp: 13000,
        perks: [
            perk({
                id: 'rankup-storykeeper-mmc',
                name: 'Welcome MMC Bonus',
                category: 'ECONOMY',
                minRankId: 'storykeeper',
                unlockRule: { on: 'RANK_UP', rankId: 'storykeeper' },
                executionRule: { type: 'ON_CLAIM' },
                reward: { action: 'ADD_MMC', amount: 45 },
                uiHint: '+45 MMC',
            }),
            perk({
                id:'video-400-storykeeper',
                name:'Watch 400 Videos',
                minRankId:'storykeeper',
                unlockRule:{ on:'ACTION_COUNT', action:'VIDEO_95', times:400, window:'∞' },
                executionRule:{ type:'ON_CLAIM' },
                reward:{ action:'ADD_XP', amount:127 },
                uiHint:'+127 XP',
            }),
            perk({
                id: 'follow-80-storykeeper',
                name: 'Follow 80 Profiles',
                minRankId: 'storykeeper',
                unlockRule: { on: 'ACTION_COUNT', action: 'FOLLOW_CREATED', times: 80, window: '∞' },
                executionRule: { type: 'ON_CLAIM' },
                reward: { action: 'ADD_XP', amount: 35 },
                uiHint: '+35 XP',
            }),
            perk({
                id: 'post-25-storykeeper',
                name: 'Publish 25 Posts',
                minRankId: 'storykeeper',
                unlockRule: { on: 'ACTION_COUNT', action: 'POST_CREATED', times: 25, window: '∞' },
                executionRule: { type: 'ON_CLAIM' },
                reward: { action: 'ADD_XP', amount: 18 },
                uiHint: '+18 XP',
            }),
        ],
    },

    guardian: {
        theme: 'gold', minXp: 20000,
        perks: [
            perk({
                id: 'rankup-guardian-mmc',
                name: 'Welcome MMC Bonus',
                category: 'ECONOMY',
                minRankId: 'guardian',
                unlockRule: { on: 'RANK_UP', rankId: 'guardian' },
                executionRule: { type: 'ON_CLAIM' },
                reward: { action: 'ADD_MMC', amount: 50 },
                uiHint: '+50 MMC',
            }),
            perk({
                id:'video-600-guardian',
                name:'Watch 600 Videos',
                minRankId:'guardian',
                unlockRule:{ on:'ACTION_COUNT', action:'VIDEO_95', times:600, window:'∞' },
                executionRule:{ type:'ON_CLAIM' },
                reward:{ action:'ADD_XP', amount:173 },
                uiHint:'+173 XP',
            }),
            perk({
                id: 'follow-120-guardian',
                name: 'Follow 120 Profiles',
                minRankId: 'guardian',
                unlockRule: { on: 'ACTION_COUNT', action: 'FOLLOW_CREATED', times: 120, window: '∞' },
                executionRule: { type: 'ON_CLAIM' },
                reward: { action: 'ADD_XP', amount: 44 },
                uiHint: '+44 XP',
            }),
        ],
    },
}

const ranks = Object.entries(ranksConfig).map(
    ([id, cfg], order) => ({
        id,
        name: id.replace(/^\w/, c => c.toUpperCase()),
        badgeUrl: `https://cdn.watchit/badges/${cfg.theme}.png`,
        colorTheme: cfg.theme,
        minXp: cfg.minXp,
        order: order + 1,
        createdAt: now,
        updatedAt: now,
    }),
)

const perks = Object.values(ranksConfig).flatMap(cfg => cfg.perks)

console.log(`→ Seeding ${ranks.length} ranks & ${perks.length} perks…`)
    ; (async () => {
        const docs = [
            ...ranks.map(r => ({ ref: db.collection('ranks').doc(r.id), data: r })),
            ...perks.map(p => ({ ref: db.collection('perks').doc(p.id), data: p })),
        ]
        await batchWrite(docs)
        console.log('✅  Seed finished – Firestore is ready.')
        process.exit(0)
    })()
