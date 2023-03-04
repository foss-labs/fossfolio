-- CreateEnum
CREATE TYPE "Mode" AS ENUM ('ONLINE', 'OFFLINE');

-- CreateEnum
CREATE TYPE "Level" AS ENUM ('Platinum', 'Gold', 'Silver', 'Bronze');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Submitted', 'NotSubmitted');

-- CreateTable
CREATE TABLE "Hackathon" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::TEXT,
    "slug" TEXT NOT NULL,
    "organizerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "registrationStarting" TIMESTAMP(3) NOT NULL,
    "registrationEnding" TIMESTAMP(3) NOT NULL,
    "eventStarting" TIMESTAMP(3) NOT NULL,
    "eventEnding" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "submissionGuidelines" TEXT NOT NULL,
    "venue" TEXT,
    "mode" "Mode" NOT NULL,
    "rules" TEXT NOT NULL,
    "twitter" TEXT,
    "website" TEXT,
    "instagram" TEXT,
    "email" TEXT,
    "linkedin" TEXT,
    "discord" TEXT,
    "FAQ" JSONB[],
    "fee" TEXT,
    "orgnizersPrize" INTEGER NOT NULL,

    CONSTRAINT "Hackathon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sponsor" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::TEXT,
    "name" TEXT NOT NULL,
    "level" "Level" NOT NULL,
    "hackId" TEXT NOT NULL,
    "price" INTEGER,

    CONSTRAINT "Sponsor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::TEXT,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "githubId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParticipatedHacks" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::TEXT,
    "hackId" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "projectLink" TEXT,
    "videoLink" TEXT,

    CONSTRAINT "ParticipatedHacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::TEXT,
    "name" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_HackathonToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_HackathonToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_SkillToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Hackathon_slug_key" ON "Hackathon"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_id_key" ON "Skill"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_HackathonToUser_AB_unique" ON "_HackathonToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_HackathonToUser_B_index" ON "_HackathonToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_HackathonToTag_AB_unique" ON "_HackathonToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_HackathonToTag_B_index" ON "_HackathonToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SkillToUser_AB_unique" ON "_SkillToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SkillToUser_B_index" ON "_SkillToUser"("B");

-- AddForeignKey
ALTER TABLE "Sponsor" ADD CONSTRAINT "Sponsor_hackId_fkey" FOREIGN KEY ("hackId") REFERENCES "Hackathon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipatedHacks" ADD CONSTRAINT "ParticipatedHacks_hackId_fkey" FOREIGN KEY ("hackId") REFERENCES "Hackathon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipatedHacks" ADD CONSTRAINT "ParticipatedHacks_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HackathonToUser" ADD CONSTRAINT "_HackathonToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Hackathon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HackathonToUser" ADD CONSTRAINT "_HackathonToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HackathonToTag" ADD CONSTRAINT "_HackathonToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Hackathon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HackathonToTag" ADD CONSTRAINT "_HackathonToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SkillToUser" ADD CONSTRAINT "_SkillToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SkillToUser" ADD CONSTRAINT "_SkillToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
