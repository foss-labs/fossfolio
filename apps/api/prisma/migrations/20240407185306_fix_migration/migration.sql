/*
  Warnings:

  - You are about to drop the column `embedding` on the `Events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Events" DROP COLUMN "embedding",
ADD COLUMN     "embedding_description" vector(768),
ADD COLUMN     "embedding_title" vector(768);
