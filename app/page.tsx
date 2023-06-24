"use client";

import { signIn } from "next-auth/react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { MdOutlineFeed } from "react-icons/md";
import HomeImage1 from "@/public/images/home-1.svg";
import HomeImage2 from "@/public/images/home-2.svg";
import Image from "next/image";

export default function Home() {
  const headerContent = (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-3xl md:text-6xl font-extrabold text-center">
        Welcome to TravelShield
      </h2>
      <div className="mt-5 md:mt-10">
        <p className="text-base md:text-lg text-center text-slate-500">
          Welcome to our vibrant travel community, TravelShield, a platform
          dedicated to sharing valuable insights from personal adventures.
          Whether you have encountered scams to beware of, mastered the art of
          city exploration, or discovered clever money-saving techniques, your
          experiences can now be a guiding light for fellow travelers.
        </p>
      </div>
    </div>
  );

  const cta = (
    <>
      <div
        className="w-[90%] md:w-1/4 text-white bg-emerald-500 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium md:font-semibold rounded-lg text-lg px-5 py-2.5 text-center flex flex-row justify-between cursor-pointer"
        onClick={() => signIn("google")}
      >
        <AiFillGoogleCircle size={24} color="white" />
        <div>Google Login</div>
        <span />
      </div>
      <div
        className="w-[90%] md:w-1/4 text-white bg-emerald-500 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium md:font-semibold rounded-lg text-lg px-5 py-2.5 text-center flex flex-row justify-between cursor-pointer"
        onClick={() => signIn("google")}
      >
        <MdOutlineFeed size={24} className="white" />
        <div>Read Posts</div>
        <span />
      </div>
    </>
  );

  return (
    <main>
      <div className="py-14" />
      <div className="mx-6 md:mx-20">
        <div className="flex items-center justify-center">{headerContent}</div>
        <div className="flex justify-center gap-2 md:gap-5 mt-10">{cta}</div>
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-10 mx-3 md:mx-20">
          <div className="flex flex-col gap-3 mt-10 md:mt-20 px-auto mx-auto">
            <h3 className="text-center font-semibold text-xl md:text-2xl">
              Why TravelShield?
            </h3>
            <p className="text-justify text-base text-slate-500">
              It all started with a fateful trip to Kazakhstan, where I
              personally experienced the frustration and disappointment of being
              scammed by a taxi driver. Unable to purchase a SIM card and
              without the necessary resources to navigate the local
              transportation system, my day took an unfortunate turn. It was in
              that moment that the idea for TravelShield was born. TravelShield
              aims to be the ultimate go-to platform, empowering individuals to
              share their invaluable insights and stories from their travels. We
              want to provide a space where people can connect, learn from one
              another, and be better prepared for their upcoming adventures.
            </p>
          </div>
          {/* <div className="flex justify-center"> */}
          <Image
            src={HomeImage2}
            alt="Home Image"
            className="sm:w-[100%] md:w-[60%]"
          />
          {/* </div> */}
        </div>
      </div>

      {/* CTA Buttons */}
    </main>
  );
}
