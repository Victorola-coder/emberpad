import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createGoalSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  category: z.string().default("personal"),
  targetDate: z.string().datetime().optional(),
  privacy: z.enum(["public", "private", "friends"]).default("public"),
});

const updateGoalSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  targetDate: z.string().datetime().optional(),
  privacy: z.enum(["public", "private", "friends"]).optional(),
  status: z.enum(["active", "completed", "paused", "cancelled"]).optional(),
  progress: z.number().min(0).max(100).optional(),
});

// GET /api/goals - Fetch user's goals
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const privacy = searchParams.get("privacy");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const where: any = { userId };
    if (privacy) {
      where.privacy = privacy;
    }

    const goals = await prisma.goal.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ goals });
  } catch (error) {
    console.error("Error fetching goals:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/goals - Create new goal
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createGoalSchema.parse(body);

    const { userId, ...goalData } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const goal = await prisma.goal.create({
      data: {
        ...validatedData,
        targetDate: validatedData.targetDate
          ? new Date(validatedData.targetDate)
          : null,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    return NextResponse.json({ goal }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Error creating goal:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
