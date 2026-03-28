import React from 'react';

const StatCard = ({ title, value, icon, bg, change, changeTone = 'teal' }) => {
  const toneMap = {
    teal: 'text-teal-600   bg-teal-50',
    indigo: 'text-indigo-600 bg-indigo-50',
    amber: 'text-amber-600  bg-amber-50',
    red: 'text-red-500    bg-red-50',
  }
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <p className="text-sm font-semibold text-gray-500">{title}</p>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl ${bg}`}>{icon}</div>
      </div>
      <div>
        <p className="text-3xl font-black text-gray-900 leading-none" style={{ fontFamily: "'Syne', sans-serif" }}>
          {value ?? '—'}
        </p>
        {change && (
          <p className={`text-xs font-semibold mt-2 flex items-center gap-1 ${toneMap[changeTone]}`}>
            <span>▲</span> {change}
          </p>
        )}
      </div>
    </div>
  )
}

export default StatCard;

