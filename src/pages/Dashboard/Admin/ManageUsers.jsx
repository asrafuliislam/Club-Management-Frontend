import { useQuery } from '@tanstack/react-query'
import UserDataRow from '../../../components/Dashboard/TableRows/UserDataRow'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure()

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const result = await axiosSecure('/users-for-admin')
      return result.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="p-6 max-w-5xl">

      {/* Page Header */}
      <div className="mb-6">
        <h1
          className="text-2xl font-black text-gray-900"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Manage Users
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          All registered users on ClubSphere
        </p>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Card header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2
            className="font-bold text-gray-900"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Users
          </h2>
          <span className="text-sm text-gray-400">{users.length} total</span>
        </div>

        {users.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center px-6">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-2xl mb-4">👥</div>
            <p className="font-semibold text-gray-700">No users found</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/60">
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Member</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Email</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Role</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <UserDataRow key={u._id} user={u} refetch={refetch} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default ManageUsers