-- AlterTable
ALTER TABLE "Tag" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::TEXT;
