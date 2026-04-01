import { useState } from 'react'
import UpdateUserRoleModal from '../../Modal/UpdateUserRoleModal'

const roleBadge = {
  admin:   'bg-purple-50 text-purple-700 border-purple-200',
  manager: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  member:  'bg-gray-100  text-gray-600   border-gray-200',
}

const roleIcon = {
  admin:   '👑',
  manager: '🧑‍💼',
  member:  '👤',
}

const UserDataRow = ({ user, refetch }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { email, role, image, name } = user

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors duration-150 group">

      {/* Member — avatar + name */}
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-3">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-9 h-9 rounded-full object-cover ring-1 ring-gray-200 flex-shrink-0"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center text-xs font-semibold flex-shrink-0 ring-1 ring-indigo-100">
              {name?.slice(0, 2).toUpperCase()}
            </div>
          )}
          <p className="text-sm font-semibold text-gray-900 leading-tight">{name}</p>
        </div>
      </td>

      {/* Email */}
      <td className="px-5 py-3.5">
        <span className="text-xs text-gray-400">{email}</span>
      </td>

      {/* Role badge */}
      <td className="px-5 py-3.5">
        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border capitalize ${roleBadge[role] || roleBadge.member}`}>
          <span style={{ fontSize: '12px' }}>{roleIcon[role] || '👤'}</span>
          {role}
        </span>
      </td>

      {/* Action */}
      <td className="px-5 py-3.5">
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold border border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-400 opacity-80 group-hover:opacity-100 active:scale-95 transition-all duration-150"
        >
          ✎ Update Role
        </button>

        <UpdateUserRoleModal
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
          role={role}
          email={email}
          userName={name}
          refetch={refetch}
        />
      </td>
    </tr>
  )
}

export default UserDataRow