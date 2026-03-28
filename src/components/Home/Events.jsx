import { useState } from 'react'
import Container from '../Shared/Container'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../Shared/LoadingSpinner'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import EventCard from './EventCard'

// ✅ status function (unchanged)
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

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const result = await axiosSecure.get('/events')
      return result.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  // ✅ filter events (unchanged logic)
  const upcoming = events.filter((e) => getEventStatus(e.eventDate) === 'upcoming')
  const running = events.filter((e) => getEventStatus(e.eventDate) === 'running')
  const finished = events.filter((e) => getEventStatus(e.eventDate) === 'finished')

  const counts = { upcoming: upcoming.length, running: running.length, finished: finished.length }

  let filteredEvents = []
  if (activeTab === 'upcoming') filteredEvents = upcoming
  if (activeTab === 'running') filteredEvents = running
  if (activeTab === 'finished') filteredEvents = finished

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
      <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
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

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-12">
          {filteredEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-5xl mb-4 opacity-40">📭</div>
          <h3 className="text-lg font-bold text-gray-700 mb-2">
            No {activeTab} events
          </h3>
          <p className="text-sm text-gray-500 max-w-xs">
            Check back later or browse other event categories.
          </p>
        </div>
      )}
    </Container>
  )
}

export default Events