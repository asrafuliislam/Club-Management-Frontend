import axios from 'axios'
import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router'
import { getAuth } from 'firebase/auth'
import useAuth from './useAuth'

const useAxiosSecure = () => {
  const { logOut, loading } = useAuth()
  const navigate = useNavigate()
  const auth = getAuth()

  // ✅ axios instance only created once
  const axiosInstance = useMemo(() => {
    return axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      withCredentials: true,
    })
  }, [])

  useEffect(() => {
    if (loading) return

    // =========================
    // REQUEST INTERCEPTOR
    // =========================
    const requestInterceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        const user = auth.currentUser

        if (user) {
          try {
            const token = await user.getIdToken()
            config.headers.Authorization = `Bearer ${token}`
          } catch (err) {
            console.log('Token error:', err)
          }
        }

        return config
      },
      (error) => Promise.reject(error)
    )

    // =========================
    // RESPONSE INTERCEPTOR
    // =========================
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (res) => res,
      async (err) => {
        const status = err?.response?.status

        if (status === 401 || status === 403) {
          try {
            await logOut()
            navigate('/login', { replace: true })
          } catch (e) {
            console.log('Logout error:', e)
          }
        }

        return Promise.reject(err)
      }
    )

    // cleanup
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor)
      axiosInstance.interceptors.response.eject(responseInterceptor)
    }
  }, [loading, logOut, navigate, axiosInstance, auth])

  return axiosInstance
}

export default useAxiosSecure