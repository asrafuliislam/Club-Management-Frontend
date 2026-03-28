import Container from '../Shared/Container'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../Shared/LoadingSpinner'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import ClubCard from './ClubCard'

const Clubs = () => {
    const axiosSecure = useAxiosSecure()

    const { data: clubs, isLoading } = useQuery({
        queryKey: ['clubs'],
        queryFn: async () => {
            const result = await axiosSecure.get('/clubs')
            return result.data
        },
    })

    if (isLoading) return <LoadingSpinner />

    return (
        <Container>
            {/* Page Header */}
            <div className="pt-10 pb-6 text-center">
                <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse" />
                    {clubs?.length || 0} clubs available
                </div>
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                    Discover Communities
                </h1>
                <p className="text-gray-500 text-base max-w-md mx-auto">
                    Find your tribe. Join a club that matches your passion and start building connections.
                </p>
            </div>

            {/* Clubs Grid */}
            {clubs && clubs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
                    {clubs.map((Club) => (
                        <ClubCard key={Club._id} Club={Club} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="text-5xl mb-4 opacity-50">🏛️</div>
                    <h3 className="text-lg font-bold text-gray-700 mb-2">No clubs yet</h3>
                    <p className="text-sm text-gray-500 max-w-xs">
                        Be the first to create a club and start building your community.
                    </p>
                </div>
            )}
        </Container>
    )
}

export default Clubs