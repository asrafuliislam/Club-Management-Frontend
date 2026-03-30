import { Navigate } from 'react-router'
import LoadingSpinner from '../components/Shared/LoadingSpinner'
import useRole from '../hooks/useRole'

const ManagerRoutes = ({ children }) => {

    const { role, isRoleLoading } = useRole()

    if (isRoleLoading) return <LoadingSpinner />
    if (role === 'manager') return children
    return <Navigate to='/login' state={location.pathname} replace='true' />
}


export default ManagerRoutes;