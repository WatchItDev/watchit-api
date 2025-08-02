import { Perk, PerkInput} from "@/schema/types";

export type Actor       = 'SELF' | 'TARGET' | 'OWNER';
export type DistinctBy  = 'NONE' | 'TARGET' | 'USER';

export type UnlockRule =
    | { on:'RANK_UP';       rankId:string }
    | { on:'ACTION';        action:string; actor?:Actor; distinctBy?:DistinctBy }
    | { on:'ACTION_COUNT';  action:string; times:number; window:'24h'|'7d'|'∞'; actor?:Actor; distinctBy?:DistinctBy }
    | { on:'ALWAYS' };

export type ExecutionRule =
    | { type: 'IMMEDIATE' }
    | { type: 'ON_CLAIM' }
    | { type: 'ON_COOLDOWN'; cooldownSec: number };

export type Reward =
    | { action: 'ADD_XP';  amount: number }
    | { action: 'ADD_MMC'; amount: number }
    | { action: 'MINT_NFT'; tokenId: string };

export type PerkHook =
    | { when:'BEFORE'|'AFTER'; type:'RESET_PROGRESS'|'RELOCK' }
    | { when:'BEFORE'|'AFTER'; type:'CUSTOM'; fnId:string; params?:Record<string,any> };

export function rewardPreviewFrom(reward: Perk['reward']): string {
    switch (reward.action) {
        case 'ADD_XP':  return `+${reward.amount ?? 0} XP`
        case 'ADD_MMC': return `+${reward.amount ?? 0} MMC`
        case 'MINT_NFT':return `NFT #${reward.tokenId ?? ''}`
        default:        return ''
    }
}

export function makePerk(input: PerkInput): Perk {
    const now = Date.now()

    return {
        ...input,
        uiHint        : input.uiHint       ?? '',
        rewardPreview : rewardPreviewFrom(input.reward),
        enabled       : input.enabled      ?? true,
        collectedAt   : null,
        availableAt   : 0,
        cooldownRemaining: 0,
        executionRule: {
            ...input.executionRule,
            cooldownSec: input.executionRule.cooldownSec ?? 0,   // fallback
        },
        createdAt     : now as any,
        updatedAt     : now as any,
        hooks:        input.hooks ?? [],
    } as unknown as Perk
}