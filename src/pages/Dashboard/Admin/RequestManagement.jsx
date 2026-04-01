import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import RequestRow from '../../../components/Dashboard/TableRows/RequestRow'

const RequestManagement = () => {
    const axiosSecure = useAxiosSecure()
    const [activeTab, setActiveTab] = useState('manager')

    const {
        data: managerRequests = [],
        isLoading: mLoading,
        refetch: refetchManager,
    } = useQuery({
        queryKey: ['manager-requests'],
        queryFn: async () => (await axiosSecure.get('/manager-requests')).data,
    })

    const {
        data: adminRequests = [],
        isLoading: aLoading,
        refetch: refetchAdmin,
    } = useQuery({
        queryKey: ['admin-requests'],
        queryFn: async () => (await axiosSecure.get('/admin-requests')).data,
    })

    if (mLoading || aLoading) return <LoadingSpinner />

    const isManager = activeTab === 'manager'
    const requests = isManager ? managerRequests : adminRequests
    const refetch = isManager ? refetchManager : refetchAdmin

    const tabs = [
        { key: 'manager', label: '🧑‍💼 Manager Requests', count: managerRequests.length },
        { key: 'admin', label: '🛡️ Admin Requests', count: adminRequests.length },
    ]

    return (
        <div className="p-6 max-w-5xl">

            {/* Page Header */}
            <div className="mb-6">
                <h1
                    className="text-2xl font-black text-gray-900"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                >
                    Request Management
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Review and manage role upgrade requests from users
                </p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6 bg-white rounded-t-xl shadow-sm">
                {tabs.map(t => (
                    <button
                        key={t.key}
                        onClick={() => setActiveTab(t.key)}
                        className={`flex items-center gap-2 px-5 py-3.5 text-sm font-semibold border-b-2 -mb-px transition-all duration-150
              ${activeTab === t.key
                                ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50'
                                : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                            }`}
                    >
                        {t.label}
                        <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full
              ${activeTab === t.key
                                ? 'bg-indigo-100 text-indigo-700'
                                : 'bg-gray-100 text-gray-500'
                            }`}
                        >
                            {t.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* Table card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                {requests.length === 0 ? (
                    <div className="flex flex-col items-center py-16 text-center px-6">
                        <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-2xl mb-4">
                            {isManager ? '🧑‍💼' : '🛡️'}
                        </div>
                        <p className="font-semibold text-gray-700">No pending requests</p>
                        <p className="text-sm text-gray-400 mt-1">
                            {isManager ? 'Manager' : 'Admin'} requests will appear here.
                        </p>
                    </div>
                ) : (
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/60">
                                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Member</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Role</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map(r => (
                                <RequestRow
                                    key={r._id}
                                    request={r}
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