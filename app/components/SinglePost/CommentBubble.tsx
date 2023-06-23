"use client";

import { FullComment } from "@/app/interfaces/comment.interface";
import { getDateDifference } from "@/app/utils/date.utils";
import React from "react";
import Image from "next/image";

interface Props {
  comment: FullComment;
}

const CommentBubble: React.FC<Props> = ({ comment }) => {
  return (
    <>
      <div className="bg-white text-black px-4 py-2 antialiased flex">
        <Image
          src={comment.user.image || "/images/placeholder"}
          alt="user image"
          width={32}
          height={32}
          className="rounded-full h-8 w-8 mr-2 mt-1"
        />
        <div>
          <div className="bg-gray-100 rounded-xl px-4 pt-2 pb-2">
            <div className="font-semibold text-sm leading-relaxed">
              {comment.user.displayName ?? comment.user.name}
            </div>
            <div className="text-sm leading-snug md:leading-normal">
              {comment.content}
            </div>
          </div>
          <div className="text-sm ml-4 mt-0.5 text-gray-500">
            {getDateDifference(String(comment.datePosted))} ago
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentBubble;
