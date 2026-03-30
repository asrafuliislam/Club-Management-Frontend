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
import Stat from '../../components/ReuseAble/Stat'
import Tag from '../../components/ReuseAble/Tag'
import MetaCard from '../../components/ReuseAble/MetaCard'

/* ── Tag pill (same as ClubDetails) ── */

/* ── Meta info card ── */



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

  const now = new Date()
  const eventDate = event.eventDate ? new Date(event.eventDate) : null
  const status = !eventDate ? null : eventDate > now ? 'upcoming' : 'ended'

  const regCount = regData?.count || 0
  const maxAtt = event.maxAttendees || 0
  const fillPct = maxAtt ? Math.min((regCount / maxAtt) * 100, 100) : 0

  return (
    <div className="min-h-screen bg-gray-50 pb-20">

      {/* ══ BANNER ══ */}
      <div className="relative w-full h-56 md:h-[280px] overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700">
        {event.bannerImage
          ? <img src={event.bannerImage} alt={event.title} className="w-full h-full object-cover" />
          : <div className="w-full h-full flex items-center justify-center text-[8rem] opacity-20 select-none">🚀</div>
        }
        {/* dark gradient so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

        {/* Event title pinned to bottom of banner */}
        <div className="absolute bottom-0 inset-x-0 pb-5 px-4">
          <Container>
            <div className="max-w-5xl mx-auto">
              {event.clubName && (
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-[.18em] mb-1">
                  {event.clubName}
                </p>
              )}
              <h1
                className="text-2xl md:text-4xl font-black text-white leading-tight drop-shadow-lg"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {event.title}
              </h1>
            </div>
          </Container>
        </div>
      </div>

      <Container>
        <div className="max-w-5xl mx-auto">

          {/* ══ INFO BAR — overlaps banner ══ */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xl px-6 py-5 -mt-5 mb-6 relative z-10">
            <div className="flex flex-col md:flex-row md:items-center gap-5 justify-between">

              {/* Tags + stats */}
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-2">
                  {event.isPaid
                    ? <Tag color="purple">💰 ${event.eventFee} Entry</Tag>
                    : <Tag color="teal">🎟️ Free Event</Tag>
                  }
                  {status === 'upcoming' && <Tag color="indigo">🕐 Upcoming</Tag>}
                  {status === 'ended' && <Tag color="gray">Ended</Tag>}
                  {event.location && <Tag color="gray">📍 {event.location}</Tag>}
                  {isRegistered && <Tag color="teal">✓ Registered</Tag>}
                  {isManager && <Tag color="purple">🧑‍💼 Organizer</Tag>}
                  {isFull && !isRegistered && <Tag color="red">⚠️ Full</Tag>}
                </div>
                <div className="flex flex-wrap gap-5">
                  <Stat icon="👥" val={`${regCount}${maxAtt ? ` / ${maxAtt}` : ''}`} lbl="registered" />
                  {eventDate && (
                    <Stat
                      icon="📅"
                      val={eventDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                      lbl=""
                    />
                  )}
                  {event.manager && <Stat icon="🧑‍💼" val={event.manager.name} lbl="" />}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-3 flex-shrink-0">
                {isManager ? (
                  <button
                    onClick={() => setIsUpdateEventOpen(true)}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    ✎ Edit Event
                  </button>
                ) : (
                  <button
                    disabled={!!isRegistered || !!isFull}
                    onClick={() => {
                      if (isRegistered) return toast.error('Already registered')
                      if (isFull) return toast.error('Event is full')
                      setIsRegisterModalOpen(true)
                    }}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200
                      ${isRegistered
                        ? 'bg-teal-50 text-teal-700 border border-teal-200 cursor-default'
                        : isFull
                          ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                          : 'text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5'
                      }`}
                  >
                    {isRegistered
                      ? '✓ Registered'
                      : isFull
                        ? 'Event Full'
                        : event.isPaid
                          ? `Register — $${event.eventFee}`
                          : 'Register Now — Free'
                    }
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ══ MAIN CONTENT CARD ══ */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 mb-6">
            <div className="flex flex-col lg:flex-row gap-8">

              {/* Left: Description + meta */}
              <div className="flex-1 min-w-0">
                <h2
                  className="text-lg font-black text-gray-900 mb-3"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  About this Event
                </h2>
                <p className="text-gray-600 text-sm leading-[1.85] mb-6">
                  {event.description || 'No description provided.'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {eventDate && (
                    <MetaCard
                      icon="📅"
                      label="Date & Time"
                      value={eventDate.toLocaleString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    />
                  )}
                  <MetaCard icon="📍" label="Location" value={event.location} />
                  <MetaCard icon="👥" label="Registered" value={`${regCount}${maxAtt ? ` / ${maxAtt}` : ''} attendees`} />
                  {event.manager && <MetaCard icon="🧑‍💼" label="Organizer" value={event.manager.name} />}
                </div>

                {/* Progress bar */}
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

                {/* Club strip */}
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

              {/* Right: Fee card */}
              <div className="lg:w-56 flex-shrink-0">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-5 text-center sticky top-6">
                  <div className="text-3xl font-black text-indigo-700 mb-1">
                    {event.isPaid ? `$${event.eventFee}` : 'Free'}
                  </div>
                  <p className="text-xs text-gray-500 mb-4">
                    {event.isPaid ? 'Registration fee' : 'No fee required'}
                  </p>

                  {isManager ? (
                    <button
                      onClick={() => setIsUpdateEventOpen(true)}
                      className="w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-indigo-700 border border-indigo-200 bg-white hover:bg-indigo-50 transition-all"
                    >
                      ✎ Edit Event
                    </button>
                  ) : (
                    <button
                      disabled={!!isRegistered || !!isFull}
                      onClick={() => {
                        if (isRegistered) return toast.error('Already registered')
                        if (isFull) return toast.error('Event is full')
                        setIsRegisterModalOpen(true)
                      }}
                      className={`w-full px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200
                        ${isRegistered
                          ? 'bg-teal-50 text-teal-700 border border-teal-200 cursor-default'
                          : isFull
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md hover:-translate-y-0.5'
                        }`}
                    >
                      {isRegistered ? '✓ Registered' : isFull ? 'Event Full' : 'Register Now'}
                    </button>
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

      {/* ══ MODALS ══ */}
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
    </div>
  )
}

export default EventDetails