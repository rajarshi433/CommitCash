/*
  Warnings:

  - A unique constraint covering the columns `[zapHitId]` on the table `BountyClaims` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[zapHitId]` on the table `BountyClaimsOutbox` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `zapHitId` to the `BountyClaims` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zapHitId` to the `BountyClaimsOutbox` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BountyClaims" ADD COLUMN     "zapHitId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BountyClaimsOutbox" ADD COLUMN     "zapHitId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BountyClaims_zapHitId_key" ON "BountyClaims"("zapHitId");

-- CreateIndex
CREATE UNIQUE INDEX "BountyClaimsOutbox_zapHitId_key" ON "BountyClaimsOutbox"("zapHitId");

-- AddForeignKey
ALTER TABLE "BountyClaims" ADD CONSTRAINT "BountyClaims_zapHitId_fkey" FOREIGN KEY ("zapHitId") REFERENCES "ZapHit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BountyClaimsOutbox" ADD CONSTRAINT "BountyClaimsOutbox_zapHitId_fkey" FOREIGN KEY ("zapHitId") REFERENCES "ZapHit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
