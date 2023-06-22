import { NextRequest, NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { prisma } from "@/app/libs/prismaDb";

export async function POST(request: Request): Promise<Response> {
  const currentUser = await getCurrentUser();

  // need a user
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { title, content, categories, country, city, images, countryCode } =
    body;

  console.log("body", body);
  // see how we can make this better later
  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });
  const post = await prisma.post.create({
    data: {
      userId: currentUser.id,
      title,
      content,
      categories,
      countryCode: countryCode,
      country,
      city,
      images,
      datePosted: new Date(),
    },
  });
  return NextResponse.json(post);
}

// get all without filter first
export async function GET(request: NextRequest) {
  const posts = await prisma.post.findMany({
    include: { user: true, postLikes: true, comments: true },
  });
  return NextResponse.json(posts);
}
