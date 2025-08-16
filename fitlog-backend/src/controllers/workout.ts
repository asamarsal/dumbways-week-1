import { Request, Response } from "express";
import { createWorkoutService, getAllWorkoutsService } from "../services/workout";
import { prisma } from "../prisma/client";

export async function createWorkout(req: Request, res: Response) {
  try {
    
    const { exercise_id, duration, exercise_date, notes, created_by } = req.body;

    const workout = await createWorkoutService(
      Number(exercise_id),
      duration ? Number(duration) : null,
      exercise_date,
      notes,
      Number(created_by)
    );

    res.status(201).json({
      code: 201,
      status: "success",
      message: "Workout berhasil dibuat",
      data: workout,
    });
  } catch (error: any) {
    console.error("Error createWorkout:", error);
    res.status(500).json({ message: error.message || "Gagal membuat workout" });
  }
}

export async function getAllWorkouts(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const workouts = await prisma.workout.findMany({
      where: {
        created_by: userId // Only get workouts for authenticated user
      },
      include: {
        createdByUser: {
          select: {
            id: true,
            name: true,
            username: true
          }
        }
      }
    });

    res.status(200).json({
      code: 200,
      status: "success",
      data: workouts,
    });
  } catch (error: any) {
    console.error("Error getAllWorkouts:", error);
    res.status(500).json({ message: error.message || "Gagal mengambil data workout" });
  }
}

export async function deleteWorkout(req: Request, res: Response) {
  try {
    const workoutId = Number(req.params.id);
    const userId = (req as any).userId; // Get authenticated user ID from middleware

    // Check if workout exists and belongs to user
    const workout = await prisma.workout.findFirst({
      where: {
        id: workoutId,
        created_by: userId
      }
    });

    if (!workout) {
      return res.status(404).json({
        code: 404,
        status: "error",
        message: "Workout tidak ditemukan atau Anda tidak memiliki akses"
      });
    }

    // Delete the workout
    await prisma.workout.delete({
      where: {
        id: workoutId
      }
    });

    res.status(200).json({
      code: 200,
      status: "success",
      message: "Workout berhasil dihapus"
    });

  } catch (error: any) {
    console.error("Error deleteWorkout:", error);
    res.status(500).json({ 
      code: 500,
      status: "error",
      message: error.message || "Gagal menghapus workout" 
    });
  }
}

export async function updateWorkout(req: Request, res: Response) {
  try {
    const workoutId = Number(req.params.id);
    const userId = (req as any).userId;
    const { notes } = req.body;

    // Check if workout exists and belongs to user
    const workout = await prisma.workout.findFirst({
      where: {
        id: workoutId,
        created_by: userId
      }
    });

    if (!workout) {
      return res.status(404).json({
        code: 404,
        status: "error",
        message: "Workout tidak ditemukan atau Anda tidak memiliki akses"
      });
    }

    // Update the workout notes
    const updatedWorkout = await prisma.workout.update({
      where: {
        id: workoutId
      },
      data: {
        notes,
        updated_by: userId,
        updated_at: new Date()
      },
      include: {
        createdByUser: {
          select: {
            id: true,
            name: true,
            username: true
          }
        }
      }
    });

    res.status(200).json({
      code: 200,
      status: "success",
      message: "Notes berhasil diupdate",
      data: updatedWorkout
    });

  } catch (error: any) {
    console.error("Error updateWorkout:", error);
    res.status(500).json({
      code: 500,
      status: "error",
      message: error.message || "Gagal mengupdate workout"
    });
  }
}