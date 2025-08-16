// controllers/sport.ts
import { Request, Response } from "express";
import { createSportService, getAllSportService } from "../services/sport";

export async function createSport(req: Request, res: Response) {
  try {
    const { exercise_type, info } = req.body;

    if (!exercise_type) {
      return res.status(400).json({
        code: 400,
        status: "error",
        message: "exercise_type tidak boleh kosong",
      });
    }

    const sport = await createSportService(exercise_type, info);

    return res.status(201).json({
      code: 201,
      status: "success",
      data: sport,
    });
  } catch (error: any) {
    console.error("Error createSport:", error);
    return res.status(500).json({
      code: 500,
      status: "error",
      message: error.message || "Gagal membuat data sport",
    });
  }
}

export async function getAllSport(req: Request, res: Response) {
  try {
    const sports = await getAllSportService();

    return res.status(200).json({
      code: 200,
      status: "success",
      data: sports,
    });
  } catch (error: any) {
    console.error("Error getAllSport:", error);
    return res.status(500).json({
      code: 500,
      status: "error",
      message: error.message || "Gagal mengambil data sport",
    });
  }
}
