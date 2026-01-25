import React from 'react';

const TodayLine = ({ date, label }) => {
    return (
        <div
            className="absolute -top-9 h-[calc(100%+2.25rem)] w-0.5 z-20 bg-red-500 pointer-events-none"
            style={{ left: `${date}%` }}
        >
            <div className="absolute -top-6 w-16">
                <span className="absolute top-2 text-xs font-mono font-medium text-white bg-red-500 px-1.5 py-0.5 rounded-md shadow-md">
                    {label}
                </span>
            </div>
        </div>
    );
}

export default TodayLine;