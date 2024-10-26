"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";

interface FlashcardProps {
  front: string;
  back: string;
}

export default function Flashcard(
  { front, back }: FlashcardProps = {
    front: "Front of card",
    back: "Back of card",
  }
) {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        flipCard();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [flipCard]);

  return (
    <div
      className="w-64 h-40 perspective-1000 cursor-pointer"
      onClick={flipCard}
      role="button"
      tabIndex={0}
      aria-label="Flashcard"
    >
      <Card
        className={`w-full h-full relative transition-transform duration-500 transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        <div className="absolute w-full h-full backface-hidden flex items-center justify-center p-4 text-center">
          <p>{front}</p>
        </div>
        <div className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center p-4 text-center">
          <p>{back}</p>
        </div>
      </Card>
    </div>
  );
}
