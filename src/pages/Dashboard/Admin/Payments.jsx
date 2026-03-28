import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import { TableCard, TableHeader, Table, PageHead, StatusBadge } from '../../../components/Dashboard/DashboardUI'

const paymentTabs = [
  { label: 'Club Join Payments', value: 'membership' },
  { label: 'Registration Payments', value: 'registerPayment' },
]

const Payments = () => {
  const axiosSecure = useAxiosSecure()
  const [paymentType, setPaymentType] = useState('membership')

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['payments', paymentType],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?type=${paymentType}`)
      return res.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  const total = payments.reduce((sum, p) => sum + (Number(p.price) || 0), 0)

  return (
    <div>
      <PageHead
        title="Payments Management"
        subtitle="Platform-wide payment records"
      />

      {/* Toggle Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {paymentTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setPaymentType(tab.value)}
            className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200
              ${paymentType === tab.value
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100'
                : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <TableCard>
        <TableHeader
          title="Transactions"
          subtitle={`${payments.length} records`}
          action={
            <div className="text-sm text-gray-500">
              Total:{' '}
              <strong className="text-gray-900 font-bold">${total.toFixed(2)}</strong>
            </div>
          }
        />
        <Table
          headers={['#', 'User Email', 'Amount', 'Transaction ID', 'Status', 'Date']}
          empty={payments.length === 0 ? 'No payment records found' : null}
        >
          {payments.map((payment, index) => (
            <tr key={payment._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>

              <td className="px-6 py-4 text-sm text-gray-700">{payment.memberEmail}</td>

              <td className="px-6 py-4">
                <span className="text-sm font-bold text-gray-900">${payment.price}</span>
              </td>

              <td className="px-6 py-4">
                <code className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-mono">
                  {payment.transactionId}
                </code>
              </td>

              <td className="px-6 py-4">
                <StatusBadge status={payment.status} />
              </td>

              <td className="px-6 py-4 text-sm text-gray-500">
                {new Date(payment.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </Table>
      </TableCard>
    </div>
  )
}

export default Payments