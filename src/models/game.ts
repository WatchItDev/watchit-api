// src/models/game.ts
export interface WheelReward { id:string; label:string; emoji:string; weight:number; reward:any }

export interface TriviaQuestion {
    id:string; text:string; options:string[]; correctIndex:number; image?:string;
}

export interface GuessMovieItem {
    blurUrl:string; options:string[]; correct:number;
}

export interface GameConfig {
    id:              'DAILY_WHEEL'|'TRIVIA'|'GUESS_MOVIE';
    version:         number;
    cooldownSec:     number;
    lockedUntilRank: string;
    /* assets */
    rewardPool?: WheelReward[];
    triviaBank?: Record<'1'|'2'|'3', TriviaQuestion[]>;
    guessBank?: GuessMovieItem[];
}
