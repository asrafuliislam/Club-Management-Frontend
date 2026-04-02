import { useEffect, useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import useRole from '../../../hooks/useRole'
import toast from 'react-hot-toast'
import { imageUpload } from '../../../utils'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import BecomeManagerModal from '../../../components/Modal/BecomeManagerModal'
import BecomeAdminModal from '../../../components/Modal/BecomeAdminModal'
import getGradient from '../../../components/Shared/getGradient'

const roleMeta = {
  admin: { label: 'Admin', bg: 'bg-purple-50 text-purple-700 border border-purple-100' },
  manager: { label: 'Manager', bg: 'bg-indigo-50 text-indigo-700 border border-indigo-100' },
  member: { label: 'Member', bg: 'bg-gray-100 text-gray-600 border border-gray-200' },
}

const Profile = () => {
  const { user, updateUserProfile } = useAuth()
  const { role, isRoleLoading } = useRole()

  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [isManagerOpen, setIsManagerOpen] = useState(false)
  const [isAdminOpen, setIsAdminOpen] = useState(false)

  const [preview, setPreview] = useState(null)
  const [name, setName] = useState(user?.displayName || '')
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (image) setPreview(URL.createObjectURL(image))
    else setPreview(null)
  }, [image])

  const handleUpdateProfile = async () => {
    if (!name && !image) return toast.error('Nothing to update')
    setLoading(true)
    try {
      let imageUrl = user.photoURL
      if (image) imageUrl = await imageUpload(image)
      await updateUserProfile(name, imageUrl)
      toast.success('Profile Updated Successfully')
      setIsUpdateOpen(false)
      setImage(null)
    } catch (err) {
      console.error(err)
      toast.error('Update Failed')
    } finally {
      setLoading(false)
    }
  }

  if (isRoleLoading) return <LoadingSpinner />

  const rm = roleMeta[role] || roleMeta.member

  return (
    <div className="max-w-2xl mx-auto">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        <div
          className="relative h-44 overflow-hidden"
          style={{ background: getGradient(user?.displayName || user?.email) }}
        >
          {/* Gradient overlay সরিয়ে দিন অথবা রাখুন */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
        </div>

        {/* Avatar + info */}
        <div className="px-8 pb-8">
          {/* Avatar overlapping cover */}
          <div className="flex items-end justify-between -mt-14 mb-5 flex-wrap gap-4">
            <div className="relative">
              <img
                src={user?.photoURL}
                className="w-24 h-24 rounded-2xl border-4 border-white object-cover shadow-lg"
                alt={user?.displayName}
              />
              {/* Role badge */}
              <span className={`absolute -bottom-2 -right-2 text-xs font-bold px-2 py-0.5 rounded-full shadow-sm ${rm.bg}`}>
                {rm.label}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 flex-wrap mt-2">
              <button
                onClick={() => setIsUpdateOpen(true)}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #4f46e5, #9333ea)' }}
              >
                Edit Profile
              </button>
              <button className="px-4 py-2 rounded-xl text-sm font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                Change Password
              </button>
            </div>
          </div>

          {/* Name + email */}
          <h2 className="text-2xl font-extrabold text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>
            {user?.displayName}
          </h2>
          <p className="text-gray-500 text-sm mt-1">{user?.email}</p>
          <p className="text-xs text-gray-400 mt-1 font-mono">UID: {user?.uid}</p>

          {/* Role Request Buttons (member only) */}
          {role === 'member' && (
            <div className="mt-6 pt-5 border-t border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Request a Role Upgrade</p>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => setIsManagerOpen(true)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-200"
                >
                  Request Manager Role
                </button>
                <button
                  onClick={() => setIsAdminOpen(true)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold bg-purple-50 text-purple-700 border border-purple-100 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all duration-200"
                >
                  Request Admin Role
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Role Modals */}
      <BecomeManagerModal closeModal={() => setIsManagerOpen(false)} isOpen={isManagerOpen} />
      <BecomeAdminModal closeModal={() => setIsAdminOpen(false)} isOpen={isAdminOpen} />

      {/* Update Profile Modal */}
      {isUpdateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>
                Update Profile
              </h3>
              <button
                onClick={() => setIsUpdateOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-5 space-y-5">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 transition-all"
                />
              </div>

              {/* Image */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">Profile Image</label>
                <label className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-all">
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-xl">📷</div>
                  )}
                  <span className="text-sm text-gray-500">{preview ? 'Image selected' : 'Click to upload new photo'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </label>
              </div>

              {/* Submit */}
              <button
                onClick={handleUpdateProfile}
                disabled={loading}
                className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-indigo-100 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg, #4f46e5, #9333ea)' }}
              >
                {loading ? 'Updating...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile