import { useMemo, useRef } from "react";
import {
  SparklesIcon,
  LightBulbIcon,
  ChartBarIcon,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { FlashcardArray } from "react-quizlet-flashcard";
import { paidPlans } from "@/lib/lists/paid-plans";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";

const HomePage = () => {
  const flipRef = useRef<() => void>(() => {});
  const forwardRef = useRef({
    nextCard: () => {},
    prevCard: () => {},
    resetArray: () => {},
  });
  const flashcards = useMemo(
    () => [
      {
        id: 1,
        front: "How much does it cost?",
        back: "Nothing. It is completely free.",
      },
    ],
    []
  );
  const cards = useMemo(
    () =>
      flashcards?.map((flashcard, index) => ({
        id: index,
        frontHTML: (
          <button
            className="text-3xl w-full h-full flex justify-center items-center cursor-pointer"
            onMouseDown={(e) => {
              // Prevent text selection
              e.preventDefault();
              flipRef.current?.();
            }}
          >
            {flashcard.front}
          </button>
        ),
        backHTML: (
          <button
            className="text-3xl  w-full h-full flex justify-center items-center cursor-pointer"
            onMouseDown={(e) => {
              // Prevent text selection
              e.preventDefault();
              flipRef.current?.();
            }}
          >
            {flashcard.back}
          </button>
        ),
      })),
    [flashcards]
  );

  const features = [
    {
      icon: <SparklesIcon className="w-8 h-8 text-indigo-500" />,
      title: "AI-Powered Learning",
      description: "Smart algorithms adapt to your learning style and pace",
    },
    {
      icon: <LightBulbIcon className="w-8 h-8 text-indigo-500" />,
      title: "Instant Generation",
      description: "Create flashcard sets in seconds using AI",
    },
    {
      icon: <ChartBarIcon className="w-8 h-8 text-indigo-500" />,
      title: "Upload Formats",
      description: "Upload images, PDFs, and more to create flashcards",
    },
    {
      icon: <UserGroupIcon className="w-8 h-8 text-indigo-500" />,
      title: "Export Formats",
      description:
        "Export flashcards in various formats like Anki, Quizlet, and more",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2">
          <div className="">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Master Any Subject with
              <span className="underline decoration-font4 custom-underline text-font4">
                {" "}
                AI-Powered
              </span>{" "}
              Flashcards
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Learn smarter, not harder. Let AI create and optimize your
              flashcards.
            </p>
            <form onSubmit={() => {}} className="max-w-md">
              <Link href="/explore">
                <InteractiveHoverButton className="px-6 py-3 bg-black text-white">
                  Get Started
                </InteractiveHoverButton>
              </Link>
            </form>
          </div>
          <FlashcardArray cards={cards} forwardRef={forwardRef} />
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 bg-white ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose FlashAI?
            </h2>
            <p className="text-xl text-gray-600">
              Revolutionary features that transform how you learn
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl border hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <div className="bg-gray-50 py-20 bg-grid-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative ">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                See FlashAI in Action
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Watch how our AI transforms your study material into effective
                flashcards in seconds.
              </p>
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
                Try Demo
              </button>
            </div>
            <div className="flex-1">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that works best for you
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {paidPlans.map((plan, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-xl border hover:shadow-lg transition-shadow"
              >
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="text-4xl font-bold mb-6">
                  ${plan.price}
                  <span className="text-lg text-gray-600">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.premiumFeatures.map((feature, index) => (
                    <li className="flex items-center" key={index}>
                      <SparklesIcon className="w-5 h-5 text-yellow-500 mr-2" />
                      <span className="font-bold">{feature}</span>
                    </li>
                  ))}
                  {plan.features.map((feature, index) => (
                    <li className="flex items-center" key={index}>
                      <SparklesIcon className="w-5 h-5 text-indigo-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                  {plan.missingFeatures.map((feature, index) => (
                    <li className="flex items-center" key={index}>
                      <XMarkIcon className="w-5 h-5 text-red-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className="w-full bg-font4 text-white px-6 py-3 rounded-lg hover:bg-font4/80"
                  onClick={plan.onClick}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Recall IQ</h3>
              <p className="text-gray-400">
                Making learning smarter and more effective with AI.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Demo
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Recall IQ. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
