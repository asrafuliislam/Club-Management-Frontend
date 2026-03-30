import React from 'react';
const Tag = ({ children, color = 'indigo' }) => {
    const map = {
        indigo: 'bg-indigo-50 text-indigo-700 border-indigo-100',
        teal: 'bg-teal-50   text-teal-700   border-teal-100',
        purple: 'bg-purple-50 text-purple-700 border-purple-100',
        gray: 'bg-gray-100  text-gray-600   border-gray-200',
        amber: 'bg-amber-50  text-amber-700  border-amber-100',
        red: 'bg-red-50    text-red-600    border-red-100',
    }
    return (
        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${map[color]}`}>
            {children}
        </span>
    )
}

export default Tag;