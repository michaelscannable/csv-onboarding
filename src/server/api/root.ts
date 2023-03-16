import { createTRPCRouter } from "~/server/api/trpc";
import { importRouter } from "~/server/api/routers/imports";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  imports: importRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
