export * from './generated/prisma';
export type { Prisma as Repo } from './generated/prisma';
import { withAccelerate } from '@prisma/extension-accelerate';
import { PrismaClient } from './generated/prisma';

export const Prisma = (): any => {
  return new PrismaClient().$extends(withAccelerate());
};
