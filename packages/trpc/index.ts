import { createHTTPServer } from '@trpc/server/adapters/standalone';
import z from 'zod';
import { userRouter } from './routers/user';
import { prisma } from './utils/prisma';
import { procedure, router } from './utils/trpc';

// 定义一个路由
const appRouter = router({
  queryUser: procedure.query(async () => {
    const users = await prisma.user.findMany();
    return users;
  }),
  queryUserById: procedure.input(z.number()).query(async (opts) => {
    const users = await prisma.user.findUnique({
      where: {
        id: opts.input,
      },
    });
    return users;
  }),
  user: userRouter,
});

// 创建一个服务，这里使用的是trpc自带的，也可以使用express，koa等
const server = createHTTPServer({
  router: appRouter,
});

// 监听7001端口
server.listen(7001);

// 导出路由类型，可以在客户端使用，这一步很关键，不然在客户端中无法获得ts类型推断
export type AppRouter = typeof appRouter;
