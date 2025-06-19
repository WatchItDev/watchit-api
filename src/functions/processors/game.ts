import { economy } from './economy';

/**
 * Rewards coming from mini-games.
 */
export const gameEngine = ({ ds, ext }: { ds: any; ext: any }) => {
    const eco = economy({ ds, ext });

    const genericReward = (r: any, addr: string) => {
        switch (r.action) {
            case 'ADD_XP':
                return eco.addXp(addr, r.amount, 'GAME_REWARD');
            case 'ADD_MMC':
                return eco.transferMMC(addr, r.amount);
        }
    };

    return {
        /* Daily wheel --------------------------------------------------------- */
        applyWheelReward: (outcome: any, addr: string) =>
            genericReward(outcome.reward, addr),

        /* Correct answers ----------------------------------------------------- */
        rewardCorrect: (addr: string, xp: number, tag = 'GAME_CORRECT') =>
            eco.addXp(addr, xp, tag),
    };
};
