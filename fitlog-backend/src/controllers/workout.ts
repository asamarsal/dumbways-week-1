import { Request, Response } from "express";
import { createWorkoutService, getAllWorkoutsService } from "../services/workout";

export async function createWorkout(req: Request, res: Response) {
  try {
    
    const { exercise_type, duration, exercise_date, notes, created_by } = req.body;

    const workout = await createWorkoutService(
      exercise_type,
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
    const workouts = await getAllWorkoutsService();

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
