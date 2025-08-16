/*
  Warnings:

  - Made the column `exercise_id` on table `workouts` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."workouts" DROP CONSTRAINT "workouts_exercise_id_fkey";

-- AlterTable
ALTER TABLE "public"."workouts" ALTER COLUMN "exercise_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."workouts" ADD CONSTRAINT "workouts_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "public"."sports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
