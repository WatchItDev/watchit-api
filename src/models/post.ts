import type { Post, CreatePostInput } from '@/schema/types'


export function defaultPostData(): Omit<
    Post,
    | 'id'
    | 'author'
    | 'content'
    | 'title'
    | 'description'
    | 'cid'
    | 'media'
    | 'visibility'
    | 'replyTo'
    | 'quoteOf'
    | 'createdAt'
    | 'updatedAt'
> {
    return {
        commentCount:   0,
        likeCount:      0,
        bookmarkCount:  0,
        viewCount:      0,
    }
}

export function makeNewPost(
    id: string,
    authorAddress: string,
    input: CreatePostInput
): Post {
    const now = Date.now()

    return {
        id,
        author: { address: authorAddress } as any,
        content:    input?.content ?? '',
        title:      input.title,
        description:      input.description,
        cid:      input.cid,
        media:      input.media?.map((m) => ({
            id:   m.cid,
            cid:  m.cid,
            title:  m.title,
            url:  m.url,
            type: m.type,
        })) ?? [],
        visibility: input.visibility,
        replyTo:    input.replyTo
            ? ({ id: input.replyTo } as any)
            : null,
        quoteOf:    input.quoteOf
            ? ({ id: input.quoteOf } as any)
            : null,

        ...defaultPostData(),

        createdAt: now,
        updatedAt: now,
    }
}
