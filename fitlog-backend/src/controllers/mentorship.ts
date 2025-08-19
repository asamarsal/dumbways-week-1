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

export async function createStudentWorkout(req: Request, res: Response) {
  try {
    const mentorId = (req as any).userId;
    const studentId = Number(req.params.studentId);
    const { exercise_id, duration, exercise_date, notes } = req.body;

    // Check if mentorship exists
    const mentorship = await prisma.mentorship.findFirst({
      where: {
        mentorId,
        memberId: studentId,
        isActive: true
      }
    });

    if (!mentorship) {
      return res.status(404).json({
        code: 404,
        status: "error",
        message: "Mentorship not found or inactive"
      });
    }

    // Create workout for student
    const workout = await prisma.workout.create({
      data: {
        exercise_id: Number(exercise_id),
        duration: duration ? Number(duration) : null,
        exercise_date: new Date(exercise_date),
        notes: notes || "",
        user_id: studentId,        // The student who should do the workout
        created_by: mentorId,      // The mentor who created it
        updated_by: mentorId,
        mentor_id: mentorId        // Mark as mentor-assigned workout
      },
      include: {
        createdByUser: {
          select: {
            id: true,
            name: true,
            username: true
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            username: true
          }
        },
        sport: true
      }
    });

    res.status(201).json({
      code: 201,
      status: "success",
      message: "Workout assigned successfully",
      data: workout
    });

  } catch (error: any) {
    console.error("Error creating student workout:", error);
    res.status(500).json({
      code: 500,
      status: "error",
      message: error.message || "Failed to create workout"
    });
  }
}

export async function searchMembers(req: Request, res: Response) {
  try {
    const { username } = req.query;
    const mentorId = (req as any).userId;

    const members = await prisma.user.findMany({
      where: {
        username: {
          contains: username as string,
          mode: 'insensitive' // Case insensitive search
        },
        role: "member", // Only search for members
        AND: {
          NOT: {
            mentorsOf: {
              some: {
                mentorId: mentorId,
                isActive: true
              }
            }
          }
        }
      },
      select: {
        id: true,
        username: true,
        name: true,
        email: true
      }
    });

    res.status(200).json({
      code: 200,
      status: "success",
      data: members
    });

  } catch (error: any) {
    console.error("Error searching members:", error);
    res.status(500).json({
      code: 500,
      status: "error",
      message: error.message
    });
  }
}