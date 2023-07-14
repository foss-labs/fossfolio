/*
  Warnings:

  - Added the required column `profile` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "profile" JSONB NOT NULL;
