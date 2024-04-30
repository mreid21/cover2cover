/* eslint-disable @next/next/no-img-element */
import { api } from "~/trpc/server";
import { Skeleton } from "../../../_components/ui/skeleton";
import { Suspense } from "react";
import { BookResult } from "../../../_components/book-result";
import SearchInput from "~/app/_components/search-input";

export default async function BookSearch({
  searchParams,
  params
}: {
  params: {slug: string}
  searchParams: { query?: string };
}) {
  const query = searchParams?.query ?? "";
  const clubId = params.slug

  return (
    <div className="mt-2 flex justify-center">
      <div className="w-[600px]">
        <SearchInput queryName="query" />
        <Suspense key={query} fallback={<BookSearchResultsSkeleton />}>
          <BookSearchResults clubId={clubId} query={query} />
        </Suspense>
      </div>
    </div>
  );
}



type BookSearchResultsProps = {
  query: string;
  clubId: string
};

async function BookSearchResults({ query, clubId }: BookSearchResultsProps) {
  const results = await api.search.findBook({ query });
  return (
    <div className="mx-auto my-2 grid max-w-max grid-cols-4 gap-4">
      {results.items?.map((volume) => (
        <BookResult
          key={volume.id}
          id={volume.id}
          clubId={parseInt(clubId)}
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


