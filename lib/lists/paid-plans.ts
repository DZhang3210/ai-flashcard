import axios from "axios";
import { toast } from "sonner";

const products = [
  ["kh751bq72gdt8pr456rkd98veh7b4hdj", "Annual Subscription Top Student"],
  ["kh77xwax56x29tscjzk8bgm9fh7b578y", "Monthly Subscription for Top Student"],
];

const onClick = async (productId: string) => {
  try {
    if (!productId || !products.find((p) => p[0] === productId)) {
      throw new Error("Invalid product ID");
    }
    const response = await axios.get("/api/stripe", {
      params: {
        productId: productId,
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
    onClick: () => onClick("kh77xwax56x29tscjzk8bgm9fh7b578y"),
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
    onClick: () => onClick("kh751bq72gdt8pr456rkd98veh7b4hdj"),
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
