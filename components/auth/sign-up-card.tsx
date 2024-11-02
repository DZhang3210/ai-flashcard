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
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlert } from "lucide-react";
import { Label } from "../ui/label";

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}

const SignUpCard: React.FC<SignUpCardProps> = ({ setState }) => {
  const { signIn } = useAuthActions();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setPending(true);
    signIn("password", { name, email, password, flow: "signUp" })
      .catch(() => {
        setError("Something went wrong");
      })
      .finally(() => {
        setPending(false);
      });
  };

  const handleProviderSignUp = (value: "github" | "google") => {
    setPending(true);
    signIn(value).finally(() => setPending(false));
  };

  return (
    <Card className="w-full h-full p-8 bg-background1 text-black border-none shadow-none">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-5xl w-full text-center">Sign In</CardTitle>
        <CardDescription className="text-font4 text-3xl text-center border-2 rounded-full px-4 py-1 w-fit mx-auto border-font4">
          Recall IQ
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>{error} </p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-5" onSubmit={onPasswordSignUp}>
          <div className="flex flex-col gap-y-1">
            <Label className="text-lg uppercase" htmlFor="name">
              Full Name
            </Label>
            <Input
              disabled={pending}
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="name"
              className="h-10 text-xl border-0 border-b border-gray-300 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b-2 focus-visble: outline-none focus-visible:border-black transition-all duration-100"
              name="name"
              required
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <Label className="text-lg uppercase" htmlFor="email">
              Email Address
            </Label>
            <Input
              disabled={pending}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="h-10 text-xl border-0 border-b border-gray-300 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b-2 focus-visble: outline-none focus-visible:border-black transition-all duration-100"
              required
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <Label className="text-lg uppercase" htmlFor="password">
              Password
            </Label>
            <Input
              disabled={pending}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="h-10 text-xl border-0 border-b border-gray-300 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b-2 focus-visble: outline-none focus-visible:border-black transition-all duration-100"
              required
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <Label className="text-lg uppercase" htmlFor="confirmPassword">
              Confirm Password
            </Label>
            <Input
              disabled={pending}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              className="h-10 text-xl border-0 border-b border-gray-300 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b-2 focus-visble: outline-none focus-visible:border-black transition-all duration-100"
              required
              aria-label="confirm password"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-black text-white hover:bg-black/60 text-xl font-semibold"
            size="lg"
            disabled={pending}
            aria-label="continue button"
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
            onClick={() => handleProviderSignUp("google")}
            variant="outline"
            size="lg"
            className="w-full flex items-center justify-center text-xl"
            aria-label="google button"
          >
            <FaGoogle className="text" />
            Google
          </Button>
          <Button
            disabled={pending}
            onClick={() => handleProviderSignUp("github")}
            variant="outline"
            size="lg"
            className="w-full flex items-center justify-center text-xl"
            aria-label="github button"
          >
            <FaGithub className="text-xl" />
            Github
          </Button>
        </div>
        <p className="text-base text-gray-600">
          Already have an account?{" "}
          <span
            className="text-sky-700 hover:underline cursor-pointer"
            onClick={() => setState("signIn")}
            aria-label="sign in button"
          >
            Sign In
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignUpCard;
