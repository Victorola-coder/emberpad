import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createReminderSchema = z.object({
  message: z.string().min(1, "Message is required"),
  type: z
    .enum(["encouragement", "checkin", "deadline"])
    .default("encouragement"),
  goalId: z.string().min(1, "Goal ID is required"),
  fromUserId: z.string().min(1, "From user ID is required"),
  toUserId: z.string().min(1, "To user ID is required"),
});

// GET /api/reminders - Get user's reminders
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const type = searchParams.get("type");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const where: any = { toUserId: userId };
    if (type) {
      where.type = type;
    }

    const reminders = await prisma.reminder.findMany({
      where,
      include: {
        goal: {
          select: {
            id: true,
            title: true,
            progress: true,
          },
        },
        fromUser: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        toUser: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { sentAt: "desc" },
    });

    return NextResponse.json({ reminders });
  } catch (error) {
    console.error("Error fetching reminders:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/reminders - Send reminder
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createReminderSchema.parse(body);

    const reminder = await prisma.reminder.create({
      data: validatedData,
      include: {
        goal: {
          select: {
            id: true,
            title: true,
            progress: true,
          },
        },
        fromUser: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        toUser: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json({ reminder }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Error creating reminder:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
