import React, { useCallback, useState } from "react";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";
import { useGenerateUploadUrl } from "@/features/upload/api/use-generate-upload-url";
import { cn } from "@/lib/utils";
import Image from "next/image";

type ImageUploadProps = {
  setImage: (image: string) => void;
  previewImage: string | null;
  setPreviewImage: (image: string) => void;
};

const ImageUpload = ({
  setImage,
  previewImage,
  setPreviewImage,
}: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { mutate: generateUploadUrl } = useGenerateUploadUrl();

  const handleFile = useCallback(
    async (file: File) => {
      if (file) {
        setIsUploading(true);
        try {
          const url = await generateUploadUrl({}, { throwError: true });
          if (!url) throw new Error("Url not found");

          const result = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": file.type },
            body: file,
          });
          const { storageId } = await result.json();

          const previewUrl = URL.createObjectURL(file);
          setPreviewImage(previewUrl);
          setImage(storageId);
        } catch (error) {
          console.error("Error uploading file:", error);
        } finally {
          setIsUploading(false);
        }
      }
    },
    [generateUploadUrl, setImage, setPreviewImage]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <div
      className={cn(
        "mt-2 relative border-2 border-dashed rounded-lg p-4 hover:bg-gray-50 transition-colors w-full h-full",
        isDragging && "border-primary bg-gray-50"
      )}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center gap-4">
        {previewImage ? (
          <div className="relative w-32 h-32">
            <Image
              src={previewImage}
              alt="Preview"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        ) : (
          <Upload className="h-10 w-10 text-gray-400" />
        )}

        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => document.getElementById("icon-upload")?.click()}
            disabled={isUploading}
            className="w-full sm:w-auto"
            aria-label="upload icon button"
          >
            <Upload className="mr-2 h-4 w-4" />
            {isUploading ? "Uploading..." : "Upload Icon"}
          </Button>
          <p className="text-sm text-gray-500 mt-2">
            or drag and drop your image here
          </p>
        </div>

        <input
          id="icon-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
      </div>
    </div>
  );
};

export default ImageUpload;
