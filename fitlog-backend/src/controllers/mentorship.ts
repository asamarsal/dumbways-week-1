import { Request, Response } from "express";
import { prisma } from "../prisma/client";

// Create mentorship
export async function createMentorship(req: Request, res: Response) {
  try {
    const mentorId = (req as any).userId; // Get mentor ID from JWT
    const { memberId } = req.body;

    // Check if user is a mentor
    const mentor = await prisma.user.findFirst({
      where: { 
        id: mentorId,
        role: "mentor"
      }
    });

    if (!mentor) {
      return res.status(403).json({
        code: 403,
        status: "error",
        message: "Only mentors can create mentorships"
      });
    }

    // Create mentorship
    const mentorship = await prisma.mentorship.create({
      data: {
        mentorId,
        memberId,
        isActive: true
      },
      include: {
        member: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true
          }
        }
      }
    });

    res.status(201).json({
      code: 201,
      status: "success",
      message: "Mentorship created successfully",
      data: mentorship
    });

  } catch (error: any) {
    console.error("Error creating mentorship:", error);
    res.status(500).json({
      code: 500,
      status: "error",
      message: error.message
    });
  }
}

// Get mentor's students
export async function getMentorStudents(req: Request, res: Response) {
  try {
    const mentorId = (req as any).userId;

    const mentorships = await prisma.mentorship.findMany({
      where: {
        mentorId,
        isActive: true
      },
      include: {
        member: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            workouts_created: {
              include: {
                sport: true
              }
            }
          }
        }
      }
    });

    res.status(200).json({
      code: 200,
      status: "success",
      data: mentorships
    });

  } catch (error: any) {
    console.error("Error getting mentor's students:", error);
    res.status(500).json({
      code: 500,
      status: "error",
      message: error.message
    });
  }
}

// Get student's workouts
export async function getStudentWorkouts(req: Request, res: Response) {
  try {
    const mentorId = (req as any).userId;
    const { studentId } = req.params;

    // Check if mentorship exists
    const mentorship = await prisma.mentorship.findFirst({
      where: {
        mentorId,
        memberId: Number(studentId),
        isActive: true
      }
    });

    if (!mentorship) {
      return res.status(404).json({
        code: 404,
        status: "error",
        message: "Mentorship not found"
      });
    }

    // Get student's workouts
    const workouts = await prisma.workout.findMany({
      where: {
        created_by: Number(studentId)
      },
      include: {
        sport: true,
        createdByUser: {
          select: {
            id: true,
            name: true,
            username: true
          }
        }
      },
      orderBy: {
        exercise_date: 'desc'
      }
    });

    res.status(200).json({
      code: 200,
      status: "success",
      data: workouts
    });

  } catch (error: any) {
    console.error("Error getting student workouts:", error);
    res.status(500).json({
      code: 500,
      status: "error",
      message: error.message
    });
  }
}