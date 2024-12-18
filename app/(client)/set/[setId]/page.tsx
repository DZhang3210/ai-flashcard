"use client";
import { Id } from "@/convex/_generated/dataModel";
import { useCurrentUser } from "@/features/auth/api/use-current-user";
import { useDeleteFlashcard } from "@/features/flashcard/api/use-delete-flashcard";
import { useToggleLike } from "@/features/likes/api/use-toggle-like";
import { useGetSet } from "@/features/set/api/use-get-set";
import useCreateFlashcard from "@/hooks/create-flash-hook";
import useCreateSet from "@/hooks/create-set-hook";
import useCreateUpload from "@/hooks/create-upload-hook";
import { cn } from "@/lib/utils";
import { Edit, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FlashcardArray } from "react-quizlet-flashcard";
import { toast } from "sonner";

const FlashcardPage = ({ params }: { params: { setId: Id<"sets"> } }) => {
  const router = useRouter();
  const { data: set, isLoading } = useGetSet(params.setId);
  const { data: currentUser, isLoading: isLoadingUser } = useCurrentUser();
  const flashcardModal = useCreateFlashcard();
  const { mutate: deleteFlashcard, isPending: isDeleting } =
    useDeleteFlashcard();

  const setModal = useCreateSet();
  const uploadModal = useCreateUpload();

  const flashcards = useMemo(() => set?.flashcards || [], [set]);
  const cards = useMemo(
    () =>
      flashcards?.map((flashcard, index) => ({
        id: index,
        frontHTML: (
          <button
            className="text-2xl w-full h-full flex justify-center items-center cursor-pointer"
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
            className="text-2xl  w-full h-full flex justify-center items-center cursor-pointer"
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
  const handleDeleteFlashcard = () => {
    if (currentCard - 1 < 0 || currentCard - 1 > flashcards?.length) return;
    const currentFlashcard = flashcards?.[currentCard - 1];
    if (!currentFlashcard) return;
    deleteFlashcard(
      { flashCardId: currentFlashcard._id },
      {
        onSuccess: () => {
          toast.success("Flashcard deleted");
        },
        onError: () => {
          toast.error("Failed to delete flashcard");
        },
      }
    );
  };
  useEffect(() => {
    // Don't add the event listener if the modal is open
    if (flashcardModal.isOn) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        flipRef.current?.();
      }
      if (event.code === "ArrowRight" || event.code === "KeyD") {
        event.preventDefault();
        forwardRef.current?.nextCard?.();
      }
      if (event.code === "ArrowLeft" || event.code === "KeyA") {
        event.preventDefault();
        forwardRef.current?.prevCard?.();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [flashcardModal.isOn]);

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

  if (!set && !isLoading) router.push("/user/current");

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
  const { mutate: toggleLike, isPending: togglingLike } = useToggleLike();

  return (
    <div className="flex flex-col items-center p-10 h-[calc(100vh-100px)] w-full max-w-3xl mx-auto">
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
        </div>
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={handleEdit}
            className="text-font4 text-xl flex flex-row items-center gap-2 px-4 py-2 rounded-lg hover:bg-font4/20 transition-all duration-100 border border-font4"
          >
            Edit
            <Edit className="w-6 h-6" />
          </button>
          <button
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
          </button>
        </div>
      </div>
      <div className="flex w-full items-center justify-center">
        <FlashcardArray
          cards={cards || []}
          currentCardFlipRef={flipRef}
          forwardRef={forwardRef}
          onCardChange={(id, index) => setCurrentCard(index)}
          FlashcardArrayStyle={{
            minWidth: "100%",
            // width: "80%",
            padding: "0 1%",
          }}
        />
      </div>
      <div className="grid grid-cols-4 gap-4 w-full max-w-6xl">
        <button
          className="bg-gray-100 rounded-lg w-full flex flex-col items-center p-4 hover:bg-gray-300 transition"
          onClick={handleEditFlashcard}
        >
          Edit Card
        </button>
        <button
          className="bg-gray-200 rounded-lg w-full flex flex-col items-center p-4 hover:bg-gray-300 transition"
          onClick={() => flashcardModal.setOn({ setId: params.setId })}
        >
          Add Card
        </button>
        <button
          className="bg-gray-200 rounded-lg w-full flex flex-col items-center p-4 hover:bg-gray-300 transition"
          onClick={handleDeleteFlashcard}
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
      <Link
        href={`/user/${set?.creator?._id}`}
        className="text-sm text-gray-500 w-full max-w-6xl mx-auto text-center hover:underline"
      >
        Made by {set?.creator?.name}
      </Link>
    </div>
  );
};

export default FlashcardPage;
