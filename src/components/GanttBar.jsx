import React, { useState } from 'react';
import { STATUS_CONFIG, formatDecimalDate, CHART_START, CHART_END } from '../data';
import { ExternalLink } from './Icons';

const GanttBar = ({ range, type, color, label, segments, source, lang }) => {
    const [hoveredSegment, setHoveredSegment] = useState(null);
    const chartStart = CHART_START;
    const chartEnd = CHART_END;
    const totalDuration = chartEnd - chartStart;

    const containerStart = segments ? segments[0].start : range.start;
    const containerEnd = segments ? segments[segments.length - 1].end : range.end;

    const totalLeft = ((containerStart - chartStart) / totalDuration) * 100;
    const totalWidth = ((containerEnd - containerStart) / totalDuration) * 100;

    if (type === 'initial') {
        return (
            <div className="relative w-full h-8 bg-slate-50 rounded-md mb-2 overflow-hidden border border-slate-100 group">
                <div
                    className="absolute h-full top-0 rounded transition-all duration-1000 ease-out flex items-center px-2 opacity-30"
                    style={{
                        left: `${totalLeft}%`,
                        width: `${totalWidth}%`,
                        backgroundColor: '#94a3b8'
                    }}
                >
                    <span className="text-[10px] font-bold uppercase tracking-wider truncate text-slate-600">
                        {label}
                    </span>
                </div>
                <div className="hidden group-hover:flex absolute inset-0 items-center justify-end px-2 bg-white/50 backdrop-blur-[1px]">
                    <span className="text-xs font-mono font-medium text-slate-700">
                        {lang === 'pt' ? `${range.startLabelPT} – ${range.endLabelPT}` : `${range.startLabelEN} – ${range.endLabelEN}`}
                    </span>
                </div>
            </div>
        );
    }

    // Multi-segment granular bar
    return (
        <div className="relative w-full bg-slate-50 rounded-md mb-2 overflow-visible border border-slate-100 group pt-6">
            {hoveredSegment !== null && (
                <div 
                    className="absolute -top-10 left-0 z-50 pointer-events-none"
                    style={{
                        left: `${(((segments[hoveredSegment].range.start + segments[hoveredSegment].range.end) / 2 - chartStart) / totalDuration) * 100}%`,
                        transform: 'translateX(-50%)'
                    }}
                >
                    <div className="bg-slate-900 text-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap text-sm font-medium">
                        <div>{hoveredSegment !== null ? (typeof segments[hoveredSegment].tooltip === 'string' ? segments[hoveredSegment].tooltip : segments[hoveredSegment].tooltip[lang]) : ''}</div>
                        <div className="text-xs opacity-90 mt-1">
                            {hoveredSegment !== null && (
                                <>
                                    {lang === 'pt' ? segments[hoveredSegment].range.startLabelPT : segments[hoveredSegment].range.startLabelEN}
                                    {' – '}
                                    {lang === 'pt' ? segments[hoveredSegment].range.endLabelPT : segments[hoveredSegment].range.endLabelEN}
                                </>
                            )}
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
                    </div>
                </div>
            )}
            <div className="relative h-8 bg-slate-50 rounded-md overflow-hidden">
                {segments.map((seg, idx) => {
                    const segLeft = ((seg.range.start - chartStart) / totalDuration) * 100;
                    const segWidth = ((seg.range.end - seg.range.start) / totalDuration) * 100;
                    const config = STATUS_CONFIG[seg.statusKey];
                    const hasLink = seg.source && seg.source !== '#';

                    const content = (
                        <>
                            {/* Link Icon if clickable */}
                            {seg.source && seg.source !== '#' && segWidth > 0 && (
                                <div className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2">
                                    <ExternalLink size={10} className="text-white" />
                                </div>
                            )}
                        </>
                    );

                    const commonClasses = "absolute h-full top-0 transition-all duration-300 hover:brightness-110 hover:shadow-lg hover:z-10 flex items-center justify-center border-r border-white/20 last:border-0 group/segment";
                    
                    const styles = (hasLink) 
                        ? { left: `${segLeft}%`, width: `${segWidth}%`, backgroundColor: config.hex }
                        : { left: `${segLeft}%`, width: `${segWidth}%`, backgroundColor: config.hex, opacity: 0.4 };

                    if (hasLink) {
                        return (
                            <a 
                                key={idx} 
                                href={seg.source} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className={`${commonClasses} cursor-pointer`}
                                style={styles}
                                onMouseEnter={() => setHoveredSegment(idx)}
                                onMouseLeave={() => setHoveredSegment(null)}
                            >
                                {content}
                            </a>
                        );
                    }

                    return (
                        <div 
                            key={idx} 
                            className={commonClasses}
                            style={styles}
                            onMouseEnter={() => setHoveredSegment(idx)}
                            onMouseLeave={() => setHoveredSegment(null)}
                        >
                            {content}
                        </div>
                    );
                })}
                {/* Overall Label Overlay */}
                <div 
                    className="absolute h-full top-0 pointer-events-none flex items-center px-2 z-20"
                    style={{ left: `${totalLeft}%`, width: `${totalWidth}%` }}
                >
                    <span className="text-[10px] font-bold uppercase tracking-wider truncate text-white mix-blend-hard-light drop-shadow-md">
                        {label}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default GanttBar;