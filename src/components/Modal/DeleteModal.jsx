import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

const DeleteModal = ({ closeModal, isOpen, onConfirm, title = 'Delete Item', description = 'This action cannot be undone.' }) => {
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
        <DialogPanel className="w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 duration-300 ease-out data-closed:scale-95 data-closed:opacity-0">

          {/* Warning icon */}
          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-2xl mx-auto mb-4">
            🗑️
          </div>

          <DialogTitle
            as="h3"
            className="text-xl font-black text-center text-gray-900 mb-2"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {title}
          </DialogTitle>

          <p className="text-sm text-gray-500 text-center mb-6">
            Are you sure? {description}
          </p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onConfirm || closeModal}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 shadow-md shadow-red-100 hover:shadow-lg hover:shadow-red-200 hover:-translate-y-0.5 transition-all duration-200"
            >
              Yes, Delete
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

export default DeleteModal