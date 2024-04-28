/* eslint-disable @next/next/no-img-element */
import { api } from "~/trpc/server";
import SearchInput from "../_components/search";
import { Skeleton } from "../_components/ui/skeleton";
import { Suspense } from "react";

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

type BookProps = {
  id: string;
  title: string;
  coverImage?: string;
  authors?: string[];
};

type BookSearchResultsProps = {
  query: string;
};

async function BookSearchResults({ query }: BookSearchResultsProps) {
  const results = await api.search.findBook({ query });
  return (
    <div className="mx-auto my-2 grid max-w-max grid-cols-4 gap-4">
      {results.items?.map((volume) => (
        <Book
          key={volume.id}
          id={volume.id}
          title={volume.volumeInfo.title}
          coverImage={volume.volumeInfo.imageLinks?.thumbnail}
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

async function Book({ title, coverImage }: BookProps) {
  return (
    <div className="flex flex-col gap-2">
      {coverImage && (
        <div className="h-[170px] w-[115px] rounded-md">
          <img className="block h-full w-full" src={coverImage} alt="" />
        </div>
      )}
      <span>{title}</span>
      <div></div>
    </div>
  );
}
