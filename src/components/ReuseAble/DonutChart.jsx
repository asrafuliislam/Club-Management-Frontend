import React from 'react';
const DonutChart = ({ title, total, totalLabel = 'Total', segments }) => {
    const r = 50
    const circ = 2 * Math.PI * r
    const totalVal = segments.reduce((s, seg) => s + (seg.value || 0), 0) || 1
    let offset = 0
    const arcs = segments.map(seg => {
        const dash = ((seg.value || 0) / totalVal) * circ
        const arc = { ...seg, dash, offset: circ - offset }
        offset += dash
        return arc
    })

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <p className="font-bold text-gray-900 mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>{title}</p>
            <div className="flex items-center gap-5">
                <div className="relative flex-shrink-0 w-28 h-28">
                    <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                        <circle cx="60" cy="60" r={r} fill="none" stroke="#f3f4f6" strokeWidth="16" />
                        {arcs.map((arc, i) => (
                            <circle key={i} cx="60" cy="60" r={r} fill="none"
                                stroke={arc.color} strokeWidth="16"
                                strokeDasharray={`${arc.dash} ${circ}`}
                                strokeDashoffset={arc.offset}
                                strokeLinecap="round"
                            />
                        ))}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xl font-black text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>{total ?? '—'}</span>
                        <span className="text-[9px] text-gray-400 font-medium">{totalLabel}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                    {segments.map((seg, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: seg.color }} />
                                <span className="text-xs text-gray-600 font-medium">{seg.label}</span>
                            </div>
                            <span className="text-xs font-bold text-gray-800">{seg.value ?? 0}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DonutChart;