export * from './generated/prisma/';
export type { Prisma as Repo } from './generated/prisma/';
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient, Prisma as Repo } from './generated/prisma/';

export type PostContent = Repo.PostGetPayload<{ include: { base: true } }>;
export type CommentContent = Repo.CommentGetPayload<{ include: { base: true } }>;
export type UserProfile = Repo.UserGetPayload<{ include: { profile: true } }>;

export const Prisma = (): any => {
  return new PrismaClient().$extends(withAccelerate());
};
