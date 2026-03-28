import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import LoadingSpinner from '../Shared/LoadingSpinner'

const FeaturedClubs = () => {
  const axiosSecure = useAxiosSecure()

  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ['featured-clubs'],
    queryFn: async () => {
      const result = await axiosSecure.get('/clubs')
      return result.data
    },
  })

  // Show only first 4 clubs as featured
  const featured = clubs.slice(0, 4)

  if (isLoading) return <LoadingSpinner />

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Section Header */}
      <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>
            Featured Clubs
          </h2>
          <p className="text-gray-500 mt-1 text-sm">Hand-picked communities worth joining</p>
        </div>
        <Link
          to="/clubs"
          className="text-indigo-600 text-sm font-semibold hover:text-indigo-700 flex items-center gap-1 transition-colors"
        >
          See all clubs →
        </Link>
      </div>

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {featured.map((club) => (
          <FeaturedClubCard key={club._id} club={club} />
        ))}
      </div>
    </section>
  )
}

const FeaturedClubCard = ({ club }) => {
  const { _id, name, image, category, membersLimit, description } = club

  return (
    <Link
      to={`/clubs/${_id}`}
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-indigo-100 transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Image */}
      <div className="h-36 relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-500">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">🏛️</div>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="text-[10px] font-bold tracking-widest uppercase text-indigo-600 mb-1">
          {category}
        </div>
        <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1"
          style={{ fontFamily: "'Syne', sans-serif" }}>
          {name}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 flex items-center gap-1">
            👥 {membersLimit} max
          </span>
          <span
            className="text-xs font-semibold px-3 py-1 rounded-md text-white"
            style={{ background: 'linear-gradient(135deg, #4f46e5, #9333ea)' }}
          >
            View →
          </span>
        </div>
      </div>
    </Link>
  )
}

export default FeaturedClubs
