-- AlterTable
ALTER TABLE "Matter" ADD COLUMN     "createdByEmail" TEXT;

-- CreateIndex
CREATE INDEX "Matter_createdByEmail_idx" ON "Matter"("createdByEmail");

