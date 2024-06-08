/*
  Warnings:

  - The `options` column on the `Field` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Field" DROP COLUMN "options",
ADD COLUMN     "options" TEXT[];
