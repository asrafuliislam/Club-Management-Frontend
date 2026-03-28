import { Dialog, DialogTitle, DialogPanel } from '@headlessui/react'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'

const BecomeAdminModal = ({ closeModal, isOpen }) => {
  const axiosSecure = useAxiosSecure()

  const handleRequest = async () => {
    try {
      await axiosSecure.post('/became-admin')
      toast.success('Request sent successfully!')
    } catch (err) {
      console.log(err)
      toast.error('Request failed. Please try again.')
    } finally {
      closeModal()
    }
  }

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50 focus:outline-none"
      onClose={closeModal}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 duration-300 ease-out data-closed:scale-95 data-closed:opacity-0">

          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center text-2xl mx-auto mb-4">
            👑
          </div>

          <DialogTitle
            as="h3"
            className="text-xl font-black text-center text-gray-900 mb-2"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Become an Admin
          </DialogTitle>

          <p className="text-sm text-gray-500 text-center mb-6 leading-relaxed">
            Please read all the terms & conditions before submitting your admin request. Our team will review it shortly.
          </p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleRequest}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all duration-200"
            >
              ✓ Send Request
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default BecomeAdminModal