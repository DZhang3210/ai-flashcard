import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center  py-10 space-y-2 w-full min-h-[calc(100vh-80px)] bg-yellow-100">
      <h1 className="text-4xl font-bold">Study without the hassle</h1>
      <p className="text-xl text-gray-500 max-w-2xl text-center">
        AI Words is a platform that allows you to study without the hassle.
        Create flashcards with AI in seconds.
      </p>
      <Button className="bg-green-400 text-black rounded-lg hover:bg-green-500 transition">
        <div className="flex items-center space-x-2">
          <p>Get Started</p>
          <ArrowRight size={20} />
        </div>
      </Button>
      <div className="flex items-center space-x-2">
        <p className="text-gray-500">No credit card required</p>
      </div>
      <div className="h-[300px] grid grid-cols-4 gap-4 w-full max-w-6xl">
        {["Generate", "Edit", "Test", "Share"].map((item) => (
          <button className="bg-gray-200 rounded-lg w-full h-full flex flex-col items-center p-4 hover:bg-gray-300 transition">
            <p className="text-lg font-bold">{item}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
