import getCurrentUser from "@/app/actions/getCurrentUser";
import { prisma } from "@/app/libs/prismaDb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await request.json();
  const { postId, likeValue } = body;

  if (!postId || typeof postId !== "string") {
    throw new Error("Invalid ID");
  }

  const currentPostLike = await prisma.postLikes.findFirst({
    where: {
      postId: postId,
      userId: currentUser.id,
    },
  });
  let updatedPostLike;
  if (currentPostLike) {
    updatedPostLike = await prisma.postLikes.update({
      where: {
        id: currentPostLike.id,
      },
      data: {
        value: {
          set: likeValue,
        },
      },
    });
  } else {
    updatedPostLike = await prisma.postLikes.create({
      data: {
        userId: currentUser.id,
        postId,
        value: 1,
      },
    });
  }
  return NextResponse.json(updatedPostLike);
}
