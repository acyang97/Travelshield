import getCurrentUser from "@/app/actions/getCurrentUser";
import { prisma } from "@/app/libs/prismaDb";
import { NextResponse } from "next/server";

interface Params {
  postId?: string;
}
export async function GET(request: Request, { params }: { params: Params }) {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  const { postId } = params;
  console.log("postId", postId);

  if (!postId || typeof postId !== "string") {
    return NextResponse.error();
  }
  let comments = await prisma.comment.findMany({
    where: {
      postId: postId,
    },
    include: {
      user: true,
      commentLikes: true,
    },
    orderBy: [{ datePosted: "asc" }],
  });
  return NextResponse.json(comments);
}
