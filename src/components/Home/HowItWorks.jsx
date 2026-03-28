const steps = [
  {
    icon: '🔍',
    title: 'Discover',
    desc: 'Browse hundreds of clubs and events across categories — tech, arts, sports, education, and more.',
    gradient: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(99,102,241,0.05))',
    iconBg: 'rgba(99,102,241,0.12)',
    step: '01',
  },
  {
    icon: '🤝',
    title: 'Join',
    desc: 'Apply to join a club in seconds. Free or paid memberships — your choice. Get instant access to events and members.',
    gradient: 'linear-gradient(135deg, rgba(20,184,166,0.15), rgba(20,184,166,0.05))',
    iconBg: 'rgba(20,184,166,0.12)',
    step: '02',
  },
  {
    icon: '🚀',
    title: 'Grow',
    desc: 'Attend events, connect with members, build real skills, and grow your network inside your community.',
    gradient: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(168,85,247,0.05))',
    iconBg: 'rgba(168,85,247,0.12)',
    step: '03',
  },
]

const HowItWorks = () => {
  return (
    <section className="py-16 px-6" style={{ background: '#f8f9ff' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white border border-indigo-100 text-indigo-600 text-xs font-semibold px-4 py-2 rounded-full mb-4 shadow-sm">
            Simple & Fast
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            How ClubSphere Works
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            From discovering a club to making lifelong connections — it's all just a few clicks away.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div
              key={s.step}
              className="relative bg-white rounded-2xl border border-gray-100 p-7 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
            >
              {/* Step number (background watermark) */}
              <div className="absolute top-4 right-5 text-6xl font-extrabold text-gray-100 select-none leading-none"
                style={{ fontFamily: "'Syne', sans-serif" }}>
                {s.step}
              </div>

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5"
                style={{ background: s.iconBg }}
              >
                {s.icon}
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2"
                style={{ fontFamily: "'Syne', sans-serif" }}>
                {s.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
