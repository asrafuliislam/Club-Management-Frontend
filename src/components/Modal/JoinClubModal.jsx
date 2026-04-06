import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import useAuth from '../../hooks/useAuth'
import useAxiosSecure from '../../hooks/useAxiosSecure'

const JoinClubModal = ({ closeModal, isOpen, club }) => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  if (!club) return null

  const { _id, name, category, image, manager ,membershipFee} = club

  const handlePayment = async () => {
    if (!user?.email || !user?.displayName) {
      alert('User info missing')
      return
    }

    const paymentInfo = {
      clubId: _id,
      name,
      category,
      image,
      manager,
      price : membershipFee,
      description: `Membership for ${name}`,
      member: {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      },
    }

    try {
      const { data } = await axiosSecure.post('/create-club-checkout-session', paymentInfo)
      window.location.href = data.url
    } catch (err) {
      console.error('Payment Error:', err)
      alert('Payment initiation failed: ' + (err.response?.data?.error || err.message))
    }
  }

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50"
      onClose={closeModal}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 p-6">

          <DialogTitle
            as="h3"
            className="text-xl font-black text-gray-900 mb-1"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Confirm Membership
          </DialogTitle>
          <p className="text-sm text-gray-500 mb-5">
            You're about to join <span className="font-semibold text-indigo-600">{name}</span>
          </p>

          {/* Info card */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-4 mb-5 space-y-2">
            <InfoRow label="Club" value={name} />
            <InfoRow label="Category" value={category} />
            <InfoRow label="Manager" value={manager?.name} />
            <InfoRow label="Member" value={user?.displayName} />
            <InfoRow label="Email" value={user?.email} />
            <div className="pt-2 mt-2 border-t border-indigo-100 flex justify-between">
              <span className="text-sm font-semibold text-gray-700">Membership Fee</span>
              <span className="text-lg font-black text-indigo-700">${membershipFee}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handlePayment}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
            >
              💳 Pay & Join
            </button>
            <button
              onClick={closeModal}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all duration-200"
            >
              Cancel
            </button>
          </div>

          <p className="text-xs text-gray-400 text-center mt-3 flex items-center justify-center gap-1">
            🔒 Secured by Stripe
          </p>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="text-xs font-medium text-gray-500">{label}</span>
    <span className="text-sm font-semibold text-gray-800 truncate max-w-[60%] text-right">{value}</span>
  </div>
)

export default JoinClubModal