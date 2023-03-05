/*
  Warnings:

  - Added the required column `prize` to the `Prizes` table without a default value. This is not possible if the table is not empty.
  - Made the column `sponsorId` on table `Prizes` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Prizes" DROP CONSTRAINT "Prizes_sponsorId_fkey";

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::TEXT;

-- AlterTable
ALTER TABLE "Prizes" ADD COLUMN     "prize" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::TEXT,
ALTER COLUMN "sponsorId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Skill" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::TEXT;

-- AlterTable
ALTER TABLE "Sponsor" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::TEXT;

-- AlterTable
ALTER TABLE "Tag" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::TEXT;

-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::TEXT;

-- AlterTable
ALTER TABLE "TeamMembers" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::TEXT;

-- AddForeignKey
ALTER TABLE "Prizes" ADD CONSTRAINT "Prizes_sponsorId_fkey" FOREIGN KEY ("sponsorId") REFERENCES "Sponsor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
