import React from 'react';
const MemberRow = ({ image, name, email, badge, joinDate }) => {
    return (
        <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
            <img
                src={image || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff`}
                alt={name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{name}</p>
                <p className="text-xs text-gray-500 truncate">{email}</p>
            </div>
            {joinDate && <span className="text-xs text-gray-400 hidden sm:block">{joinDate}</span>}
            {badge}
        </div>
    )
};

export default MemberRow;