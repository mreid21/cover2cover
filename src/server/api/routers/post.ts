import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { moments } from "~/server/db/schema";
import { api } from "~/trpc/server";

export const postRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1), content: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await ctx.db.insert(moments).values({
        name: input.name,
        content: input.content,
      });
    }),
  delete: publicProcedure.input(z.object({id: z.number()})).mutation(async ({ctx, input}) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await ctx.db.delete(moments).where(eq(moments.id, input.id))
  }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return ctx.db.query.moments.findMany({
      orderBy: (posts, { asc }) => [asc(posts.createdAt)],
      limit: 10,
    });
  }),
});
