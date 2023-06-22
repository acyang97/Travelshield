"use client";

import React from "react";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeUser } from "@/app/types";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  currentUser?: SafeUser | null;
}
const NavBarItems: React.FC<Props> = ({ currentUser }) => {
  const router = useRouter();
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
          className="text-sm font-semibold px-6 cursor-pointer rounded-lg  transition hover:bg-neutral-100"
        >
          Home
        </Link>
        <Link
          href="/"
          className="text-sm font-semibold px-4 cursor-pointer rounded-lg  transition hover:bg-neutral-100"
        >
          Feed
        </Link>
        <button
          onClick={onPostClick}
          className="text-sm font-semibold px-6 cursor-pointer rounded-lg  transition hover:bg-neutral-100"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default NavBarItems;
