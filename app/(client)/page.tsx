import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-background1">
      <div className="flex flex-col items-center py-10 space-y-6 w-full h-full">
        <div className="flex flex-col items-center space-y-2">
          <h1 className="text-5xl  md:text-6xl lg:text-7xl xl:text-8xl font-bold px-10 md:px-20 max-w-7xl text-center">
            <span className="text-font3">Create</span>
            <span className="text-font1"> Stunning Flashcards</span> in
            <span className="text-font4"> seconds</span>
          </h1>
        </div>
        <Button className="bg-black text-black rounded-full hover:bg-font2/70 transition py-5 px-20 lg:py-7 duration-300">
          <div className="flex items-center justify-between space-x-2 text-xl lg:text-3xl text-white">
            <Link href={`/user`}>Let&apos;s Go!</Link>
          </div>
        </Button>
      </div>
      <div className="flex items-center justify-center  w-full">
        <div className=" grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-4 gap-4 w-full max-w-7xl border-3xl m-4 rounded-3xl">
          <button className="bg-font1 rounded-lg w-full flex flex-col items-center p-4 hover:bg-font1/80 transition h-[200px] md:h-[250px] xl:h-[300px]">
            <p className="text-3xl font-bold text-white">Generate</p>
          </button>
          <button className="bg-font2 rounded-lg w-full flex flex-col items-center p-4 hover:bg-font2/80 transition h-[200px] md:h-[250px] xl:h-[300px]">
            <p className="text-3xl text-white font-bold">Edit</p>
          </button>
          <button className="bg-font3 rounded-lg w-full flex flex-col items-center p-4 hover:bg-font3/80 transition h-[200px] md:h-[250px] xl:h-[300px]">
            <p className="text-3xl text-white font-bold">Test</p>
          </button>
          <button className="bg-font4 rounded-lg w-full flex flex-col items-center p-4 hover:bg-font4/80 transition h-[200px] md:h-[250px] xl:h-[300px]">
            <p className="text-3xl text-white font-bold">Share</p>
          </button>
        </div>
      </div>
    </div>
  );
}
