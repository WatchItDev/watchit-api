/*
  Warnings:

  - You are about to drop the `Socials` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Socials" DROP CONSTRAINT "Socials_userId_fkey";

-- DropTable
DROP TABLE "public"."Socials";

-- CreateTable
CREATE TABLE "Social" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "platform" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Social_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Social_platform_idx" ON "Social"("platform" ASC);

-- AddForeignKey
ALTER TABLE "Social" ADD CONSTRAINT "Social_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
