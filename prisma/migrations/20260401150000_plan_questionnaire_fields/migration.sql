-- AlterTable
ALTER TABLE "PlanSelection" ADD COLUMN     "memberPartyRole" TEXT,
ADD COLUMN     "memberEmployerName" TEXT,
ADD COLUMN     "joinderJoinedInCase" BOOLEAN NOT NULL DEFAULT false;

