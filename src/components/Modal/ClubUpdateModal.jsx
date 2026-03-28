import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import Button from '../Shared/Button/Button'
import toast from 'react-hot-toast'

// Reusable form field component
const Field = ({ label, error, children }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
)

const inputClass = `
  w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white
  text-sm text-gray-800 placeholder-gray-400
  focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100
  transition-all duration-150
`

const ClubUpdateModal = ({ isOpen, closeModal, club, refetchClub }) => {
  const axiosSecure = useAxiosSecure()
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { name: '', category: '', location: '', membersLimit: '', description: '' },
  })


  useEffect(() => {
    reset({
      name: club?.name || '',
      category: club?.category || '',
      location: club?.location || '',
      membersLimit: club?.membersLimit || '',
      description: club?.description || '',
    })
  }, [club, reset])

  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.put(`/club-update/${club._id}`, data)
      return res.data
    },

    onSuccess: () => {
      toast.success('Club updated successfully!')
      queryClient.invalidateQueries(['club', club._id])
      refetchClub?.()
      closeModal()
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Update failed')
    },
  })

  const onSubmit = (data) => {
    setLoading(true)
    mutation.mutate(data, { onSettled: () => setLoading(false) })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-lg max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2
              className="text-xl font-black text-gray-900"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Update Club
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">Edit your club's information</p>
          </div>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center transition-all"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <Field label="Club Name" error={errors.name && 'Club name is required'}>
            <input
              {...register('name', { required: true })}
              placeholder="e.g. Code & Build Society"
              className={inputClass}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Category">
              <input
                {...register('category')}
                placeholder="e.g. Technology"
                className={inputClass}
              />
            </Field>
            <Field label="Location">
              <input
                {...register('location')}
                placeholder="e.g. Dhaka"
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Members Limit">
            <input
              type="number"
              {...register('membersLimit')}
              placeholder="e.g. 200"
              className={inputClass}
            />
            
          </Field>

          <Field label="Description">
            <textarea
              {...register('description')}
              placeholder="Describe what your club is about..."
              rows={4}
              className={inputClass}
            />
          </Field>

          <div className="flex gap-3 pt-1">
            <Button
              label={loading ? 'Saving...' : 'Save Changes'}
              type="submit"
              disabled={loading}
            />
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


export default ClubUpdateModal