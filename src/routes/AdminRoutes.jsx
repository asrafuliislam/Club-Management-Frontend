import { Navigate, useLocation } from 'react-router'
import useRole from '../hooks/useRole'
import LoadingSpinner from '../components/Shared/LoadingSpinner'

const AdminRoutes = ({ children }) => {

    const {role, isRoleLoading } = useRole()
    const location = useLocation()
    if (isRoleLoading) return <LoadingSpinner />
    if (role === 'admin') return children
    return <Navigate to='/' state={location.pathname} replace />

}

export default AdminRoutes