import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import RequestRow from '../../../components/Dashboard/TableRows/RequestRow'

const RequestManagement = () => {
    const axiosSecure = useAxiosSecure()
    const [activeTab, setActiveTab] = useState('manager')

    // manager requests
    const { data: managerRequests = [], isLoading: mLoading, refetch } = useQuery({
        queryKey: ['manager-requests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/manager-requests')
            return res.data
        }
    })

    // admin requests
    const { data: adminRequests = [], isLoading: aLoading } = useQuery({
        queryKey: ['admin-requests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-requests')
            return res.data
        }
    })


    if (mLoading || aLoading) return <LoadingSpinner />

    const requests =
        activeTab === 'manager' ? managerRequests : adminRequests

    return (
        <div className="p-6">
            {/* Page Header */}
            <h1 className="text-2xl font-bold">Request Management</h1>
            <p className="text-gray-500 mb-6">
                Manage role upgrade requests
            </p>

            {/* Tabs */}
            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => setActiveTab('manager')}
                    className={`px-4 py-2 rounded ${activeTab === 'manager'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200'
                        }`}
                >
                    Manager Requests ({managerRequests.length})
                </button>

                <button
                    onClick={() => setActiveTab('admin')}
                    className={`px-4 py-2 rounded ${activeTab === 'admin'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200'
                        }`}
                >
                    Admin Requests ({adminRequests.length})
                </button>
            </div>

            {/* Table */}
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-gray-100">
                        <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Member</th>
                        <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Type</th>
                        <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Status</th>
                        <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map(r =>
                        <RequestRow
                            key={r._id}
                            request={r} type="club"
                            refetch={refetch} />)}
                </tbody>
            </table>
        </div>
    )
}

export default RequestManagement