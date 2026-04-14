import React from 'react';
import { Link } from 'react-router'
import Tag from './Tag';
import EventStatusBadge from './EventStatusBadge';

const EventRow = ({ event }) => {

    const d = new Date(event.eventDate)
    const day = d.toLocaleDateString('en-US', { day: '2-digit' })
    const month = d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()


    return (
        <Link
            to={`/events/${event._id}`}
            className="flex items-center gap-4 px-6 py-4 border-b border-gray-50 hover:bg-indigo-50/40 transition-colors duration-150 group"
        >
            {/* Mini date badge */}
            <div className="w-12 h-14 rounded-xl bg-gradient-to-b from-indigo-600 to-indigo-800 flex flex-col items-center justify-center text-white shadow-md shadow-indigo-100 flex-shrink-0">
                <span className="text-base font-black leading-none">{day}</span>
                <span className="text-[9px] font-bold opacity-75 tracking-wider mt-0.5">{month}</span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-gray-900 group-hover:text-indigo-700 transition-colors truncate">
                    {event.title}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                    {event.location && (
                        <span className="text-xs text-gray-500">📍 {event.location}</span>
                    )}
                    {event.isPaid
                        ? <Tag color="purple">💰 ${event.eventFee}</Tag>
                        : <Tag color="teal">🎟️ Free</Tag>
                    }
                    <EventStatusBadge date={event.eventDate} />
                </div>
            </div>

            {/* Chevron */}
            <svg className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all duration-150 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
        </Link>
    )
};

export default EventRow;