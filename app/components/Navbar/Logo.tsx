"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return <div onClick={() => router.push("/")}>TravelShield</div>;
};

export default Logo;
