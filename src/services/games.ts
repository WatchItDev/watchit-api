import { ServiceManager }   from './manager';
import type { GameConfig, WheelReward, TriviaQuestion, GuessMovieItem } from '@/models/game';
import crypto               from 'crypto';

const pickWeighted = (pool:WheelReward[])=>{
    const total = pool.reduce((s,p)=>s+p.weight,0);
    let rnd = crypto.randomInt(0,total);
    for(const r of pool){ if((rnd-=r.weight)<0) return r; }
    return pool[0];
};

export class GamesService extends ServiceManager {
    /* helpers */
    listConfigs = () => this.ds.Games.listConfigs();
    getConfig   = (id: GameConfig['id']) => this.ds.Games.getConfig(id);

    private createSession = <T,>(p:{
        user:string; gameId:GameConfig['id']; version:number;
        state:T; expiresInSec:number;
    }) => this.ds.Games.createSession(p);

    /* ---------- DAILY WHEEL ---------- */
    async spinDailyWheel(addr:string){
        const cfg = await this.getConfig('DAILY_WHEEL');
        if(!cfg || !cfg.rewardPool?.length) throw new Error('WHEEL_CFG_MISSING');

        // cooldown
        const recent = await this.ds.Logs.countEvents('WHEEL_SPIN','author',addr);
        if(recent) throw new Error('COOLDOWN_ACTIVE');

        const res = pickWeighted(cfg.rewardPool);

        await this.ds.Logs.logEvent(addr,{
            type:'WHEEL_SPIN',
            targetId: res?.id,
            targetType:'WHEEL_REWARD',
            meta:{ reward: res?.reward }
        });

        return {
            outcomeId:     res?.id,
            label:         res?.label,
            emoji:         res?.emoji,
            rewardApplied: false,
            cooldownUntil: Date.now() + cfg.cooldownSec*1000,
        };
    }

    /* ---------- TRIVIA ---------- */
    async startTrivia(addr:string,diff:1|2|3=1){
        const cfg = await this.getConfig('TRIVIA');
        const bank = cfg?.triviaBank?.[String(diff) as '1'|'2'|'3'];
        if(!bank?.length) throw new Error('TRIVIA_BANK_EMPTY');

        // shuffle & pick 5
        const shuffled = [...bank].sort(()=>Math.random()-0.5);
        const questions = shuffled.slice(0,5).map(q=>({...q, nonce:crypto.randomUUID()}));

        const session = await this.createSession({
            user:addr, gameId:'TRIVIA', version: cfg?.version ?? 0,
            state:{ pointer:0, questions },
            expiresInSec:900,
        });

        const q0 = questions[0];
        return {
            sessionId: session.id,
            questionId: q0?.id,
            text:       q0?.text,
            options:    q0?.options,
            image:      q0?.image,
            nonce:      q0?.nonce,
        };
    }

    async submitTriviaAnswer(addr:string,sid:string,qId:string,idx:number){
        await this.ds.Logs.logEvent(addr,{
            type:'TRIVIA_ANSWER',
            targetId:sid,
            targetType:'TRIVIA_SESSION',
            meta:{ qId, answer:idx }
        });
        // trigger decide correcto e incentivos
        return { correct:false, xpAwarded:0, nextQuestion:null, finished:false };
    }

    /* ---------- GUESS THE MOVIE ---------- */
    async startGuessMovie(addr:string){
        const cfg = await this.getConfig('GUESS_MOVIE');
        const bank = cfg?.guessBank;
        if(!bank?.length) throw new Error('GUESS_BANK_EMPTY');

        const pick = bank[crypto.randomInt(bank.length)];
        const session = await this.createSession({
            user:addr, gameId:'GUESS_MOVIE', version: cfg?.version ?? 0,
            state:{ answer: pick?.correct, attempts:0, max:3 },
            expiresInSec:600,
        });

        return {
            sessionId: session.id,
            imageBlurUrl: pick?.blurUrl,
            options: pick?.options,
            nonce: crypto.randomUUID(),
        };
    }

    async submitGuessMovie(addr:string,sid:string,idx:number){
        await this.ds.Logs.logEvent(addr,{
            type:'GUESS_ATTEMPT',
            targetId:sid,
            targetType:'GUESS_SESSION',
            meta:{ answer:idx }
        });
        return { correct:false, attemptsLeft:0, xpAwarded:0, finished:false };
    }
}
