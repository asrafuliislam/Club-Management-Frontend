import React from 'react';

const UpcomingEventCard = ({ title, date, club, isPaid, fee }) => {
    const d = new Date(date)
    const day = d.toLocaleDateString('en-US', { day: '2-digit' })
    const mon = d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()

    return (
        <div className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
            <div className="w-10 h-12 rounded-xl bg-gradient-to-b from-indigo-600 to-indigo-800 flex flex-col items-center justify-center text-white flex-shrink-0 shadow-md shadow-indigo-100">
                <span className="text-sm font-black leading-none">{day}</span>
                <span className="text-[9px] font-bold opacity-70 tracking-wider">{mon}</span>
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{title}</p>
                <p className="text-xs text-gray-500 truncate">{club}</p>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex-shrink-0
        ${isPaid ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-teal-50 text-teal-700 border-teal-100'}`}
            >
                {isPaid ? `$${fee}` : 'Free'}
            </span>
        </div>
    )
}

export default UpcomingEventCard;