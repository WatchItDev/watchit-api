export interface UnlockedPerk {
    id:           string;          // `${user}-${perkId}-${createdAt}`
    user:         string;
    perkId:       string;
    availableAt:  number;          // epoch(ms)
    collectedAt?: number|null;
    cooldownSec:  number;
    createdAt:    number;
}

export function makeUnlockedPerk(p: {
    user:string; perkId:string; availableAt:number; cooldownSec:number;
}): UnlockedPerk {
    const now = Date.now();
    return {
        id: `${p.user}-${p.perkId}-${now}`,
        ...p,
        collectedAt: null,
        createdAt:   now,
    };
}