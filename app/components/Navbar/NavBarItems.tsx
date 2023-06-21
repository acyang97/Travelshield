"use client";

import Link from "next/link";

const NavBarItems = () => {
  return (
    <div className="w-full md:w-auto py-2">
      <div className="flex flex-row items-center justify-between">
        <Link href="/" className="text-sm font-semibold px-6 cursor-pointer">
          Home
        </Link>
        <Link href="/" className="text-sm font-semibold px-6 cursor-pointer">
          Feed
        </Link>
        <Link href="/" className="text-sm font-semibold px-6 cursor-pointer">
          Post
        </Link>
      </div>
    </div>
  );
};

export default NavBarItems;
