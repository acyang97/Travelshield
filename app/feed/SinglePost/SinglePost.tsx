"use client";

import { IFullPost } from "@/app/interfaces/post.interface";
import { formatDate } from "@/app/utils/date.utils";
import Image from "next/image";
import React from "react";
import Tag from "./Tag";
import { Country } from "country-state-city";
import { AiFillHeart } from "react-icons/ai";
import { SafeUser } from "@/app/types";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";

interface Props {
  post: IFullPost;
  currentUser?: SafeUser | null;
}
const SinglePost: React.FC<Props> = ({ post, currentUser }) => {
  const TagsContainer = (
    <div className="mb-2">
      <Tag
        tag={`${Country.getCountryByCode(post.countryCode)?.flag} ${
          post.country
        }`}
      />
      <Tag tag={`${post.city}`} />
      {post.categories.map((category, index) => (
        <Tag key={index} tag={category} />
      ))}
    </div>
  );
  return (
    <>
      <div className="px-0 py-3 md:py-8 md:px-8 flex items-center justify-center">
        <div className="px-3 py-4 bg-white shadow rounded-lg w-[100%] md:w-[75%]">
          <div className="flex mb-4">
            <Image
              alt="user"
              className="w-12 h-12 rounded-full"
              width={20}
              height={20}
              src={post.user.image ?? "/images/placeholder"}
            />
            <div className="ml-2 mt-0.5">
              <span className="block font-medium text-base leading-snug text-black ">
                {post.user.displayName ?? post.user.name}
              </span>
              <span className="block text-sm text-gray-500  font-light leading-snug">
                {`Posted on: ${formatDate(
                  post.datePosted as unknown as string
                )}`}
              </span>
            </div>
          </div>
          {TagsContainer}
          <p className="text-gray-800  leading-snug md:leading-normal">
            {post.content}
          </p>
          <div className="flex justify-between items-center mt-5">
            <div className="flex">
              <AiFillHeart
                size={20}
                color="red"
                className="cursor-pointer"
                onClick={() => {}}
              />
              <span className="ml-1 text-gray-500font-light">
                {post.postLikes.length} likes
              </span>
            </div>
            <div className="ml-1 text-gray-500 font-light">
              {post.comments.length} comments
            </div>
          </div>
          <hr className="h-px my-2 bg-gray-200 border-0"></hr>
          <div className="flex flex-row">
            <LikeButton currentUser={currentUser} />
            <CommentButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePost;
