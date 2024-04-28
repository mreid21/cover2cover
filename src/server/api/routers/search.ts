import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import type { GoogleBooksAPIResponse } from "~/types/google-book";

const googleBooksURL = 'https://www.googleapis.com/books/v1/volumes'

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
        const books = await fetchBooks({query: input.query})
        return books
    }),
});

const fetchBooks = async ({ query }: { query: string }) => {
  const search = `${googleBooksURL}?q=${query}&maxResults=5&fields=items(volumeInfo, id)`;
  const res = await fetch(search, { cache: "force-cache" });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const result: GoogleBooksAPIResponse = await res.json();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return result;
};
