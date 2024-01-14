import z from 'zod';

import { prisma } from '../utils/prisma';
import { procedure, router } from '../utils/trpc';

export const userRouter = router({
  list: procedure
    .input(
      z.object({
        name: z.string().nullish(),
      })
    )
    .query(async ({input}) => {
      // 使用contains来模糊搜索
      const where = input?.name
        ? {
            name: {
              contains: input.name,
            },
          }
        : {};

      const users = await prisma.user.findMany({
        where,
      });

      return users;
    }),
  page: procedure
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
  create: procedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
      })
    )
    .mutation(async ({input}) => {
      const user = await prisma.user.create({
        data: input,
      });

      return user;
    }),
  update: procedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        email: z.string(),
      })
    )
    .mutation(async ({input}) => {
      const user = await prisma.user.update({
        where: {id: input.id},
        data: input,
      });
      return user;
    }),
  remove: procedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({input}) => {
      await prisma.user.delete({
        where: {id: input.id},
      });
    }),
});
