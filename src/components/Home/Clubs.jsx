import Container from '../Shared/Container'
import { useQuery } from '@tanstack/react-query'
import { useState, useMemo } from 'react'
import LoadingSpinner from '../Shared/LoadingSpinner'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import ClubCard from './ClubCard'

const Clubs = () => {
    const axiosSecure = useAxiosSecure()
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('newest')

    const { data: clubs = [], isLoading } = useQuery({
        queryKey: ['clubs'],
        queryFn: async () => {
            const result = await axiosSecure.get('/clubs')
            return result.data
        },
    })

    const filtered = useMemo(() => {
        let result = [...clubs]

        // search by name or category
        if (search.trim()) {
            const q = search.toLowerCase()
            result = result.filter(
                c =>
                    c.name?.toLowerCase().includes(q) ||
                    c.category?.toLowerCase().includes(q)
            )
        }

        // sort
        result.sort((a, b) => {
            const da = new Date(a.createdAt)
            const db = new Date(b.createdAt)
            return sort === 'newest' ? db - da : da - db
        })

        return result
    }, [clubs, search, sort])

    if (isLoading) return <LoadingSpinner />

    return (
        <Container>
            {/* Page Header */}
            <div className="pt-10 pb-6 text-center">
                <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse" />
                    {clubs.length} clubs available
                </div>
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                    Discover Communities
                </h1>
                <p className="text-gray-500 text-base max-w-md mx-auto">
                    Find your tribe. Join a club that matches your passion and start building connections.
                </p>
            </div>

            {/* Search + Sort bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
                {/* Search */}
                <div className="relative flex-1">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
                        🔍
                    </span>
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search by name or category..."
                        className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all placeholder:text-gray-400"
                    />
                    {search && (
                        <button
                            onClick={() => setSearch('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold"
                        >
                            ✕
                        </button>
                    )}
                </div>

                {/* Sort */}
                <select
                    value={sort}
                    onChange={e => setSort(e.target.value)}
                    className="px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all text-gray-700 font-medium cursor-pointer"
                >
                    <option value="newest">📅 Newest first</option>
                    <option value="oldest">📅 Oldest first</option>
                </select>
            </div>

            {/* Result count when searching */}
            {search.trim() && (
                <p className="text-sm text-gray-400 mb-4">
                    {filtered.length === 0
                        ? 'No clubs found'
                        : `${filtered.length} club${filtered.length > 1 ? 's' : ''} found for "${search}"`}
                </p>
            )}

            {/* Clubs Grid */}
            {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
                    {filtered.map(Club => (
                        <ClubCard key={Club._id} Club={Club} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="text-5xl mb-4 opacity-50">
                        {search ? '🔍' : '🏛️'}
                    </div>
                    <h3 className="text-lg font-bold text-gray-700 mb-2">
                        {search ? 'No clubs matched' : 'No clubs yet'}
                    </h3>
                    <p className="text-sm text-gray-500 max-w-xs">
                        {search
                            ? `Try a different keyword or clear the search.`
                            : 'Be the first to create a club and start building your community.'}
                    </p>
                    {search && (
                        <button
                            onClick={() => setSearch('')}
                            className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
                        >
                            Clear search
                        </button>
                    )}
                </div>
            )}
        </Container>
    )
}

export default Clubs