"use client";
import { Modal } from "@/components/ui/modal";
import React, { useState } from "react";
import useCreateUpload from "@/hooks/create-upload-hook";
import FileUpload from "../file-upload";
import axios from "axios";
import { toast } from "sonner";

const UploadModal = () => {
  const [file, setFile] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const uploadModal = useCreateUpload();

  const onSubmit = async () => {
    if (!file) {
      toast.error("No file selected");
      return;
    }
    setSubmitting(true);
    await axios.post("/api/flashcards", { pdfUrl: file });
    setSubmitting(false);
  };

  return (
    <Modal isOpen={uploadModal.isOn} onClose={uploadModal.setOff}>
      {/* <div className="text-3xl w-full text-center text-font3 flex flex-row items-center justify-center gap-3">
        Upload
      </div> */}

      <div className="w-full">
        <FileUpload file={file} setFile={setFile} />
      </div>

      <div className="flex flex-row items-center justify-center gap-1">
        <button
          className="w-full bg-font3 text-background1 p-2 rounded-md hover:bg-font3/80 transition-all duration-100 grow"
          onClick={onSubmit}
          disabled={submitting}
        >
          {submitting ? "Loading..." : "Submit File"}
        </button>
      </div>
    </Modal>
  );
};

export default UploadModal;
