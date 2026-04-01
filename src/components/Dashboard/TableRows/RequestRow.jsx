import useAxiosSecure from '../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'

const RequestRow = ({ request, type, refetch }) => {
  const axiosSecure = useAxiosSecure()

  const initials = request.name
    ? request.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : request.email.slice(0, 2).toUpperCase()

  const handleApprove = async () => {
    try {
      await axiosSecure.patch(`/approve-${type}/${request._id}`)
      toast.success(`${request.name || request.email} approved successfully!`)
      refetch()
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong. Please try again.')
    }
  }

  const handleReject = async () => {
    const result = await Swal.fire({
      title: 'Reject this request?',
      text: `${request.name || request.email}'s ${type} request will be permanently rejected.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, reject it',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      reverseButtons: true,
    })

    if (!result.isConfirmed) return

    try {
      await axiosSecure.delete(`/reject-${type}/${request._id}`)
      toast.error(`${request.name || request.email}'s request has been rejected.`)
      refetch()
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors duration-150 group">

      {/* Member */}
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center text-xs font-semibold flex-shrink-0 ring-1 ring-indigo-100">
            {initials}
          </div>
          <div>
            {request.name && (
              <p className="text-sm font-semibold text-gray-900 leading-tight">{request.name}</p>
            )}
            <p className="text-xs text-gray-400 mt-0.5">{request.email}</p>
          </div>
        </div>
      </td>

      {/* Role */}
      <td className="px-5 py-3.5">
        {type === 'manager' ? (
          <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
            🧑‍💼 Manager
          </span>
        ) : (
          <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            🛡️ Admin
          </span>
        )}
      </td>

      {/* Status */}
      <td className="px-5 py-3.5">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          Pending
        </span>
      </td>

      {/* Actions */}
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleApprove}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold border border-teal-300 text-teal-700 hover:bg-teal-50 hover:border-teal-400 active:scale-95 transition-all duration-150"
          >
            ✓ Approve
          </button>
          <button
            onClick={handleReject}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 active:scale-95 transition-all duration-150"
          >
            ✕ Reject
          </button>
        </div>
      </td>
    </tr>
  )
}

export default RequestRow