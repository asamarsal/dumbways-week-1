import express, { Request, Response, NextFunction } from "express";
import { handleRegister, handleLogin } from "../controllers/auth";

import { authenticate } from "../middlewares/auth";
import { productSchema } from "../validation/auth";

import { prisma } from "../prisma/client";

import limiter from '../middlewares/rate-limiter';

const router = express.Router();

router.post("/register", limiter,(req: Request, res: Response, next: NextFunction): void => {handleRegister(req, res).catch(next);});
router.post("/login", (req: Request, res: Response, next: NextFunction): void => {
  handleLogin(req, res).catch(next);
});


export default router;