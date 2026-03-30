import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { getAuth } from 'firebase/auth'
import useAuth from './useAuth'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

const useAxiosSecure = () => {
  const { logOut, loading } = useAuth()
  const navigate = useNavigate()
  const auth = getAuth()

  useEffect(() => {
    if (loading) return

    // 🔥 REQUEST INTERCEPTOR
    const requestInterceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        const user = auth.currentUser

        if (user) {
          const token = await user.getIdToken()
          config.headers.Authorization = `Bearer ${token}`
        }

        return config
      },
      (error) => Promise.reject(error)
    )


    const responseInterceptor = axiosInstance.interceptors.response.use(
      (res) => res,
      async (err) => {
        if (err?.response?.status === 401 || err?.response?.status === 403) {
          try {
            await logOut()
            navigate('/login')
          } catch (e) {
            console.log(e)
          }
        }

        return Promise.reject(err)
      }
    )

    
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor)
      axiosInstance.interceptors.response.eject(responseInterceptor)
    }
  }, [loading, logOut, navigate, auth])

  return axiosInstance
}

export default useAxiosSecure

