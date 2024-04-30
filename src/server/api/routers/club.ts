import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { bookReading, clubs } from "~/server/db/schema";
import { and, eq } from "drizzle-orm";

export const clubRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.clubs.findMany();
  }),
  currentReading: protectedProcedure
    .input(z.object({ clubId: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.bookReading.findFirst({
        where: and(
          eq(bookReading.clubId, input.clubId),
          eq(bookReading.current, true),
        ),
      });
    }),
  setCurrentlyReading: protectedProcedure
    .input(
      z.object({
        clubId: z.number(),
        name: z.string(),
        bookId: z.string().optional(),
        coverUrl: z.string().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(bookReading)
        .set({ current: false })
        .where(
          and(
            eq(bookReading.current, true),
            eq(bookReading.clubId, input.clubId),
          ),
        );

      await ctx.db.insert(bookReading).values({ ...input, current: true });
    }),
  create: protectedProcedure
    .input(z.object({ name: z.string(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .insert(clubs)
        .values({ name: input.name, ownerId: input.userId });
    }),
  overview: protectedProcedure
    .input(z.object({ clubId: z.coerce.number() }))
    .query(async ({ ctx, input }) => {
      const club = await ctx.db.query.clubs.findFirst({
        where: eq(clubs.id, input.clubId),
        with: {
          readings: true,
        },
      });

      return {
        ...club,
        currentlyReading:
          club?.readings.filter((reading) => reading.current === true)[0] ??
          undefined,
      };
    }),
});
