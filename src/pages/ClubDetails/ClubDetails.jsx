import { useParams, Link } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import useAuth from '../../hooks/useAuth'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import Container from '../../components/Shared/Container'
import JoinClubModal from '../../components/Modal/JoinClubModal'
import EventCreateModal from '../../components/Modal/EventCreateModal'
import ClubUpdateModal from '../../components/Modal/ClubUpdateModal'
import toast from 'react-hot-toast'
import EmptyTabState from '../../components/ReuseAble/EmptyTabState'
import Stat from '../../components/ReuseAble/Stat'
import InfoTile from '../../components/ReuseAble/InfoTile'
import MemberRow from '../../components/ReuseAble/MemberRow'
import EventRow from '../../components/ReuseAble/EventRow'

const Tag = ({ children, color = 'indigo' }) => {
  const map = {
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    teal: 'bg-teal-50   text-teal-700   border-teal-100',
    purple: 'bg-purple-50 text-purple-700 border-purple-100',
    gray: 'bg-gray-100  text-gray-600   border-gray-200',
    amber: 'bg-amber-50  text-amber-700  border-amber-100',
  }

  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${map[color]}`}>
      {children}
    </span>
  )
}


const EventStatusBadge = ({ date }) => {
  const isPast = new Date(date) < new Date()
  return isPast
    ? <Tag color="gray">Ended</Tag>
    : <Tag color="indigo">🕐 Upcoming</Tag>
}



/* ── Main ── */
const ClubDetails = () => {
  const { id } = useParams()
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth()

  const [activeTab, setActiveTab] = useState('events')
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)

  const { data: club = {}, isLoading, refetch: refetchClub } = useQuery({
    queryKey: ['club', id],
    queryFn: async () => (await axiosSecure.get(`/clubs/${id}`)).data,
  })


  const { data: isMember } = useQuery({
    queryKey: ['is-member', user?.email, club._id],
    enabled: !!user?.email && !!club._id,
    queryFn: async () => (await axiosSecure.get(`/is-member?email=${user.email}&clubId=${club._id}`)).data,
  })


  const { data: memberData } = useQuery({
    queryKey: ['club-member-count', club._id],
    enabled: !!club._id,
    queryFn: async () => (await axiosSecure.get(`/club-member-count/${club._id}`)).data,
  })

  const { data: clubEvents = [] } = useQuery({
    queryKey: ['club-events', club._id],
    enabled: !!club._id,
    queryFn: async () => (await axiosSecure.get(`/club-events?clubId=${club._id}`)).data,
  })

  const { data: clubMembers = [] } = useQuery({
    queryKey: ['club-members', club._id],
    enabled: !!club._id,
    queryFn: async () =>
      (await axiosSecure.get(`/club-members/${club._id}`)).data,
  })


  if (isLoading) return <LoadingSpinner />

  const { name, image, category, description, location, membersLimit, manager, membershipFee } = club
  const isManager = manager?.email === user?.email

  const isPaid = membershipFee && membershipFee > 0

  const handleJoinClick = () => {
    if (isMember) { toast.error('You are already a member of this club'); return }
    setIsJoinModalOpen(true)
  }

  const tabs = [
    { key: 'events', label: '📅 Events', count: clubEvents.length },
    { key: 'members', label: '👥 Members', count: memberData?.count || 0 },
    { key: 'about', label: '📋 About' },
  ]


  return (
    <div className="min-h-screen bg-gray-50 pb-20">

      {/* ══ BANNER ══ */}
      <div className="relative w-full h-56 md:h-[280px] overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700">
        {image
          ? <img src={image} alt={name} className="w-full h-full object-cover" />
          : <div className="w-full h-full flex items-center justify-center text-[8rem] opacity-20 select-none">🏛️</div>
        }
        {/* dark gradient at bottom so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

        {/* Club name pinned to bottom of banner */}
        <div className="absolute bottom-0 inset-x-0 pb-5 px-4">
          <Container>
            <div className="max-w-5xl mx-auto">
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-[.18em] mb-1">{category}</p>
              <h1
                className="text-2xl md:text-4xl font-black text-white leading-tight drop-shadow-lg"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {name}
              </h1>
            </div>
          </Container>
        </div>
      </div>

      <Container>
        <div className="max-w-5xl mx-auto">

          {/* ══ INFO BAR card — overlaps banner ══ */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xl px-6 py-5 -mt-5 mb-6 relative z-10">
            <div className="flex flex-col md:flex-row md:items-center gap-5 justify-between">

              {/* Tags + stats */}
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-2">
                  <Tag color="indigo">🏷️ {category}</Tag>
                  {location && <Tag color="gray">📍 {location}</Tag>}
                  {isPaid
                    ? <Tag color="purple">💰 ${membershipFee} </Tag>
                    : <Tag color="teal">🎟️ Free to join</Tag>
                  }
                  {isMember && <Tag color="teal">✓ Member</Tag>}
                  {isManager && <Tag color="purple">🧑‍💼 Manager</Tag>}
                </div>
                <div className="flex flex-wrap gap-5">
                  <Stat icon="👥" val={memberData?.count || 0} lbl="members" />
                  <Stat icon="📅" val={clubEvents.length} lbl="events" />
                  {membersLimit && <Stat icon="🔢" val={membersLimit} lbl="member limit" />}
                  <Stat icon="⭐" val="4.8" lbl="rating" />
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-3 flex-shrink-0">
                {isManager ? (
                  <>
                    <button
                      onClick={() => setIsUpdateModalOpen(true)}
                      className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-indigo-300 transition-all duration-200"
                    >
                      ✎ Edit Club
                    </button>
                    <button
                      onClick={() => setIsEventModalOpen(true)}
                      className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all duration-200"
                    >
                      + Create Event
                    </button>
                  </>
                ) : (
                  <button
                    disabled={!!isMember}
                    onClick={handleJoinClick}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200
                      ${isMember
                        ? 'bg-teal-50 text-teal-700 border border-teal-200 cursor-default'
                        : 'text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5'
                      }`}
                  >
                    {isMember ? '✓ Already a Member' : isPaid ? `Join Club — $${membershipFee}` : 'Join Club - Free'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ══ TABS ══ */}
          <div className="flex border-b border-gray-200 mb-6 bg-white rounded-t-xl shadow-sm">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`flex items-center gap-2 px-5 py-3.5 text-sm font-semibold border-b-2 -mb-px transition-all duration-150
                  ${activeTab === t.key
                    ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50'
                    : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                  }`}
              >
                {t.label}
                {t.count !== undefined && (
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full
                    ${activeTab === t.key ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-500'}`}>
                    {t.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* ══ TAB: EVENTS ══ */}
          {activeTab === 'events' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>Club Events</h2>
                {isManager && (
                  <button
                    onClick={() => setIsEventModalOpen(true)}
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors flex items-center gap-1"
                  >
                    + Create Event
                  </button>
                )}
              </div>

              {clubEvents.length === 0 ? (
                <EmptyTabState
                  icon="📅"
                  title="No events yet"
                  desc={isManager ? 'Create your first event using the button above.' : 'Events for this club will appear here.'}
                />
              ) : (
                clubEvents.map((ev, i) => <EventRow key={ev._id || i} event={ev} />)
              )}
            </div>
          )}

          {/* ══ TAB: MEMBERS ══ */}
          {activeTab === 'members' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>Members</h2>
                <span className="text-sm text-gray-500">{memberData?.count || 0} total</span>
              </div>

              {/* Join-required notice */}
              {!isMember && !isManager && (
                <div className="mx-6 my-4 bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-center gap-3">
                  <span className="text-xl flex-shrink-0">🔒</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-amber-800">Join required</p>
                    <p className="text-xs text-amber-600 mt-0.5">Become a member to see the full members list.</p>
                  </div>
                  <button
                    onClick={handleJoinClick}
                    className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-amber-500 hover:bg-amber-600 transition-colors"
                  >
                    Join
                  </button>
                </div>
              )}

              {/* Manager row always visible */}
              {manager && (
                <MemberRow
                  image={manager.image}
                  name={manager.name}
                  email={manager.email}
                  badge={<Tag color="purple">🧑‍💼 Manager</Tag>}
                  joinDate="Club founder"
                />
              )}

              {clubMembers.map((m) => (
                <MemberRow
                  key={m._id}
                  image={m.memberImage}
                  name={m.memberName}
                  email={m.memberEmail}
                  badge={<Tag color="teal">👤 Member</Tag>}
                  joinDate={m.joinedAt || 'Member'}
                />
              ))}
            </div>


          )}

          {/* ══ TAB: ABOUT ══ */}
          {activeTab === 'about' && (
            <div className="space-y-5">
              {/* Description */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
                <h2 className="text-lg font-black text-gray-900 mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
                  About this Club
                </h2>
                <p className="text-gray-600 text-sm leading-[1.85]">
                  {description || 'No description provided yet.'}
                </p>
              </div>

              {/* Info tiles */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <InfoTile icon="📍" label="Location" value={location || '—'} />
                <InfoTile icon="🏷️" label="Category" value={category || '—'} />
                <InfoTile icon="👥" label="Members" value={memberData?.count || 0} color="indigo" />
                <InfoTile icon="🔢" label="Member Limit" value={membersLimit || 'Unlimited'} />
              </div>

              {/* Manager card */}
              {manager && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Club Manager</p>
                  <div className="flex items-center gap-4">
                    <img
                      src={manager.image || `https://ui-avatars.com/api/?name=${manager.name}&background=6366f1&color=fff`}
                      alt={manager.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-100 shadow"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900">{manager.name}</p>
                      <p className="text-sm text-gray-500 truncate">{manager.email}</p>
                    </div>
                    <Tag color="purple">🧑‍💼 Manager</Tag>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </Container>

      {/* ══ MODALS ══ */}
      <JoinClubModal isOpen={isJoinModalOpen} closeModal={() => setIsJoinModalOpen(false)} club={club} />
      <EventCreateModal isOpen={isEventModalOpen} closeModal={() => setIsEventModalOpen(false)} club={club} />
      {isManager && (
        <ClubUpdateModal
          isOpen={isUpdateModalOpen}
          closeModal={() => setIsUpdateModalOpen(false)}
          club={club}
          user={user}
          refetchClub={refetchClub}
        />
      )}
    </div>
  )
}



export default ClubDetails