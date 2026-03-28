import { Link } from 'react-router'
import Logo from '../Logo'


const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-screen-2xl mx-auto xl:px-20 md:px-10 px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Logo />
            <p className="text-xs text-gray-400 max-w-xs text-center md:text-left">
              Discover clubs, join events, and build meaningful community connections.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link to="/clubs" className="hover:text-indigo-600 transition-colors">Clubs</Link>
            <Link to="/events" className="hover:text-indigo-600 transition-colors">Events</Link>
            <Link to="/dashboard" className="hover:text-indigo-600 transition-colors">Dashboard</Link>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} ClubSphere. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer