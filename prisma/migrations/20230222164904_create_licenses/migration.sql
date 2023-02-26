-- CreateTable
CREATE TABLE "License" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "planName" TEXT NOT NULL,
    "userLimit" INTEGER NOT NULL,
    "areaLimit" INTEGER NOT NULL,
    "pricePerUser" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "company_id" TEXT NOT NULL,

    CONSTRAINT "License_pkey" PRIMARY KEY ("id")
);
