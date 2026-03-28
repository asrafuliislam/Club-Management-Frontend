import { Link } from 'react-router'

const statusConfig = {
  approved: { classes: 'bg-teal-50 text-teal-700', dot: 'bg-teal-500', label: 'Approved' },
  pending: { classes: 'bg-amber-50 text-amber-700', dot: 'bg-amber-500', label: 'Pending Review' },
  rejected: { classes: 'bg-red-50 text-red-600', dot: 'bg-red-500', label: 'Rejected' },
}

const ClubCard = ({ Club, isManager = false }) => {
  const { _id, name, image, category, location, membersLimit, manager, status } = Club || {}
  const statusInfo = statusConfig[status] || statusConfig.pending

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-indigo-100 transition-all duration-300 overflow-hidden">
      <Link to={`/clubs/${_id}`} className="block">
        {/* Image */}
        <div className="relative h-44 overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-500">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            src={image}
            alt={name}
          />
          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/90 text-indigo-700 backdrop-blur-sm">
              {category}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          <h3 className="font-bold text-gray-900 text-base leading-tight mb-1">{name}</h3>

          <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
            <span>📍</span>
            <span>{location}</span>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <span>👥</span>
              <span>{membersLimit} max</span>
            </div>

            {manager && (
              <div className="flex items-center gap-1.5">
                <img
                  src={manager.image || '/placeholder.png'}
                  alt={manager.name}
                  className="w-6 h-6 rounded-full object-cover ring-2 ring-white"
                  onError={(e) => { e.target.style.display = 'none' }}
                />
                <span className="text-xs text-gray-500">{manager.name}</span>
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* Manager Status Badge */}
      {isManager && (
        <div className="px-5 pb-4 -mt-1">
          <div className="pt-3 border-t border-gray-50 flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${statusInfo.classes}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot}`} />
              {statusInfo.label}
            </span>
            {status === 'pending' && (
              <span className="text-yellow-500 text-xs">Awaiting admin approval</span>
            )}
            {status === 'rejected' && (
              <span className="text-red-400 text-xs">Rejected by admin</span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ClubCard