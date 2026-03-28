import { useState } from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import Button from '../Shared/Button/Button'

const RegistrationEventModal = ({ isOpen, closeModal, event, user }) => {
  const axiosSecure = useAxiosSecure()
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handlePayment = async () => {
    try {
      setLoading(true)

      const paymentInfo = {
        name: event.title,
        description: event.description,
        image: event.bannerImage,
        price: event.isPaid ? event.eventFee : 0,
        eventId: event._id,
        eventTitle: event.title,
        member: {
          email: user.email,
          name: user.displayName,
          image: user.photoURL,
        },
      }

      const res = await axiosSecure.post('/create-event-checkout-session', paymentInfo)
      window.location.replace(res.data.url)
    } catch (err) {
      console.error('Payment error:', err)
    } finally {
      setLoading(false)
    }
  }

  const eventDate = new Date(event.eventDate).toLocaleString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
  })

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-md relative">

        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${event.isPaid ? 'bg-purple-100 text-purple-700' : 'bg-teal-100 text-teal-700'}`}>
                  {event.isPaid ? '💰 Paid' : '🎟️ Free'}
                </span>
              </div>
              <h2
                className="text-xl font-black text-gray-900"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {event.title}
              </h2>
            </div>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center transition-all"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Details */}
        <div className="p-6 space-y-3">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-4 space-y-2.5">
            <InfoRow icon="📅" label="Date" value={eventDate} />
            <InfoRow icon="📍" label="Location" value={event.location} />
            <InfoRow icon="👤" label="Registering as" value={user?.displayName} />
            <div className="pt-2 mt-2 border-t border-indigo-100 flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-700">Registration Fee</span>
              <span className="text-xl font-black text-indigo-700">
                {event.isPaid ? `$${event.eventFee}` : 'Free'}
              </span>
            </div>
          </div>

          <Button
            label={loading ? 'Processing...' : event.isPaid ? `Pay $${event.eventFee} & Register` : 'Register Now'}
            onClick={handlePayment}
            disabled={loading}
            className="mt-1"
          />

          <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1">
            🔒 {event.isPaid ? 'Secured by Stripe' : 'Free registration — no payment needed'}
          </p>
        </div>
      </div>
    </div>
  )
}

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-2">
    <span className="text-base mt-0.5">{icon}</span>
    <div>
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <p className="text-sm font-semibold text-gray-800">{value}</p>
    </div>
  </div>
)

export default RegistrationEventModal