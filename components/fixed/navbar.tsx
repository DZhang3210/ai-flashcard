"use client";

import Link from "next/link";
import UserButton from "../auth/user-button";
import MobileSidebar from "./mobile-sidebar";
import useCreateSet from "@/hooks/create-set-hook";
import { useCurrentUser } from "@/features/auth/api/use-current-user";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const createSetAction = () => {
    if (user == null) {
      router.push("/auth");
    } else {
      createSet.setOn();
    }
  };

  const createSet = useCreateSet();
  const { data: user } = useCurrentUser();
  return (
    <nav className="bg-background2 h-[100px] flex items-center justify-between sticky top-0 z-50 px-10">
      <div className="max-w-[1200px] mx-auto w-full flex items-center justify-between">
        <Link href="/" className="hidden md:block">
          <div
            className={cn(
              "flex items-center space-x-1 border-2 border-font4 rounded-full px-6 py-2 hover:bg-font4 transition duration-300 text-font4 hover:text-white",
              pathname === "/" && "bg-font4 text-white"
            )}
          >
            <h1 className="text-xl font-bold hidden md:block ">Recall IQ </h1>
          </div>
        </Link>
        <Link
          href="/explore"
          className={cn(
            "hidden md:block border-2 rounded-full border-font1 text-font1 px-6 py-1 hover:bg-font1 transition duration-300 hover:text-white text-lg",
            pathname === "/explore" && "bg-font1 text-white"
          )}
        >
          Explore
        </Link>
        <div className="block md:hidden">
          <MobileSidebar />
        </div>
        {/* Right side buttons */}
        <div className="flex items-center space-x-8">
          <button
            onClick={createSetAction}
            className="text-font2 text-lg  px-6 py-1 border-2 border-font2 rounded-full hover:bg-font2 hover:text-white transition-all duration-300 relative"
          >
            Create Set <br />
            {user == null && (
              <span className="absolute top-[100%] left-0 right-0 text-xs text-gray-500">
                must be logged in
              </span>
            )}
          </button>
          <UserButton />
        </div>
      </div>
    </nav>
  );
}
