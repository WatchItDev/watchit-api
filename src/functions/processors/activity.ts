import { makeNewLog } from '../../models/log'
import type {Ctx} from "../manager";

export const activityLogger = ({ ds }: Pick<Ctx,'ds'>) => {
    const emit = async (type: string, payload: Partial<ReturnType<typeof makeNewLog>>) => {
        const rec = makeNewLog({ type, ...payload })
        await ds.Logs.logEvent(rec.author ?? '', rec)
    }

    return {
        emit,

        likeCreated     : (a:string,p:string,t:string,meta={})=>emit('LIKE_CREATED',     {author:a,targetId:p,targetType: t,meta}),
        likeRemoved     : (a:string,p:string,t:string)=>emit('LIKE_REMOVED',     {author:a,targetId:p,targetType: t}),
        bookmarkCreated : (a:string,p:string,meta={})=>emit('BOOKMARK_CREATED', {author:a,targetId:p,targetType:'POST',meta}),
        bookmarkRemoved : (a:string,p:string)=>emit('BOOKMARK_REMOVED', {author:a,targetId:p,targetType:'POST'}),
        followCreated   : (a:string,t:string,meta={})=>emit('FOLLOW_CREATED',   {author:a,targetId:t,targetType:'USER',meta}),
        followRemoved   : (a:string,t:string)=>emit('FOLLOW_REMOVED',   {author:a,targetId:t,targetType:'USER'}),

        postCreated     : (a:string,p:string)=>emit('POST_CREATED',     {author:a,targetId:p,targetType:'POST'}),
        postUpdated     : (a:string,p:string)=>emit('POST_UPDATED',     {author:a,targetId:p,targetType:'POST'}),
        postHidden      : (a:string,p:string)=>emit('POST_HIDDEN',      {author:a,targetId:p,targetType:'POST'}),

        commentCreated  : (a:string,c:string)=>emit('COMMENT_CREATED',  {author:a,targetId:c,targetType:'COMMENT'}),
        commentUpdated  : (a:string,c:string)=>emit('COMMENT_UPDATED',  {author:a,targetId:c,targetType:'COMMENT'}),
        commentHidden   : (a:string,c:string)=>emit('COMMENT_HIDDEN',   {author:a,targetId:c,targetType:'COMMENT'}),

        userRegistered  : (a:string)=>emit('USER_REGISTERED',{author:a}),
        userUpdated     : (a:string)=>emit('USER_UPDATED',  {author:a}),
        rankUp          : (a:string,r:string)=>emit('RANK_UP',{author:a,targetId:r,targetType:'RANK'}),
        perkClaimed     : (a:string,p:string)=>emit('PERK_CLAIM',{author:a,targetId:p,targetType:'PERK'}),
        xpGained        : (a:string,amt:number)=>emit('XP_GAINED', {author:a,amount:amt,currency:'XP'}),
        xpBurned        : (a:string,amt:number)=>emit('XP_BURNED', {author:a,amount:amt,currency:'XP'}),
        mmcTransfer     : (a:string,amt:number)=>emit('MMC_TRANSFER',{author:a,amount:amt,currency:'MMC'}),
    }
}
