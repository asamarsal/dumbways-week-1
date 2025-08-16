import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createSportService(exercise_type: string, info?: string) {
  return await prisma.sport.create({
    data: {
      exercise_type,
      info,
    },
  });
}

export async function getAllSportService() {
  return await prisma.sport.findMany({
    orderBy: {
      id: "asc",
    },
  });
}

// Cek apakah exercise_type sudah ada
export async function findSportByExerciseType(exercise_type: string) {
  return await prisma.sport.findFirst({
    where: {
      exercise_type: {
        equals: exercise_type,
        mode: "insensitive",
      },
    },
  });
}
