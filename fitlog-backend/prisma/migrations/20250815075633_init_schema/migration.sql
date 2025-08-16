/*
  Warnings:

  - You are about to drop the column `user_id` on the `workouts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."workouts" DROP CONSTRAINT "workouts_user_id_fkey";

-- DropIndex
DROP INDEX "public"."workouts_created_by_idx";

-- DropIndex
DROP INDEX "public"."workouts_exercise_date_idx";

-- DropIndex
DROP INDEX "public"."workouts_exercise_id_idx";

-- DropIndex
DROP INDEX "public"."workouts_user_id_idx";

-- AlterTable
ALTER TABLE "public"."workouts" DROP COLUMN "user_id";
