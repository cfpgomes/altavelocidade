import React from 'react';
import { STATUS_CONFIG } from '../data';
import { ExternalLink } from './Icons';

const GanttBar = ({ range, type, color, label, segments, source, lang }) => {
    const chartStart = 2021;
    const chartEnd = 2033;
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
        <div className="relative w-full h-8 bg-slate-50 rounded-md mb-2 overflow-hidden border border-slate-100 group">
            {segments.map((seg, idx) => {
                const segLeft = ((seg.start - chartStart) / totalDuration) * 100;
                const segWidth = ((seg.end - seg.start) / totalDuration) * 100;
                const config = STATUS_CONFIG[seg.statusKey];

                // Construct tooltip text
                const tooltipText = `${seg.tooltip || config.label.pt}\n${seg.start.toFixed(2)} - ${seg.end.toFixed(2)}${seg.source && seg.source !== '#' ? '\nClick to open source' : ''}`;
                
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
                            title={tooltipText}
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
                        title={tooltipText}
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
    );
};

export default GanttBar;