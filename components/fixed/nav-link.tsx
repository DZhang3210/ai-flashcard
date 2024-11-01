import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({
  href,
  icon: Icon,
  children,
  closeSheet,
}: {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
  closeSheet: () => void;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        "text-lg xl:text-2xl transition-all duration-300 border-2 rounded-2xl p-3 border-transparent hover:border-gray-500 hover:bg-gray-800 cursor-pointer w-full flex items-center gap-2 ",
        isActive && "bg-gray-800 border-gray-500"
      )}
      onClick={closeSheet}
    >
      <Icon size={28} className={cn(isActive && "text-white")} />
      <span className={cn(isActive && "font-bold")}>{children}</span>
    </Link>
  );
};

export default NavLink;
