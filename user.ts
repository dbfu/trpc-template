import { PrismaClient } from '@prisma/client';
import { initTRPC } from '@trpc/server';
import { pagination } from 'prisma-extension-pagination';
import z from 'zod';

const prisma = new PrismaClient().$extends(pagination());
const t = initTRPC.create();

export const userRouter = t.router({
  list: t.procedure
    .input(z.object({name: z.string().nullish()}))
    .query(async (opts) => {
      const users = await prisma.user.findMany({
        where: {
          name: opts.input.name && {
            contains: opts.input.name,
          },
        },
      });
      return users;
    }),
  page: t.procedure
    .input(
      z.object({
        limit: z.number().default(10),
        page: z.number().default(1),
        name: z.string().nullish(),
      })
    )
    .query(async ({input}) => {
      const where = input.name
        ? {
            name: {
              contains: input.name || '',
            },
          }
        : {};

      const [users, pageInfo] = await prisma.user
        .paginate({
          where,
        })
        .withPages({
          limit: input.limit,
          page: input.page,
          includePageCount: true,
        });

      return {users, pageInfo};
    }),
});
