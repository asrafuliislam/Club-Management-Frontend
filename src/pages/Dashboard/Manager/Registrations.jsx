import { useQuery } from '@tanstack/react-query'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import { TableCard, TableHeader, Table, PageHead } from '../../../components/Dashboard/DashboardUI'

const Registrations = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: registrations = [], isLoading } = useQuery({
    queryKey: ['event-registrations', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/manager-event-registrations/${user.email}`)
      return res.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <div>
      <PageHead
        title="Event Registrations"
        subtitle="All attendees registered for your events"
      />

      <TableCard>
        <TableHeader
          title="Registrations"
          subtitle={`${registrations.length} total`}
        />
        <Table
          headers={['#', 'Member', 'Email', 'Event', 'Price', 'Transaction ID', 'Date']}
          empty={registrations.length === 0 ? 'No registrations yet' : null}
        >
          {registrations.map((reg, index) => (
            <tr key={reg._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>

              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <img
                    src={reg.memberImage}
                    alt={reg.memberName}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100 flex-shrink-0"
                  />
                  <span className="text-sm font-semibold text-gray-900">{reg.memberName}</span>
                </div>
              </td>

              <td className="px-6 py-4 text-sm text-gray-600">{reg.memberEmail}</td>

              <td className="px-6 py-4">
                <span className="text-sm font-medium text-gray-800">{reg.eventTitle}</span>
              </td>

              <td className="px-6 py-4">
                <span className="text-sm font-bold text-gray-900">${reg.price}</span>
              </td>

              <td className="px-6 py-4">
                <code className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-mono">
                  {reg.transactionId}
                </code>
              </td>

              <td className="px-6 py-4 text-sm text-gray-500">
                {new Date(reg.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </Table>
      </TableCard>
    </div>
  )
}

export default Registrations