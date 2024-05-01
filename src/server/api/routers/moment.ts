import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { moments } from "~/server/db/schema";

export const momentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({ chapterId: z.coerce.number(), content: z.string().min(1) }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await ctx.db.insert(moments).values({
        createdById: ctx.session.user.id,
        chapterId: input.chapterId,
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
        where: eq(moments.chapterId, input.chapter),
      });
    }),
  getLatest: publicProcedure.query(async ({ ctx }) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return ctx.db.query.moments.findMany({
      orderBy: (posts, { asc }) => [asc(posts.createdAt)],
      limit: 10,
    });
  }),
});
