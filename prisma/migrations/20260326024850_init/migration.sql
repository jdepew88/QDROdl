-- CreateTable
CREATE TABLE "Matter" (
    "id" TEXT NOT NULL,
    "caseNumber" TEXT NOT NULL,
    "county" TEXT NOT NULL,
    "otherCounty" TEXT,
    "dom" TIMESTAMP(3) NOT NULL,
    "dos" TIMESTAMP(3) NOT NULL,
    "doj" TIMESTAMP(3),
    "concurrentWithJudgment" BOOLEAN NOT NULL DEFAULT false,
    "petitionerId" TEXT NOT NULL,
    "respondentId" TEXT NOT NULL,
    "petitionerIsMember" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Matter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Party" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "address1" TEXT NOT NULL,
    "address2" TEXT,
    "dobEnc" TEXT,
    "ssnEnc" TEXT,
    "spouseType" TEXT,

    CONSTRAINT "Party_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanSelection" (
    "id" TEXT NOT NULL,
    "matterId" TEXT NOT NULL,
    "planKey" TEXT NOT NULL,
    "isInPayStatus" BOOLEAN NOT NULL DEFAULT false,
    "usesTimeRule" BOOLEAN,
    "laceraOption4" BOOLEAN,
    "chosenTemplates" TEXT NOT NULL,

    CONSTRAINT "PlanSelection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttorneyInfo" (
    "id" TEXT NOT NULL,
    "matterId" TEXT NOT NULL,
    "side" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "barNumber" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "address1" TEXT,
    "address2" TEXT,

    CONSTRAINT "AttorneyInfo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Matter" ADD CONSTRAINT "Matter_petitionerId_fkey" FOREIGN KEY ("petitionerId") REFERENCES "Party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Matter" ADD CONSTRAINT "Matter_respondentId_fkey" FOREIGN KEY ("respondentId") REFERENCES "Party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanSelection" ADD CONSTRAINT "PlanSelection_matterId_fkey" FOREIGN KEY ("matterId") REFERENCES "Matter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttorneyInfo" ADD CONSTRAINT "AttorneyInfo_matterId_fkey" FOREIGN KEY ("matterId") REFERENCES "Matter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
