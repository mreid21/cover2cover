/* eslint-disable @next/next/no-img-element */

import { api } from "~/trpc/server";
import { jsonSchema } from "~/types/zod";
import { Suspense } from "react";
import SearchInput from "../_components/search";

export default async function BookSearch() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const results = await api.search.findBook({ query: "dark age pierce brown" });

  return (
    <div className="mt-2 flex justify-center">
      <div className="w-[500px]">
        <SearchInput/>
        <div className="mx-auto my-2 grid max-w-max grid-cols-4 gap-4">
          {results.docs.map((work) => (
            <Suspense key={work.key} fallback={<span>loading...</span>}>
              <Book
                id={work.key}
                title={work.title}
                coverId={work.cover_i}
                author={work.author_name}
              />
            </Suspense>
          ))}
        </div>
      </div>
    </div>
  );
}

type BookProps = {
  id: string;
  title: string;
  author: string[];
  coverId?: number;
};

async function Book({ title, coverId }: BookProps) {
  let coverJson = undefined;
  const res = await fetch(
    `https://covers.openlibrary.org/b/id/${coverId}.json`,
    { cache: "force-cache" },
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const result = await res.json().catch((e) => console.log(e));

  const parsed = jsonSchema.safeParse(result);

  if (parsed.success) {
    coverJson = parsed.data;
  }

  return (
    <div className="flex flex-col gap-2">
      {coverJson?.source_url && <img src={coverJson.source_url} />}
      <span>{title}</span>
    </div>
  );
}
