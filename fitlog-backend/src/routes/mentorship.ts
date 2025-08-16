import express from "express";
import { createMentorship, getMentorStudents, getStudentWorkouts } from "../controllers/mentorship";
import { authenticate, authenticateMentor } from "../middlewares/auth";

const router = express.Router();

// All routes need authentication
router.use(authenticate);

// All routes need mentor role
router.use(authenticateMentor);

// Create mentorship with a student
router.post("/", createMentorship);

// Get mentor's students
router.get("/students", getMentorStudents);

// Get specific student's workouts
router.get("/students/:studentId/workouts", getStudentWorkouts);

export default router;