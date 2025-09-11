/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `active` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `visibility` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Comment" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "public"."Content" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "tags" JSONB,
ADD COLUMN     "visibility" "public"."Visibility" NOT NULL DEFAULT 'PUBLIC';

-- AlterTable
ALTER TABLE "public"."Post" DROP COLUMN "active",
DROP COLUMN "createdAt",
DROP COLUMN "tags",
DROP COLUMN "visibility";
