/*
  Warnings:

  - You are about to drop the `_EventToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `organizerId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_EventToUser" DROP CONSTRAINT "_EventToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToUser" DROP CONSTRAINT "_EventToUser_B_fkey";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "organizerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tag" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::TEXT;

-- DropTable
DROP TABLE "_EventToUser";

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
