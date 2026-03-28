import { ScaleLoader } from 'react-spinners'

const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4
        ${smallHeight ? 'h-[250px]' : 'h-[70vh]'}
      `}
    >
      <ScaleLoader color="#6366f1" height={40} width={4} radius={4} margin={3} />
      <p className="text-sm text-gray-400 font-medium animate-pulse">Loading...</p>
    </div>
  )
}

export default LoadingSpinner