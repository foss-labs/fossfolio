/*
  Warnings:

  - You are about to drop the column `collegeName` on the `Events` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Events" DROP COLUMN "collegeName",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "collegeName" TEXT,
ADD COLUMN     "isStudent" BOOLEAN;
