-- CreateTable
CREATE TABLE "ChatKnowledgeEntry" (
    "id" TEXT NOT NULL,
    "questionSample" TEXT NOT NULL,
    "answerText" TEXT NOT NULL,
    "tagsCsv" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "source" TEXT NOT NULL DEFAULT 'superadmin',
    "createdByEmail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatKnowledgeEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ChatKnowledgeEntry_isActive_idx" ON "ChatKnowledgeEntry"("isActive");

-- CreateIndex
CREATE INDEX "ChatKnowledgeEntry_createdAt_idx" ON "ChatKnowledgeEntry"("createdAt");

