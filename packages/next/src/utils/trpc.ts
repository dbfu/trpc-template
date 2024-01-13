import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import type { AppRouter } from '../server';

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: `http://localhost:3000/api/trpc`,
        }),
      ],
      queryClientConfig: {
        defaultOptions: {
          queries: {
            // 默认会发送一次请求
            refetchOnMount: false,
            // 页面获取焦点后从新请求
            refetchOnWindowFocus: false,
            // 关闭重试
            retry: false,
          },
        },
      },
    };
  },
  ssr: true,
});
