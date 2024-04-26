import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { and, asc, eq } from "drizzle-orm";
import { chapters, chaptersReadBy } from "~/server/db/schema";

export const chapterRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(z.object({ userId: z.string() }))
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
        .orderBy(asc(chapters.number));
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
