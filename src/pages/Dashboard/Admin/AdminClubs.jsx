import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import AdminClubRow from '../../../components/Dashboard/TableRows/AdminClubRow'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import { TableCard, TableHeader, Table, PageHead } from '../../../components/Dashboard/DashboardUI'

const AdminClubs = () => {
  const axiosSecure = useAxiosSecure()

  const { data: clubs = [], isLoading, refetch } = useQuery({
    queryKey: ['admin-clubs'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/clubs')
      return res.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <div>
      <PageHead
        title="Manage Clubs"
        subtitle="Review, approve, or reject club submissions"
      />

      <TableCard>
        <TableHeader
          title="All Clubs"
          subtitle={`${clubs.length} total`}
        />
        <Table
          headers={['#', 'Club', 'Category', 'Location', 'Members Limit', 'Manager', 'Status', 'Actions']}
          empty={clubs.length === 0 ? 'No clubs found' : null}
        >
          {clubs.map((club, index) => (
            <AdminClubRow
              key={club._id}
              club={club}
              index={index}
              refetch={refetch}
            />
          ))}
        </Table>
      </TableCard>
    </div>
  )
}

export default AdminClubs