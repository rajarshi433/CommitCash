-- CreateEnum
CREATE TYPE "Status" AS ENUM ('WAITING_TO_CLAIM', 'QUEUED_FOR_MONEY_TRANSFER', 'FAILED', 'SUCCESS', 'FAILED_AS_UNCLAIMED_FOR_3_DAYS');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "provider" TEXT NOT NULL,
    "photoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Zaps" (
    "id" TEXT NOT NULL,
    "zapOwnerId" TEXT NOT NULL,
    "bankCred" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "zapName" TEXT NOT NULL,
    "description" TEXT,
    "githubUsername" TEXT NOT NULL,
    "githubId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Zaps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ZapHit" (
    "id" TEXT NOT NULL,
    "zapId" TEXT NOT NULL,
    "zapOwnerId" TEXT NOT NULL,
    "bountyGiverUsername" TEXT NOT NULL,
    "bountyGiverId" INTEGER NOT NULL,
    "bountyReceiverUsername" TEXT NOT NULL,
    "bountyReceiverId" INTEGER NOT NULL,
    "bountyAmount" DOUBLE PRECISION NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'WAITING_TO_CLAIM',
    "commentLink" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ZapHit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhiteList" (
    "id" TEXT NOT NULL,
    "zapId" TEXT NOT NULL,
    "zapOwnerId" TEXT NOT NULL,
    "githubUsername" TEXT[],
    "githubId" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WhiteList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BountyClaims" (
    "id" TEXT NOT NULL,
    "zapId" TEXT NOT NULL,
    "zapHitId" TEXT NOT NULL,
    "githubUsername" TEXT NOT NULL,
    "githubId" INTEGER NOT NULL,
    "bankCreds" TEXT,
    "isSuccess" BOOLEAN NOT NULL DEFAULT false,
    "bountyAmount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BountyClaims_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BountyClaimsOutbox" (
    "id" TEXT NOT NULL,
    "zapId" TEXT NOT NULL,
    "zapHitId" TEXT NOT NULL,
    "githubUsername" TEXT NOT NULL,
    "githubId" INTEGER NOT NULL,
    "bankCreds" TEXT,
    "isSuccess" BOOLEAN NOT NULL DEFAULT false,
    "bountyAmount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BountyClaimsOutbox_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BountyReceives" (
    "id" TEXT NOT NULL,
    "zapId" TEXT NOT NULL,
    "zapHitId" TEXT NOT NULL,
    "bountyClaimId" TEXT NOT NULL,
    "githubUsername" TEXT NOT NULL,
    "githubId" INTEGER NOT NULL,
    "hasReceived" BOOLEAN NOT NULL DEFAULT true,
    "bountyAmt" DOUBLE PRECISION NOT NULL,
    "zapOwnerId" TEXT NOT NULL,
    "commentLink" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BountyReceives_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "WhiteList_zapId_key" ON "WhiteList"("zapId");

-- CreateIndex
CREATE UNIQUE INDEX "BountyClaims_zapHitId_key" ON "BountyClaims"("zapHitId");

-- CreateIndex
CREATE UNIQUE INDEX "BountyClaimsOutbox_zapHitId_key" ON "BountyClaimsOutbox"("zapHitId");

-- CreateIndex
CREATE UNIQUE INDEX "BountyReceives_zapHitId_key" ON "BountyReceives"("zapHitId");

-- CreateIndex
CREATE UNIQUE INDEX "BountyReceives_bountyClaimId_key" ON "BountyReceives"("bountyClaimId");

-- AddForeignKey
ALTER TABLE "Zaps" ADD CONSTRAINT "Zaps_zapOwnerId_fkey" FOREIGN KEY ("zapOwnerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ZapHit" ADD CONSTRAINT "ZapHit_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Zaps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhiteList" ADD CONSTRAINT "WhiteList_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Zaps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BountyClaims" ADD CONSTRAINT "BountyClaims_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Zaps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BountyClaims" ADD CONSTRAINT "BountyClaims_zapHitId_fkey" FOREIGN KEY ("zapHitId") REFERENCES "ZapHit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BountyClaimsOutbox" ADD CONSTRAINT "BountyClaimsOutbox_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Zaps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BountyClaimsOutbox" ADD CONSTRAINT "BountyClaimsOutbox_zapHitId_fkey" FOREIGN KEY ("zapHitId") REFERENCES "ZapHit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BountyReceives" ADD CONSTRAINT "BountyReceives_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Zaps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BountyReceives" ADD CONSTRAINT "BountyReceives_zapHitId_fkey" FOREIGN KEY ("zapHitId") REFERENCES "ZapHit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BountyReceives" ADD CONSTRAINT "BountyReceives_bountyClaimId_fkey" FOREIGN KEY ("bountyClaimId") REFERENCES "BountyClaims"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
