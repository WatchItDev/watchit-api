export interface UnlockedPerk {
  id: string;
  user: string;
  perkId: string;
  status: 'LOCKED' | 'AVAILABLE' | 'CLAIMED';
  progress: number;
  target: number;
  availableAt: number;
  collectedAt: number | null;
  cooldownSec: number;
  createdAt: number;
  seen: string[];
}

export function makeUnlockedPerk(p: {
  user: string;
  perkId: string;
  progress: number;
  target: number;
  status: 'LOCKED' | 'AVAILABLE' | 'CLAIMED';
  availableAt: number;
  cooldownSec: number;
}): UnlockedPerk {
  const now = Date.now();
  return {
    id: `${p.user}-${p.perkId}`,
    createdAt: now,
    ...p,
    collectedAt: null,
    seen: [],
  };
}
