"use client";

import React, { useState } from "react";
import { SafeUser } from "../types";
import SinglePost from "./SinglePost/SinglePost";
import axios from "axios";
import { Post } from "@prisma/client";
import { useQuery } from "react-query";
import { FormattedFullPost } from "../interfaces/post.interface";

interface Props {
  currentUser?: SafeUser | null;
}
const FeedClient: React.FC<Props> = ({ currentUser }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const headerContent = (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold">Feed</h2>
    </div>
  );

  const getPosts = async (): Promise<FormattedFullPost[] | undefined> => {
    try {
      const result = await axios.get("/api/post");
      const data = result.data;
      return data as unknown as FormattedFullPost[];
    } catch (err) {
      console.log(err);
    }
  };

  const { data, error, isLoading, refetch } = useQuery("getPosts", getPosts);
  // useEffect(() => {
  //   getPosts();
  // }, [getPosts]);

  // update later
  return (
    <main>
      <div className="py-14" />
      <div className="mx-6 md:mx-12">
        <div className="flex items-center justify-center">{headerContent}</div>
        <div className="flex flex-col gap-3">
          {data &&
            data?.map((post, index) => (
              <SinglePost key={index} post={post} currentUser={currentUser} />
            ))}
        </div>
      </div>
    </main>
  );
};

export default FeedClient;
