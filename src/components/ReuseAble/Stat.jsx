import React from 'react';

const Stat = ({ icon, val, lbl }) => {
    return (
        <div className="flex items-center gap-1.5">
            <span className="text-base">{icon}</span>
            <span className="text-sm font-bold text-gray-900">{val}</span>
            <span className="text-sm text-gray-500">{lbl}</span>
        </div>
    )
};

export default Stat;




