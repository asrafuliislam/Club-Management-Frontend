import React from 'react';

const ProgressBar = ({ label, value, max, color }) => {
    const pct = max ? Math.min((value / max) * 100, 100) : 0
    return (
        <div>
            <div className="flex justify-between text-xs font-medium text-gray-600 mb-1">
                <span>{label}</span><span>{value ?? 0}</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
            </div>
        </div>
    )
}

export default ProgressBar;