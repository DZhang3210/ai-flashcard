"use client";
import SetDrawer from "@/components/set-drawer";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useCurrentUser } from "@/features/auth/api/use-current-user";
import { useDeleteFlashcard } from "@/features/flashcard/api/use-delete-flashcard";
import { useGetSet } from "@/features/set/api/use-get-set";
import useConfirm from "@/hooks/create-confirm-hook";
import useCreateFlashcard from "@/hooks/create-flash-hook";
import useCreateSet from "@/hooks/create-set-hook";
import useCreateUpload from "@/hooks/create-upload-hook";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FlashcardArray } from "react-quizlet-flashcard";
import FlashcardEditButton from "@/components/flashcard-buttons/edit-button";
import FlashcardAddButton from "@/components/flashcard-buttons/add-button";
import DisplayFlashcardsList from "@/components/flashcard-buttons/display-flashcards-list";
import FlashcardHeader from "@/components/flashcard-buttons/flashcard-header";
import { SetWithFlashcards } from "@/lib/types";
import { processFlashcards } from "@/lib/process-flashcards";
import useCreatePremium from "@/hooks/create-premium-hook";

const formatFlashcardsForAnki = (
  flashcards: Array<{ front: string; back: string }>
) => {
  return flashcards.map((card) => `${card.front};${card.back}`).join("\n");
};

const downloadAnkiFile = (content: string, filename: string) => {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

const FlashcardPage = ({ params }: { params: { setId: Id<"sets"> } }) => {
  const router = useRouter();

  const flashcardModal = useCreateFlashcard();
  const confirm = useConfirm();
  const setModal = useCreateSet();
  const uploadModal = useCreateUpload();
  const editModal = useCreateSet();
  const createPremiumModal = useCreatePremium();

  const flipRef = useRef<() => void>(() => {});
  const forwardRef = useRef({
    nextCard: () => {},
    prevCard: () => {},
    resetArray: () => {},
  });

  const [currentCard, setCurrentCard] = useState(1);
  const [randomKey, setRandomKey] = useState(0);

  const { isPending: isDeleting } = useDeleteFlashcard();
  const { data: set, isLoading } = useGetSet(params.setId);
  const { data: currentUser, isLoading: isLoadingUser } = useCurrentUser();

  const flashcards = useMemo(() => set?.flashcards || [], [set]);

  const cards = useMemo(() => {
    // Only shuffle if we have a randomKey greater than 0
    return processFlashcards(
      flashcards,
      randomKey,
      setRandomKey,
      flipRef,
      forwardRef
    );
  }, [flashcards, randomKey, forwardRef, flipRef]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        flashcardModal.isOn ||
        uploadModal.isOn ||
        editModal.isOn ||
        setModal.isOn
      )
        return;
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
  }, [flashcardModal.isOn, uploadModal.isOn, editModal.isOn, setModal.isOn]);

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
  useEffect(() => {
    if (flashcardModal.isOn) {
      flashcardModal.setOff();
    }
  }, []);

  const handleUpload = () => {
    if (currentUser?.isSubscribed) {
      uploadModal.setOn(params.setId);
    } else {
      createPremiumModal.setIsOn(true);
    }
  };
  // if (!set && !isLoading) router.push("/user/current");

  return (
    <div
      className={cn(
        "grid grid-cols-8 items-center p-2 h-[calc(100vh-100px)] w-full  mx-auto  gap-0",
        flashcardModal.isOn ? "max-w-6xl" : "max-w-3xl"
      )}
    >
      <div
        className={cn(
          "flex flex-col items-center p-5 h-[calc(100vh-100px)] w-full",
          flashcardModal.isOn ? "col-span-5" : "col-span-8"
        )}
      >
        {flashcards.length == 0 && (
          <div className="text-lg text-red-500 w-full max-w-6xl mx-auto text-center font-bold">
            You seem to have no flashcards in this set.
          </div>
        )}
        <FlashcardHeader
          set={set as SetWithFlashcards}
          currentUser={currentUser as Doc<"users">}
          setModal={setModal}
          randomKey={randomKey}
        />

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
        <div className="w-full max-w-6xl mx-auto grid grid-cols-2 gap-4">
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
          <button
            className="text-lg text-font3 w-full bg-font3/20 rounded-lg p-2 hover:bg-font3/30 transition-all duration-100 my-2"
            onClick={() => {
              const formattedFlashcards = formatFlashcardsForAnki(flashcards);
              downloadAnkiFile(formattedFlashcards, "flashcards.txt");
            }}
          >
            Export to Anki
          </button>
        </div>

        {currentUser?._id === set?.creator?._id && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-6xl">
            <FlashcardEditButton
              currentCard={currentCard}
              flashcards={flashcards}
              flashcardModal={flashcardModal}
              params={params}
            />
            <FlashcardAddButton
              flashcardModal={flashcardModal}
              params={params}
            />
            <button
              className="bg-red-400 rounded-lg w-full flex flex-col items-center p-4 hover:bg-gray-300 transition"
              onClick={() => {
                confirm.setDeleting(true);
                confirm.setId(flashcards?.[currentCard - 1]?._id);
              }}
              disabled={isDeleting}
            >
              Remove Card
            </button>
            <button
              className="bg-yellow-400 rounded-lg w-full flex flex-col items-center p-4 hover:bg-gray-300 transition"
              onClick={handleUpload}
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
        <DisplayFlashcardsList set={set as SetWithFlashcards} />
      </div>

      {flashcardModal.isOn && (
        <div className="col-span-3  w-full h-full" key={flashcardModal.id}>
          <SetDrawer />
        </div>
      )}
    </div>
  );
};

export default FlashcardPage;
