import AdminStatistics from '../../../components/Dashboard/Statistics/AdminStatistics'
import ManagerStatistics from '../../../components/Dashboard/Statistics/ManagerStatistics'
import MemberStatistics from '../../../components/Dashboard/Statistics/MemberStatistics'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import useRole from '../../../hooks/useRole'
const Statistics = () => {

  const { role, isRoleLoading } = useRole()

  if (isRoleLoading) return <LoadingSpinner />
  
  return (
    <div>
      {role === 'admin' && <AdminStatistics />}
      {role === 'manager' && <ManagerStatistics />}
      {role === 'member' && <MemberStatistics />}
    </div>

  )
}

export default Statistics
