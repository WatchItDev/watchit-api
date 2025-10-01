/*
  Warnings:

  - You are about to drop the `Attachments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reactions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Relation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transactions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Attachments" DROP CONSTRAINT "Attachments_postId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reactions" DROP CONSTRAINT "Reactions_contentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reactions" DROP CONSTRAINT "Reactions_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Relation" DROP CONSTRAINT "Relation_fromUserId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Relation" DROP CONSTRAINT "Relation_toUserId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Transactions" DROP CONSTRAINT "Transactions_userId_fkey";

-- DropTable
DROP TABLE "public"."Attachments";

-- DropTable
DROP TABLE "public"."Reactions";

-- DropTable
DROP TABLE "public"."Relation";

-- DropTable
DROP TABLE "public"."Transactions";

-- CreateTable
CREATE TABLE "Edge" (
    "fromUserId" INTEGER NOT NULL,
    "toUserId" INTEGER NOT NULL,
    "state" "RelationState" NOT NULL DEFAULT 'NONE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "preferences" JSONB,

    CONSTRAINT "Edge_pkey" PRIMARY KEY ("fromUserId","toUserId")
);

-- CreateTable
CREATE TABLE "Attachment" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "cid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reaction" (
    "id" SERIAL NOT NULL,
    "kind" "ReactionType" NOT NULL DEFAULT 'LIKE',
    "userId" INTEGER NOT NULL,
    "contentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" "TxType" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Edge_state_idx" ON "Edge"("state");

-- CreateIndex
CREATE INDEX "Edge_toUserId_state_idx" ON "Edge"("toUserId", "state");

-- CreateIndex
CREATE INDEX "Edge_fromUserId_state_idx" ON "Edge"("fromUserId", "state");

-- CreateIndex
CREATE UNIQUE INDEX "Attachment_cid_key" ON "Attachment"("cid");

-- CreateIndex
CREATE INDEX "Attachment_cid_idx" ON "Attachment"("cid");

-- CreateIndex
CREATE INDEX "Attachment_postId_idx" ON "Attachment"("postId");

-- CreateIndex
CREATE INDEX "Reaction_contentId_idx" ON "Reaction"("contentId");

-- CreateIndex
CREATE INDEX "Reaction_userId_idx" ON "Reaction"("userId");

-- CreateIndex
CREATE INDEX "Reaction_kind_idx" ON "Reaction"("kind");

-- CreateIndex
CREATE UNIQUE INDEX "Reaction_userId_contentId_key" ON "Reaction"("userId", "contentId");

-- CreateIndex
CREATE INDEX "Comment_postId_idx" ON "Comment"("postId");

-- CreateIndex
CREATE INDEX "Comment_contentId_idx" ON "Comment"("contentId");

-- CreateIndex
CREATE INDEX "Comment_parentId_idx" ON "Comment"("parentId");

-- CreateIndex
CREATE INDEX "Content_userId_idx" ON "Content"("userId");

-- CreateIndex
CREATE INDEX "Post_contentId_idx" ON "Post"("contentId");

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
