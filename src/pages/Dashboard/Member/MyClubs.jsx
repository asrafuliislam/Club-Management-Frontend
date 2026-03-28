import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import ClubCard from '../../../components/Home/ClubCard'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import { PageHead } from '../../../components/Dashboard/DashboardUI'

const MyClubs = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ['member-clubs', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/member-clubs/${user.email}`)
      return res.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <div>
      <PageHead
        title="My Clubs"
        subtitle={`You've joined ${clubs.length} club${clubs.length !== 1 ? 's' : ''}`}
      />

      {clubs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {clubs.map((club) => (
            <ClubCard key={club._id} Club={club} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-gray-100">
          <div className="text-5xl mb-4 opacity-40">🏛️</div>
          <h3 className="text-base font-bold text-gray-700 mb-1">No clubs joined yet</h3>
          <p className="text-sm text-gray-500">Browse clubs and join one that matches your interest.</p>
        </div>
      )}
    </div>
  )
}

export default MyClubs