import { Link } from 'react-router'
import { getEventStatus } from '../../utils'

const statusConfig = {
  upcoming: {
    classes: 'bg-indigo-50 text-indigo-700',
    label: 'Upcoming',
  },
  running: {
    classes: 'bg-amber-50 text-amber-700',
    label: '🔴 Live Now',
  },
  finished: {
    classes: 'bg-gray-100 text-gray-500',
    label: 'Ended',
  },
}

const EventCard = ({ event }) => {
  const {
    _id,
    title,
    description,
    eventDate,
    location,
    isPaid,
    eventFee,
    clubName,
    clubBanner,
  } = event || {}

  const status = getEventStatus(eventDate)
  const statusInfo = statusConfig[status] || statusConfig.upcoming

  const dateObj = eventDate ? new Date(eventDate) : null
  const day = dateObj ? dateObj.getDate() : '—'
  const month = dateObj
    ? dateObj.toLocaleString('en', { month: 'short' }).toUpperCase()
    : '—'

  return (
    <Link
      to={`/events/${_id}`}
      className="group flex bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-indigo-100 transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Date Badge */}
      <div className="w-[72px] flex-shrink-0 bg-gradient-to-b from-indigo-600 to-indigo-700 flex flex-col items-center justify-center py-4 px-2 text-white text-center">
        <span className="text-2xl font-extrabold leading-none">{day}</span>
        <span className="text-[10px] font-bold tracking-widest uppercase opacity-80 mt-1">{month}</span>
      </div>

      {/* Body */}
      <div className="flex-1 p-4 min-w-0">
        {/* Club name */}
        {clubName && (
          <div className="flex items-center gap-1.5 mb-2">
            {clubBanner && (
              <img
                src={clubBanner}
                alt={clubName}
                className="w-4 h-4 rounded-full object-cover"
              />
            )}
            <span className="text-xs font-semibold text-indigo-600 truncate">{clubName}</span>
          </div>
        )}

        {/* Title */}
        <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1.5 line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-500 line-clamp-2 mb-3">{description}</p>

        {/* Tags row */}
        <div className="flex flex-wrap gap-1.5 items-center">
          {/* Status */}
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${statusInfo.classes}`}>
            {statusInfo.label}
          </span>

          {/* Free / Paid */}
          {isPaid ? (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700">
              ৳{eventFee?.toFixed(2)}
            </span>
          ) : (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-50 text-teal-700">
              Free
            </span>
          )}

          {/* Location */}
          <span className="text-[10px] text-gray-400 flex items-center gap-0.5 ml-auto">
            📍 {location}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default EventCard