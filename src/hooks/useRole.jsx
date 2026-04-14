import useAuth from './useAuth'
import useAxiosSecure from './useAxiosSecure'
import { useQuery } from '@tanstack/react-query'

const useRole = () => {
  const { user, loading } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: role = 'member', isLoading: isRoleLoading } = useQuery({
    queryKey: ['role', user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get('/user/role')
      return res.data?.role || 'member' 
    }
  })

  return { role, isRoleLoading }
}

export default useRole