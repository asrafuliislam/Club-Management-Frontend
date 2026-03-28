import { Link } from 'react-router'

const Hero = () => {
  const stats = [
    { num: '1.2', suffix: 'k', label: 'Active Clubs' },
    { num: '48', suffix: 'k', label: 'Members' },
    { num: '320', suffix: '+', label: 'Events/Month' },
    { num: '98', suffix: '%', label: 'Satisfaction' },
  ]

  return (
    <section className="relative min-h-[calc(100vh-64px)] flex flex-col justify-center items-center overflow-hidden px-6 py-20"
      style={{
        background: 'linear-gradient(135deg, #fafaff 0%, #f0f2ff 40%, #fdf4ff 100%)',
      }}
    >
      {/* Background mesh blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-[5%] w-[500px] h-[400px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.25) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-[5%] w-[400px] h-[350px] rounded-full opacity-25"
          style={{ background: 'radial-gradient(ellipse, rgba(168,85,247,0.2) 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(ellipse, rgba(20,184,166,0.15) 0%, transparent 70%)' }} />
      </div>

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `linear-gradient(rgba(99,102,241,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.08) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-indigo-50/80 border border-indigo-200/60 text-indigo-700 text-xs font-semibold px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
          Now with 1,200+ active clubs
        </div>

        {/* Headline */}
        <h1 className="font-extrabold text-gray-900 leading-[1.1] mb-6"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontFamily: "'Syne', 'DM Sans', sans-serif" }}
        >
          Discover Clubs.<br />
          <span
            style={{
              background: 'linear-gradient(135deg, #4f46e5, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Join Events.
          </span>
          <br />
          Build Community.
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 text-lg max-w-[480px] mx-auto mb-10 leading-relaxed">
          ClubSphere connects passionate people. Find your tribe, attend events that matter,
          and grow together — all in one seamless platform.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-14">
          <Link
            to="/clubs"
            className="flex items-center gap-2 px-8 py-3.5 rounded-lg text-white font-semibold text-base transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, #4f46e5, #9333ea)',
              boxShadow: '0 8px 24px rgba(99,102,241,0.4)',
            }}
          >
            <span>🚀</span> Explore Clubs
          </Link>
          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-8 py-3.5 rounded-lg text-gray-700 font-medium text-base bg-white border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 transition-all duration-200"
            style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
          >
            View Dashboard →
          </Link>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap gap-10 justify-center">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-extrabold text-gray-900 leading-none"
                style={{ fontFamily: "'Syne', sans-serif" }}>
                {s.num}
                <span className="text-indigo-600">{s.suffix}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
