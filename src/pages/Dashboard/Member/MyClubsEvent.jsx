import { useQuery } from '@tanstack/react-query'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import EventCard from '../../../components/Home/EventCard'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import { PageHead } from '../../../components/Dashboard/DashboardUI'

const MyClubsEvent = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['member-events', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/member-events/${user.email}`)
      return res.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <div>
      <PageHead
        title="My Events"
        subtitle={`${events.length} event${events.length !== 1 ? 's' : ''} registered`}
      />

      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-gray-100">
          <div className="text-5xl mb-4 opacity-40">🎟️</div>
          <h3 className="text-base font-bold text-gray-700 mb-1">No events yet</h3>
          <p className="text-sm text-gray-500">Browse upcoming events and register to get started.</p>
        </div>
      )}
    </div>
  )
}

export default MyClubsEvent