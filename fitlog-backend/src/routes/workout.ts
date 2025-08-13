import express from "express";
import { createWorkout, getAllWorkouts } from "../controllers/workout";

const router = express.Router();

router.post("/", createWorkout);
router.get("/", getAllWorkouts);

export default router;
