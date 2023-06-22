"use client";

import { AiOutlineHeart } from "react-icons/ai";

const CommentButton = () => {
  const iconToShow = <AiOutlineHeart size={20} />;

  return (
    <div className="basis-1/2 flex justify-center align-middle m-1">
      <span className="text-center cursor-pointer rounded-xl py-1 px-2 hover:bg-slate-100 flex flex-row">
        {iconToShow}
        <span className="pl-1">Comment</span>
      </span>
    </div>
  );
};

export default CommentButton;
