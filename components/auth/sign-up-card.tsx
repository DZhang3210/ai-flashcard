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
import { Separator } from "@/components/ui/separator";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { SignInFlow } from "./types";
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlert } from "lucide-react";

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
    <Card className="w-full h-full p-8 bg-[#181C1F] text-white">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-2xl">Sign up to Continue</CardTitle>
        <CardDescription className="text-gray-300 text-xl">
          Use your email or another serve to continue
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>{error} </p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2" onSubmit={onPasswordSignUp}>
          <Input
            disabled={pending}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            type="name"
            className="h-10 text-xl"
            required
          />
          <Input
            disabled={pending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className="h-10 text-xl"
            required
          />
          <Input
            disabled={pending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="h-10 text-xl"
            required
          />
          <Input
            disabled={pending}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            type="password"
            className="h-10 text-xl"
            required
            aria-label="confirm password"
          />
          <Button
            type="submit"
            className="w-full bg-white text-black hover:bg-gray-400 text-xl font-semibold"
            size="lg"
            disabled={pending}
            aria-label="continue button"
          >
            Continue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5 text-black">
          <Button
            disabled={pending}
            onClick={() => handleProviderSignUp("google")}
            variant="outline"
            size="lg"
            className="w-full relative text-xl"
            aria-label="google button"
          >
            <FaGoogle className="size-5 absolute top-2.5 left-2.5" />
            Continue with Google
          </Button>
          <Button
            disabled={pending}
            onClick={() => handleProviderSignUp("github")}
            variant="outline"
            size="lg"
            className="w-full relative text-xl"
            aria-label="github button"
          >
            <FaGithub className="size-5 absolute top-2.5 left-2.5" />
            Continue with Github
          </Button>
        </div>
        <p className="text-base text-gray-300">
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
