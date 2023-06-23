"use client";

import React from "react";
import { BiCommentDetail } from "react-icons/bi";

interface Props {
  toggleShowCommentInput: () => void;
  commentInputOpen: boolean;
}
const CommentButton: React.FC<Props> = ({
  toggleShowCommentInput,
  commentInputOpen,
}) => {
  const iconToShow = <BiCommentDetail size={20} />;

  return (
    <div className="basis-1/2 flex justify-center align-middle m-1">
      <span
        className="text-center cursor-pointer rounded-xl py-1 px-2 hover:bg-slate-100 flex flex-row"
        onClick={toggleShowCommentInput}
      >
        {iconToShow}
        <span className="pl-1">{commentInputOpen ? "Close" : "Comment"}</span>
      </span>
    </div>
  );
};

export default CommentButton;
