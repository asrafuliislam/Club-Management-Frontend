import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import StatCard from '../../ReuseAble/StatCard'
import BarChart from '../../ReuseAble/BarChart'
import DonutChart from '../../ReuseAble/DonutChart'


const AdminStatistics = () => {
  const axiosSecure = useAxiosSecure()

  const { data = {} } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => (await axiosSecure.get('/admin-stats')).data,
  })

  /* Monthly revenue bars — use real data if available, fallback to demo */
  const revenueBars = (data.monthlyRevenue ?? [
    { label: 'Oct', value: 42 },
    { label: 'Nov', value: 58 },
    { label: 'Dec', value: 50 },
    { label: 'Jan', value: 65 },
    { label: 'Feb', value: 76 },
    { label: 'Mar', value: 85 },
  ]).map((b, i) => ({
    ...b,
    color: i % 3 === 0
      ? 'bg-gradient-to-t from-indigo-700 to-indigo-500'
      : i % 3 === 1
        ? 'bg-gradient-to-t from-purple-700 to-purple-400'
        : 'bg-gradient-to-t from-teal-600 to-teal-400',
  }))

  const totalRevSplit = data.totalRevenue ?? 100
  const membershipRev = Math.round(totalRevSplit * 0.6)
  const eventRev = Math.round(totalRevSplit * 0.4)

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-black text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>
          Admin Overview
        </h2>
        <p className="text-gray-500 text-sm mt-1">Platform-wide statistics at a glance</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Users" value={data.totalUsers} icon="👥" bg="bg-indigo-50" change="+320 users" changeTone="indigo" />
        <StatCard title="Total Clubs" value={data.totalClubs} icon="🏛️" bg="bg-teal-50" change="+8 clubs" changeTone="teal" />
        <StatCard title="Pending Clubs" value={data.pendingClubs} icon="⏳" bg="bg-amber-50" />
        <StatCard
          title="Revenue"
          value={data.totalRevenue != null ? `$${data.totalRevenue.toFixed(0)}` : '—'}
          icon="💰"
          bg="bg-purple-50"
          change="+$8.5k"
          changeTone="purple"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Bar chart — 2/3 width */}
        <div className="lg:col-span-2">
          <BarChart title="Monthly Revenue ($k)" bars={revenueBars} />
        </div>

        {/* Donut — 1/3 width */}
        <DonutChart
          title="Revenue Split"
          total={data.totalRevenue != null ? `$${data.totalRevenue.toFixed(0)}` : '—'}
          segments={[
            { label: 'Memberships', value: membershipRev, color: '#6366f1' },
            { label: 'Event Fees', value: eventRev, color: '#a855f7' },
          ]}
        />
      </div>

      {/* Second row — Users & Clubs donut */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <DonutChart
          title="Club Status"
          total={data.totalClubs ?? '—'}
          segments={[
            { label: 'Active', value: (data.totalClubs ?? 0) - (data.pendingClubs ?? 0), color: '#14b8a6' },
            { label: 'Pending', value: data.pendingClubs ?? 0, color: '#f59e0b' },
          ]}
        />
        <DonutChart
          title="User Roles"
          total={data.totalUsers ?? '—'}
          segments={[
            { label: 'Members', value: Math.round((data.totalUsers ?? 0) * 0.85), color: '#6366f1' },
            { label: 'Managers', value: Math.round((data.totalUsers ?? 0) * 0.12), color: '#a855f7' },
            { label: 'Admins', value: Math.round((data.totalUsers ?? 0) * 0.03), color: '#14b8a6' },
          ]}
        />

        {/* Quick stats card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <p className="font-bold text-gray-900 mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>Platform Health</p>
          <div className="space-y-3">
            {[
              { label: 'Active Users', pct: 87, color: 'bg-indigo-500' },
              { label: 'Club Fill Rate', pct: 64, color: 'bg-teal-500' },
              { label: 'Event Fill Rate', pct: 71, color: 'bg-purple-500' },
              { label: 'Payment Success', pct: 98, color: 'bg-green-500' },
            ].map(({ label, pct, color }) => (
              <div key={label}>
                <div className="flex justify-between text-xs font-medium text-gray-600 mb-1">
                  <span>{label}</span><span>{pct}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminStatistics