-- CreateTable
CREATE TABLE "AltPayeeBeneficiary" (
    "id" TEXT NOT NULL,
    "matterId" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "fullName" TEXT NOT NULL,
    "relationship" TEXT,
    "address1" TEXT,
    "address2" TEXT,

    CONSTRAINT "AltPayeeBeneficiary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AltPayeeBeneficiary_matterId_idx" ON "AltPayeeBeneficiary"("matterId");

-- AddForeignKey
ALTER TABLE "AltPayeeBeneficiary" ADD CONSTRAINT "AltPayeeBeneficiary_matterId_fkey" FOREIGN KEY ("matterId") REFERENCES "Matter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
