"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useCurrentUser } from "@/features/auth/api/use-current-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import Link from "next/link";

const UserButton = () => {
  const router = useRouter();
  const { signOut } = useAuthActions();
  const { data, isLoading } = useCurrentUser();

  // console.log("USER", data?.image);
  if (isLoading) {
    return (
      <div className="size-[60px] hover:opacity-75 transition animate-pulse rounded-full bg-muted-foreground"></div>
    );
  }

  if (!data) {
    return (
      <Link href="/auth">
        <button className="border-2 border-font3 rounded-full px-6 py-2 hover:bg-font3 text-font3 transition duration-300 hover:text-white text-2xl">
          Sign in
        </button>
      </Link>
    );
  }
  const { name, image, email } = data;
  const avatarFallback = name!.charAt(0).toUpperCase();

  // const router = useRouter();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-[60px] hover:opacity-75 transition">
          <AvatarImage alt={name} src={image} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 bg-background1 text-black *:p-6">
        <DropdownMenuItem
          className="cursor-pointer text-lg flex items-center group "
          asChild
        >
          <div
            className="flex items-center space-x-4 hover:bg-black/90 transition"
            onClick={() => router.push(`/user/current`)}
          >
            <Avatar className="size-[50px] hover:opacity-75 transition">
              <AvatarImage alt={name} src={image} />
              <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-lg font-bold text-black group-hover:text-black transition">
                {name}
              </p>
              <p className="text-sm text-gray-400">{email}</p>
            </div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer text-xl flex items-center hover:bg-black/90 transition"
          onClick={() => {
            signOut();
          }}
        >
          <LogOut className="size-8 mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
