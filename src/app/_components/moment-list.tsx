"use client";
import { api } from "~/trpc/react";
import { Moment } from "./moment";
import { Skeleton } from "./ui/skeleton";
import { Input } from "./ui/input";
import { useState } from "react";

type MomentListProps = {
  chapterId: number;
};

export function MomentList({ chapterId }: MomentListProps) {
  const utils = api.useUtils();
  const { data: chapterWithMoments, isLoading } =
    api.chapter.getMoments.useQuery({ chapterId });

  const { mutate: createMoment, isPending } = api.moment.create.useMutation({
    onSuccess: async () => {
      await utils.chapter.getMoments.invalidate();
    },
    onSettled: () => {
      setMomentText('')
    }
  });

  const [momentText, setMomentText] = useState("");

  return (
    <div className="flex h-[700px] max-w-[300px] flex-col gap-2 sm:max-w-[900px]">
      <div className="flex-1 overflow-y-auto p-4">
        {isLoading && <MomentListSkeleton />}
        {chapterWithMoments?.moments?.map((m) => (
          <Moment id={m.id} content={m.content} key={m.id} />
        ))}
      </div>
      {isPending && <span>loading..</span>}
      <Input
        onKeyDown={(e) => {
          if (e.key === "Enter" && momentText.length > 0) {
            createMoment({ content: momentText, chapterId });
          }
        }}
        onChange={(e) => setMomentText(e.target.value)}
      />
    </div>
  );
}

function MomentListSkeleton() {
  const skeletonCount = new Array(5).fill(null);
  return (
    <>
      <div className="flex flex-col gap-1">
        {skeletonCount.map((_, index) => (
          <div key={index} className="flex flex-col gap-2 py-4 pr-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-48 rounded-full" />
            </div>
            <div className="ml-4 flex flex-col gap-2">
              <Skeleton className="h-4 w-[350px]" />
              <Skeleton className="h-4 w-[275px]" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
