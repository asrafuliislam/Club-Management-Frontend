import { useNavigate } from 'react-router'
import Logo from '../components/Shared/Logo'

const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50/30 flex flex-col items-center justify-center px-4">

      {/* Logo */}
      <div className="mb-12">
        <Logo />
      </div>

      {/* 404 visual */}
      <div className="text-center max-w-md">
        <div
          className="text-[8rem] font-black leading-none text-transparent mb-4 select-none"
          style={{
            fontFamily: "'Syne', sans-serif",
            backgroundImage: 'linear-gradient(135deg, #6366f1, #a855f7)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
          }}
        >
          404
        </div>

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-3xl mx-auto mb-6">
          🔍
        </div>

        <h1
          className="text-2xl md:text-3xl font-black text-gray-900 mb-3"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Page not found
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          Oops! The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-gray-700 border border-gray-200 bg-white hover:bg-gray-50 hover:border-indigo-300 transition-all duration-200 shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-indigo-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>
            Go back
          </button>

          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all duration-200"
          >
            🏠 Take me home
          </button>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage