/*
  Warnings:

  - You are about to drop the column `exercise_type` on the `workouts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."workouts" DROP COLUMN "exercise_type",
ADD COLUMN     "exercise_id" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."workouts" ADD CONSTRAINT "workouts_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "public"."sports"("id") ON DELETE SET NULL ON UPDATE CASCADE;
