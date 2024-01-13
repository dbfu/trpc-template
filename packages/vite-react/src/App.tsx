import { trpc } from './utils/trpc';

function App() {

  const { data, isLoading, isError } = trpc.queryUser.useQuery();


  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  return (
    <>
      <div>{data?.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}</div>
    </>
  )
}

export default App
