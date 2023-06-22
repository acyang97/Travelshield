"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeUser } from "@/app/types";
import axios from "axios";
import { AiOutlineHeart } from "react-icons/ai";

interface Props {
  currentUser?: SafeUser | null;
}

const LikeButton: React.FC<Props> = ({ currentUser }) => {
  const loginModal = useLoginModal();
  const api = async () => {
    await axios.post("/postLikes");
  };
  const onLikeButtonClick = async () => {
    if (!currentUser) {
      loginModal.onOpen();
      return;
    }

    console.log("clicked");
  };
  const iconToShow = <AiOutlineHeart size={20} />;
  return (
    <div className="basis-1/2 flex justify-center align-middle m-1">
      <span className="text-center cursor-pointer rounded-xl py-1 px-2 hover:bg-slate-100 flex flex-row">
        {iconToShow}
        <span className="pl-1">Like</span>
      </span>
    </div>
  );
};

export default LikeButton;
