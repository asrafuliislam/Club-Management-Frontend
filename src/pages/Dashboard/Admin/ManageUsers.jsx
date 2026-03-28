import { useQuery } from '@tanstack/react-query'
import UserDataRow from '../../../components/Dashboard/TableRows/UserDataRow'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import { TableCard, TableHeader, Table, PageHead } from '../../../components/Dashboard/DashboardUI'

const ManageUsers = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ['user', user?.email],
    queryFn: async () => {
      const result = await axiosSecure('/users-for-admin')
      return result.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <div>
      <PageHead
        title="Manage Users"
        subtitle="All registered users on ClubSphere"
      />

      <TableCard>
        <TableHeader
          title="Users"
          subtitle={`${users.length} total`}
        />
        <Table
          headers={['Avatar', 'Name', 'Email', 'Role', 'Action']}
          empty={users.length === 0 ? 'No users found' : null}
        >
          {users.map((u) => (
            <UserDataRow key={u._id} refetch={refetch} user={u} />
          ))}
        </Table>
      </TableCard>
    </div>
  )
}

export default ManageUsers