import {GameConfig} from "@/models/game";
import {randomUUID} from "crypto";

export interface GameSession<TState = any> {
    id:         string;          // uuid
    user:       string;
    gameId:     GameConfig['id'];
    version:    number;
    state:      TState;          // defined by each game
    score:      number;
    pointer:    number;          // index of each question / try
    expiresAt:  number;          // epoch(ms)
    createdAt:  number;
    updatedAt:  number;
}

export function makeGameSession<T>(p: {
    user:string; gameId:GameSession['gameId']; version:number; state:T;
    expiresInSec:number;
}): GameSession<T> {
    const now = Date.now();
    return {
        id: randomUUID(),
        user: p.user,
        gameId: p.gameId,
        version: p.version,
        state: p.state,
        score: 0,
        pointer: 0,
        expiresAt: now + p.expiresInSec * 1000,
        createdAt: now,
        updatedAt: now,
    };
}