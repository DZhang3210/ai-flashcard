import useCreateSet from "@/hooks/create-set-hook";
import { Plus } from "lucide-react";
import React from "react";

const SetFeed = () => {
  const createSet = useCreateSet();
  return (
    <div className="flex flex-col gap-4 mt-6">
      <button
        className="flex flex-row gap-2 px-10 py-4 rounded-full border-black border-2 hover:bg-black hover:text-white transition-all hover:scale-[101%]"
        onClick={createSet.setOn}
      >
        <Plus className="w-6 h-6" />
        <p>Create Set</p>
      </button>
    </div>
  );
};

// const FeedItem = () => {
//   return (
//     <div className="flex flex-row gap-2 px-10 py-4 rounded-full border-black border-2">
//       <Plus className="w-6 h-6" />
//       <p>Create Set</p>
//     </div>
//   );
// };

export default SetFeed;
