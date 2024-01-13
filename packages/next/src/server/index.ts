import { initTRPC } from '@trpc/server';

const t = initTRPC.create();

// 定义一个路由
export const appRouter = t.router({
  queryUser: t.procedure.query(() => {
    // 这里可以继续使用prisma
    return [
      {
        name: 'tom',
      },
    ];
  }),
});

// 导出路由类型，可以在客户端使用，这一步很关键，不然在客户端中无法获得ts类型推断
export type AppRouter = typeof appRouter;
