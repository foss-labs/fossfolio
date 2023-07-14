/*
  Warnings:

  - You are about to drop the column `accessToken` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "accessToken",
DROP COLUMN "refreshToken",
ADD COLUMN     "providerAccessToken" TEXT,
ADD COLUMN     "providerRefreshToken" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "refreshToken" TEXT;
