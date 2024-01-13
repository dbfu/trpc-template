import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from 'trpc/index';

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: '/api',
    }),
  ],
});
