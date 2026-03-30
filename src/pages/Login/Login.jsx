import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import useAuth from '../../hooks/useAuth'
import { FcGoogle } from 'react-icons/fc'
import { TbFidgetSpinner } from 'react-icons/tb'
import { useForm } from 'react-hook-form'
import { saveOrUpdateUser } from '../../utils'
import Logo from '../../components/Shared/Logo'
import useAxiosSecure from '../../hooks/useAxiosSecure'

const inputClass = `
  w-full px-4 py-3 rounded-xl border border-gray-200 bg-white
  text-sm text-gray-800 placeholder-gray-400
  focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100
  transition-all duration-150
`

const Login = () => {
  const { signIn, signInWithGoogle, loading, setLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state || '/'

  const axiosSecure = useAxiosSecure()


  const { register, handleSubmit, formState: { errors } } = useForm()

  if (loading) return <LoadingSpinner />


  const onSubmit = async (data) => {
    try {
      const { user } = await signIn(data.email, data.password)
      await saveOrUpdateUser(axiosSecure, {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      })
      navigate(from, { replace: true })
      toast.success('Welcome back!')
    } catch (err) {
      toast.error(err?.message || 'Login failed')
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle()
      await saveOrUpdateUser(axiosSecure, {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      })
      navigate(from, { replace: true })
      toast.success('Welcome back!')
    } catch (err) {
      setLoading(false)
      toast.error(err?.message)
    }
  }

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* Left — decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 flex-col items-center justify-center p-16">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Glow blobs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-teal-400 rounded-full opacity-20 blur-3xl" />

        <div className="relative z-10 text-center text-white max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-black mx-auto mb-6 shadow-lg">
            CS
          </div>
          <h2 className="text-3xl font-black mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
            Welcome back to ClubSphere
          </h2>
          <p className="text-indigo-200 text-sm leading-relaxed">
            Your community is waiting. Log in to discover clubs, join events, and connect with like-minded people.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4 text-center">
            {[['1.2k', 'Clubs'], ['48k', 'Members'], ['320+', 'Events']].map(([num, lbl]) => (
              <div key={lbl} className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="text-xl font-black">{num}</div>
                <div className="text-xs text-indigo-300 mt-0.5">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">

          {/* Logo — mobile only */}
          <div className="flex justify-center mb-8 lg:hidden">
            <Logo />
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-black text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>
              Log in
            </h1>
            <p className="text-gray-500 text-sm mt-2">Sign in to access your account</p>
          </div>

          {/* Google Button */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 hover:border-indigo-300 transition-all duration-200 mb-6 text-sm font-semibold text-gray-700 shadow-sm"
          >
            <FcGoogle size={20} />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">or continue with email</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className={inputClass}
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-semibold text-gray-700">Password</label>
                <a href="#" className="text-xs text-indigo-600 hover:underline">Forgot password?</a>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className={inputClass}
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' },
                })}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none mt-2"
            >
              {loading ? <TbFidgetSpinner className="animate-spin mx-auto text-lg" /> : 'Log in'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link
              to="/signup"
              state={from}
              className="font-semibold text-indigo-600 hover:underline"
            >
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login