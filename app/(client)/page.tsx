"use client";

import FeaturesPage from "@/components/home/feature";
import HeroPage from "@/components/home/hero";
export default function HomePage() {
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
      <HeroPage />
      <FeaturesPage />
    </div>
  );
}
