"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { SignInFlow } from "./types";
import { TriangleAlert } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import { Label } from "../ui/label";
import Link from "next/link";
interface SignInCardProps {
  setState: (state: SignInFlow) => void;
}

const SignInCard: React.FC<SignInCardProps> = ({ setState }) => {
  const { signIn } = useAuthActions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setPending(true);
    signIn("password", { email, password, flow: "signIn" })
      .catch(() => {
        setError("Invalid email or password");
      })
      .finally(() => {
        setPending(false);
      });
  };
  const handleProviderSignIn = (value: "github" | "google") => {
    setPending(true);
    signIn(value).finally(() => {
      setPending(false);
    });
  };

  return (
    <Card className="w-full h-full p-8 bg-background1 text-black border-none shadow-none">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-4xl w-full text-center">Welcome</CardTitle>
        <Link href="/">
          <CardDescription className="text-font4 text-xl text-center border-2 rounded-full px-4 py-1 w-fit mx-auto border-font4 hover:bg-font4 hover:text-white transition duration-300 cursor-pointer">
            Recall IQ
          </CardDescription>
        </Link>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>{error} </p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-8" onSubmit={onPasswordSignIn}>
          <div className="flex flex-col gap-y-1">
            <Label className="text-base uppercase" htmlFor="email">
              Email Address
            </Label>
            <Input
              disabled={pending}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="h-10 text-xl border-0 border-b border-gray-300 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b-2 focus-visble: outline-none focus-visible:border-black transition-all duration-100"
              required
              name="email"
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <Label className="text-base uppercase" htmlFor="password">
              Password
            </Label>
            <Input
              disabled={pending}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="h-10 text-base border-0 border-b border-gray-300 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b-2 focus-visble: outline-none focus-visible:border-black transition-all duration-100"
              required
              name="password"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-black text-white hover:bg-black/60 text-base font-semibold"
            size="lg"
            disabled={pending}
            aria-label="submit button"
          >
            Continue
          </Button>
        </form>
        <div className="flex w-full items-center">
          <div className="flex-grow border-t-2 border-black" />
          <p className=" px-2 lowercase text-lg">or</p>
          <div className="flex-grow border-t-2 border-black" />
        </div>
        <div className="grid grid-cols-2 gap-4 text-black">
          <Button
            disabled={pending}
            onClick={() => handleProviderSignIn("google")}
            variant="outline"
            size="lg"
            className="w-full flex items-center justify-center text-base"
            aria-label="google button"
          >
            <FaGoogle className="text-2xl" />
            Google
          </Button>
          <Button
            disabled={pending}
            onClick={() => handleProviderSignIn("github")}
            variant="outline"
            size="lg"
            className="w-full flex items-center justify-center text-base"
            aria-label="github button"
          >
            <FaGithub className="text-2xl" />
            Github
          </Button>
        </div>
        <p className="text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <span
            className="text-sky-700 hover:underline cursor-pointer"
            onClick={() => setState("signUp")}
            aria-label="sign up button"
          >
            Sign up
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignInCard;
