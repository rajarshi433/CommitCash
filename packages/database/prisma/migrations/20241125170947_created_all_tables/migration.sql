/*
  Warnings:

  - You are about to drop the column `lastLogin` on the `User` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('WAITING_TO_CLAIM', 'QUEUED_FOR_MONEY_TRANSFER', 'FAILED', 'SUCCESS', 'FAILED_AS_UNCLAIMED_FOR_3_DAYS');

-- DropIndex
DROP INDEX "User_provider_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "lastLogin",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "name" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Zaps" (
    "id" TEXT NOT NULL,
    "zapOwnerId" TEXT NOT NULL,
    "bankCred" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "zapName" TEXT NOT NULL,
    "description" TEXT,
    "githubId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Zaps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ZapHit" (
    "id" TEXT NOT NULL,
    "zapId" TEXT NOT NULL,
    "zapOwnerId" TEXT NOT NULL,
    "bountyGiverId" TEXT NOT NULL,
    "bountyReceiverId" TEXT NOT NULL,
    "bountyAmount" DOUBLE PRECISION NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'WAITING_TO_CLAIM',
    "commentlink" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ZapHit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhiteList" (
    "id" TEXT NOT NULL,
    "zapId" TEXT NOT NULL,
    "zapOwnerId" TEXT NOT NULL,
    "githubId" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WhiteList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BountyClaims" (
    "id" TEXT NOT NULL,
    "zapId" TEXT NOT NULL,
    "githubId" TEXT NOT NULL,
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
    "githubId" TEXT NOT NULL,
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
    "githubId" TEXT NOT NULL,
    "hasReceived" BOOLEAN NOT NULL DEFAULT true,
    "bountyAmt" DOUBLE PRECISION NOT NULL,
    "zapOwnerId" TEXT NOT NULL,
    "commentLink" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BountyReceives_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WhiteList_zapId_key" ON "WhiteList"("zapId");

-- CreateIndex
CREATE UNIQUE INDEX "BountyReceives_zapHitId_key" ON "BountyReceives"("zapHitId");

-- AddForeignKey
ALTER TABLE "Zaps" ADD CONSTRAINT "Zaps_zapOwnerId_fkey" FOREIGN KEY ("zapOwnerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ZapHit" ADD CONSTRAINT "ZapHit_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Zaps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhiteList" ADD CONSTRAINT "WhiteList_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Zaps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BountyClaims" ADD CONSTRAINT "BountyClaims_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Zaps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BountyClaimsOutbox" ADD CONSTRAINT "BountyClaimsOutbox_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Zaps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BountyReceives" ADD CONSTRAINT "BountyReceives_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Zaps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BountyReceives" ADD CONSTRAINT "BountyReceives_zapHitId_fkey" FOREIGN KEY ("zapHitId") REFERENCES "ZapHit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
