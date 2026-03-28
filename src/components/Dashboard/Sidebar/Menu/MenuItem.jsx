import { NavLink } from 'react-router'

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 w-full
        ${isActive
          ? 'bg-indigo-50 text-indigo-700'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`
      }
    >
      <span className="w-5 h-5 flex items-center justify-center flex-shrink-0 text-base">
        <Icon className="w-4 h-4" />
      </span>
      <span>{label}</span>
    </NavLink>
  )
}

export default MenuItem