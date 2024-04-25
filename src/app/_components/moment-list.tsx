"use client";
import { api } from "~/trpc/react";
import CreateMoment from "./create-moment";
import { Moment } from "./moment";
import { Skeleton } from "./ui/skeleton";

type MomentListProps = {
  chapter: number
}

export function MomentList({chapter}: MomentListProps) {
  const { data: moments, isLoading } = api.moment.getForChapter.useQuery({chapter});
  return (
    <div className="flex flex-col gap-2 max-w-[300px] sm:max-w-[600px]">
      <CreateMoment chapter={chapter} />
      {isLoading && <MomentListSkeleton />}
      {moments?.map((m) => <Moment id={m.id} content={m.content} key={m.id} />)}
    </div>
  );
}

function MomentListSkeleton() {
  const skeletonCount = new Array(5).fill(null);
  return (
    <>
      <div className="flex flex-col gap-1">
        {skeletonCount.map((_, index) => (
          <div key={index} className="flex flex-col gap-2 pr-4 py-4">
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
