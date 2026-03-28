import { useQuery } from '@tanstack/react-query'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import StatCard from '../../ReuseAble/StatCard'
import BarChart from '../../ReuseAble/BarChart'
import DonutChart from '../../ReuseAble/DonutChart'
import ProgressBar from '../../ReuseAble/ProgressBar'

/* ── Main ── */
const ManagerStatistics = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data = {} } = useQuery({
    queryKey: ['manager-stats', user?.email],
    enabled: !!user?.email,
    queryFn: async () => (await axiosSecure.get(`/manager-stats/${user.email}`)).data,
  })

  /* Monthly registrations bars (demo fallback) */
  const regBars = (data.monthlyRegistrations ?? [
    { label: 'Oct', value: 18 },
    { label: 'Nov', value: 32 },
    { label: 'Dec', value: 25 },
    { label: 'Jan', value: 41 },
    { label: 'Feb', value: 55 },
    { label: 'Mar', value: 63 },
  ]).map((b, i) => ({
    ...b,
    color: i % 2 === 0
      ? 'bg-gradient-to-t from-indigo-700 to-indigo-400'
      : 'bg-gradient-to-t from-teal-600  to-teal-400',
  }))

  const totalEvents  = data.totalEvents  ?? 0
  const upcomingEvt  = data.upcomingEvents ?? Math.round(totalEvents * 0.35)
  const pastEvt      = totalEvents - upcomingEvt

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-black text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>
          Manager Overview
        </h2>
        <p className="text-gray-500 text-sm mt-1">Your club performance at a glance</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard title="My Clubs"      value={data.totalClubs}    icon="🏛️" bg="bg-teal-50"   change="Active"   changeTone="teal"   />
        <StatCard title="My Events"     value={data.totalEvents}   icon="📅" bg="bg-indigo-50" change="Upcoming" changeTone="indigo" />
        <StatCard title="Total Members" value={data.totalMembers}  icon="👥" bg="bg-amber-50"  change="+18% growth" changeTone="amber"  />
        <StatCard
          title="Earnings"
          value={data.totalEarnings != null ? `$${data.totalEarnings}` : '—'}
          icon="💰"
          bg="bg-purple-50"
          change="+31% this month"
          changeTone="purple"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="lg:col-span-2">
          <BarChart
            title="Monthly Event Registrations"
            subtitle="New registrations per month"
            bars={regBars}
          />
        </div>
        <DonutChart
          title="Event Status"
          total={totalEvents}
          totalLabel="Events"
          segments={[
            { label: 'Upcoming', value: upcomingEvt, color: '#6366f1' },
            { label: 'Past',     value: pastEvt,     color: '#d1d5db' },
          ]}
        />
      </div>

      {/* Second row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Members per club breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <p className="font-bold text-gray-900 mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
            Members per Club
          </p>
          <div className="space-y-3">
            {(data.clubBreakdown ?? [
              { name: 'Code & Build Society', members: 1142 },
              { name: 'Design Masters',       members: 340  },
              { name: 'Startup Hub',          members: 210  },
            ]).map((club, i) => (
              <ProgressBar
                key={i}
                label={club.name}
                value={club.members}
                max={Math.max(...(data.clubBreakdown ?? [{ members: 1142 }]).map(c => c.members))}
                color={['bg-indigo-500', 'bg-teal-500', 'bg-purple-500'][i % 3]}
              />
            ))}
          </div>
        </div>

        {/* Earnings split */}
        <DonutChart
          title="Earnings Breakdown"
          total={data.totalEarnings != null ? `$${data.totalEarnings}` : '—'}
          totalLabel="Earned"
          segments={[
            { label: 'Memberships', value: Math.round((data.totalEarnings ?? 100) * 0.55), color: '#6366f1' },
            { label: 'Event Fees',  value: Math.round((data.totalEarnings ?? 100) * 0.45), color: '#14b8a6' },
          ]}
        />
      </div>
    </div>
  )
}

export default ManagerStatistics