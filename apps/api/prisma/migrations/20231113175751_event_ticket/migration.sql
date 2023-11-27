/*
  Warnings:

  - You are about to drop the column `ticketMaxCount` on the `Events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Events" DROP COLUMN "ticketMaxCount",
ADD COLUMN     "maxTicketCount" INTEGER;
