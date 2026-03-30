import React from 'react';

const InfoTile = ({ icon, label, value, color = 'gray' }) => {
    return (
        <div className={`rounded-2xl p-5 border border-gray-100 ${color === 'indigo' ? 'bg-indigo-50' : 'bg-white'}`}>
            <div className="text-2xl mb-2.5">{icon}</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{label}</div>
            <div className="text-sm font-bold text-gray-900">{value}</div>
        </div>
    )
};

export default InfoTile;