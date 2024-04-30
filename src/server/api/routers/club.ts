import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { bookReading, clubs, usersToClubs } from "~/server/db/schema";
import { and, eq } from "drizzle-orm";
import type { TRPCServerContext } from "~/trpc/server";

export const clubRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.clubs.findMany();
  }),
  addMember: protectedProcedure
    .input(z.object({ userId: z.string(), clubId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await addMember(ctx.db, {
        userId: input.userId,
        clubId: input.clubId,
        isOwner: false,
      });
    }),
  currentReading: protectedProcedure
    .input(z.object({ clubId: z.number() }))
    .query(({ ctx, input }) => {
      return getCurrentlyReading(ctx.db, { clubId: input.clubId });
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
      const result = await ctx.db
        .insert(clubs)
        .values({ name: input.name, ownerId: input.userId })
        .returning({ id: clubs.id });

      await addMember(ctx.db, {
        userId: input.userId,
        clubId: result[0]!.id,
        isOwner: true,
      });
    }),
  overview: protectedProcedure
    .input(z.object({ clubId: z.coerce.number() }))
    .query(async ({ ctx, input }) => {
      const club = await ctx.db.query.clubs.findFirst({
        where: eq(clubs.id, input.clubId),
        with: {
          readings: true,
          usersToClubs: {
            limit: 5,
            with: {
              user: {
                columns: { id: true, name: true, image: true },
              },
            },
          },
        },
      });

      const currentlyReading = await getCurrentlyReading(ctx.db, {
        clubId: input.clubId,
      });

      return {
        ...club,
        currentlyReading,
      };
    }),
});

const addMember = async (
  db: TRPCServerContext["db"],
  args: { userId: string; clubId: number; isOwner: boolean },
) => {
  await db
    .insert(usersToClubs)
    .values({ userId: args.userId, clubId: args.clubId });
};

const getCurrentlyReading = async (
  db: TRPCServerContext["db"],
  args: { clubId: number },
) => {
  return db.query.bookReading.findFirst({
    where: and(
      eq(bookReading.clubId, args.clubId),
      eq(bookReading.current, true),
    ),
  });
};
