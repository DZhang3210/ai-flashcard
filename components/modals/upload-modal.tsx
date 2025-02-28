"use client";
import { Modal } from "@/components/ui/modal";
import React, { useState } from "react";
import useCreateUpload from "@/hooks/create-upload-hook";

import PDFFileUpload from "../upload/pdf-file-upload";
import TextFileUpload from "../upload/text-file-upload";

const UploadModal = () => {
  const uploadModal = useCreateUpload();
  const setId = useCreateUpload((state) => state.setId);
  const [activeTab, setActiveTab] = useState<"text" | "pdf">("pdf");

  return (
    <Modal isOpen={uploadModal.isOn} onClose={uploadModal.setOff}>
      <div className="flex flex-row items-center gap-2 overflow-y-auto max-w-lg mx-auto w-full">
        <button
          className={`${activeTab === "pdf" ? "bg-font3/20" : "bg-transparent hover:bg-font3/20"} transition-all duration-100 px-2 py-1 rounded-lg border-1 border-gray-300`}
          onClick={() => setActiveTab("pdf")}
        >
          PDF
        </button>
        <span className="">|</span>
        <button
          className={`${activeTab === "text" ? "bg-font3/20" : "bg-transparent hover:bg-font3/20"} transition-all duration-100 px-2 py-1 rounded-lg border-1 border-gray-300`}
          onClick={() => setActiveTab("text")}
        >
          Text
        </button>
      </div>
      {activeTab === "pdf" ? (
        <PDFFileUpload setId={setId} onClose={uploadModal.setOff} />
      ) : (
        <TextFileUpload setId={setId} onClose={uploadModal.setOff} />
      )}
    </Modal>
  );
};

export default UploadModal;
