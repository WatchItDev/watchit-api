import {InputMaybe, Scalars} from "@/schema/types";

export type UnlockRule =
    | { on: 'RANK_UP';        rankId: string }  // it is dispatched when the user reaches a new rank
    | { on: 'ACTION';         action: string }  // unique event
    | { on: 'ACTION_COUNT';   action: string; times: number; window: '24h'|'7d'|'∞' }
    | { on: 'ALWAYS' };

export type ExecutionRule =
    | { type: 'IMMEDIATE' }
    | { type: 'ON_CLAIM' }
    | { type: 'ON_COOLDOWN'; cooldownSec: number };

export type Reward =
    | { action: 'ADD_XP';  amount: number }
    | { action: 'ADD_MMC'; amount: number }
    | { action: 'MINT_NFT'; tokenId: string };

export interface PerkCatalog {
    id:        string;
    name:      string;
    uiHint:    InputMaybe<Scalars['String']['input']>;
    category:  'GAMIFICATION'|'ECONOMY'|'SOCIAL'|'ACCESS';
    unlockRule:   UnlockRule;
    executionRule:ExecutionRule;
    reward:       Reward;
    enabled:   boolean;
}
