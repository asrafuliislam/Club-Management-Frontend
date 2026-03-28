const Button = ({ label, onClick, disabled, outline, small, icon: Icon, danger, className = '' }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        relative inline-flex items-center justify-center gap-2
        font-semibold rounded-lg transition-all duration-200
        disabled:opacity-60 disabled:cursor-not-allowed
        cursor-pointer
        ${small ? 'text-sm px-4 py-2' : 'text-sm px-5 py-3'}
        ${danger
          ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white hover:border-red-600'
          : outline
            ? 'bg-white text-gray-700 border border-gray-200 hover:border-indigo-400 hover:text-indigo-600'
            : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0 shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300 hover:-translate-y-0.5'
        }
        w-full
        ${className}
      `}
    >
      {Icon && <Icon size={18} className="shrink-0" />}
      {label}
    </button>
  )
}

export default Button