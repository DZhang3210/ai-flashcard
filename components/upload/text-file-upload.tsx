"use client";
import { Id } from "@/convex/_generated/dataModel";
// import { useCreateFlashcard } from "@/features/flashcard/api/use-create-flashcard";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { useCreateFlashcard } from "@/features/flashcard/api/use-create-flashcard";

interface TextFileUploadProps {
  setId: Id<"sets"> | null;
  onClose: () => void;
}

interface FlashcardItem {
  question: string;
  answer: string;
}

interface ParsedData {
  [key: string]: FlashcardItem;
}

const TextFileUpload: React.FC<TextFileUploadProps> = ({ setId }) => {
  const [textContent, setTextContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: createFlashcard } = useCreateFlashcard();
  const [prompt, setPrompt] = useState("");
  const [parsedData, setParsedData] = useState<ParsedData | null>(null);

  const handleSubmit = async () => {
    if (!textContent || !prompt) {
      toast.error("Please enter both text content and prompt");
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        textContent,
        question: process.env.NEXT_PUBLIC_AI_PROMPT + prompt,
      };

      const response = await fetch("/api/textUpload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to process text");
      }

      const data = await response.json();

      // Parse the response
      let tempParsedData: ParsedData;
      try {
        tempParsedData = JSON.parse(data.message) as ParsedData;
      } catch (error) {
        console.error("Error parsing response:", error);
        toast.error("Failed to parse AI response");
        return;
      }

      setParsedData(tempParsedData);

      // Create flashcards
      await Promise.all(
        Object.values(tempParsedData).map((item) =>
          createFlashcard({
            front: item.question,
            back: item.answer,
            setId: setId as Id<"sets">,
          })
        )
      );

      toast.success(
        `Created ${Object.keys(tempParsedData).length} flashcards successfully`
      );
    } catch (error) {
      console.error("Error processing text:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to process text"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 overflow-y-auto">
      <Label className="text-font3 text-lg font-bold">Text Content</Label>
      <textarea
        className="w-full max-w-md border-2 border-gray-300 rounded-lg p-4
          hover:border-blue-500 hover:bg-blue-50 transition-colors h-40"
        placeholder="Enter or paste your text content here..."
        value={textContent}
        onChange={(e) => setTextContent(e.target.value)}
      />

      {isLoading ? (
        <div className="flex items-center justify-center gap-2 h-10 w-full max-w-md">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-font3 animate-[bounce_1s_infinite_100ms]" />
            <div className="w-2 h-2 rounded-full bg-font3 animate-[bounce_1s_infinite_200ms]" />
            <div className="w-2 h-2 rounded-full bg-font3 animate-[bounce_1s_infinite_300ms]" />
          </div>
          <span className="text-font3">Processing Text...</span>
        </div>
      ) : (
        <>
          <Label className="text-font3 text-lg font-bold">
            What kind of flashcards?
          </Label>
          <Input
            type="text"
            placeholder="What kind of flashcards do you want to create?"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="max-w-md border-2 border-font4 rounded-lg"
          />
        </>
      )}

      <div className="flex flex-row items-center justify-center gap-1 w-full">
        <button
          className="w-full bg-font3 text-background1 p-2 rounded-md hover:bg-font3/80 transition-all duration-100 grow"
          onClick={handleSubmit}
          disabled={isLoading || !textContent || !prompt}
        >
          {isLoading ? "Processing..." : "Submit Text"}
        </button>
      </div>

      {parsedData && (
        <div className="w-full flex flex-col gap-4">
          <h1 className="text-xl font-bold text-font2 text-center">
            New Flashcards ({Object.keys(parsedData).length})
          </h1>
          {Object.values(parsedData).map((item) => (
            <div
              key={item.question}
              className="grid grid-cols-10 gap-2 border-b border-gray-400"
            >
              <div className="text-sm font-bold col-span-3">
                {item.question}
              </div>
              <div className="text-sm col-span-7">{item.answer}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TextFileUpload;
