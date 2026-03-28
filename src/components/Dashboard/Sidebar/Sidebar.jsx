import { useState } from 'react'
import { Link } from 'react-router'
import useAuth from '../../../hooks/useAuth'
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { AiOutlineBars, AiOutlineClose } from 'react-icons/ai'
import MenuItem from './Menu/MenuItem'
import AdminMenu from './Menu/AdminMenu'
import ManagerMenu from './Menu/ManagerMenu'
import MemberMenu from './Menu/MemberMenu'
import Logo from '../../Shared/Logo'
import useRole from '../../../hooks/useRole'
import LoadingSpinner from '../../Shared/LoadingSpinner'

const Sidebar = () => {
  const { logOut } = useAuth()
  const [isActive, setActive] = useState(false)

  const handleToggle = () => {
    setActive(!isActive)
  }

  const { role, isRoleLoading } = useRole()

  if (isRoleLoading) return <LoadingSpinner />

  return (
    <>
      {/* ── Mobile Top Bar ── */}
      <div className="bg-white border-b border-gray-200 flex justify-between items-center px-4 h-16 md:hidden">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-200">
            CS
          </div>
          <span className="font-bold text-gray-900 text-base">
            Club<span className="text-indigo-600">Sphere</span>
          </span>
        </Link>
        <button
          onClick={handleToggle}
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
        >
          {isActive ? (
            <AiOutlineClose className="h-5 w-5" />
          ) : (
            <AiOutlineBars className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* ── Sidebar Panel ── */}
      <div
        className={`z-20 md:fixed flex flex-col overflow-x-hidden bg-white border-r border-gray-200 w-60 absolute inset-y-0 left-0 transform
          ${isActive ? '-translate-x-full' : 'translate-x-0'}
          md:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        {/* Logo */}
        <div className="hidden md:flex items-center gap-2.5 px-5 h-16 border-b border-gray-100 flex-shrink-0">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-200">
              CS
            </div>
            <span className="font-bold text-gray-900 text-base tracking-tight">
              Club<span className="text-indigo-600">Sphere</span>
            </span>
          </Link>
        </div>

        {/* Nav Items */}
        <div className="flex-1 overflow-y-auto px-3 py-3">
          {role === 'member' && <MemberMenu />}
          {role === 'manager' && <ManagerMenu />}
          {role === 'admin' && <AdminMenu />}
        </div>

        {/* Bottom Actions */}
        <div className="px-3 pb-4 border-t border-gray-100 pt-3 flex-shrink-0">
          <MenuItem
            icon={FcSettings}
            label="Profile & Settings"
            address="/dashboard/profile"
          />
          <button
            onClick={logOut}
            className="flex cursor-pointer w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 mt-1"
          >
            <GrLogout className="w-4 h-4 flex-shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile overlay backdrop */}
      {!isActive && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10 md:hidden"
          onClick={handleToggle}
        />
      )}
    </>
  )
}

export default Sidebar