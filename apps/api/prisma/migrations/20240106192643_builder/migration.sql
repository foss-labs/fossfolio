-- CreateEnum
CREATE TYPE "FieldType" AS ENUM ('SingleLineText', 'LongText', 'SingleSelect', 'MultiSelect', 'Checkbox', 'Number', 'Email', 'URL', 'PhoneNumber', 'Attachment');

-- CreateTable
CREATE TABLE "Field" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "label" TEXT,
    "placeholder" TEXT,
    "options" TEXT,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "type" "FieldType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Field_pkey" PRIMARY KEY ("id")
);
