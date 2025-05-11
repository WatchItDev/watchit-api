import { DataSourceManager } from '../manager'
import type {Comment, CreateCommentInput, UpdateCommentInput} from '../../schema/types'
import { makeNewComment } from '../../models/comment'
import {FieldValue} from "firebase-admin/firestore";

export class CommentsCommands extends DataSourceManager {
    async createComment(
        address: string,
        input: CreateCommentInput
    ): Promise<Comment> {
        const dao    = this.fs<Comment>('comments') as any
        const ref    = dao.ref.doc()
        const id     = ref.id
        const comment = makeNewComment(id, address, input)

        await ref.set({
            address,
            postId:          input.postId,
            parentCommentId: input.parentComment ?? null,
            ...comment,
        })

        return comment
    }

    async updateComment(
        input: UpdateCommentInput
    ): Promise<Comment | null> {
        await this.fs<Comment>('comments').update(input.commentId, {
            content:    input.content,
            updatedAt: Date.now(),
        })

        const raw = await this.fs<Comment>('comments').get(input.commentId)
        return raw
    }

    async hideComment(commentId: string): Promise<void> {
        const dao = this.fs<Comment>('comments') as any;
        await dao.ref.doc(commentId).update({
            hidden: true,
            updatedAt: Date.now(),
        });
    }

    async updateCounterField(
        id: string,
        field: keyof Pick<Comment, 'repliesCount' | 'likeCount'>,
        delta: number
    ): Promise<void> {
        const dao = (this.fs<Comment>('comments') as any).ref
        await dao.doc(id).update({ [field]: FieldValue.increment(delta) })
    }
}
