/*
  Warnings:

  - The `description` column on the `Events` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Events" ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "description",
ADD COLUMN     "description" JSONB;
