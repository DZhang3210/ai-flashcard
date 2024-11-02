import { Skeleton } from "@/components/ui/skeleton";

// Mock user data type

export default function UserProfile() {
  return (
    <div className="px-4 py-8 w-full bg-background1 min-h-[calc(100vh-100px)]">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-row space-y-4 gap-10">
          <Skeleton className="h-24  md:h-28 aspect-square rounded-full" />

          <div className="flex flex-col justify-start items-start h-full w-full">
            <div className="flex flex-row items-center gap-2">
              <Skeleton className="h-8 w-40" />
            </div>
            <div className="flex flex-row gap-6 text-lg mt-2">
              <Skeleton className="h-6 w-10" />
              <Skeleton className="h-6 w-10" />
              <Skeleton className="h-6 w-10" />
            </div>
          </div>
        </div>

        {/* UserTabs component would go here */}
      </div>
    </div>
  );
}
