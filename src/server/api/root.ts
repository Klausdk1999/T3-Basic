import { createTRPCRouter } from "./trpc";
import { bpmRouter } from "./routers/bpmApi";
import { licensesRouter } from "./routers/licensesApi";
import { usersRouter } from "./routers/usersApi";
import { authRouter } from "./routers/authApi";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  bpm: bpmRouter,
  licenses: licensesRouter,
  users: usersRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
