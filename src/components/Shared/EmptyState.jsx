import { Link } from 'react-router'
import Button from '../../components/Shared/Button/Button'

const EmptyState = ({ message, address, label, icon = '🔍' }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-24 px-4">
      {/* Icon bubble */}
      <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center text-4xl">
        {icon}
      </div>

      <div className="text-center">
        <p className="text-gray-700 text-lg font-semibold" style={{ fontFamily: "'Syne', sans-serif" }}>
          {message}
        </p>
        <p className="text-gray-400 text-sm mt-1">
          Nothing to show here yet.
        </p>
      </div>

      {address && label && (
        <Link to={address} className="w-44">
          <Button label={label} />
        </Link>
      )}
    </div>
  )
}

export default EmptyState