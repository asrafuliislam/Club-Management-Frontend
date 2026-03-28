import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import Button from '../Shared/Button/Button'
import { imageUpload } from '../../utils'
import useAuth from '../../hooks/useAuth'

const inputClass = `
  w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white
  text-sm text-gray-800 placeholder-gray-400
  focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100
  transition-all duration-150
`

const Field = ({ label, error, children, hint }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
    {children}
    {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
)

const EventCreateModal = ({ isOpen, closeModal, club }) => {
  const axiosSecure = useAxiosSecure()
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const { user } = useAuth()

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    defaultValues: { isPaid: 'false' },
  })

  const watchIsPaid = watch('isPaid') === 'true'

  const mutation = useMutation({
    mutationFn: async (eventData) => {
      const res = await axiosSecure.post('/events', eventData)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['events', club._id])
      reset()
      closeModal()
    },
  })

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      setUploading(true)
      const imageFile = data.bannerImage?.[0]
      const imageUrl = imageFile ? await imageUpload(imageFile) : null
      setUploading(false)

      const eventData = {
        clubId: club._id,
        clubName: club.name,
        clubCategory: club.category,
        clubBanner: club.image,
        title: data.title,
        description: data.description,
        eventDate: data.eventDate,
        location: data.location,
        bannerImage: imageUrl,
        isPaid: watchIsPaid,
        manager: {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
        },
        eventFee: watchIsPaid ? parseFloat(data.eventFee) : 0,
        maxAttendees: parseInt(data.maxAttendees) || null,
        createdAt: new Date(),
      }

      mutation.mutate(eventData)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
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
              Create Event
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              For <span className="font-semibold text-indigo-600">{club.name}</span>
            </p>
          </div>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center transition-all"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form className="p-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>

          <Field label="Event Title" error={errors.title && 'Title is required'}>
            <input
              type="text"
              {...register('title', { required: true })}
              placeholder="e.g. Spring Hackathon 2025"
              className={inputClass}
            />
          </Field>

          <Field label="Description" error={errors.description && 'Description is required'}>
            <textarea
              {...register('description', { required: true })}
              placeholder="What's the event about?"
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
                type="text"
                {...register('location', { required: true })}
                placeholder="Venue or Online"
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Banner Image" hint="Recommended: 1200×400px">
            <input
              type="file"
              accept="image/*"
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

          {/* Fee — shown only when Paid */}
          {watchIsPaid && (
            <Field label="Registration Fee ($)" error={errors.eventFee && 'Fee is required for paid events'}>
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
              label={
                uploading
                  ? 'Uploading image...'
                  : loading
                  ? 'Creating event...'
                  : 'Create Event'
              }
              type="submit"
              disabled={loading || uploading}
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

export default EventCreateModal