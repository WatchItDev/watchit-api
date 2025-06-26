import { onSchedule }   from 'firebase-functions/v2/scheduler';
import { enhanceFunction } from '../../manager';

export const resetCooldowns = onSchedule(
    'every 1 hour',
    enhanceFunction(async ({ services }) => {
        const n = await services.Perks.resetCooldowns();
        console.log(`⏰  Cooldowns reset: ${n}`);
    }),
);
