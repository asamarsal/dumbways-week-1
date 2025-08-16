import express from "express";
import { createSport, getAllSport } from "../controllers/sport";

const router = express.Router();

router.post("/", createSport);
router.get("/", getAllSport);

export default router;
