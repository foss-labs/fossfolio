/*
  Warnings:

  - You are about to drop the column `created_at` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Event` table. All the data in the column will be lost.
  - The `status` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `created_at` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `pitchStatus` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `projectStatus` on the `Team` table. All the data in the column will be lost.
  - The `role` column on the `TeamMember` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `collegeId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `githubid` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `College` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Invite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Points` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[githubID]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `eventEnding` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventStarting` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guidelines` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registrationEnd` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registrationStart` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `githubID` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MEMBER', 'LEADER');

-- CreateEnum
CREATE TYPE "Mode" AS ENUM ('OFFLINE', 'ONLINE', 'HYBRID');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('PENDING', 'LISTED', 'UPDATION');

-- DropForeignKey
ALTER TABLE "Invite" DROP CONSTRAINT "Invite_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Invite" DROP CONSTRAINT "Invite_teamId_fkey";

-- DropForeignKey
ALTER TABLE "Invite" DROP CONSTRAINT "Invite_userId_fkey";

-- DropForeignKey
ALTER TABLE "Points" DROP CONSTRAINT "Points_collegeId_fkey";

-- DropForeignKey
ALTER TABLE "Points" DROP CONSTRAINT "Points_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Points" DROP CONSTRAINT "Points_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_collegeId_fkey";

-- DropIndex
DROP INDEX "User_githubid_key";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "created_at",
DROP COLUMN "date",
DROP COLUMN "details",
DROP COLUMN "location",
ADD COLUMN     "discord" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "eventEnding" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "eventStarting" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "guidelines" TEXT NOT NULL,
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "mode" "Mode" NOT NULL DEFAULT 'ONLINE',
ADD COLUMN     "registrationEnd" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "registrationStart" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "twitter" TEXT,
ADD COLUMN     "venue" TEXT,
ADD COLUMN     "website" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "EventStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "created_at",
DROP COLUMN "pitchStatus",
DROP COLUMN "projectStatus",
ADD COLUMN     "inviteCode" TEXT;

-- AlterTable
ALTER TABLE "TeamMember" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'MEMBER';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "collegeId",
DROP COLUMN "created_at",
DROP COLUMN "githubid",
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "githubID" TEXT NOT NULL,
ADD COLUMN     "student" BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE "College";

-- DropTable
DROP TABLE "Invite";

-- DropTable
DROP TABLE "Points";

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::TEXT,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EventToUser" (
    "A" UUID NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventToTag" (
    "A" UUID NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToUser_AB_unique" ON "_EventToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToUser_B_index" ON "_EventToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToTag_AB_unique" ON "_EventToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToTag_B_index" ON "_EventToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Event_slug_key" ON "Event"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_githubID_key" ON "User"("githubID");

-- AddForeignKey
ALTER TABLE "_EventToUser" ADD CONSTRAINT "_EventToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToUser" ADD CONSTRAINT "_EventToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToTag" ADD CONSTRAINT "_EventToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToTag" ADD CONSTRAINT "_EventToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
