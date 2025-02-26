"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";

export default function SubscriptionButton() {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      console.log("BILLING_ERROR", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Button variant={"default"} onClick={onClick} disabled={loading}>
        Stripe
      </Button>
    </div>
  );
}
