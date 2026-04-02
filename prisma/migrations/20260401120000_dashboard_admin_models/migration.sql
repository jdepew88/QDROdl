-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isSuperAdmin" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Matter" ADD COLUMN     "intakeCompletedAt" TIMESTAMP(3),
ADD COLUMN     "workflowStatus" TEXT NOT NULL DEFAULT 'OPEN',
ADD COLUMN     "quotedOrderPrepCents" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "quotedMailingCents" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "quotedFilingCents" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "amountDueCents" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "splitBill" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "petitionerShareCents" INTEGER,
ADD COLUMN     "respondentShareCents" INTEGER,
ADD COLUMN     "petitionerPaidAt" TIMESTAMP(3),
ADD COLUMN     "respondentPaidAt" TIMESTAMP(3),
ADD COLUMN     "planAdminEmail" TEXT,
ADD COLUMN     "notesInternal" TEXT;

-- AlterTable
ALTER TABLE "PlanSelection" ADD COLUMN     "joinderRequired" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "FeeLedgerEntry" (
    "id" TEXT NOT NULL,
    "matterId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "amountCents" INTEGER NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT,

    CONSTRAINT "FeeLedgerEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatterUpload" (
    "id" TEXT NOT NULL,
    "matterId" TEXT NOT NULL,
    "planKey" TEXT,
    "category" TEXT NOT NULL,
    "note" TEXT,
    "fileName" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "uploadedByEmail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MatterUpload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunicationLog" (
    "id" TEXT NOT NULL,
    "matterId" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "channel" TEXT NOT NULL DEFAULT 'email',
    "targetsJson" TEXT NOT NULL,
    "subject" TEXT,
    "bodyPreview" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommunicationLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FeeLedgerEntry_matterId_idx" ON "FeeLedgerEntry"("matterId");

-- CreateIndex
CREATE INDEX "FeeLedgerEntry_recordedAt_idx" ON "FeeLedgerEntry"("recordedAt");

-- CreateIndex
CREATE INDEX "FeeLedgerEntry_category_idx" ON "FeeLedgerEntry"("category");

-- CreateIndex
CREATE INDEX "MatterUpload_matterId_idx" ON "MatterUpload"("matterId");

-- CreateIndex
CREATE INDEX "CommunicationLog_matterId_idx" ON "CommunicationLog"("matterId");

-- AddForeignKey
ALTER TABLE "FeeLedgerEntry" ADD CONSTRAINT "FeeLedgerEntry_matterId_fkey" FOREIGN KEY ("matterId") REFERENCES "Matter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatterUpload" ADD CONSTRAINT "MatterUpload_matterId_fkey" FOREIGN KEY ("matterId") REFERENCES "Matter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunicationLog" ADD CONSTRAINT "CommunicationLog_matterId_fkey" FOREIGN KEY ("matterId") REFERENCES "Matter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
