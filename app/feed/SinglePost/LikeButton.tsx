"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import { FormattedFullPost } from "@/app/interfaces/post.interface";
import { SafeUser } from "@/app/types";
import axios from "axios";
import { AiOutlineHeart } from "react-icons/ai";
import { debounce } from "lodash";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  post: FormattedFullPost;
  currentUser?: SafeUser | null;
  setNumberOfLikes: Dispatch<SetStateAction<number>>;
}

const LikeButton: React.FC<Props> = ({
  currentUser,
  post,
  setNumberOfLikes,
}) => {
  const { likedByUser } = post;
  const [liked, setLiked] = useState(likedByUser);
  const loginModal = useLoginModal();

  const updateLike = async () => {
    setLiked((current) => !current);
    setNumberOfLikes((value) => (liked ? value - 1 : value + 1));
    const body = { postId: post.id, likeValue: !liked ? 1 : 0 };
    await axios.post("/api/postLikes", body);
  };

  const debounced = debounce(updateLike, 500);
  const onLikeButtonClick = async () => {
    if (!currentUser) {
      loginModal.onOpen();
      return;
    }
    debounced();
  };
  const iconToShow = <AiOutlineHeart size={20} />;
  return (
    <div
      className="basis-1/2 flex justify-center align-middle m-1"
      onClick={onLikeButtonClick}
    >
      <span className="text-center cursor-pointer rounded-xl py-1 px-2 hover:bg-slate-100 flex flex-row">
        {iconToShow}
        <span className="pl-1">{liked ? "Liked" : "Like"}</span>
      </span>
    </div>
  );
};

export default LikeButton;
