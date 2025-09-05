import type { Post, CreatePostInput } from '@/schema/types';

export function defaultPostData(): Omit<
  Post,
  | 'id'
  | 'author'
  | 'title'
  | 'description'
  | 'cid'
  | 'media'
  | 'visibility'
  | 'createdAt'
  | 'updatedAt'
  | 'year'
> {
  return {
    commentCount: 0,
    likeCount: 0,
    bookmarkCount: 0,
    viewCount: 0,
    hidden: false,
  };
}

export function makeNewPost(
  id: string,
  address: string,
  input: CreatePostInput,
): Post {
  const now = Date.now();

  return {
    id,
    author: { address: address } as any,
    title: input.title,
    description: input.description,
    cid: input.cid,
    year: 0,
    media:
      input.media?.map((m) => ({
        id: m.cid,
        cid: m.cid,
        title: m.title,
        url: m.url,
        type: m.type,
      })) ?? [],
    visibility: input.visibility,

    ...defaultPostData(),

    createdAt: now,
    updatedAt: now,
  };
}
