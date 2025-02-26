import Link from "next/link";
import React from "react";
import SubscriptionButton from "../subscription-button";

const HeroPage = () => {
  return (
    <div className="mx-auto w-full bg-background1">
      <div className="flex flex-col justify-center items-center py-10 space-y-6 w-full">
        <div className="flex flex-col items-center w-full justify-center gap-2">
          <div className="flex flex-col gap-2 b">
            <h1 className="text-5xl font-bold px-5 text-center flex flex-col w-ful text-font4">
              Instantly convert your text into flashcards
            </h1>
            <p className="text-lg text-center w-full text-font3">
              We accept pdf, text, and image files.
            </p>
          </div>
          <div className="flex flex-row gap-2">
            <Link
              href={`/explore`}
              className="mt-5 text-lg px-4 py-2 border-2 border-black rounded-full hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-2 group"
            >
              Explore Flashcards
              {/* <MoveRight className="w-8 h-8 inline-block group-hover:translate-x-2 transition-all duration-300" /> */}
            </Link>
            <Link
              href={`/explore`}
              className="mt-5 text-lg px-4 py-2 border-2 border-black rounded-full hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-2 group"
            >
              Create My Own
              {/* <MoveRight className="w-8 h-8 inline-block group-hover:translate-x-2 transition-all duration-300" /> */}
            </Link>
          </div>
          <SubscriptionButton />
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
