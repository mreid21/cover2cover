import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { clubs } from "~/server/db/schema";

export const clubRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.clubs.findMany();
  }),
  create: protectedProcedure
    .input(z.object({ name: z.string(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .insert(clubs)
        .values({ name: input.name, ownerId: input.userId });
    }),
});
