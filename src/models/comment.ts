import type { Comment, CreateCommentInput } from '@/schema/types'

export function defaultCommentData(): Omit<
    Comment,
    | 'id'
    | 'author'
    | 'post'
    | 'parentComment'
    | 'content'
    | 'createdAt'
    | 'updatedAt'
> {
    return {
        likeCount: 0,
    }
}

export function makeNewComment(
    id: string,
    authorAddress: string,
    input: CreateCommentInput
): Comment {
    const now = Date.now()

    return {
        id,
        author:        { address: authorAddress } as any,
        post:          { id: input.postId }          as any,
        parentComment: input.parentComment
            ? ({ id: input.parentComment } as any)
            : null,
        content:       input.content,
        createdAt:     now,
        updatedAt:     now,

        ...defaultCommentData(),
    }
}
