import { useForm } from 'react-hook-form'
import { imageUpload } from '../../utils'
import useAuth from '../../hooks/useAuth'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import useAxiosSecure from '../../../src/hooks/useAxiosSecure'
import { useState } from 'react'

const AddClubForm = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [imagePreview, setImagePreview] = useState(null)

    const {
        mutateAsync: addClub,
        isLoading,
        isError,
        reset: mutationReset,
    } = useMutation({
        mutationFn: async (clubData) => await axiosSecure.post(`/clubs`, clubData),
        onSuccess: () => {
            toast.success('Club added successfully!')
            mutationReset()
            setImagePreview(null)
        },
        onError: (err) => {
            console.log(err)
            toast.error('Failed to add club!')
        },
    })

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm()

    const membershipType = watch('membershipType')

    const onSubmit = async (data) => {
        try {
            const imageFile = data.image[0]

            const imageUrl = await imageUpload(imageFile)

            const clubData = {
                name: data.name,
                category: data.category,
                description: data.description,
                location: data.location,
                membersLimit: Number(data.members),
                image: imageUrl,
                membershipType: data.membershipType,
                // যদি Paid হয় তাহলে fee রাখো, Free হলে 0
                membershipFee: data.membershipType === 'Paid' ? Number(data.membershipFee) : 0,
                manager: {
                    name: user?.displayName,
                    email: user?.email,
                    image: user?.photoURL,
                },
                status: 'pending',
                createdAt: new Date().toISOString(),
            }

            await addClub(clubData)
            reset()
            setImagePreview(null)
        } catch (err) {
            console.log(err)
            toast.error('Something went wrong during submission!')
        }
    }

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    if (isError)
        return (
            <div className="text-red-500 text-center py-10 text-sm">Something went wrong!</div>
        )

    return (
        <div className="w-full">
            {/* Page Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-extrabold text-gray-900">Create New Club</h2>
                <p className="text-gray-500 text-sm mt-1">
                    Fill in the details below. Your club will be reviewed before going live.
                </p>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 max-w-3xl">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-5">
                            {/* Club Name */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-gray-700">Club Name</label>
                                <input
                                    {...register('name', { required: true })}
                                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-gray-800 bg-white outline-none transition-all
                    ${errors.name
                                            ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                                            : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50'
                                        }`}
                                    placeholder="e.g. Code & Build Society"
                                />
                                {errors.name && (
                                    <span className="text-red-500 text-xs">Club name is required</span>
                                )}
                            </div>

                            {/* Category */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-gray-700">Category</label>
                                <select
                                    {...register('category', { required: true })}
                                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-gray-800 bg-white outline-none transition-all appearance-none cursor-pointer
                    ${errors.category
                                            ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                                            : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50'
                                        }`}
                                >
                                    <option value="">Select a category</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Photography">Photography</option>
                                    <option value="Literature">Literature</option>
                                    <option value="Arts">Arts</option>
                                    <option value="Music">Music</option>
                                    <option value="Tech">Tech</option>
                                    <option value="Social">Social</option>
                                    <option value="Hiking">Hiking</option>
                                </select>
                                {errors.category && (
                                    <span className="text-red-500 text-xs">Category is required</span>
                                )}
                            </div>

                            {/* Description */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-gray-700">Description</label>
                                <textarea
                                    {...register('description', { required: true })}
                                    placeholder="Tell people what your club is about..."
                                    rows={4}
                                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-gray-800 bg-white outline-none transition-all resize-none
                    ${errors.description
                                            ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                                            : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50'
                                        }`}
                                />
                                {errors.description && (
                                    <span className="text-red-500 text-xs">Description is required</span>
                                )}
                            </div>

                            {/* Location */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-gray-700">Location</label>
                                <input
                                    {...register('location', { required: true })}
                                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-gray-800 bg-white outline-none transition-all
                    ${errors.location
                                            ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                                            : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50'
                                        }`}
                                    placeholder="City / Area"
                                />
                                {errors.location && (
                                    <span className="text-red-500 text-xs">Location is required</span>
                                )}
                            </div>

                            {/* ✅ Membership Type — Free / Paid */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-gray-700">Membership Type</label>
                                <div className="flex gap-3">
                                    {['Free', 'Paid'].map((type) => (
                                        <label
                                            key={type}
                                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border-2 cursor-pointer text-sm font-medium transition-all
                                                ${membershipType === type
                                                    ? type === 'Free'
                                                        ? 'border-green-500 bg-green-50 text-green-700'
                                                        : 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                value={type}
                                                className="hidden"
                                                {...register('membershipType', { required: true })}
                                            />
                                            <span>{type === 'Free' ? '🆓' : '💳'}</span>
                                            {type}
                                        </label>
                                    ))}
                                </div>
                                {errors.membershipType && (
                                    <span className="text-red-500 text-xs">Please select membership type</span>
                                )}
                            </div>

                            {/* ✅ Membership Fee — শুধু Paid সিলেক্ট করলে দেখাবে */}
                            {membershipType === 'Paid' && (
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Membership Fee (৳)</label>
                                    <input
                                        {...register('membershipFee', {
                                            required: membershipType === 'Paid',
                                            min: { value: 1, message: 'Fee must be at least 1' },
                                        })}
                                        type="number"
                                        min="1"
                                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-gray-800 bg-white outline-none transition-all
                                            ${errors.membershipFee
                                                ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                                                : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50'
                                            }`}
                                        placeholder="e.g. 500"
                                    />
                                    {errors.membershipFee && (
                                        <span className="text-red-500 text-xs">
                                            {errors.membershipFee.message || 'Membership fee is required'}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Right Column */}
                        <div className="space-y-5 flex flex-col">
                            {/* Members Limit */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-gray-700">Members Limit</label>
                                <input
                                    {...register('members', { required: true })}
                                    type="number"
                                    min="1"
                                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-gray-800 bg-white outline-none transition-all
                    ${errors.members
                                            ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                                            : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50'
                                        }`}
                                    placeholder="e.g. 200"
                                />
                                {errors.members && (
                                    <span className="text-red-500 text-xs">Members limit is required</span>
                                )}
                            </div>

                            {/* Image Upload */}
                            <div className="flex flex-col gap-1.5 flex-1">
                                <label className="text-sm font-semibold text-gray-700">Club Image</label>
                                <label className="flex-1 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-200 rounded-xl p-6 cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/40 transition-all group min-h-[160px]">
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-36 object-cover rounded-lg"
                                        />
                                    ) : (
                                        <>
                                            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-2xl group-hover:bg-indigo-100 transition-colors">
                                                📷
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm font-medium text-gray-700">Click to upload image</p>
                                                <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 5MB</p>
                                            </div>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        {...register('image', {
                                            required: true,
                                            onChange: (e) => {
                                                if (e.target.files[0]) {
                                                    setImagePreview(URL.createObjectURL(e.target.files[0]))
                                                }
                                            }
                                        })}
                                    />
                                </label>
                                {errors.image && (
                                    <span className="text-red-500 text-xs">Club image is required</span>
                                )}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full py-3 px-6 rounded-xl text-sm font-semibold text-white cursor-pointer
                  bg-gradient-to-r from-indigo-600 to-purple-600
                  hover:shadow-lg hover:shadow-indigo-200 hover:-translate-y-0.5
                  transition-all duration-200"
                            >
                                Submit for Review
                            </button>

                            <p className="text-xs text-gray-400 text-center -mt-2">
                                Your club will be reviewed by an admin before going live.
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddClubForm