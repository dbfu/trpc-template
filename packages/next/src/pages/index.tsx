import { trpc } from '@/utils/trpc';

export default function Home() {

  const { data: users } = trpc.queryUser.useQuery();

  return (
    <ul>
      {users?.map(user => (
        <li key={user.name}>{user.name}</li>
      ))}
    </ul>
  )
}
