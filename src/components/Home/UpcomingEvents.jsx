import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import LoadingSpinner from '../Shared/LoadingSpinner'

const getEventStatus = (eventDate) => {
  const now = new Date()
  const eventTime = new Date(eventDate)
  if (eventTime.toDateString() === now.toDateString()) return 'running'
  if (eventTime > now) return 'upcoming'
  return 'finished'
}

const dateGradients = [
  'linear-gradient(180deg, #4f46e5, #4338ca)',
  'linear-gradient(180deg, #14b8a6, #0d9488)',
  'linear-gradient(180deg, #a855f7, #7e22ce)',
]

const UpcomingEvents = () => {
  const axiosSecure = useAxiosSecure()

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['upcoming-events'],
    queryFn: async () => {
      const result = await axiosSecure.get('/events')
      return result.data
    },
  })

  const upcomingEvents = events
    .filter((e) => getEventStatus(e.eventDate) === 'upcoming')
    .slice(0, 3)

  if (isLoading) return <LoadingSpinner />

  return (
    <section className="max-w-7xl mx-auto px-6 pb-16">
      {/* Section Header */}
      <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>
            Upcoming Events
          </h2>
          <p className="text-gray-500 mt-1 text-sm">Don't miss what's happening around you</p>
        </div>
        <Link
          to="/events"
          className="text-indigo-600 text-sm font-semibold hover:text-indigo-700 flex items-center gap-1 transition-colors"
        >
          See all events →
        </Link>
      </div>

      {/* Events Grid */}
      {upcomingEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {upcomingEvents.map((event, i) => (
            <UpcomingEventCard key={event._id} event={event} gradientIndex={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-3 opacity-40">📭</div>
          <p className="text-sm">No upcoming events right now</p>
        </div>
      )}
    </section>
  )
}

const UpcomingEventCard = ({ event, gradientIndex }) => {
  const { _id, title, eventDate, location, isPaid, eventFee, clubName } = event

  const dateObj = eventDate ? new Date(eventDate) : null
  const day = dateObj ? dateObj.getDate() : '—'
  const month = dateObj
    ? dateObj.toLocaleString('en', { month: 'short' }).toUpperCase()
    : '—'

  const gradient = dateGradients[gradientIndex % dateGradients.length]

  return (
    <Link
      to={`/events/${_id}`}
      className="group flex bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-indigo-100 transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Date Badge */}
      <div
        className="w-[70px] flex-shrink-0 flex flex-col items-center justify-center py-4 px-2 text-white text-center"
        style={{ background: gradient }}
      >
        <span className="text-2xl font-extrabold leading-none">{day}</span>
        <span className="text-[10px] font-bold tracking-widest uppercase opacity-80 mt-1">{month}</span>
      </div>

      {/* Body */}
      <div className="flex-1 p-4 min-w-0">
        {clubName && (
          <div className="text-xs font-semibold text-indigo-600 mb-1.5 truncate">{clubName}</div>
        )}
        <h3 className="font-bold text-gray-900 text-sm leading-tight mb-2 line-clamp-2"
          style={{ fontFamily: "'Syne', sans-serif" }}>
          {title}
        </h3>
        <div className="flex items-center flex-wrap gap-1.5">
          {/* Fee tag */}
          {isPaid ? (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700">
              💰 ৳{eventFee}
            </span>
          ) : (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-50 text-teal-700">
              🎟️ Free
            </span>
          )}
          {/* Status */}
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700">
            🕐 Upcoming
          </span>
          {/* Location */}
          {location && (
            <span className="text-[10px] text-gray-400 flex items-center gap-0.5 w-full mt-1">
              📍 {location}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default UpcomingEvents
