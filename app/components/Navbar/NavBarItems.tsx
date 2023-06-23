"use client";

import React from "react";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeUser } from "@/app/types";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import {
  MdOutlineFeed,
  MdFeed,
  MdOutlineCreate,
  MdCreate,
} from "react-icons/md";

interface Props {
  currentUser?: SafeUser | null;
}
const NavBarItems: React.FC<Props> = ({ currentUser }) => {
  const router = useRouter();
  const pathname = usePathname();
  const loginModal = useLoginModal();

  const onPostClick = () => {
    if (currentUser) {
      router.push("/post");
      return;
    }
    loginModal.onOpen();
  };

  return (
    <div className="w-full md:w-auto py-2">
      <div className="flex flex-row items-center justify-between">
        <Link
          href="/"
          className="text-sm font-semibold px-6 cursor-pointer rounded-lg  transition hover:bg-neutral-100 flex flex-col"
        >
          {pathname === "/" ? (
            <AiFillHome size={24} className="flex justify-center mx-auto" />
          ) : (
            <AiOutlineHome size={24} className="flex justify-center mx-auto" />
          )}
          <span className="flex justify-center">Home</span>
        </Link>
        <Link
          href="/feed"
          className="text-sm font-semibold px-4 cursor-pointer rounded-lg  transition hover:bg-neutral-100"
        >
          {pathname === "/feed" ? (
            <MdFeed size={24} className="flex justify-center mx-auto" />
          ) : (
            <MdOutlineFeed size={24} className="flex justify-center mx-auto" />
          )}
          <span className="flex justify-center">Feed</span>
        </Link>
        <button
          onClick={onPostClick}
          className="text-sm font-semibold px-6 cursor-pointer rounded-lg  transition hover:bg-neutral-100"
        >
          {pathname === "/post" ? (
            <MdCreate size={24} className="flex justify-center mx-auto" />
          ) : (
            <MdOutlineCreate
              size={24}
              className="flex justify-center mx-auto"
            />
          )}
          <span className="flex justify-center">Post</span>
        </button>
      </div>
    </div>
  );
};

export default NavBarItems;
