import { api } from "@/convex/_generated/api";
import axios from "axios";
import { fetchQuery } from "convex/nextjs";
import { toast } from "sonner";

const products = [
  "Annual Subscription Top Student",
  "Monthly Subscription for Top Student",
];

const onClick = async (productName: string) => {
  try {
    const product = await fetchQuery(api.products.getByProductName, {
      productName: productName,
    });

    if (!product || !products.find((p) => p === product.name)) {
      throw new Error("Invalid product ID");
    }
    const response = await axios.get("/api/stripe", {
      params: {
        productId: product._id,
      },
    });

    window.location.href = response.data.url;
  } catch (error) {
    console.log("BILLING_ERROR", error);
    toast.error("Something went wrong");
  } finally {
  }
};

export const paidPlans = [
  {
    name: "Basic",
    price: 0,
    pricePerMonth: "0/month",
    annualPrice: 0,
    onClick: () => (window.location.href = "/explore"),
    premiumFeatures: [],
    features: [
      "Unlimited flashcards",
      "Text Upload",
      ,
      "Export in Quizlet and Anki",
    ],
    missingFeatures: ["100MB Upload Limit", "Image/PDF/Video/Audio Upload"],
  },
  {
    name: "Top Student",
    price: 19,
    pricePerMonth: "19/month",
    annualPrice: 228,
    onClick: () => onClick("Monthly Subscription for Top Student"),
    premiumFeatures: ["Unlimited Upload Limit", "Image/PDF/Video/Audio Upload"],
    features: [
      "Unlimited flashcards",
      "Text Upload",
      "Export in Quizlet and Anki",
    ],
    missingFeatures: [],
  },
  {
    name: "Top Student Annual",
    price: 10,
    pricePerMonth: "10/month",
    annualPrice: 120,
    onClick: () => onClick("Annual Subscription Top Student"),
    premiumFeatures: [
      "40% off monthly price",
      "Unlimited Upload Limit",
      "Image/PDF/Video/Audio Upload",
    ],
    features: [
      "Unlimited flashcards",
      "Text Upload",
      "Export in Quizlet and Anki",
    ],
    missingFeatures: [],
  },
];
