import { momentRouter } from "~/server/api/routers/moment";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { chapterRouter } from "./routers/chapter";
import { clubRouter } from "./routers/club";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  moment: momentRouter,
  clubs: clubRouter,
  chapter: chapterRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
