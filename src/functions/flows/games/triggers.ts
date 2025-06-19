import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { enhanceTrigger }    from '../../manager';

export const wheelResult = onDocumentCreated(
    'wheelResults/{id}',
    enhanceTrigger(async ({ game }, e) => {
        const { user, outcome } = e.data!.data();
        await game.applyWheelReward(outcome, user);
    }),
);

export const triviaAnswer = onDocumentCreated(
    'triviaAnswers/{id}',
    enhanceTrigger(async ({ game }, e) => {
        const { user, correct } = e.data!.data();
        if (correct) await game.rewardCorrect(user, 3, 'TRIVIA_CORRECT');
    }),
);

export const guessAttempt = onDocumentCreated(
    'guessAttempts/{id}',
    enhanceTrigger(async ({ game }, e) => {
        const { user, correct, xp } = e.data!.data();
        if (correct) await game.rewardCorrect(user, xp, 'GUESS_CORRECT');
    }),
);
