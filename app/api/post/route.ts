import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { prisma } from "@/app/libs/prismaDb";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  // need a user
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { title, content, categories, country, city, images } = body;

  // see how we can make this better later
  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });
  console.log("before creating");
  const listing = await prisma.post.create({
    data: {
      userId: currentUser.id,
      title,
      content,
      categories,
      country,
      city,
      images,
    },
  });
  console.log("creating");
  return NextResponse.json(listing);
}
