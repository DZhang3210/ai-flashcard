"use client";
import { Id } from "@/convex/_generated/dataModel";
import { useCreateFlashcard } from "@/features/flashcard/api/use-create-flashcard";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { useCreatePrompt } from "@/features/prompts/use-create-prompt";
import { useCurrentUser } from "@/features/auth/api/use-current-user";

interface PDFFileUploadProps {
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

const PDFFileUpload: React.FC<PDFFileUploadProps> = ({ setId }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [base64Content, setBase64Content] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: createFlashcard } = useCreateFlashcard();
  const [prompt, setPrompt] = useState("");
  const [parsedData, setParsedData] = useState<ParsedData | null>(null);
  const { mutate: createPrompt } = useCreatePrompt();
  const { data: userId } = useCurrentUser();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);

      // Convert file to base64 when selected
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result?.toString().split(",")[1] || "";
        setBase64Content(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile || !base64Content || !prompt) {
      toast.error("Please select a file and enter a prompt");
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        pdfBase64: base64Content,
        question: process.env.NEXT_PUBLIC_AI_PROMPT + prompt,
      };

      const response = await fetch("/api/fileUpload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to process PDF");
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

      // Create flashcards from the parsed data
      await Promise.all(
        Object.values(tempParsedData).map((item) =>
          createFlashcard({
            front: item.question,
            back: item.answer,
            setId: setId as Id<"sets">,
          })
        )
      );

      if (userId) {
        await createPrompt({
          prompt: prompt,
          userId: userId?._id,
        });
      }

      toast.success(
        `Created ${Object.keys(tempParsedData).length} flashcards successfully`
      );
    } catch (error) {
      console.error("Error processing file:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to process file"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 overflow-y-auto">
      <Label className="text-font3 text-lg font-bold">PDF File</Label>

      <label
        className="relative cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-8 w-full max-w-md
          hover:border-blue-500 hover:bg-blue-50 transition-colors"
      >
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf"
        />
        <div className="text-center">
          <p className="text-gray-600">
            {selectedFile
              ? `${selectedFile.name} (${(selectedFile.size / 1024).toFixed(2)}KB)`
              : "Click or drag file to upload"}
          </p>
          {!selectedFile && (
            <p className="text-sm text-gray-400 mt-2">Supported formats: PDF</p>
          )}
        </div>
      </label>

      {isLoading ? (
        <div className="flex items-center justify-center gap-2 h-10 w-full max-w-md">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-font3 animate-[bounce_1s_infinite_100ms]" />
            <div className="w-2 h-2 rounded-full bg-font3 animate-[bounce_1s_infinite_200ms]" />
            <div className="w-2 h-2 rounded-full bg-font3 animate-[bounce_1s_infinite_300ms]" />
          </div>
          <span className="text-font3">Processing PDF...</span>
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
          disabled={isLoading || !selectedFile || !prompt}
        >
          {isLoading ? "Processing..." : "Submit File"}
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

export default PDFFileUpload;
