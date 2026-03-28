import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import useAuth from '../../hooks/useAuth'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import Button from '../../components/Shared/Button/Button'
import RegistrationEventModal from '../../components/Modal/RegistrationEventModal'
import EventUpdateModal from '../../components/Modal/EventUpdateModal'
import Container from '../../components/Shared/Container'
import toast from 'react-hot-toast'

const EventDetails = () => {
  const { id } = useParams()
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth()
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  const [isUpdateEventOpen, setIsUpdateEventOpen] = useState(false)

  const { data: event = {}, isLoading, refetch: refetchEvent } = useQuery({
    queryKey: ['event', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/events/${id}`)
      return res.data
    },
  })

  const { data: isRegistered } = useQuery({
    queryKey: ['is-registered', user?.email, event._id],
    enabled: !!user?.email && !!event._id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/is-registered?email=${user.email}&eventId=${event._id}`)
      return res.data
    },
  })

  const { data: regData } = useQuery({
    queryKey: ['event-registration-count', id],
    enabled: !!event._id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/event-registration-count/${id}`)
      return res.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  const isManager = event.manager?.email === user?.email
  const isFull = event.maxAttendees && regData?.count >= event.maxAttendees

  // Event status
  const now = new Date()
  const eventDate = event.eventDate ? new Date(event.eventDate) : null
  const status = !eventDate ? null : eventDate > now ? 'upcoming' : 'ended'

  // Progress
  const regCount = regData?.count || 0
  const maxAtt = event.maxAttendees || 0
  const fillPct = maxAtt ? Math.min((regCount / maxAtt) * 100, 100) : 0

  return (
    <>
      {/* Banner */}
      <div className="w-full h-56 md:h-80 relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700">
        {event.bannerImage ? (
          <img src={event.bannerImage} alt={event.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-8xl opacity-30">🚀</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Status pill overlay */}
        <div className="absolute top-4 left-4 flex gap-2">
          {event.isPaid ? (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-500/90 text-white backdrop-blur-sm">
              💰 Paid · ${event.eventFee}
            </span>
          ) : (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-teal-500/90 text-white backdrop-blur-sm">
              🎟️ Free
            </span>
          )}
          {status === 'upcoming' && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-500/90 text-white backdrop-blur-sm">
              🕐 Upcoming
            </span>
          )}
          {status === 'ended' && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gray-500/90 text-white backdrop-blur-sm">
              Ended
            </span>
          )}
        </div>
      </div>

      <Container>
        <div className="max-w-4xl mx-auto -mt-8 pb-16">

          {/* Main Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 md:p-8 mb-6">
            <div className="flex flex-col lg:flex-row gap-8">

              {/* Left: Info */}
              <div className="flex-1 min-w-0">
                <h1
                  className="text-2xl md:text-3xl font-black text-gray-900 mb-4"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {event.title}
                </h1>

                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {event.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  <MetaCard icon="📅" label="Date & Time" value={eventDate?.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })} />
                  <MetaCard icon="📍" label="Location" value={event.location} />
                  <MetaCard icon="👥" label="Registered" value={`${regCount}${maxAtt ? ` / ${maxAtt}` : ''} attendees`} />
                  {event.manager && (
                    <MetaCard icon="🧑‍💼" label="Organizer" value={event.manager?.name} />
                  )}
                </div>

                {/* Progress bar — only if maxAttendees set */}
                {maxAtt > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs font-medium text-gray-500 mb-1.5">
                      <span>Registration Progress</span>
                      <span>{regCount} / {maxAtt}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${fillPct}%` }}
                      />
                    </div>
                    {isFull && (
                      <p className="text-xs font-semibold text-red-500 mt-1.5">⚠️ This event is full</p>
                    )}
                  </div>
                )}

                {/* Club info strip */}
                {event.clubName && (
                  <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                    {event.clubBanner && (
                      <img src={event.clubBanner} alt={event.clubName} className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow" />
                    )}
                    <div>
                      <p className="text-xs font-medium text-gray-500">Hosted by</p>
                      <p className="text-sm font-bold text-gray-800">{event.clubName}</p>
                    </div>
                    <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                      {event.clubCategory}
                    </span>
                  </div>
                )}
              </div>

              {/* Right: CTA box */}
              <div className="lg:w-60 flex-shrink-0">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-5 text-center">
                  <div className="text-3xl font-black text-indigo-700 mb-1">
                    {event.isPaid ? `$${event.eventFee}` : 'Free'}
                  </div>
                  <p className="text-xs text-gray-500 mb-4">
                    {event.isPaid ? 'Registration fee' : 'No fee required'}
                  </p>

                  {!isManager ? (
                    <Button
                      disabled={!!isRegistered || !!isFull}
                      onClick={() => {
                        if (isRegistered) return toast.error('Already registered')
                        if (isFull) return toast.error('Event is full')
                        setIsRegisterModalOpen(true)
                      }}
                      label={isRegistered ? '✓ Registered' : isFull ? 'Event Full' : 'Register Now'}
                    />
                  ) : (
                    <Button
                      label="✎ Edit Event"
                      onClick={() => setIsUpdateEventOpen(true)}
                      outline
                    />
                  )}

                  <p className="text-xs text-gray-400 mt-3">
                    {isRegistered
                      ? 'You are registered ✓'
                      : isFull
                      ? 'No spots remaining'
                      : '🔒 Secure registration'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Modals */}
      <RegistrationEventModal
        isOpen={isRegisterModalOpen}
        closeModal={() => setIsRegisterModalOpen(false)}
        event={event}
        user={user}
      />
      {isManager && (
        <EventUpdateModal
          isOpen={isUpdateEventOpen}
          closeModal={() => setIsUpdateEventOpen(false)}
          event={event}
          user={user}
          refetchEvents={refetchEvent}
        />
      )}
    </>
  )
}

const MetaCard = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
    <span className="text-lg mt-0.5">{icon}</span>
    <div>
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <p className="text-sm font-semibold text-gray-800">{value}</p>
    </div>
  </div>
)

export default EventDetails