"use client";
import { Id } from "@/convex/_generated/dataModel";
import { useCreateFlashcard } from "@/features/flashcard/api/use-create-flashcard";
import React, { useState } from "react";
import { toast } from "sonner";

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

const PDFFileUpload: React.FC<PDFFileUploadProps> = ({ setId, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [base64Content, setBase64Content] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: createFlashcard } = useCreateFlashcard();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      // Convert file to base64 when selected
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result?.toString().split(",")[1] || "";
        setBase64Content(base64);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (selectedFile && base64Content) {
      setIsLoading(true);
      try {
        const payload = {
          pdfBase64: base64Content,
          question: process.env.NEXT_PUBLIC_AI_PROMPT,
        };
        console.log("payload", payload);
        const response = await fetch("/api/fileUpload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        console.log("response", response);
        const data = await response.json();
        const parsedData = JSON.parse(data.message) as ParsedData;
        console.log("parsedData", parsedData);

        // Convert object to array of flashcard items
        await Promise.all(
          Object.values(parsedData).map((item) =>
            createFlashcard({
              front: item.question,
              back: item.answer,
              setId: setId as Id<"sets">,
            })
          )
        );
        toast.success("Flashcards created successfully");
        onClose();
        // setResponse(data.message);
      } catch (error) {
        console.error("Error parsing or creating flashcards:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 overflow-y-auto">
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
            {selectedFile ? selectedFile.name : "Click or drag file to upload"}
          </p>
          {!selectedFile && (
            <p className="text-sm text-gray-400 mt-2">Supported formats: PDF</p>
          )}
        </div>
        {/* <p className="text-sm text-gray-400 mt-2">
          {response ? response : "Click submit to get a response"}
        </p> */}
      </label>
      <div className="flex flex-row items-center justify-center gap-1 w-full">
        <button
          className="w-full bg-font3 text-background1 p-2 rounded-md hover:bg-font3/80 transition-all duration-100 grow"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Submit File"}
        </button>
      </div>
      {/* <button
        onClick={handleSubmit}
        disabled={isLoading || !prompt}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg
              transition-colors disabled:bg-gray-400"
      >
        {isLoading ? "Processing..." : "Submit"}
      </button> */}

      {/* {response && (
        <div className="w-full max-w-md p-4 mt-4 border rounded-lg bg-gray-50">
          <h3 className="font-semibold mb-2">Response:</h3>
          <p className="whitespace-pre-wrap">{response}</p>
        </div>
      )} */}
    </div>
  );
};

export default PDFFileUpload;
