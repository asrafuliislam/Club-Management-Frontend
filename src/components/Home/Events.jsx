import { useState, useMemo } from 'react'
import Container from '../Shared/Container'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../Shared/LoadingSpinner'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import EventCard from './EventCard'

const getEventStatus = (eventDate) => {
  const now = new Date()
  const eventTime = new Date(eventDate)
  const nowDate = now.toDateString()
  const eventDateStr = eventTime.toDateString()
  if (eventDateStr === nowDate) return 'running'
  else if (eventTime > now) return 'upcoming'
  else return 'finished'
}

const tabs = [
  { name: 'Upcoming', value: 'upcoming', icon: '🗓️' },
  { name: 'Live Now', value: 'running', icon: '🔴' },
  { name: 'Finished', value: 'finished', icon: '✅' },
]

const Events = () => {
  const axiosSecure = useAxiosSecure()
  const [activeTab, setActiveTab] = useState('upcoming')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('newest')

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const result = await axiosSecure.get('/events')
      return result.data
    },
  })

  const filtered = useMemo(() => {
    let result = events.filter(
      (e) => getEventStatus(e.eventDate) === activeTab
    )

    // search by title or category
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (e) =>
          e.title?.toLowerCase().includes(q) ||
          e.category?.toLowerCase().includes(q)
      )
    }

    // sort by eventDate
    result = [...result].sort((a, b) => {
      const da = new Date(a.eventDate)
      const db = new Date(b.eventDate)
      return sort === 'newest' ? db - da : da - db
    })

    return result
  }, [events, activeTab, search, sort])

  const counts = useMemo(() => ({
    upcoming: events.filter((e) => getEventStatus(e.eventDate) === 'upcoming').length,
    running: events.filter((e) => getEventStatus(e.eventDate) === 'running').length,
    finished: events.filter((e) => getEventStatus(e.eventDate) === 'finished').length,
  }), [events])

  if (isLoading) return <LoadingSpinner />

  return (
    <Container>
      {/* Page Header */}
      <div className="pt-10 pb-6 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
          <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse" />
          {events.length} total events
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Events</h1>
        <p className="text-gray-500 text-base max-w-md mx-auto">
          Browse upcoming and past events from clubs on the platform.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => { setActiveTab(tab.value); setSearch('') }}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200
              ${activeTab === tab.value
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-200'
                : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600'
              }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.name}</span>
            <span
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full
                ${activeTab === tab.value ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}
            >
              {counts[tab.value]}
            </span>
          </button>
        ))}
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
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or category..."
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
          onChange={(e) => setSort(e.target.value)}
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
            ? 'No events found'
            : `${filtered.length} event${filtered.length > 1 ? 's' : ''} found for "${search}"`}
        </p>
      )}

      {/* Events Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-12">
          {filtered.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-5xl mb-4 opacity-40">
            {search ? '🔍' : '📭'}
          </div>
          <h3 className="text-lg font-bold text-gray-700 mb-2">
            {search ? 'No events matched' : `No ${activeTab} events`}
          </h3>
          <p className="text-sm text-gray-500 max-w-xs">
            {search
              ? 'Try a different keyword or clear the search.'
              : 'Check back later or browse other event categories.'}
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

export default Events