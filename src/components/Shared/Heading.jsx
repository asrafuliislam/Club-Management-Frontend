const Heading = ({ title, subtitle, center }) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <h2
        className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-gray-500 text-sm font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default Heading