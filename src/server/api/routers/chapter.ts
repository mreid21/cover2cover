import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { and, asc, count, eq } from "drizzle-orm";
import { chapterNote, chapters, chaptersReadBy } from "~/server/db/schema";

export const chapterRouter = createTRPCRouter({
  byId: protectedProcedure.input(z.object({id: z.coerce.number()})).query(({ctx, input}) => {
    return ctx.db.query.chapters.findFirst({where: eq(chapters.id, input.id), columns: {number: true, id: true}})
  }),
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
  getMoments: protectedProcedure
    .input(z.object({ chapterId: z.number(), userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const chapter = await ctx.db.query.chapters.findFirst({
        where: eq(chapters.id, input.chapterId),
        with: { moments: {with: {author: true}} },
      });

      const note = await ctx.db.query.chapterNote.findFirst({
        columns: {
          content: true
        },
        where: and(
          eq(chapterNote.userId, input.userId),
          eq(chapterNote.chapterId, input.chapterId),
        ),
      });

      return {...chapter, note}
    }),
  updateNote: protectedProcedure
    .input(
      z.object({
        content: z.string(),
        userId: z.string(),
        chapterId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .insert(chapterNote)
        .values({
          chapterId: input.chapterId,
          userId: input.userId,
          content: input.content,
        })
        .onConflictDoUpdate({
          target: [chapterNote.chapterId, chapterNote.userId],
          set: { content: input.content },
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
      const existingChapters = await ctx.db
        .select({ count: count() })
        .from(chapters)
        .where(eq(chapters.bookReadingId, input.bookReadingId));
      const startIndex = existingChapters[0]?.count ?? 0;
      const chapterNumbers = new Array(input.numChapters)
        .fill(0)
        .map((_, index) => startIndex + index + 1);

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
