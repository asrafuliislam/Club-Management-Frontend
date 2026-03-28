import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure'
import { useQuery } from '@tanstack/react-query'

const useRole = () => {
    const { user, loading } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: role , isLoading: isRoleLoading} = useQuery({
        enabled: !loading && !!user?.email,
        queryKey: ['role', user?.email],
        queryFn: async ()=>{
            const res = await axiosSecure(`/user/role`)
            return res.data.role
        }
    })
    return {role ,isRoleLoading}
};

export default useRole;