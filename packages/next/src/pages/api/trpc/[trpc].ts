/**
 * This file contains tRPC's HTTP response handler
 */
import { appRouter } from '@/server';
import * as trpcNext from '@trpc/server/adapters/next';

export default trpcNext.createNextApiHandler({
  router: appRouter,
});
