import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import RequestRow from './RequestRow'

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
            <div className="bg-white shadow rounded-lg p-4">
                {requests.length === 0 ? (
                    <p className="text-center text-gray-500">
                        No pending requests 🚀
                    </p>
                ) : (
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2">Email</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {requests.map((req) => (
                                <RequestRow
                                    key={req._id}
                                    request={req}
                                    type={activeTab}
                                    refetch={refetch}
                                />
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

export default RequestManagement