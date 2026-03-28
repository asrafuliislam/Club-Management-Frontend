import { useQuery } from '@tanstack/react-query'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import UpcomingEventCard from '../../ReuseAble/UpcomingEventCard'
import StatCard from '../../ReuseAble/StatCard'
import BarChart from '../../ReuseAble/BarChart'
import DonutChart from '../../ReuseAble/DonutChart'

const MemberStatistics = () => {
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth()

  const { data = {} } = useQuery({
    queryKey: ['member-stats', user?.email],
    enabled: !!user?.email,
    queryFn: async () => (await axiosSecure.get(`/member-stats/${user.email}`)).data,
  })

  const spendBars = (data.monthlySpending ?? [
    { label: 'Oct', value: 20 },
    { label: 'Nov', value: 45 },
    { label: 'Dec', value: 30 },
    { label: 'Jan', value: 60 },
    { label: 'Feb', value: 35 },
    { label: 'Mar', value: 80 },
  ]).map((b, i) => ({
    ...b,
    color: i % 3 === 0
      ? 'bg-gradient-to-t from-indigo-700 to-indigo-400'
      : i % 3 === 1
        ? 'bg-gradient-to-t from-teal-600  to-teal-400'
        : 'bg-gradient-to-t from-purple-700 to-purple-400',
  }))

  const totalPay = data.totalPayments ?? 0
  const memberPay = Math.round(totalPay * 0.55)
  const eventPay = totalPay - memberPay
  const joinedClubs = data.joinedClubs ?? 0
  const regEvents = data.registeredEvents ?? 0


  const { data: upcomingEvents = [] } = useQuery({
    queryKey: ['events', user?.email],
    enabled: !!user?.email,
    queryFn: async () =>
      (await axiosSecure.get(`/member-events/${user.email}`)).data,
  })



  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-black text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>
          My Overview
        </h2>
        <p className="text-gray-500 text-sm mt-1">Your activity and spending summary</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard title="Joined Clubs" value={joinedClubs} icon="🏛️" bg="bg-teal-50" change="Active member" changeTone="teal" />
        <StatCard title="Events Joined" value={regEvents} icon="🎟️" bg="bg-indigo-50" change="Registered" changeTone="indigo" />
        <StatCard title="Payments Made" value={totalPay} icon="💳" bg="bg-amber-50" />
        <StatCard
          title="Total Spent"
          value={data.totalSpent != null ? `$${data.totalSpent}` : '—'}
          icon="💸"
          bg="bg-red-50"
          change="This year"
          changeTone="red"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="lg:col-span-2">
          <BarChart
            title="Monthly Spending ($)"
            subtitle="How much you spent each month"
            bars={spendBars}
          />
        </div>
        <DonutChart
          title="Spending Split"
          total={data.totalSpent != null ? `$${data.totalSpent}` : '—'}
          totalLabel="Spent"
          segments={[
            { label: 'Memberships', value: memberPay, color: '#6366f1' },
            { label: 'Event Fees', value: eventPay, color: '#14b8a6' },
          ]}
        />
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Upcoming events */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <p className="font-bold text-gray-900 mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
            Upcoming Events
          </p>
          {upcomingEvents.length > 0
            ? upcomingEvents.map((ev, i) => (
              <UpcomingEventCard
                key={i}
                title={ev.title}
                date={ev.date}
                club={ev.club ?? ev.clubName}
                isPaid={ev.isPaid}
                fee={ev.fee ?? ev.eventFee}
              />
            ))
            : (
              <div className="text-center py-8 text-gray-400">
                <p className="text-3xl mb-2">📅</p>
                <p className="text-sm">No upcoming events</p>
              </div>
            )
          }
        </div>

        {/* Activity breakdown */}
        <DonutChart
          title="Activity Breakdown"
          total={joinedClubs + regEvents}
          totalLabel="Activities"
          segments={[
            { label: 'Clubs Joined', value: joinedClubs, color: '#6366f1' },
            { label: 'Events Attended', value: regEvents, color: '#14b8a6' },
          ]}
        />
      </div>
    </div>
  )
}

export default MemberStatistics