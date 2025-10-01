import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/users - Search users
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    const currentUserId = searchParams.get("currentUserId");
    const limit = parseInt(searchParams.get("limit") || "10");

    const where: any = {};
    if (query) {
      where.OR = [
        { name: { contains: query, mode: "insensitive" } },
        { email: { contains: query, mode: "insensitive" } },
      ];
    }

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        bio: true,
        createdAt: true,
      },
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    // Check if current user is following these users
    let usersWithFollowStatus = users;
    if (currentUserId) {
      const followingIds = await prisma.follow.findMany({
        where: { followerId: currentUserId },
        select: { followingId: true },
      });
      
      const followingSet = new Set(followingIds.map(f => f.followingId));
      
      usersWithFollowStatus = users.map(user => ({
        ...user,
        isFollowing: followingSet.has(user.id),
      }));
    }

    return NextResponse.json({ users: usersWithFollowStatus });
  } catch (error) {
    console.error("Error searching users:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
