/*
  Warnings:

  - You are about to drop the column `stripe_prdouct_object` on the `Events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Events" DROP COLUMN "stripe_prdouct_object",
ADD COLUMN     "stripe_product_object" TEXT;
