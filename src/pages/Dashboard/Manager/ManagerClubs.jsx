import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import ClubCard from '../../../components/Home/ClubCard'
import useAuth from '../../../hooks/useAuth'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'

const ManagerClubs = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ['manager-clubs', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/manager-clubs/${user.email}`)
      return res.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  if (clubs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-gray-100">
        <div className="text-5xl mb-4 opacity-40">🏛️</div>
        <h3 className="text-base font-bold text-gray-700 mb-1">No clubs yet</h3>
        <p className="text-sm text-gray-500">Click "Create Club" above to add your first club.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {clubs.map((club) => (
        <ClubCard key={club._id} Club={club} isManager={true} />
      ))}
    </div>
  )
}

export default ManagerClubs