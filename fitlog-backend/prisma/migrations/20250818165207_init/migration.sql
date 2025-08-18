/*
  Warnings:

  - Added the required column `user_id` to the `workouts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."workouts" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "workouts_user_id_idx" ON "public"."workouts"("user_id");

-- CreateIndex
CREATE INDEX "workouts_created_by_idx" ON "public"."workouts"("created_by");

-- AddForeignKey
ALTER TABLE "public"."workouts" ADD CONSTRAINT "workouts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
