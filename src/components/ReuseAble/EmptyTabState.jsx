import React from 'react';
const EmptyTabState = ({ icon, title, desc }) => {
    return (
        <div className="flex flex-col items-center py-16 text-center px-6">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-3xl mb-4">{icon}</div>
            <p className="font-semibold text-gray-700">{title}</p>
            <p className="text-sm text-gray-400 mt-1 max-w-xs">{desc}</p>
        </div>
    )
}
export default EmptyTabState;