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
      lastUpdated: new Date(),
    },
  });
  return NextResponse.json(post);
}

export async function GET(request: NextRequest) {
  const currentUser = await getCurrentUser();

  const url = new URL(request.url);
  const limit = url.searchParams.get("limit");
  const page = url.searchParams.get("page");
  const categories = url.searchParams.getAll("category");
  const country = url.searchParams.get("country");
  const content = url.searchParams.get("content");
  const city = url.searchParams.get("city");
  const orderBy = url.searchParams.getAll("orderBy");

  console.log("content", content);
  let posts = await prisma.post.findMany({
    ...(limit && { take: parseInt(limit) }),
    ...(page && limit && { skip: (parseInt(page) - 1) * parseInt(limit) }),
    include: { user: true, postLikes: true, comments: true },
    orderBy:
      orderBy?.length > 0
        ? (orderBy as unknown as any)
        : [{ datePosted: "desc" }],
    // https://www.mongodb.com/developer/products/mongodb/schema-design-anti-pattern-case-insensitive-query-index/
    where: {
      ...(country && { country }),
      ...(city && country && { city }),
      ...(content && {
        OR: [
          {
            content: {
              mode: "insensitive",
              contains: content,
            },
          },
          {
            country: {
              mode: "insensitive",
              contains: content,
            },
          },
          {
            city: {
              mode: "insensitive",
              contains: content,
            },
          },
          {
            categories: {
              hasSome: content,
            },
          },
        ],
      }),
      ...(categories?.length > 0 && { categories: { hasEvery: categories } }),
    },
  });
  // find out if it is like by the currentUser
  let formattedPosts = posts.map((post) => {
    const postLikes = post.postLikes;
    const exist = postLikes.find(
      (postLike) =>
        postLike.postId === post.id &&
        postLike.userId === currentUser?.id &&
        postLike.value === 1
    );
    return {
      ...post,
      likedByUser: exist ? true : false,
    };
  });
  return NextResponse.json(formattedPosts);
}
