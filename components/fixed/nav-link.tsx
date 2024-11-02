import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({
  href,
  children,
  closeSheet,
  className,
}: {
  href: string;
  children: React.ReactNode;
  closeSheet: () => void;
  className?: string;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        "text-lg xl:text-2xl transition-all duration-300 border-2 rounded-lg p-3 border-transparent cursor-pointer w-full flex items-center gap-2",
        isActive && "bg-gray-800 border-gray-500",
        className
      )}
      onClick={closeSheet}
    >
      <span className={cn(isActive && "font-bold")}>{children}</span>
    </Link>
  );
};

export default NavLink;
