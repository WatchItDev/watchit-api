-- CreateIndex
CREATE INDEX "Transaction_userId_idx" ON "Transaction"("userId");

-- CreateIndex
CREATE INDEX "Transaction_currency_idx" ON "Transaction"("currency");

-- CreateIndex
CREATE INDEX "Transaction_type_idx" ON "Transaction"("type");
