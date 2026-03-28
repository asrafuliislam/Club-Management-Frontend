import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import Button from '../Shared/Button/Button'
import { imageUpload } from '../../utils'
import toast from 'react-hot-toast'

const inputClass = `
  w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white
  text-sm text-gray-800 placeholder-gray-400
  focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100
  transition-all duration-150
`

const Field = ({ label, error, children }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
)

const EventUpdateModal = ({ isOpen, closeModal, event, refetchEvents }) => {
  const axiosSecure = useAxiosSecure()
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: '', description: '', eventDate: '',
      location: '', isPaid: 'false', eventFee: '', maxAttendees: '',
    },
  })

  const watchIsPaid = watch('isPaid') === 'true'

  useEffect(() => {
    reset({
      title: event?.title || '',
      description: event?.description || '',
      eventDate: event?.eventDate ? new Date(event.eventDate).toISOString().slice(0, 16) : '',
      location: event?.location || '',
      isPaid: event?.isPaid ? 'true' : 'false',
      eventFee: event?.eventFee || '',
      maxAttendees: event?.maxAttendees || '',
    })
  }, [event, reset])

  const mutation = useMutation({
    mutationFn: async (data) => {
      let imageUrl = event?.bannerImage
      if (data.bannerImage?.[0]) {
        imageUrl = await imageUpload(data.bannerImage[0])
      }
      const payload = { ...data, bannerImage: imageUrl, isPaid: watchIsPaid }
      const res = await axiosSecure.put(`/events-update/${event._id}`, payload)
      return res.data
    },

    onSuccess: () => {
      toast.success('Event updated successfully!')
      queryClient.invalidateQueries(['event', event._id])
      refetchEvents?.()
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
        <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div>
            <h2
              className="text-xl font-black text-gray-900"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Update Event
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">Edit event details below</p>
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
          <Field label="Event Title" error={errors.title && 'Title is required'}>
            <input
              {...register('title', { required: true })}
              placeholder="Event title"
              className={inputClass}
            />
          </Field>

          <Field label="Description" error={errors.description && 'Description is required'}>
            <textarea
              {...register('description', { required: true })}
              placeholder="Event description"
              rows={3}
              className={inputClass}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Date & Time" error={errors.eventDate && 'Required'}>
              <input
                type="datetime-local"
                {...register('eventDate', { required: true })}
                className={inputClass}
              />
            </Field>
            <Field label="Location" error={errors.location && 'Required'}>
              <input
                {...register('location', { required: true })}
                placeholder="Venue or Online"
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="New Banner Image (optional)">
            <input
              type="file"
              {...register('bannerImage')}
              className={`${inputClass} file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 cursor-pointer`}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Event Type">
              <select {...register('isPaid', { required: true })} className={inputClass}>
                <option value="false">🎟️ Free</option>
                <option value="true">💰 Paid</option>
              </select>
            </Field>
            <Field label="Max Attendees">
              <input
                type="number"
                {...register('maxAttendees')}
                placeholder="e.g. 200"
                className={inputClass}
              />
            </Field>
          </div>

          {watchIsPaid && (
            <Field label="Registration Fee ($)" error={errors.eventFee && 'Fee required for paid events'}>
              <input
                type="number"
                step="0.01"
                {...register('eventFee', { required: watchIsPaid })}
                placeholder="e.g. 9.99"
                className={inputClass}
              />
            </Field>
          )}

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

export default EventUpdateModal