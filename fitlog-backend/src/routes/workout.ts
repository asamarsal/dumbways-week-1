import express from "express";
import { createWorkout, getAllWorkouts, deleteWorkout, updateWorkout } from "../controllers/workout";
import { authenticate } from "../middlewares/auth";

const router = express.Router();

router.use(authenticate);
router.post("/", createWorkout);
router.get("/", getAllWorkouts);
router.delete("/:id", authenticate, deleteWorkout);
router.put("/:id", authenticate, updateWorkout);

export default router;
