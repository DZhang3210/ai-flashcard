"use client";
import Link from "next/link";
// import { useMemo, useRef } from "react";
import Image from "next/image";
export default function Home() {
  // const flipRef = useRef<() => void>(() => {});
  // // const forwardRef = useRef({
  // //   nextCard: () => {},
  // //   prevCard: () => {},
  // //   resetArray: () => {},
  // // });
  // const flashcards = useMemo(
  //   () => [
  //     {
  //       id: 1,
  //       front: "How much does it cost?",
  //       back: "Nothing. It is completely free.",
  //     },
  //   ],
  //   []
  // );
  // // const cards = useMemo(
  //   () =>
  //     flashcards?.map((flashcard, index) => ({
  //       id: index,
  //       frontHTML: (
  //         <button
  //           className="text-3xl w-full h-full flex justify-center items-center cursor-pointer"
  //           onMouseDown={(e) => {
  //             // Prevent text selection
  //             e.preventDefault();
  //             flipRef.current?.();
  //           }}
  //         >
  //           {flashcard.front}
  //         </button>
  //       ),
  //       backHTML: (
  //         <button
  //           className="text-3xl  w-full h-full flex justify-center items-center cursor-pointer"
  //           onMouseDown={(e) => {
  //             // Prevent text selection
  //             e.preventDefault();
  //             flipRef.current?.();
  //           }}
  //         >
  //           {flashcard.back}
  //         </button>
  //       ),
  //     })),
  //   [flashcards]
  // );

  return (
    <div className="w-full min-h-[calc(100vh-100px)] box-content flex flex-col gap-20">
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
            <div className="w-full h-full col-span-5  items-center justify-center mt-10 grid grid-cols-3 gap-10 px-40">
              <div className="w-full h-full bg-background2 rounded-lg p-10 flex flex-col gap-10">
                <div className="flex flex-col gap-2">
                  <h1 className="text-2xl font-bold">
                    Multiple Accepted File Formats Accepted
                  </h1>
                  <div className="flex flex-row gap-2">
                    <div className="bg-background3 rounded-full border-2 border-red-400 px-4 py-1 bg-red-400 text-white text-sm">
                      pdf
                    </div>
                    <div className="bg-background3 rounded-full border-2 border-blue-400 px-4 py-1 bg-blue-400 text-white text-sm">
                      text
                    </div>
                    <div className="bg-background3 rounded-full border-2 border-green-400 px-4 py-1 bg-green-400 text-white text-sm">
                      image
                    </div>
                  </div>
                </div>
                <Image
                  src="/File-Upload-Image.png"
                  alt="/File-Upload-Image.png"
                  width={830}
                  height={904}
                />
              </div>
              <div className="w-full h-full bg-background2 rounded-lg p-10 flex flex-col gap-10">
                <div className="flex flex-col gap-10">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold">
                      Variety of ways to practice
                    </h1>
                    <div className="flex flex-row gap-2">
                      Practice with flashcards in a variety of formats, to test
                      your knowledge.
                    </div>
                  </div>
                  <Image
                    src="/Variety-Ways-To-Practice.png"
                    alt="/Variety-Ways-To-Practice.png"
                    width={809}
                    height={808}
                  />
                </div>
              </div>
              <div className="w-full h-full bg-background2 rounded-lg p-10 flex flex-col gap-10">
                <h1 className="text-2xl font-bold">
                  Export to your Preferred Format
                </h1>
                <div className="flex flex-row gap-2">
                  Convert your flashcards back to a pdf or anki deck.
                </div>
                <div className="flex flex-row gap-2">
                  <div className="bg-background3 rounded-full border-2 border-red-400 px-4 py-1 bg-red-400 text-white text-sm">
                    Recall IQ
                  </div>
                  <Image
                    src="/flashcard-apps/Anki-icon.png"
                    alt="Anki-icon.png"
                    width={100}
                    height={100}
                  />
                  <Image
                    src="/flashcard-apps/Quizlet.png"
                    alt="Quizlet.png"
                    width={100}
                    height={100}
                  />
                  <Image
                    src="/flashcard-apps/Rem-Note.png"
                    alt="Rem-Note.png"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
