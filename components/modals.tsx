"use client";

import { useEffect, useState } from "react";
import React from "react";
import SetModal from "./modals/set-modal";
import FlashModal from "./modals/flash-modal";
import UploadModal from "./modals/upload-modal";

const Modals = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return "";
  return (
    <div>
      <SetModal />
      <FlashModal />
      <UploadModal />
    </div>
  );
};

export default Modals;
