import { Link, useLocation, useNavigate } from 'react-router'
import { FcGoogle } from 'react-icons/fc'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'
import { useForm } from 'react-hook-form'
import { imageUpload, saveOrUpdateUser } from '../../utils'
import Logo from '../../components/Shared/Logo'
import useAxiosSecure from '../../hooks/useAxiosSecure'

const inputClass = `
  w-full px-4 py-3 rounded-xl border border-gray-200 bg-white
  text-sm text-gray-800 placeholder-gray-400
  focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100
  transition-all duration-150
`

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state || '/'
  const axiosSecure = useAxiosSecure()

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    const { name, email, password, image } = data
    const imageFile = image[0]
    try {
      const imageUrl = await imageUpload(imageFile)
      const result = await createUser(email, password)
      await saveOrUpdateUser(axiosSecure, { name, email, image: imageUrl })
      await updateUserProfile(name, imageUrl)
      console.log(result)
      navigate(from, { replace: true })
      toast.success('Account created successfully!')
    } catch (err) {
      console.log(err)
      toast.error(err?.message || 'Signup failed')
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle()
      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      })
      navigate(from, { replace: true })
      toast.success('Welcome to ClubSphere!')
    } catch (err) {
      toast.error(err?.message)
    }
  }

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* Left — decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-700 to-indigo-800 flex-col items-center justify-center p-16">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute top-20 right-10 w-72 h-72 bg-teal-400 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-16 left-10 w-64 h-64 bg-purple-400 rounded-full opacity-20 blur-3xl" />

        <div className="relative z-10 text-center text-white max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-black mx-auto mb-6 shadow-lg">
            CS
          </div>
          <h2 className="text-3xl font-black mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
            Join ClubSphere today
          </h2>
          <p className="text-indigo-200 text-sm leading-relaxed">
            Discover hundreds of clubs, attend exciting events, and become part of a thriving community.
          </p>

          {/* Feature list */}
          <div className="mt-10 space-y-3 text-left">
            {[
              ['🏛️', 'Join unlimited clubs for free'],
              ['📅', 'Register for exclusive events'],
              ['💳', 'Secure Stripe payments'],
              ['👑', 'Become a club manager'],
            ].map(([icon, text]) => (
              <div key={text} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5">
                <span className="text-lg">{icon}</span>
                <span className="text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md py-8">

          {/* Logo — mobile only */}
          <div className="flex justify-center mb-8 lg:hidden">
            <Logo />
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-black text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>
              Create account
            </h1>
            <p className="text-gray-500 text-sm mt-2">Join thousands of members on ClubSphere</p>
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
            <span className="text-xs text-gray-400 font-medium">or sign up with email</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
              <input
                type="text"
                placeholder="Your full name"
                className={inputClass}
                {...register('name', { required: 'Name is required', maxLength: 20 })}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

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
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                placeholder="At least 6 characters"
                className={inputClass}
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' },
                })}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Profile Photo</label>
              <input
                type="file"
                accept="image/*"
                className={`${inputClass} file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 cursor-pointer`}
                {...register('image')}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 hover:cursor-alias rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none mt-2"
            >
              {loading ? <TbFidgetSpinner className="animate-spin mx-auto text-lg" /> : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-indigo-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp