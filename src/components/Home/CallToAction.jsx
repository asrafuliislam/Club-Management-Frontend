import { Link } from 'react-router'

const CallToAction = () => {
  return (
    <section className="px-6 py-20">
      <div className="max-w-3xl mx-auto text-center">
        <div
          className="relative rounded-3xl px-10 py-16 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 60%, #9333ea 100%)',
            boxShadow: '0 25px 50px -12px rgba(99,102,241,0.35)',
          }}
        >
          {/* Background mesh */}
          <div className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

          <div className="relative z-10">
            <div className="text-4xl mb-4">🌟</div>
            <h2 className="text-3xl font-extrabold text-white mb-4 leading-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              Ready to find your community?
            </h2>
            <p className="text-indigo-200 text-base max-w-md mx-auto mb-10 leading-relaxed">
              Join thousands of members already growing with ClubSphere. Sign up free today.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/register"
                className="px-8 py-3.5 rounded-xl text-indigo-700 font-bold text-sm bg-white hover:bg-indigo-50 transition-all duration-200 hover:-translate-y-0.5"
                style={{ boxShadow: '0 4px 14px rgba(0,0,0,0.15)' }}
              >
                Get Started — It's Free
              </Link>
              <Link
                to="/clubs"
                className="px-8 py-3.5 rounded-xl text-white font-semibold text-sm border border-white/30 hover:bg-white/10 transition-all duration-200"
              >
                Browse Clubs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction
