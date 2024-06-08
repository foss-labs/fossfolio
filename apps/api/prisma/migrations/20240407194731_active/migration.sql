-- DropIndex
DROP INDEX "index_embedding_description";

-- DropIndex
DROP INDEX "index_embedding_title";

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
