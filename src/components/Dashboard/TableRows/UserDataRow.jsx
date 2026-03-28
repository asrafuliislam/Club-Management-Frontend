import { useState } from 'react'
import UpdateUserRoleModal from '../../Modal/UpdateUserRoleModal'

const roleBadge = {
  admin: 'bg-purple-50 text-purple-700',
  manager: 'bg-indigo-50 text-indigo-700',
  member: 'bg-gray-100 text-gray-600',
}

const UserDataRow = ({ user, refetch }) => {
  const [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)
  const { email, role, image, name } = user

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {/* Avatar */}
      <td className="px-6 py-4">
        <img
          className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100"
          src={image}
          alt={name}
        />
      </td>

      {/* Name */}
      <td className="px-6 py-4">
        <span className="text-sm font-semibold text-gray-900">{name}</span>
      </td>

      {/* Email */}
      <td className="px-6 py-4">
        <span className="text-sm text-gray-600">{email}</span>
      </td>

      {/* Role */}
      <td className="px-6 py-4">
        <span
          className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-md ${roleBadge[role] || roleBadge.member}`}
        >
          {role}
        </span>
      </td>

      {/* Action */}
      <td className="px-6 py-4">
        <button
          onClick={() => setIsOpen(true)}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white transition-all duration-200 cursor-pointer"
        >
          Update Role
        </button>

        <UpdateUserRoleModal
          user={user}
          refetch={refetch}
          isOpen={isOpen}
          closeModal={closeModal}
        />
      </td>
    </tr>
  )
}

export default UserDataRow