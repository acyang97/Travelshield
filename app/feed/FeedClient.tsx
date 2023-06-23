"use client";

import React, { useEffect, useRef } from "react";
import { SafeUser } from "../types";
import SinglePost from "../components/SinglePost/SinglePost";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FormattedFullPost } from "../interfaces/post.interface";
import { useIntersection } from "@mantine/hooks";
import { INFINITE_SCROLL_LIMIT } from "../constants/feed.constants";
import { Loader2 } from "lucide-react";

interface Props {
  currentUser?: SafeUser | null;
  initialPosts: FormattedFullPost[];
}
const FeedClient: React.FC<Props> = ({ currentUser, initialPosts }) => {
  const headerContent = (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold">Feed</h2>
    </div>
  );
  const lastPostRef = useRef<HTMLElement>(null);

  // https://mantine.dev/hooks/use-intersection/
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["infinite-query-post"],
    async ({ pageParam = 1 }) => {
      let query = `/api/post?limit=${INFINITE_SCROLL_LIMIT}&page=${pageParam}`;
      const { data } = await axios.get(query);
      return data as FormattedFullPost[];
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: { pages: [initialPosts], pageParams: [1] },
    }
  );

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  // when data has not been fetched
  const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

  return (
    <main>
      <div className="py-14" />
      <div className="mx-6 md:mx-12">
        <div className="flex items-center justify-center">{headerContent}</div>
        <ul className="flex flex-col gap-3">
          {posts &&
            posts?.map((post, index) => {
              if (index === posts.length - 1) {
                return (
                  <li key={post.id} ref={ref}>
                    <SinglePost
                      key={post.id}
                      post={post}
                      currentUser={currentUser}
                    />
                  </li>
                );
              } else {
                return (
                  <li key={post.id}>
                    <SinglePost post={post} currentUser={currentUser} />
                  </li>
                );
              }
            })}
          {isFetchingNextPage && (
            <li className="flex justify-center mb-5">
              <Loader2 className="w-6 h-6 text-zinc-500 animate-spin" />
            </li>
          )}
        </ul>
      </div>
    </main>
  );
};

export default FeedClient;
