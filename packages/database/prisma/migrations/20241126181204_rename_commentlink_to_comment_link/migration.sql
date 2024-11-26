/*
  Warnings:

  - You are about to drop the column `commentlink` on the `ZapHit` table. All the data in the column will be lost.
  - Added the required column `commentLink` to the `ZapHit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ZapHit" DROP COLUMN "commentlink",
ADD COLUMN     "commentLink" TEXT NOT NULL;
