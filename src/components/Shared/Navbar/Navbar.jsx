import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router'
import useAuth from '../../../hooks/useAuth'
import avatarImg from '../../../assets/images/placeholder.jpg'
import Container from '../Container'
import Logo from '../Logo'

/* ── nav links config ── */
const NAV_LINKS = [
  { to: '/',       label: 'Home',   icon: '🏠' },
  { to: '/clubs',  label: 'Clubs',  icon: '🏛️' },
  { to: '/events', label: 'Events', icon: '📅' },
]

/* ── role badge config ── */
const ROLE_STYLE = {
  admin:   { label: 'Admin',   cls: 'bg-purple-100 text-purple-700 border-purple-200' },
  manager: { label: 'Manager', cls: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
  member:  { label: 'Member',  cls: 'bg-teal-100   text-teal-700   border-teal-200'   },
}

const Navbar = () => {
  const { user, logOut, role } = useAuth()   // make sure useAuth exposes `role`
  const location   = useLocation()
  const menuRef    = useRef(null)
  const drawerRef  = useRef(null)

  const [dropOpen,   setDropOpen]   = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [scrolled,   setScrolled]   = useState(false)
  const [scrollPct,  setScrollPct]  = useState(0)

  /* scroll listener — shadow + progress bar */
  useEffect(() => {
    const onScroll = () => {
      const y   = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(y > 12)
      setScrollPct(max > 0 ? Math.min((y / max) * 100, 100) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* close dropdown on outside click */
  useEffect(() => {
    const h = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setDropOpen(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  /* close drawer on outside click */
  useEffect(() => {
    const h = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) setDrawerOpen(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  /* lock body scroll when drawer open */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  /* close drawer / dropdown on route change */
  useEffect(() => {
    setDropOpen(false)
    setDrawerOpen(false)
  }, [location.pathname])

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  const roleInfo = ROLE_STYLE[role] || null

  const handleLogout = () => {
    logOut()
    setDropOpen(false)
    setDrawerOpen(false)
  }

  return (
    <>
      {/* ══════════════════════════════════════════
          NAVBAR BAR
      ══════════════════════════════════════════ */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300
          bg-white/80 backdrop-blur-2xl border-b
          ${scrolled
            ? 'border-gray-200 shadow-lg shadow-gray-100/60'
            : 'border-transparent'
          }
        `}
      >
        {/* scroll progress bar */}
        <div
          className="absolute top-0 left-0 h-[2.5px] bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-400 transition-all duration-100 rounded-r-full"
          style={{ width: `${scrollPct}%` }}
        />

        <div className="h-[62px]">
          <Container>
            <div className="flex h-[62px] items-center justify-between gap-4">

              {/* ── Logo ── */}
              <Logo />

              {/* ── Desktop nav links ── */}
              <nav className="hidden md:flex items-center gap-0.5">
                {NAV_LINKS.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    className={`relative px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 group
                      ${isActive(to)
                        ? 'text-indigo-600 bg-indigo-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                  >
                    {label}
                    {/* active underline dot */}
                    {isActive(to) && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-500" />
                    )}
                  </Link>
                ))}
              </nav>

              {/* ── Right side ── */}
              <div className="flex items-center gap-2">

                {/* Auth buttons — desktop, guest only */}
                {!user && (
                  <div className="hidden md:flex items-center gap-2">
                    <Link
                      to="/login"
                      className="px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-200 rounded-xl hover:border-indigo-400 hover:text-indigo-600 transition-all duration-200"
                    >
                      Log in
                    </Link>
                    <Link
                      to="/signup"
                      className="px-4 py-2 text-sm font-semibold text-white rounded-xl
                        bg-gradient-to-r from-indigo-600 to-purple-600
                        shadow-md shadow-indigo-200
                        hover:shadow-lg hover:shadow-indigo-300
                        hover:-translate-y-0.5
                        transition-all duration-200"
                    >
                      Sign up free
                    </Link>
                  </div>
                )}

                {/* Dashboard quick link — logged-in desktop */}
                {user && (
                  <Link
                    to="/dashboard"
                    className={`hidden md:flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-xl transition-all duration-200
                      ${isActive('/dashboard')
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                  >
                    <span className="text-base">📊</span>
                    Dashboard
                  </Link>
                )}

                {/* Avatar dropdown — desktop */}
                {user && (
                  <div className="hidden md:block relative" ref={menuRef}>
                    <button
                      onClick={() => setDropOpen(v => !v)}
                      className={`flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full border transition-all duration-200
                        ${dropOpen
                          ? 'border-indigo-400 shadow-md shadow-indigo-100 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-300 hover:shadow-md hover:shadow-gray-100'
                        }`}
                    >
                      <div className="relative">
                        <img
                          referrerPolicy="no-referrer"
                          src={user.photoURL || avatarImg}
                          alt="avatar"
                          className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-sm"
                        />
                        {/* online dot */}
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-teal-400 border-2 border-white rounded-full" />
                      </div>
                      <span className="text-sm font-semibold text-gray-800 max-w-[100px] truncate">
                        {user.displayName?.split(' ')[0]}
                      </span>
                      <svg
                        className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${dropOpen ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Dropdown panel */}
                    {dropOpen && (
                      <div className="absolute right-0 mt-2.5 w-60 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden
                        animate-[fadeSlideDown_.18s_ease_both]"
                      >
                        {/* User info header */}
                        <div className="px-4 py-3.5 bg-gradient-to-br from-indigo-50 to-purple-50 border-b border-gray-100">
                          <div className="flex items-center gap-3">
                            <img
                              referrerPolicy="no-referrer"
                              src={user.photoURL || avatarImg}
                              alt="avatar"
                              className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-gray-900 truncate">{user.displayName}</p>
                              <p className="text-xs text-gray-500 truncate">{user.email}</p>
                              {roleInfo && (
                                <span className={`inline-block mt-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${roleInfo.cls}`}>
                                  {roleInfo.label}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Menu items */}
                        <div className="py-1.5">
                          <DropItem to="/dashboard" icon="📊" label="Dashboard"     onClick={() => setDropOpen(false)} />
                          <div className="my-1 border-t border-gray-100" />
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-150 text-left"
                          >
                            <span className="text-base w-5 text-center">🚪</span>
                            <span>Log out</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}


                {/* Mobile hamburger */}
                <button
                  onClick={() => setDrawerOpen(v => !v)}
                  className={`md:hidden flex items-center justify-center w-9 h-9 rounded-xl border transition-all duration-200
                    ${drawerOpen
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-600'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-300'
                    }`}
                  aria-label="Menu"
                >
                  {drawerOpen ? (
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>

              </div>
            </div>
          </Container>
        </div>
      </header>

      {/* ══════════════════════════════════════════
          MOBILE DRAWER — backdrop
      ══════════════════════════════════════════ */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* ══════════════════════════════════════════
          MOBILE DRAWER — panel
      ══════════════════════════════════════════ */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-[300px] bg-white z-50 shadow-2xl
          flex flex-col overflow-y-auto
          transition-transform duration-300 ease-[cubic-bezier(.32,.72,0,1)]
          md:hidden
          ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <Logo />
          <button
            onClick={() => setDrawerOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* User info — if logged in */}
        {user && (
          <div className="mx-4 mt-4 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-4 flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <img
                referrerPolicy="no-referrer"
                src={user.photoURL || avatarImg}
                alt="avatar"
                className="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-teal-400 border-2 border-white rounded-full" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">{user.displayName}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
              {roleInfo && (
                <span className={`inline-block mt-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${roleInfo.cls}`}>
                  {roleInfo.label}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Nav links */}
        <div className="px-4 mt-5 space-y-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-2">Navigation</p>
          {NAV_LINKS.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setDrawerOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150
                ${isActive(to)
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              <span className="text-base w-5 text-center">{icon}</span>
              {label}
              {isActive(to) && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500" />
              )}
            </Link>
          ))}

          {user && (
            <>
              <div className="pt-3">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-2">Account</p>
              </div>
              <Link
                to="/dashboard"
                onClick={() => setDrawerOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150
                  ${isActive('/dashboard')
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                <span className="text-base w-5 text-center">📊</span>
                Dashboard
              </Link>
              

              

              <div className="my-3 border-t border-gray-100" />
              <Link
                to="/dashboard/profile"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors duration-150"
              >
                <span className="text-base w-5 text-center">⚙️</span>
                Profile
              </Link>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors duration-150 text-left"
              >
                <span className="text-base w-5 text-center">🚪</span>
                Log out
              </button>
            </>
          )}
        </div>

        {/* Guest buttons — bottom */}
        {!user && (
          <div className="p-4 mt-auto border-t border-gray-100 space-y-2.5">
            <Link
              to="/login"
              onClick={() => setDrawerOpen(false)}
              className="flex items-center justify-center w-full py-2.5 rounded-xl text-sm font-semibold text-gray-700 border border-gray-200 hover:bg-gray-50 transition-all"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              onClick={() => setDrawerOpen(false)}
              className="flex items-center justify-center w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md shadow-indigo-200 transition-all"
            >
              Sign up free ✨
            </Link>
          </div>
        )}
      </div>

      {/* ══ spacer so content starts below fixed navbar ══ */}
      <div className="h-[62px]" />

      {/* ══ keyframe for dropdown animation ══ */}
      <style>{`
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-8px) scale(.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);   }
        }
      `}</style>
    </>
  )
}

/* ── Dropdown menu item ── */
const DropItem = ({ to, icon, label, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-150"
  >
    <span className="text-base w-5 text-center">{icon}</span>
    {label}
  </Link>
)

export default Navbar