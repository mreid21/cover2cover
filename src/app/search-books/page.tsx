/* eslint-disable @next/next/no-img-element */
import { api } from "~/trpc/server";
import SearchInput from "../_components/search";

export default async function BookSearch() {
  return (
    <div className="mt-2 flex justify-center">
      <div className="w-[500px]">
        <SearchInput />
        <BookSearchResults/>
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

async function BookSearchResults() {
  const results = await api.search.findBook({ query: "red rising" });
  return (
    <div className="mx-auto my-2 grid max-w-max grid-cols-4 gap-4">
      {results.items.map((volume) => (
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

async function Book({ title, coverImage }: BookProps) {
  return (
    <div className="flex flex-col gap-2">
      {coverImage && <img src={coverImage} alt="" />}
      <span>{title}</span>
      <div></div>
    </div>
  );
}
