import useAxiosSecure from '../../../hooks/useAxiosSecure'

const RequestRow = ({ request, type, refetch }) => {
  const axiosSecure = useAxiosSecure()

  const handleApprove = async () => {
    try {
      await axiosSecure.patch(`/approve-${type}/${request._id}`)
      refetch()
    } catch (err) {
      console.log(err)
    }
  }

  const handleReject = async () => {
    try {
      await axiosSecure.delete(`/reject-${type}/${request._id}`)
      refetch()
    } catch (err) {
      console.log(err)
    }
  }

  const initials = request.name
    ? request.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : request.email.slice(0, 2).toUpperCase()

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">

      {/* Member */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center text-xs font-medium flex-shrink-0">
            {initials}
          </div>
          <div>
            {request.name && (
              <p className="text-sm font-medium text-gray-900">{request.name}</p>
            )}
            <p className="text-xs text-gray-500">{request.email}</p>
          </div>
        </div>
      </td>

      {/* Type */}
      <td className="px-4 py-3">
        {type === 'club' ? (
          <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border bg-purple-50 text-purple-800 border-purple-200 capitalize">
            Club
          </span>
        ) : (
          <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border bg-teal-50 text-teal-800 border-teal-200 capitalize">
            Event
          </span>
        )}
      </td>

      {/* Status */}
      <td className="px-4 py-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border bg-amber-50 text-amber-800 border-amber-200">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          Pending
        </span>
      </td>

      {/* Actions */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            onClick={handleApprove}
            className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-medium border border-teal-300 text-teal-800 hover:bg-teal-50 transition-colors"
          >
            Approve
          </button>
          <button
            onClick={handleReject}
            className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-medium border border-red-200 text-red-700 hover:bg-red-50 transition-colors"
          >
            Reject
          </button>
        </div>
      </td>
    </tr>
  )
}

export default RequestRow