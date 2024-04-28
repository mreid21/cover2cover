import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { and, asc, eq } from "drizzle-orm";
import { chapters, chaptersReadBy } from "~/server/db/schema";

export const chapterRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(z.object({ userId: z.string(), bookReadingId: z.coerce.number() }))
    .query(({ ctx, input }) => {
      return ctx.db
        .select()
        .from(chapters)
        .leftJoin(
          chaptersReadBy,
          and(
            eq(chapters.id, chaptersReadBy.chapterId),
            eq(chaptersReadBy.userId, input.userId),
          ),
        )
        .where(eq(chapters.bookReadingId, input.bookReadingId))
        .orderBy(asc(chapters.number));
    }),
  getMoments: protectedProcedure.input(z.object({chapterId: z.number()})).query(({ ctx, input }) => {
    return ctx.db.query.chapters.findFirst({
      where: eq(chapters.id, input.chapterId),
      with: { moments: true },
    });
  }),
  addChapters: protectedProcedure
    .input(
      z.object({
        numChapters: z.number().min(1).max(100),
        bookReadingId: z.coerce.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const chapterNumbers = new Array(input.numChapters)
        .fill(0)
        .map((_, index) => index + 1);

      await ctx.db.transaction(async (tx) => {
        for (const num of chapterNumbers) {
          await tx
            .insert(chapters)
            .values({ bookReadingId: input.bookReadingId, number: num });
        }
      });
    }),
  markRead: protectedProcedure
    .input(z.object({ chapterId: z.number(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(chaptersReadBy).values({
        userId: ctx.session.user.id,
        chapterId: input.chapterId,
      });
    }),
});
