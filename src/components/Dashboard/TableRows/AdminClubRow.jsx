import { useMutation } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'

const AdminClubRow = ({ club, index, refetch }) => {
  const axiosSecure = useAxiosSecure()
  const { _id, name, image, category, location, membersLimit, manager, status } = club

  const approveMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.patch(`/admin/clubs/approve/${_id}`)
      return res.data
    },
    onSuccess: () => {
      toast.success('Club Approved ✅')
      refetch()
    },
  })

  const rejectMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.patch(`/admin/clubs/reject/${_id}`)
      return res.data
    },
    onSuccess: () => {
      toast.success('Club Rejected ❌')
      refetch()
    },
  })

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {/* Index */}
      <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>

      {/* Club */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src={image}
            alt={name}
            className="w-9 h-9 rounded-lg object-cover flex-shrink-0"
          />
          <span className="font-semibold text-sm text-gray-900">{name}</span>
        </div>
      </td>

      {/* Category */}
      <td className="px-6 py-4 text-sm text-gray-600">{category}</td>

      {/* Location */}
      <td className="px-6 py-4 text-sm text-gray-600">{location}</td>

      {/* Members Limit */}
      <td className="px-6 py-4 text-sm text-gray-600">{membersLimit}</td>

      {/* Manager */}
      <td className="px-6 py-4">
        <div className="text-sm font-medium text-gray-800">{manager?.name}</div>
        <div className="text-xs text-gray-500">{manager?.email}</div>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold
            ${status === 'approved' ? 'bg-teal-50 text-teal-700' : ''}
            ${status === 'pending' ? 'bg-amber-50 text-amber-700' : ''}
            ${status === 'rejected' ? 'bg-red-50 text-red-600' : ''}
          `}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full
              ${status === 'approved' ? 'bg-teal-500' : ''}
              ${status === 'pending' ? 'bg-amber-500' : ''}
              ${status === 'rejected' ? 'bg-red-500' : ''}
            `}
          />
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {status === 'pending' && (
            <>
              <button
                onClick={() => approveMutation.mutate()}
                disabled={approveMutation.isPending}
                className="text-xs font-medium px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-500 hover:text-white transition-all duration-200 cursor-pointer"
              >
                Approve
              </button>
              <button
                onClick={() => rejectMutation.mutate()}
                disabled={rejectMutation.isPending}
                className="text-xs font-medium px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-500 hover:text-white transition-all duration-200 cursor-pointer"
              >
                Reject
              </button>
            </>
          )}
          {status === 'approved' && (
            <span className="text-xs font-medium px-3 py-1.5 rounded-lg bg-gray-100 text-gray-400 cursor-default">
              Approved
            </span>
          )}
          {status === 'rejected' && (
            <span className="text-xs font-medium px-3 py-1.5 rounded-lg bg-gray-100 text-gray-400 cursor-default">
              Rejected
            </span>
          )}
        </div>
      </td>
    </tr>
  )
}

export default AdminClubRow