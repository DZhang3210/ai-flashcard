"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowRight, LogOut } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useCurrentUser } from "@/features/auth/api/use-current-user";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useCreatePremium from "@/hooks/create-premium-hook";

const UserButton = () => {
  const router = useRouter();
  const { signOut } = useAuthActions();
  const premium = useCreatePremium();
  const { data, isLoading } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="size-[60px] hover:opacity-75 transition animate-pulse rounded-full bg-muted-foreground"></div>
    );
  }

  if (!data) {
    return (
      <Link href="/auth">
        <button className="border-2 border-font3 rounded-full px-6 py-1 hover:bg-font3 text-font3 transition duration-300 hover:text-white text-lg">
          Sign in
        </button>
      </Link>
    );
  }
  const { name, email } = data;
  const avatarFallback = name!
    .split(" ")
    .map((part) => part[0]?.toUpperCase())
    .filter(Boolean)
    .slice(0, 2)
    .join("");

  // const router = useRouter();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-[50px] hover:opacity-75 transition border-2 border-font3 hover:border-transparent">
          <AvatarFallback className="text-font3 text-xl hover:bg-font3 transition hover:text-white">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60 bg-background1 text-gray-800 "
        align="end"
      >
        <DropdownMenuItem
          className="cursor-pointer text-lg flex items-center group p-2"
          asChild
        >
          <div
            className="flex items-center space-x-4 hover:bg-gray-200 transition m-0"
            onClick={() => router.push(`/user/current`)}
          >
            <div className="flex flex-col">
              <p className="text-base font-bold text-gray-800 group-hover:text-gray-800 transition">
                {name}
              </p>
              <p className="text-xs text-gray-400">{email}</p>
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="border-t-2 border-gray-200 mx-1" />

        <DropdownMenuItem
          className="cursor-pointer text-sm text-gray-400 flex items-center gap-1 hover:bg-gray-200 transition justify-between"
          onClick={() => {
            signOut();
          }}
        >
          Log out
          <LogOut size={32} className="text-gray-800" />
        </DropdownMenuItem>

        {!data.isSubscribed && (
          <>
            <DropdownMenuSeparator className="border-t-2 border-gray-200 mx-1" />
            <DropdownMenuItem
              className="cursor-pointer text-sm text-gray-400 flex items-center gap-1 hover:bg-gray-200 transition justify-between"
              onClick={() => {
                premium.setIsOn(true);
              }}
            >
              <div className="flex items-center gap-1 justify-center w-full bg-gray-800 text-white px-2 py-1 rounded-md">
                <p>Upgrade to Pro</p>
                <ArrowRight size={16} className="text-gray-800" />
              </div>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
