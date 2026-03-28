import { Link } from 'react-router'

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-500 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-indigo-200 group-hover:shadow-indigo-300 transition-shadow">
        CS
      </div>
      <span className="font-black text-gray-900 text-lg tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
        Club<span className="text-indigo-600">Sphere</span>
      </span>
    </Link>
  )
}

export default Logo