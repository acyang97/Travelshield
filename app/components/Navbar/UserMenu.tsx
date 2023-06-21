"use client";

import { AiOutlineMenu } from "react-icons/ai";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import Avatar from "./Avatar";

interface UserMenuProps {
  // currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({}) => {
  // const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative sm:positio">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={toggleOpen}
          className="p-3 md:py-1 md:px-3 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-lg cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src="" />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <MenuItem onClick={() => {}} label="Login" />
            {/* {currentUser ? (
              <>
                <MenuItem onClick={() => {}} label="My Trips" />
                <MenuItem onClick={() => {}} label="My Favorites" />
                <MenuItem onClick={() => {}} label="My Reservations" />
                <MenuItem onClick={() => {}} label="My Properties" />
                <MenuItem onClick={() => {}} label="Airbnb my home" />
                <MenuItem onClick={signOut} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => {
                    loginModal.onOpen();
                  }}
                  label="Login"
                />
              </>
            )} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
