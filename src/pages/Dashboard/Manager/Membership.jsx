import { useQuery } from '@tanstack/react-query'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import { TableCard, TableHeader, Table, PageHead, StatusBadge } from '../../../components/Dashboard/DashboardUI'

const Membership = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: members = [], isLoading } = useQuery({
    queryKey: ['manager-members', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/manager-members/${user.email}`)
      return res.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <div>
      <PageHead
        title="Club Members"
        subtitle="All members who have joined your clubs"
      />

      <TableCard>
        <TableHeader
          title="Member List"
          subtitle={`${members.length} members`}
        />
        <Table
          headers={['#', 'Member', 'Email', 'Club', 'Joined Date']}
          empty={members.length === 0 ? 'No members yet' : null}
        >
          {members.map((member, index) => (
            <tr key={member._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>

              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <img
                    src={member.memberImage}
                    alt={member.memberName}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100 flex-shrink-0"
                  />
                  <span className="text-sm font-semibold text-gray-900">{member.memberName}</span>
                </div>
              </td>

              <td className="px-6 py-4 text-sm text-gray-600">{member.memberEmail}</td>

              <td className="px-6 py-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700">
                  {member.clubId}
                </span>
              </td>

              <td className="px-6 py-4 text-sm text-gray-500">
                {new Date(member.joinedAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </Table>
      </TableCard>
    </div>
  )
}

export default Membership