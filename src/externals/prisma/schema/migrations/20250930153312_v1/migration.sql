-- AlterTable
ALTER TABLE "Relation" ADD COLUMN     "preferences" JSONB,
ALTER COLUMN "state" SET DEFAULT 'NONE';

-- CreateIndex
CREATE INDEX "Relation_state_idx" ON "Relation"("state");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");
