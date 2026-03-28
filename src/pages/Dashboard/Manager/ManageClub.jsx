import { useState } from 'react'
import ManagerClubs from './ManagerClubs'
import AddClubForm from '../../../components/Form/AddClubForm'
import { PageHead } from '../../../components/Dashboard/DashboardUI'

const ManageClub = () => {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="space-y-6">
      <PageHead
        title="My Clubs"
        subtitle="Create and manage your clubs"
        action={
          <button
            onClick={() => setShowForm(!showForm)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
              ${showForm
                ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                : 'text-white hover:shadow-lg hover:shadow-indigo-100 hover:-translate-y-0.5'
              }`}
            style={!showForm ? {
              background: 'linear-gradient(135deg, #4f46e5, #9333ea)',
            } : {}}
          >
            {showForm ? (
              <>✕ Close Form</>
            ) : (
              <>＋ Create Club</>
            )}
          </button>
        }
      />

      {/* Create Club Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-in fade-in">
          <AddClubForm />
        </div>
      )}

      {/* Clubs List */}
      <ManagerClubs />
    </div>
  )
}

export default ManageClub