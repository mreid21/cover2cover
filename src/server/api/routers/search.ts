import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import type { OpenLibrarySearchResponse } from "~/types/open-library";

const baseURL = "https://openlibrary.org/search.json";

export const searchRouter = createTRPCRouter({
  findBook: protectedProcedure
    .input(
      z.object({
        query: z
          .string()
          .min(1)
          .transform((q) => encodeURIComponent(q)),
      }),
    )
    .query(async ({ input }) => {
        const books = await fetchWorks({query: input.query})
        return books
    }),
});

const fetchWorks = async ({ query }: { query: string }) => {
  const search = `${baseURL}?q=${query}&_spellcheck_count=0&limit=10&fields=key,cover_i,title,subtitle,author_name,name&mode=everything`;
  const res = await fetch(search, { cache: "force-cache" });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const result: OpenLibrarySearchResponse  = await res.json();

  return result;
};
