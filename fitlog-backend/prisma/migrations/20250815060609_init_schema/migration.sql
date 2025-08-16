-- AlterTable
ALTER TABLE "public"."users" ALTER COLUMN "role" SET DEFAULT 'member';

-- AlterTable
ALTER TABLE "public"."workouts" ADD COLUMN     "mentor_id" INTEGER;

-- CreateTable
CREATE TABLE "public"."mentorships" (
    "id" SERIAL NOT NULL,
    "mentorId" INTEGER NOT NULL,
    "memberId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mentorships_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "mentorships_mentorId_idx" ON "public"."mentorships"("mentorId");

-- CreateIndex
CREATE INDEX "mentorships_memberId_idx" ON "public"."mentorships"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "mentorships_mentorId_memberId_key" ON "public"."mentorships"("mentorId", "memberId");

-- CreateIndex
CREATE INDEX "workouts_mentor_id_idx" ON "public"."workouts"("mentor_id");

-- AddForeignKey
ALTER TABLE "public"."workouts" ADD CONSTRAINT "workouts_mentor_id_fkey" FOREIGN KEY ("mentor_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mentorships" ADD CONSTRAINT "mentorships_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mentorships" ADD CONSTRAINT "mentorships_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
