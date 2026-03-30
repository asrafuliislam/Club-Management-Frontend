import React from 'react';

const MetaCard = ({ icon, label, value }) => {
    return (
        <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
            <span className="text-lg mt-0.5">{icon}</span>
            <div>
                <p className="text-xs font-medium text-gray-500">{label}</p>
                <p className="text-sm font-semibold text-gray-800">{value || '—'}</p>
            </div>
        </div>
    )
};

export default MetaCard;

