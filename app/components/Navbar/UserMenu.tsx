"use client";

import { AiOutlineMenu } from "react-icons/ai";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import Avatar from "./Avatar";
import { SafeUser } from "@/app/types";
import { FcGoogle } from "react-icons/fc";
import { signIn, signOut } from "next-auth/react";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  // const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
          {currentUser?.name}
        </div>

        {currentUser ? (
          <div
            onClick={toggleOpen}
            className="p-3 md:py-1 md:px-3 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-lg cursor-pointer hover:shadow-md transition"
          >
            <AiOutlineMenu />
            <div className="hidden md:block">
              <Avatar src={currentUser.image} />
            </div>
          </div>
        ) : (
          <div
            className="flex flex-row items-center justify-between w-ful border-black border-[1px] rounded-2xl transition hover:opacity-80 px-3 py-2 cursor-pointer"
            onClick={() => signIn("google")}
          >
            <FcGoogle size={20} className="pr-1" />
            <p className="text-xs">Google Sign In</p>
          </div>
        )}
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <MenuItem onClick={() => {}} label="Profile" />
            <MenuItem onClick={() => {}} label="Settings" />
            <MenuItem onClick={signOut} label="Logout" />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
