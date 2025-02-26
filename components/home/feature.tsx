import Image from "next/image";
import React from "react";

const feature = () => {
  return (
    <div className="w-full h-full col-span-5  items-center justify-center mt-10 grid grid-cols-3 gap-10 px-40">
      <div className="w-full h-full bg-background2 rounded-lg p-10 flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">
            Multiple Accepted File Formats Accepted
          </h1>
          <div className="flex flex-row gap-2">
            <div className="bg-background3 rounded-full border-2 border-red-400 px-4 py-1 bg-red-400 text-white text-sm">
              pdf
            </div>
            <div className="bg-background3 rounded-full border-2 border-blue-400 px-4 py-1 bg-blue-400 text-white text-sm">
              text
            </div>
            <div className="bg-background3 rounded-full border-2 border-green-400 px-4 py-1 bg-green-400 text-white text-sm">
              image
            </div>
          </div>
        </div>
        <Image
          src="/File-Upload-Image.png"
          alt="/File-Upload-Image.png"
          width={830}
          height={904}
        />
      </div>
      <div className="w-full h-full bg-background2 rounded-lg p-10 flex flex-col gap-10">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">Variety of ways to practice</h1>
            <div className="flex flex-row gap-2">
              Practice with flashcards in a variety of formats, to test your
              knowledge.
            </div>
          </div>
          <Image
            src="/Variety-Ways-To-Practice.png"
            alt="/Variety-Ways-To-Practice.png"
            width={809}
            height={808}
          />
        </div>
      </div>
      <div className="w-full h-full bg-background2 rounded-lg p-10 flex flex-col gap-10">
        <h1 className="text-2xl font-bold">Export to your Preferred Format</h1>
        <div className="flex flex-row gap-2">
          Convert your flashcards back to a pdf or anki deck.
        </div>
        <div className="flex flex-row gap-2">
          <div className="bg-background3 rounded-full border-2 border-red-400 px-4 py-1 bg-red-400 text-white text-sm">
            Recall IQ
          </div>
          <Image
            src="/flashcard-apps/Anki-icon.png"
            alt="Anki-icon.png"
            width={100}
            height={100}
          />
          <Image
            src="/flashcard-apps/Quizlet.png"
            alt="Quizlet.png"
            width={100}
            height={100}
          />
          <Image
            src="/flashcard-apps/Rem-Note.png"
            alt="Rem-Note.png"
            width={100}
            height={100}
          />
        </div>
      </div>
    </div>
  );
};

export default feature;
