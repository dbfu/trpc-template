import { PrismaClient } from '@prisma/client';
import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import z from 'zod';

const prisma = new PrismaClient();
const t = initTRPC.create();

// 定义一个路由
const appRouter = t.router({
  queryUser: t.procedure.query(async () => {
    const users = await prisma.user.findMany();
    return users;
  }),
  queryUserById: t.procedure.input(z.number()).query(async (opts) => {
    const users = await prisma.user.findUnique({
      where: {
        id: opts.input,
      },
    });
    return users;
  }),
});

// 创建一个服务，这里使用的是trpc自带的，也可以使用express，koa等
const server = createHTTPServer({
  router: appRouter,
});

// 监听7001端口
server.listen(7001);

// 导出路由类型，可以在客户端使用，这一步很关键，不然在客户端中无法获得ts类型推断
export type AppRouter = typeof appRouter;
