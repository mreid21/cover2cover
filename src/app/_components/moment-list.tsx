"use client";
import { api } from "~/trpc/react";
import { Moment } from "./moment";
import { Skeleton } from "./ui/skeleton";
import { Input } from "./ui/input";

type MomentListProps = {
  chapterId: number;
};

export function MomentList({ chapterId }: MomentListProps) {
  const { data: chapterWithMoments, isLoading } =
    api.chapter.getMoments.useQuery({ chapterId });
  return (
    <div className="flex max-w-[300px] h-[700px] flex-col gap-2 sm:max-w-[600px]">
      <div className="flex-1 border p-4 overflow-y-auto">
        {isLoading && <MomentListSkeleton />}
        {chapterWithMoments?.moments?.map((m) => (
          <Moment id={m.id} content={m.content} key={m.id} />
        ))}
      </div>
      <Input/>
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
