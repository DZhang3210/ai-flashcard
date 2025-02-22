"use client";
import SetDrawer from "@/components/set-drawer";
import { Id } from "@/convex/_generated/dataModel";
import { useCurrentUser } from "@/features/auth/api/use-current-user";
import { useDeleteFlashcard } from "@/features/flashcard/api/use-delete-flashcard";
import { useGetSet } from "@/features/set/api/use-get-set";
import useConfirm from "@/hooks/create-confirm-hook";
import useCreateFlashcard from "@/hooks/create-flash-hook";
import useCreateSet from "@/hooks/create-set-hook";
import useCreateUpload from "@/hooks/create-upload-hook";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import { Edit, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FlashcardArray } from "react-quizlet-flashcard";
import ReactConfetti from "react-confetti";
import { GiCycle } from "react-icons/gi";

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

const FlashcardPage = ({ params }: { params: { setId: Id<"sets"> } }) => {
  const confirm = useConfirm();
  const router = useRouter();
  const { data: set, isLoading } = useGetSet(params.setId);
  const { data: currentUser, isLoading: isLoadingUser } = useCurrentUser();
  const flashcardModal = useCreateFlashcard();
  const { isPending: isDeleting } = useDeleteFlashcard();

  const setModal = useCreateSet();
  const uploadModal = useCreateUpload();

  const flashcards = useMemo(() => set?.flashcards || [], [set]);
  const [randomKey, setRandomKey] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const cards = useMemo(() => {
    // Only shuffle if we have a randomKey greater than 0
    const cardsToUse = randomKey > 0 ? shuffleArray(flashcards) : flashcards;

    // Create the array of regular cards
    const regularCards =
      cardsToUse?.map((flashcard, index) => ({
        id: index,
        frontHTML: (
          <button
            className="text-2xl w-full h-full flex justify-center items-center cursor-pointer"
            onMouseDown={(e) => {
              e.preventDefault();
              flipRef.current?.();
            }}
          >
            {flashcard.front}
          </button>
        ),
        backHTML: (
          <button
            className="text-2xl w-full h-full flex justify-center items-center cursor-pointer"
            onMouseDown={(e) => {
              e.preventDefault();
              flipRef.current?.();
            }}
          >
            {flashcard.back}
          </button>
        ),
      })) || [];

    // Add the completion card
    return [
      ...regularCards,
      {
        id: regularCards.length,
        frontHTML: (
          <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
            <h2 className="text-3xl font-bold text-font4">Congratulations!</h2>
            <p className="text-xl text-gray-600">
              You've completed all flashcards
            </p>
            <button
              className="px-4 py-2 bg-font4 text-white rounded-lg hover:bg-font4/80 transition-all"
              onMouseDown={(e) => {
                e.preventDefault();
                flipRef.current?.();
              }}
            >
              Click to celebrate! 🎉
            </button>
          </div>
        ),
        backHTML: (
          <div
            className="flex flex-col items-center justify-center gap-4 w-full h-full"
            onMouseDown={() => setShowConfetti(true)}
          >
            <h2 className="text-3xl font-bold text-font4">Well done! 🌟</h2>
            <p className="text-xl text-gray-600">Ready for another round?</p>
            <button
              className="px-4 py-2 bg-font4 text-white rounded-lg hover:bg-font4/80 transition-all"
              onClick={(e) => {
                e.stopPropagation();
                setRandomKey((prev) => prev + 1);
                forwardRef.current.resetArray();
                setShowConfetti(false);
              }}
            >
              Shuffle and start over
            </button>
          </div>
        ),
      },
    ];
  }, [flashcards, randomKey]);

  const flipRef = useRef<() => void>(() => {});
  const forwardRef = useRef({
    nextCard: () => {},
    prevCard: () => {},
    resetArray: () => {},
  });

  const handleEditFlashcard = () => {
    if (currentCard - 1 < 0 || currentCard - 1 > flashcards?.length) return;
    const currentFlashcard = flashcards?.[currentCard - 1];
    if (!currentFlashcard) return;
    flashcardModal.setMany({
      editMode: true,
      front: currentFlashcard.front,
      back: currentFlashcard.back,
      id: currentFlashcard._id,
      setId: params.setId,
    });
    flashcardModal.toggle();
  };
  const handleAddFlashcard = () => {
    flashcardModal.setMany({
      editMode: false,
      front: "",
      back: "",
    });
    flashcardModal.toggle();
  };

  useEffect(() => {
    // Don't add the event listener if the modal is open
    // if (flashcardModal.isOn || uploadModal.isOn || isLoading) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      if (flashcardModal.isOn || uploadModal.isOn) return;
      else if (event.code === "Space") {
        event.preventDefault();
        flipRef.current?.();
      } else if (event.code === "ArrowRight" || event.code === "KeyD") {
        event.preventDefault();
        forwardRef.current?.nextCard?.();
      } else if (event.code === "ArrowLeft" || event.code === "KeyA") {
        event.preventDefault();
        forwardRef.current?.prevCard?.();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [flashcardModal.isOn, uploadModal.isOn]);

  useEffect(() => {
    if (
      flashcards.length <= 0 &&
      !flashcardModal.isOn &&
      !isLoading &&
      !isLoadingUser
    ) {
      if (set?.creator?._id === currentUser?._id) {
        flashcardModal.setOn({ setId: params.setId });
      } else {
        router.push(`/user/${set?.creator?._id}`);
      }
    }
  }, [
    flashcards,
    flashcardModal.isOn,
    isLoading,
    params.setId,
    flashcardModal,
    currentUser?._id,
    isLoadingUser,
    router,
    set?.creator?._id,
  ]);

  const [currentCard, setCurrentCard] = useState(1);

  // if (!set && !isLoading) router.push("/user/current");

  const handleEdit = () => {
    setModal.setMany({
      editMode: true,
      id: set?._id,
      title: set?.name,
      description: set?.description,
      previewImage: set?.thumbnail ?? "/nijika-image.jpg",
    });
    setModal.setOn();
  };
  useEffect(() => {
    if (flashcardModal.isOn) {
      flashcardModal.setOff();
    }
  }, []);

  return (
    <div
      className={cn(
        "grid grid-cols-8 items-center p-2 h-[calc(100vh-100px)] w-full  mx-auto  gap-0",
        flashcardModal.isOn ? "max-w-6xl" : "max-w-3xl"
      )}
    >
      {showConfetti && (
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          onConfettiComplete={() => setShowConfetti(false)}
        />
      )}
      <div
        className={cn(
          "flex flex-col items-center p-5 h-[calc(100vh-100px)] w-full",
          flashcardModal.isOn ? "col-span-5" : "col-span-8"
        )}
      >
        <div className="flex flex-row items-center justify-between mb-5 gap-4 w-full">
          <div className="flex flex-row items-center justify-center gap-4">
            <Image
              src={set?.thumbnail ?? "/nijika-image.jpg"}
              alt={"Set Image"}
              width={100}
              height={100}
              className="rounded-lg"
            />
            <div className="flex flex-col items-start justify-start">
              <h1 className="text-4xl font-bold text-gray-700">{set?.name}</h1>
              <p className="text-lg text-gray-500">{set?.description}</p>
            </div>
            <div className="flex flex-row items-center justify-center gap-2">
              <p className="text-lg text-gray-500">
                {set?.flashcards.length} cards
              </p>
              {randomKey > 0 && <GiCycle className="w-6 h-6" />}
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            {set?.creator?._id === currentUser?._id && (
              <button
                onClick={handleEdit}
                className="text-font4 text-xl flex flex-row items-center gap-2 px-4 py-2 rounded-lg hover:bg-font4/20 transition-all duration-100 border border-font4"
              >
                Edit
                <Edit className="w-6 h-6" />
              </button>
            )}
            {/* <button
            className={cn(
              "font-normal text-xl  right-0 z-50 px-4 py-2 rounded-lg hover:bg-font2/20 transition-all duration-100 border border-gray-300 flex flex-row items-center gap-2",
              set?.isLiked &&
                "bg-font2 text-white hover:bg-font2/80 border-font2"
            )}
            onClick={(e) => {
              e.stopPropagation();
              if (!set?._id) return;
              toggleLike({ setId: set._id });
            }}
            disabled={togglingLike}
          >
            {set?.isLiked ? "Liked" : "Like"}
            <Heart className="w-6 h-6" />
          </button> */}
          </div>
        </div>
        {isLoading ? (
          <div className="flex w-full items-center justify-center h-full">
            <Loader2 className="w-10 h-10 animate-spin" />
          </div>
        ) : set ? (
          <div className="flex w-full items-center justify-center">
            <FlashcardArray
              cards={cards || []}
              currentCardFlipRef={flipRef}
              forwardRef={forwardRef}
              onCardChange={(_id, index) => setCurrentCard(index)}
              FlashcardArrayStyle={{
                minWidth: "100%",
                // width: "80%",
                padding: "0 1%",
              }}
            />
          </div>
        ) : (
          <div className="flex w-full items-center justify-center h-full">
            <p className="text-2xl text-gray-500">No flashcards found</p>
          </div>
        )}
        <button
          className="text-lg text-font3 w-full bg-font3/20 rounded-lg p-2 hover:bg-font3/30 transition-all duration-100 my-2"
          onClick={() => {
            if (randomKey === 0) {
              // First randomization
              setRandomKey(1);
            } else {
              // Subsequent randomizations
              setRandomKey((prev) => prev + 1);
            }
            forwardRef.current.resetArray();
          }}
        >
          {randomKey === 0 ? "Randomize" : "Shuffle Again"}
        </button>
        {currentUser?._id === set?.creator?._id && (
          <div className="grid grid-cols-4 gap-4 w-full max-w-6xl">
            <button
              className="bg-gray-100 rounded-lg w-full flex flex-col items-center p-4 hover:bg-gray-300 transition"
              onClick={handleEditFlashcard}
            >
              Edit Card
            </button>
            <button
              className="bg-gray-200 rounded-lg w-full flex flex-col items-center p-4 hover:bg-gray-300 transition"
              onClick={handleAddFlashcard}
            >
              Add Card
            </button>
            <button
              className="bg-gray-200 rounded-lg w-full flex flex-col items-center p-4 hover:bg-gray-300 transition"
              onClick={() => {
                confirm.setDeleting(true);
                confirm.setId(flashcards?.[currentCard - 1]?._id);
              }}
              disabled={isDeleting}
            >
              Remove Card
            </button>
            <button
              className="bg-gray-200 rounded-lg w-full flex flex-col items-center p-4 hover:bg-gray-300 transition"
              onClick={() => uploadModal.setOn(params.setId)}
            >
              Upload
            </button>
          </div>
        )}

        <Link
          href={`/user/${set?.creator?._id}`}
          className="text-sm text-gray-500 w-full max-w-6xl mx-auto text-center hover:underline"
        >
          Made by {set?.creator?.name}
        </Link>
        <div>
          {set && (
            <div className="w-full flex flex-col gap-4 my-10">
              <h1 className="text-xl font-bold text-font2 text-center">
                New Flashcards
              </h1>
              {set.flashcards.map((item) => (
                <div
                  key={item._id}
                  className="grid grid-cols-10 gap-2 border-b border-gray-400"
                >
                  <div className="text-sm font-bold col-span-3">
                    {item.front}
                  </div>
                  <div className="text-sm col-span-7">{item.back}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <AnimatePresence>
        {flashcardModal.isOn && (
          <div className="col-span-3 w-full h-full" key={flashcardModal.id}>
            <SetDrawer />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FlashcardPage;
