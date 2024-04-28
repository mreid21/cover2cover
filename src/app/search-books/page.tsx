/* eslint-disable @next/next/no-img-element */
import { api } from "~/trpc/server";
import SearchInput from "../_components/search";
import { Skeleton } from "../_components/ui/skeleton";
import { Suspense } from "react";
import { BookResult } from "../_components/book-result";

export default async function BookSearch({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const query = searchParams?.query ?? "";

  return (
    <div className="mt-2 flex justify-center">
      <div className="w-[600px]">
        <SearchInput queryName="query" />
        <Suspense key={query} fallback={<BookSearchResultsSkeleton />}>
          <BookSearchResults query={query} />
        </Suspense>
      </div>
    </div>
  );
}



type BookSearchResultsProps = {
  query: string;
};

async function BookSearchResults({ query }: BookSearchResultsProps) {
  const results = await api.search.findBook({ query });
  return (
    <div className="mx-auto my-2 grid max-w-max grid-cols-4 gap-4">
      {results.items?.map((volume) => (
        <BookResult
          key={volume.id}
          id={volume.id}
          title={volume.volumeInfo.title}
          coverImage={volume.volumeInfo.imageLinks?.thumbnail ?? null}
          authors={volume.volumeInfo.authors}
        />
      ))}
    </div>
  );
}

function BookSearchResultsSkeleton() {
  const skeletonCount = new Array(12).fill(null);
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {skeletonCount.map((_, index) => (
          <Skeleton key={index} className="h-[170px] w-[115px]" />
        ))}
      </div>
    </>
  );
}


