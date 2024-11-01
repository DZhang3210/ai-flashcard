"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Link from "next/link";
import { AlignJustify, Compass, Home, Users } from "lucide-react";

// import { usePathname } from "next/navigation";
import NavLink from "./nav-link";

const MobileSidebar = () => {
  // const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const closeSheet = () => setIsOpen(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button onClick={() => setIsOpen(true)} aria-label="sidebar-trigger">
          <AlignJustify size={40} className="text-black" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-background1 w-[60%] overflow-y-auto text-black"
        aria-describedby="mobile sidebar"
      >
        <SheetTitle className="sr-only">mobile sidebar</SheetTitle>
        <div className="left-0 bottom-0 w-full">
          <Link href="/" className="inline-block" onClick={closeSheet}>
            <div className="space-x-1 border-2 border-font4 rounded-full px-6 py-2 hover:bg-font4 transition duration-300 text-font4 hover:text-white">
              <h1 className="text-2xl md:text-3xl font-bold">Recall IQ</h1>
            </div>
          </Link>
          <div className="flex flex-col items-start justify-start h-full py-4 px-2 space-y-2">
            <NavLink href="/posts" icon={Home} closeSheet={closeSheet}>
              Home
            </NavLink>
            <NavLink href="/popular" icon={Compass} closeSheet={closeSheet}>
              Popular
            </NavLink>
            <NavLink href="/thread" icon={Users} closeSheet={closeSheet}>
              Explore
            </NavLink>

            {/* <Separator className="w-full my-4" /> */}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
