-- AlterTable
ALTER TABLE "FeeLedgerEntry" ADD COLUMN "sourceRef" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "FeeLedgerEntry_sourceRef_key" ON "FeeLedgerEntry"("sourceRef");
