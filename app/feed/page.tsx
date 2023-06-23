import getCurrentUser from "../actions/getCurrentUser";
import ClientOnly from "../components/ClientOnly";
import { INFINITE_SCROLL_LIMIT } from "../constants/feed.constants";
import { FormattedFullPost } from "../interfaces/post.interface";
import { prisma } from "../libs/prismaDb";
import FeedClient from "./FeedClient";

const FeedPage = async () => {
  const currentUser = await getCurrentUser();
  const initialPosts = await prisma.post.findMany({
    include: {
      user: true,
      postLikes: true,
      comments: true,
    },
    orderBy: [{ datePosted: "desc" }],
    take: INFINITE_SCROLL_LIMIT,
  });
  let formattedPosts = initialPosts.map((post) => {
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
  }) as FormattedFullPost[];

  return (
    <ClientOnly>
      <FeedClient currentUser={currentUser} initialPosts={formattedPosts} />
    </ClientOnly>
  );
};

export default FeedPage;
