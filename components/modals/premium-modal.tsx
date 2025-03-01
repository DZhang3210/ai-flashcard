"use client";
import React, { useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import useCreatePremium from "@/hooks/create-premium-hook";
import { SparklesIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Sparkles } from "lucide-react";
import { paidPlans } from "@/lib/lists/paid-plans";

const PremiumModal = () => {
  const premium = useCreatePremium();
  const [loading, setLoading] = useState(false);
  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number>(1); // Default to the middle plan (Top Student)

  const handleUpgrade = async () => {
    try {
      setLoading(true);
      // Use the onClick handler from the selected plan
      await paidPlans[selectedPlanIndex].onClick();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={premium.isOn}
      onClose={() => premium.setIsOff()}
      className="bg-white p-0 max-w-3xl overflow-hidden"
    >
      <div className="relative">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Upgrade to Premium</h1>
          </div>
          <p className="text-white/80">
            Unlock the full potential of your learning experience
          </p>
        </div>

        {/* Plans section */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {paidPlans.slice(1).map((plan, index) => (
              <div
                key={index}
                className={`border rounded-xl p-6 cursor-pointer transition-all duration-200 relative ${
                  selectedPlanIndex === index + 1
                    ? "border-indigo-600 shadow-md bg-indigo-50/50"
                    : "border-gray-200 hover:border-indigo-300"
                }`}
                onClick={() => setSelectedPlanIndex(index + 1)}
              >
                {index === 2 && ( // Annual plan is typically the best value
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    BEST VALUE
                  </div>
                )}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{plan.name}</h3>
                    <p className="text-gray-500 text-sm">
                      {index === 0
                        ? "Free tier"
                        : index === 1
                          ? "Monthly billing"
                          : "Annual billing (save 40%)"}
                    </p>
                  </div>
                  <div
                    className={`h-5 w-5 rounded-full border ${
                      selectedPlanIndex === index + 1
                        ? "bg-indigo-600 border-indigo-600"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedPlanIndex === index + 1 && (
                      <svg
                        className="h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="text-gray-500">
                    /{index === 2 ? "year" : "month"}
                  </span>
                </div>
                <ul className="space-y-2">
                  {plan.premiumFeatures.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-yellow-100 flex items-center justify-center">
                        <SparklesIcon className="h-3 w-3 text-yellow-600" />
                      </div>
                      <span className="text-sm font-bold">{feature}</span>
                    </li>
                  ))}
                  {plan.features
                    .filter(Boolean)
                    .map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-2"
                      >
                        <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                          <svg
                            className="h-3 w-3 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  {plan.missingFeatures.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center">
                        <XMarkIcon className="h-3 w-3 text-red-600" />
                      </div>
                      <span className="text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Benefits section */}

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="font-bold text-lg mb-4">
              Why upgrade to {paidPlans[selectedPlanIndex].name}?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <SparklesIcon className="h-4 w-4 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Enhanced Learning</h4>
                  <p className="text-xs text-gray-500">
                    Upload any type of content to create flashcards
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <SparklesIcon className="h-4 w-4 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Unlimited Uploads</h4>
                  <p className="text-xs text-gray-500">
                    No restrictions on file size or number of uploads
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <SparklesIcon className="h-4 w-4 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Premium Support</h4>
                  <p className="text-xs text-gray-500">
                    Get help when you need it most
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-row gap-x-3 items-center justify-end">
            <Button
              variant="outline"
              onClick={() => premium.setIsOff()}
              className="border-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpgrade}
              disabled={loading || selectedPlanIndex === 0} // Disable for free plan
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
            >
              {loading
                ? "Processing..."
                : `Upgrade to ${paidPlans[selectedPlanIndex].name}`}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PremiumModal;
