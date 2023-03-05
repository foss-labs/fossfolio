/*
  Warnings:

  - You are about to drop the column `academicStatus` on the `Event` table. All the data in the column will be lost.
  - The `faq` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `Student` on the `User` table. All the data in the column will be lost.
  - Added the required column `student` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "academicStatus",
ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::TEXT,
ALTER COLUMN "mode" SET DEFAULT 'ONLINE',
DROP COLUMN "faq",
ADD COLUMN     "faq" JSONB[];

-- AlterTable
ALTER TABLE "Prizes" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::TEXT;

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
ALTER TABLE "User" DROP COLUMN "Student",
ADD COLUMN     "student" BOOLEAN NOT NULL,
ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::TEXT;

-- DropEnum
DROP TYPE "AcademicStatus";
