"use client";
import { Modal } from "@/components/ui/modal";
import React from "react";
import useCreateUpload from "@/hooks/create-upload-hook";

import PDFFileUpload from "../upload/pdf-file-upload";

const UploadModal = () => {
  const uploadModal = useCreateUpload();
  const setId = useCreateUpload((state) => state.setId);

  return (
    <Modal isOpen={uploadModal.isOn} onClose={uploadModal.setOff}>
      <PDFFileUpload setId={setId} onClose={uploadModal.setOff} />
    </Modal>
  );
};

export default UploadModal;
