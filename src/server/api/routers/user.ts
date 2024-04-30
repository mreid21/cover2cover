import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { ilike } from "drizzle-orm";
import { users } from "~/server/db/schema";

export const userRouter = createTRPCRouter({
  find: protectedProcedure
    .input(z.object({ username: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.users.findMany({
        where: ilike(users.name, `%${input.username}%`),
        limit: 10
      });
    }),
});
