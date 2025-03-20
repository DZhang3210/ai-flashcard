"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Link from "next/link";
import { AlignJustify, LogOut } from "lucide-react";

// import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/features/auth/api/use-current-user";
import useCreateSet from "@/hooks/create-set-hook";
import UserButton from "../auth/user-button";
import { useAuthActions } from "@convex-dev/auth/react";

const MobileSidebar = () => {
  const router = useRouter();
  const { data: user } = useCurrentUser();
  const { signOut } = useAuthActions();

  const createSet = useCreateSet();
  // const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const closeSheet = () => setIsOpen(false);

  const createSetAction = () => {
    if (user == null) {
      router.push("/auth");
    } else {
      createSet.setOn();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button onClick={() => setIsOpen(true)} aria-label="sidebar-trigger">
          <AlignJustify size={35} className="text-black" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-background1 w-[60%] overflow-y-auto text-black"
        aria-describedby="mobile sidebar"
      >
        <div className="flex flex-col justify-between h-full">
          <SheetTitle className="sr-only">mobile sidebar</SheetTitle>
          <div className="left-0 bottom-0 w-full flex flex-col gap-2 items-start justify-start">
            <Link href="/" className="inline-block" onClick={closeSheet}>
              <div className="space-x-1 border-2 border-font4 rounded-full px-6 py-2 hover:bg-font4 transition duration-300 text-font4 hover:text-white">
                <h1 className="text-base md:text-3xl font-bold">Recall IQ</h1>
              </div>
            </Link>
            <button
              onClick={createSetAction}
              className="text-black text-base  rounded-full hover:bg-font2 hover:text-white transition-all duration-300 relative"
            >
              Create Set
            </button>
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-2">
              <UserButton />
              {user?.isSubscribed && (
                <div className="text-sm text-gray-500">
                  Premium <br />
                  Member
                </div>
              )}
            </div>

            <div
              className="cursor-pointer text-sm text-gray-400 flex items-center gap-1 hover:bg-gray-200 transition justify-between"
              onClick={() => {
                signOut();
              }}
            >
              <LogOut size={32} className="text-red-700" />
            </div>
            <div></div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
