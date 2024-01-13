import { useQuery } from '@tanstack/vue-query';

import { trpc } from './utils/trpc';

export const useUsers = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: () => trpc.queryUser.query(),
  });
