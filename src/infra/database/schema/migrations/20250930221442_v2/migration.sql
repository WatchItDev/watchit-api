/*
  Warnings:

  - You are about to drop the `MediaAttachments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."MediaAttachments" DROP CONSTRAINT "MediaAttachments_postId_fkey";

-- DropTable
DROP TABLE "public"."MediaAttachments";

-- CreateTable
CREATE TABLE "Attachments" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "cid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Attachments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Attachments_cid_key" ON "Attachments"("cid");

-- CreateIndex
CREATE INDEX "Attachments_cid_idx" ON "Attachments"("cid");

-- AddForeignKey
ALTER TABLE "Attachments" ADD CONSTRAINT "Attachments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
