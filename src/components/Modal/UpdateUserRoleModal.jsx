import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'

const roles = [
  { value: 'member',  label: 'Member',  icon: '👤', desc: 'Can join clubs and register for events' },
  { value: 'manager', label: 'Manager', icon: '🧑‍💼', desc: 'Can create and manage clubs & events' },
  { value: 'admin',   label: 'Admin',   icon: '👑', desc: 'Full platform access and controls' },
]

const UpdateUserRoleModal = ({ isOpen, closeModal, role, onUpdate, userName }) => {
  const [updatedRole, setUpdatedRole] = useState(role || 'member')

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

          <DialogTitle
            as="h3"
            className="text-xl font-black text-gray-900 mb-1"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Update Role
          </DialogTitle>
          {userName && (
            <p className="text-sm text-gray-500 mb-5">
              Changing role for <span className="font-semibold text-indigo-600">{userName}</span>
            </p>
          )}

          {/* Role selector cards */}
          <div className="space-y-2 mb-5">
            {roles.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => setUpdatedRole(r.value)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-150
                  ${updatedRole === r.value
                    ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100'
                    : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                  }`}
              >
                <span className="text-xl">{r.icon}</span>
                <div>
                  <p className={`text-sm font-bold ${updatedRole === r.value ? 'text-indigo-700' : 'text-gray-800'}`}>
                    {r.label}
                  </p>
                  <p className="text-xs text-gray-500">{r.desc}</p>
                </div>
                {updatedRole === r.value && (
                  <span className="ml-auto text-indigo-600 text-sm">✓</span>
                )}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => { onUpdate?.(updatedRole); closeModal() }}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all duration-200"
            >
              Update Role
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

export default UpdateUserRoleModal