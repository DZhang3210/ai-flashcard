"use client";

import { useEffect, useState } from "react";
import React from "react";
import SetModal from "./modals/set-modal";
import UploadModal from "./modals/upload-modal";
import ConfirmationModal from "./modals/confirmation-modal";
import PremiumModal from "./modals/premium-modal";

const Modals = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return "";
  return (
    <div>
      <SetModal />
      {/* <FlashModal /> */}
      <UploadModal />
      <ConfirmationModal />
      <PremiumModal />
    </div>
  );
};

export default Modals;
