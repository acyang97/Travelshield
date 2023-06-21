import Image from "next/image";
import React from "react";
import MaxContainer from "../MaxContainer";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import NavBarItems from "./NavBarItems";

const NavBar: React.FC = () => {
  return (
    <>
      <nav className="bg-white fixed w-full z-10 shadow-sm">
        <div className="py-4 border-b-[1px]">
          <MaxContainer>
            <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
              <Logo />
              <NavBarItems />
              <UserMenu />
            </div>
          </MaxContainer>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
