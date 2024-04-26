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
        where: and(eq(bookReading.clubId, input.clubId), eq(bookReading.current, true))
      })
    }),
  setCurrentlyReading: protectedProcedure
    .input(z.object({ clubId: z.number(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .insert(bookReading)
        .values({ clubId: input.clubId, name: input.name, current: true })
        .onConflictDoNothing({
          target: [bookReading.name, bookReading.clubId],
        });
    }),
  create: protectedProcedure
    .input(z.object({ name: z.string(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .insert(clubs)
        .values({ name: input.name, ownerId: input.userId });
    }),
});
