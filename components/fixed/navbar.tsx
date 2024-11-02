"use client";

import Link from "next/link";
import UserButton from "../auth/user-button";
import MobileSidebar from "./mobile-sidebar";

export default function Navbar() {
  return (
    <nav className="bg-background1 h-[100px] flex items-center justify-between sticky top-0 z-50 px-10">
      <Link href="/" className="hidden md:block">
        <div className="flex items-center space-x-1 border-2 border-font4 rounded-full px-6 py-2 hover:bg-font4 transition duration-300 text-font4 hover:text-white">
          <h1 className="text-3xl font-bold hidden md:block ">Recall IQ </h1>
        </div>
      </Link>
      <Link
        href="/explore"
        className="hidden md:block border-2 rounded-full border-font1 text-font1 px-6 py-2 hover:bg-font1 transition duration-300 hover:text-white text-2xl"
      >
        Explore
      </Link>
      <div className="block md:hidden">
        <MobileSidebar />
      </div>
      {/* Right side buttons */}
      <div className="flex items-center space-x-8">
        <UserButton />
      </div>
    </nav>
  );
}
