import useAxiosSecure from '../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'

const ManagerDataRow = ({ request, refetch }) => {
  const axiosSecure = useAxiosSecure()

  const handleRoleUpdate = async () => {
      await axiosSecure.patch('/update-role', {
        email: request?.email,
        role: 'manager',
      })
      toast.success('Role Updated!')
      refetch()
    
  }

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {/* Email */}
      <td className="px-6 py-4 text-sm text-gray-700">{request.email}</td>

      {/* Action */}
      <td className="px-6 py-4">
        <button
          onClick={handleRoleUpdate}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white transition-all duration-200 cursor-pointer"
        >
          Make Manager
        </button>
      </td>
    </tr>
  )
}

export default ManagerDataRow