import React from 'react';
import { STATUS_CONFIG } from '../data';

const LegendItem = ({ statusKey, texts }) => {
    const config = STATUS_CONFIG[statusKey];
    return (
        <div className="flex items-center gap-2">
            <div 
                className="w-3 h-3 rounded-full shadow-sm" 
                style={{ backgroundColor: config.hex }}
            />
            <span className="text-[10px] font-medium text-slate-600">
                {config.label[texts.lang]}
            </span>
        </div>
    );
};

export default LegendItem;