/*
  Warnings:

  - You are about to drop the column `title` on the `Field` table. All the data in the column will be lost.
  - Made the column `label` on table `Field` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Field" DROP COLUMN "title",
ADD COLUMN     "eventsId" TEXT,
ALTER COLUMN "label" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Field" ADD CONSTRAINT "Field_eventsId_fkey" FOREIGN KEY ("eventsId") REFERENCES "Events"("id") ON DELETE SET NULL ON UPDATE CASCADE;
