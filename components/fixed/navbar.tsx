"use client";

import Link from "next/link";
import UserButton from "../auth/user-button";

export default function Navbar() {
  return (
    <nav className="bg-green-500 h-[80px] flex items-center justify-between sticky top-0 z-50 px-5">
      <Link href="/" className="hidden md:block">
        <div className="flex items-center space-x-1 ">
          <h1 className="text-3xl font-bold hidden md:block text-yellow-300">
            AI Words
          </h1>
        </div>
      </Link>

      {/* Right side buttons */}
      <div className="flex items-center space-x-8">
        <UserButton />
      </div>
    </nav>
  );
}
