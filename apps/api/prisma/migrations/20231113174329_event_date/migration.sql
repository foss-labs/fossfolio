/*
  Warnings:

  - Added the required column `eventDate` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketMaxCount` to the `Events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Events" ADD COLUMN     "eventDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "ticketMaxCount" INTEGER NOT NULL;
