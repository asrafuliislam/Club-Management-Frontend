import { useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import Logo from '../../components/Shared/Logo'

// ─────────────────────────────────────────────
// Shared success page UI
// ─────────────────────────────────────────────
const SuccessPage = ({ title, subtitle, sessionId, apiEndpoint, ctaTo = '/', ctaLabel = 'Go to Home', secondaryTo, secondaryLabel }) => {
  const axiosSecure = useAxiosSecure()
  const called = useRef(false)

  useEffect(() => {
    if (sessionId && !called.current) {
      called.current = true
      axiosSecure.post(apiEndpoint, { sessionId })
    }
  }, [sessionId])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50/30 flex flex-col items-center justify-center px-4 py-16">

      {/* Logo top */}
      <div className="mb-10">
        <Logo />
      </div>

      {/* Card */}
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-12 max-w-md w-full text-center">

        {/* Animated check icon */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-teal-200 animate-[popIn_.5s_ease_both]">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1
          className="text-2xl md:text-3xl font-black text-gray-900 mb-2"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {title}
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">{subtitle}</p>

        {/* Session ID (subtle) */}
        {sessionId && (
          <div className="bg-gray-50 rounded-xl px-4 py-3 mb-8 text-left">
            <p className="text-xs text-gray-500 font-medium mb-1">Transaction ID</p>
            <p className="text-xs font-mono text-gray-700 break-all">{sessionId}</p>
          </div>
        )}

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <Link
            to={ctaTo}
            className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all duration-200 text-center"
          >
            {ctaLabel}
          </Link>
          {secondaryTo && secondaryLabel && (
            <Link
              to={secondaryTo}
              className="w-full py-3 rounded-xl text-sm font-semibold text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all duration-200 text-center"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-6 flex items-center gap-1">
        🔒 Payment secured by Stripe
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────
// Club Membership Payment Success
// ─────────────────────────────────────────────
export const PaymentSuccess = () => {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')

  return (
    <SuccessPage
      title="Welcome to the Club! 🎉"
      subtitle="Your membership payment was successful. You're now an official club member — start exploring events!"
      sessionId={sessionId}
      apiEndpoint="/club-payment-success"
      ctaTo="/dashboard"
      ctaLabel="Go to Dashboard"
      secondaryTo="/"
      secondaryLabel="Back to Home"
    />
  )
}

// ─────────────────────────────────────────────
// Event Registration Payment Success
// ─────────────────────────────────────────────
export const EventPaymentSuccess = () => {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')

  return (
    <SuccessPage
      title="You're Registered! 🚀"
      subtitle="Your event registration was successful. A confirmation has been sent to your email. See you there!"
      sessionId={sessionId}
      apiEndpoint="/event-payment-success"
      ctaTo="/dashboard"
      ctaLabel="Go to Dashboard"
      secondaryTo="/"
      secondaryLabel="Back to Home"
    />
  )
}

export default PaymentSuccess