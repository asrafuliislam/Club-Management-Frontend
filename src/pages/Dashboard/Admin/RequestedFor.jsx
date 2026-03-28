import useAxiosSecure from '../../../hooks/useAxiosSecure'
import useAuth from '../../../hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import ManagerDataRow from '../../../components/Dashboard/TableRows/ManagerDataRow'
import { TableCard, TableHeader, Table, PageHead } from '../../../components/Dashboard/DashboardUI'

const RequestedFor = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: requests = [], isLoading, refetch } = useQuery({
        queryKey: ['request', user?.email],
        queryFn: async () => {
            const result = await axiosSecure('manager-requests')
            return result.data
        },
    })

    if (isLoading) return <LoadingSpinner />

    return (
        <div>
            <PageHead
                title="User Requests"
                subtitle="Users requesting manager role access"
            />

            <TableCard>
                <TableHeader
                    title="Pending Requests"
                    subtitle={`${requests.length} pending`}
                />
                <Table
                    headers={['Email', 'Action']}
                    empty={requests.length === 0 ? 'No pending requests' : null}
                >
                    {requests.map((request) => (
                        <ManagerDataRow key={request._id} refetch={refetch} request={request} />
                    ))}
                </Table>
            </TableCard>
        </div>
    )
}

export default RequestedFor