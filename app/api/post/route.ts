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
  const { title, content, categories, country, city } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const listing = await prisma.post.create({
    data: {
      userId: currentUser.id,
      title,
      content,
      categories,
      country,
      city,
    },
  });
  return NextResponse.json(listing);
}
