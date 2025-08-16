import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"; // Add this import
import { prisma } from "../prisma/client";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ 
        code: 401,
        status: "error",
        message: "Unauthorized" 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { 
      id: number;
      role: string;
    };
    
    // Store both user ID and role
    (req as any).userId = decoded.id;
    (req as any).userRole = decoded.role;
    
    next();
  } catch (error) {
    return res.status(401).json({ 
      code: 401,
      status: "error",
      message: "Invalid token" 
    });
  }
}

// Then you can also add a mentor-only middleware
export function authenticateMentor(req: Request, res: Response, next: NextFunction) {
  if ((req as any).userRole !== 'mentor') {
    return res.status(403).json({
      code: 403,
      status: "error",
      message: "Access denied. Mentor role required."
    });
  }
  next();
}