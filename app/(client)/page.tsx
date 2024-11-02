import { faq } from "@/lib/faq";
import { randomUUID } from "crypto";
import {
  BadgeDollarSign,
  BadgePlus,
  Lock,
  Pencil,
  School,
  Share,
  TestTube,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-background1 flex flex-col gap-20">
      <div className="flex flex-col items-center py-10 space-y-6 w-full h-full">
        <div className="flex flex-col items-center space-y-2">
          <h1 className="text-5xl  md:text-6xl lg:text-7xl xl:text-8xl font-bold px-10 md:px-20 max-w-7xl text-center">
            <span className="text-font3">Create</span>
            <span className="text-font1"> Stunning Flashcards</span> in
            <span className="text-font4"> seconds</span>
          </h1>
        </div>
        <Link href={`/user/current`}>
          <div className="bg-black text-black rounded-full hover:bg-font2/70 transition py-3 px-20 lg:py-5 duration-300 cursor-pointer">
            <div className="flex items-center justify-between space-x-2 text-xl lg:text-2xl text-white">
              Let&apos;s Go!
            </div>
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-center w-full">
        <div className=" grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-4 gap-4 w-full max-w-7xl border-3xl m-4 rounded-3xl">
          <button className="bg-font1 rounded-lg w-full flex flex-col items-center p-4 hover:bg-font1/80 transition h-[200px] sm:h-[250px] xl:h-[300px]">
            <p className="text-3xl font-bold text-white">Generate</p>
            <div className="flex flex-row items-center justify-center mt-6">
              <BadgePlus className="w-24 h-24 sm:w-32 sm:h-32 text-white" />
            </div>
          </button>
          <button className="bg-font2 rounded-lg w-full flex flex-col items-center p-4 hover:bg-font2/80 transition h-[200px] sm:h-[250px] xl:h-[300px]">
            <p className="text-3xl text-white font-bold">Edit</p>
            <div className="flex flex-row items-center justify-center mt-6">
              <Pencil className="w-24 h-24 sm:w-32 sm:h-32 text-white" />
            </div>
          </button>
          <button className="bg-font3 rounded-lg w-full flex flex-col items-center p-4 hover:bg-font3/80 transition h-[200px] sm:h-[250px] xl:h-[300px]">
            <p className="text-3xl text-white font-bold">Test</p>
            <div className="flex flex-row items-center justify-center mt-6">
              <TestTube className="w-24 h-24 sm:w-32 sm:h-32 text-white" />
            </div>
          </button>
          <button className="bg-font4 rounded-lg w-full flex flex-col items-center p-4 hover:bg-font4/80 transition h-[200px] sm:h-[250px] xl:h-[300px]">
            <p className="text-3xl text-white font-bold">Share</p>
            <div className="flex flex-row items-center justify-center mt-6">
              <Share className="w-24 h-24 sm:w-32 sm:h-32 text-white" />
            </div>
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full my-20">
        <h1 className="text-4xl font-bold">Why Use Recall IQ?</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center justify-center max-w-7xl mx-auto gap-5 mt-10">
          <div className="border border-black rounded-xl p-4 space-y-4">
            <BadgeDollarSign className="w-10 h-10" />
            <h1 className="text-3xl font-bold mt-2">Free</h1>
            <p className="mt-2">
              Recall IQ is completely free to use. No subscription fees, no
              hidden costs. We strive to improve learning for everyone.
            </p>
          </div>
          <div className="border border-black rounded-xl p-4">
            <Lock className="w-10 h-10" />
            <h1 className="text-3xl font-bold mt-2">Privacy</h1>
            <p className="mt-2">
              Recall IQ doesn&apos;t sell or process any of your data. Your
              flashcards can be accessed by other students, but your data is
              your own
            </p>
          </div>
          <div className="border border-black rounded-xl p-4">
            <School className="w-10 h-10" />
            <h1 className="text-3xl font-bold">For Students</h1>
            <p className="mt-2">
              Recall IQ was made for students by students to be the ultimate
              streamlined experience of creating flashcards.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-center max-w-6xl mx-auto my-20">
        <h1 className="text-4xl font-bold text-center w-full">FAQ?</h1>
        {faq.map(({ question, answer }) => {
          return (
            <div className=" rounded-xl p-4" key={randomUUID()}>
              <h1 className="text-3xl font-bold">{question}</h1>
              <p className="mt-2">{answer}</p>
            </div>
          );
        })}
      </div>
      <div className="bg-black text-white rounded-xl py-3 px-10 duration-300 cursor-pointer items-center flex justify-between gap-10 mx-20">
        <span className="text-font4 border-2 rounded-full px-4 py-1 border-font4 transition hover:bg-font4 hover:text-white">
          Recall IQ
        </span>
        <span className="space-x-2 text-base bg-font1 rounded-xl p-2">
          Start Creating Now
        </span>
      </div>
    </div>
  );
}
