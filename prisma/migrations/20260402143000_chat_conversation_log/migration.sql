-- CreateTable
CREATE TABLE "ChatConversationLog" (
    "id" TEXT NOT NULL,
    "userEmail" TEXT,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "blockedByPolicy" BOOLEAN NOT NULL DEFAULT false,
    "usedModel" BOOLEAN NOT NULL DEFAULT false,
    "modelName" TEXT,
    "sourceContext" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatConversationLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ChatConversationLog_createdAt_idx" ON "ChatConversationLog"("createdAt");

-- CreateIndex
CREATE INDEX "ChatConversationLog_blockedByPolicy_idx" ON "ChatConversationLog"("blockedByPolicy");

