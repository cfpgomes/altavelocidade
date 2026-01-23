import React from 'react';
import { CONTENT } from '../data';

const MapStation = ({ cx, cy, label, isActive }) => (
    <g className={`transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
        <circle cx={cx} cy={cy} r={isActive ? 8 : 6} fill="white" stroke="#334155" strokeWidth="2" />
        <text x={cx + 14} y={cy + 5} className="text-[16px] font-bold fill-slate-700 uppercase tracking-wide" style={{ textShadow: '0 2px 4px white' }}>
            {label}
        </text>
    </g>
);

export default MapStation;