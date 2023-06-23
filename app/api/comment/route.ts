import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { prisma } from "@/app/libs/prismaDb";

// add a comment given a post id
export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  // need a user
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { postId, content } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const createdComment = await prisma.comment.create({
    data: {
      datePosted: new Date(),
      lastUpdated: new Date(),
      content,
      postId,
      userId: currentUser.id,
    },
  });

  const createdCommentWithAttributes = await prisma.comment.findFirst({
    where: {
      id: createdComment.id,
    },
    include: {
      user: true,
      commentLikes: true,
    },
  });
  return NextResponse.json(createdCommentWithAttributes);
}
