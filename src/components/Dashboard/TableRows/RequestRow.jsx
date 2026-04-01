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

  return (
    <tr className="border-b">
      <td className="py-2">{request.email}</td>

      <td className="capitalize">{type}</td>

      <td>
        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-sm">
          Pending
        </span>
      </td>

      <td className="space-x-2">
        <button
          onClick={handleApprove}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Approve
        </button>

        <button
          onClick={handleReject}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Reject
        </button>
      </td>
    </tr>
  )
}

export default RequestRow