import React, { useState } from 'react';

const Tooltip = ({ children, content, lang }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="relative inline-block w-full h-full">
            <div
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
                className="w-full h-full"
            >
                {children}
            </div>
            {isVisible && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 z-50 pointer-events-none">
                    <div className="bg-slate-900 text-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap text-sm font-medium">
                        {typeof content === 'string' ? content : content[lang]}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tooltip;
