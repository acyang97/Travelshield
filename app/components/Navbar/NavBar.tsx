import React from "react";
import MaxContainer from "../MaxContainer";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import NavBarItems from "./NavBarItems";
import { SafeUser } from "@/app/types";

interface NavBarProps {
  currentUser?: SafeUser | null;
}
const NavBar: React.FC<NavBarProps> = ({ currentUser }) => {
  return (
    <>
      <nav className="fixed w-full bg-white z-10 shadow-sm">
        <div className="py-1 border-b-[1px]">
          <MaxContainer>
            <div
              className="
              flex 
              flex-row 
              items-center 
              justify-between
              gap-3
              md:gap-0
            "
            >
              <Logo />
              <NavBarItems currentUser={currentUser} />
              <UserMenu currentUser={currentUser} />
            </div>
          </MaxContainer>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
