import { prisma } from "../prisma/client";
import { Prisma } from "@prisma/client";

export async function createWorkoutService(
  exercise_id: number,
  duration: number | null,
  exercise_date: string,
  notes: string | null,
  created_by: number
) {
  if (!exercise_id || !exercise_date || !created_by) {
    throw new Error("exercise_type, exercise_date, dan created_by wajib diisi");
  }

  const workout = await prisma.workout.create({
    data: {
      exercise_id,
      duration,
      exercise_date: new Date(exercise_date),
      notes: notes || "",
      created_by,
      updated_by: created_by
    },
  });

  return workout;
}

// GET all workouts
export async function getAllWorkoutsService() {
  const workouts = await prisma.workout.findMany({
    include: {
      createdByUser: { select: { id: true, name: true, username: true } },
      updatedByUser: { select: { id: true, name: true, username: true } },
    },
    orderBy: { 
      id: "asc"
    },
  });

  return workouts;
}
