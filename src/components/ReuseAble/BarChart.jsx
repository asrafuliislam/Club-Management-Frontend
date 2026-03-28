import React from 'react';

const BarChart = ({ title, bars, subtitle }) => {
    const max = Math.max(...bars.map(b => b.value), 1)
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="mb-5">
                <p className="font-bold text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>{title}</p>
                {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
            </div>
            <div className="flex items-end gap-2 h-36">
                {bars.map((b, i) => {
                    const pct = Math.max((b.value / max) * 100, 4)
                    return (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group relative">
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] font-bold px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                                {b.label}: {b.value}
                            </div>
                            <div className={`w-full rounded-t-lg transition-all duration-700 ${b.color}`} style={{ height: `${pct}%` }} />
                            <span className="text-[10px] text-gray-400 font-medium">{b.label}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default BarChart;