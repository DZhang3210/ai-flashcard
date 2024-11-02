"use client";

import { useEffect, useState } from "react";
import React from "react";
import SetModal from "./modals/set-modal";

const Modals = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return "";
  return (
    <div>
      <SetModal />
    </div>
  );
};

export default Modals;
