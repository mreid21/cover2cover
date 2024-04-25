import { eq } from "drizzle-orm";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { chapters, chaptersReadBy, moments } from "~/server/db/schema";

export const momentRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ chapter: z.number(), content: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await ctx.db.insert(moments).values({
        chapter: input.chapter,
        content: input.content,
      });
    }),
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(moments).where(eq(moments.id, input.id));
    }),
  getForChapter: publicProcedure
    .input(z.object({ chapter: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.moments.findMany({
        where: eq(moments.chapter, input.chapter),
      });
    }),
  getLatest: publicProcedure.query(async ({ ctx }) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return ctx.db.query.moments.findMany({
      orderBy: (posts, { asc }) => [asc(posts.createdAt)],
      limit: 10,
    });
  }),
  getChapters: protectedProcedure.query(({ ctx }) => {
    return ctx.db.select().from(chapters).leftJoin(chaptersReadBy, eq(chaptersReadBy.chapterId, chapters.id))
  }),
  markChapter: protectedProcedure
    .input(z.object({ chapterId: z.number(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(chaptersReadBy).values({
        userId: ctx.session.user.id,
        chapterId: input.chapterId,
      });
    }),
});
