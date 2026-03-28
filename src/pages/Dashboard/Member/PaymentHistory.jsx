import { useQuery } from '@tanstack/react-query'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import { TableCard, TableHeader, Table, PageHead, StatusBadge } from '../../../components/Dashboard/DashboardUI'

const PaymentsHistory = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['member-payments', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/member-payments/${user.email}`)
      return res.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  const total = payments.reduce((sum, p) => sum + (Number(p.price) || 0), 0)

  return (
    <div>
      <PageHead
        title="Payment History"
        subtitle="Your transaction records"
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: 'rgba(99,102,241,0.1)' }}>💳</div>
          <div>
            <div className="text-xl font-extrabold text-gray-900">{payments.length}</div>
            <div className="text-xs text-gray-500">Total Payments</div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: 'rgba(168,85,247,0.1)' }}>💰</div>
          <div>
            <div className="text-xl font-extrabold text-gray-900">${total.toFixed(2)}</div>
            <div className="text-xs text-gray-500">Total Spent</div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: 'rgba(20,184,166,0.1)' }}>✅</div>
          <div>
            <div className="text-xl font-extrabold text-gray-900">
              {payments.filter(p => p.status?.toLowerCase() === 'paid' || p.status?.toLowerCase() === 'success').length}
            </div>
            <div className="text-xs text-gray-500">Successful</div>
          </div>
        </div>
      </div>

      <TableCard>
        <TableHeader title="All Transactions" subtitle={`${payments.length} records`} />
        <Table
          headers={['#', 'Event / Club', 'Amount', 'Transaction ID', 'Status', 'Date']}
          empty={payments.length === 0 ? 'No payment records found' : null}
        >
          {payments.map((p, index) => (
            <tr key={p._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>

              <td className="px-6 py-4 text-sm font-medium text-gray-800">{p.eventTitle}</td>

              <td className="px-6 py-4">
                <span className="text-sm font-bold text-gray-900">${p.price}</span>
              </td>

              <td className="px-6 py-4">
                <code className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-mono">
                  {p.transactionId}
                </code>
              </td>

              <td className="px-6 py-4">
                <StatusBadge status={p.status || 'paid'} />
              </td>

              <td className="px-6 py-4 text-sm text-gray-500">
                {new Date(p.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </Table>
      </TableCard>
    </div>
  )
}

export default PaymentsHistory