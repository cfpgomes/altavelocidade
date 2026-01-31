import React from 'react';
import { useNavigate } from 'react-router-dom';
import { STATUS_CONFIG, CHART_START, CHART_END } from '../data';
import TodayLine from './TodayLine';
import GanttBar from './GanttBar';

const Section = ({ data, isActive, texts, isFirst, isLast, idx }) => {
    const navigate = useNavigate();
    const statusConfig = STATUS_CONFIG[data.statusKey];

    // Compute today's position
    const today = new Date();
    const startYear = CHART_START;
    const endYear = CHART_END;
    const totalYears = endYear - startYear;
    const elapsedYears = (today.getFullYear() + today.getMonth() / 12) - startYear;
    const monthFraction = today.getMonth() / 12;
    const dayFraction = today.getDate() / new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const todayPosition = ((elapsedYears + (monthFraction * (1/12)) + (dayFraction * (1/365))) / totalYears) * 100;

    const paddingClasses = `${isFirst ? 'pt-8' : 'pt-8'} ${isLast ? 'pb-8' : 'pb-8'}`;

    return (
        <div id={data.id} className={`flex flex-col ${paddingClasses} ${isFirst ? '-mt-px' : ''} px-6 md:px-12 border-b border-slate-100 snap-start bg-white section-animate`} style={{ animationDelay: `${idx * 0.1}s` }}>
            <div className="mb-6">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-3 border break-words ${statusConfig.ui}`}>
                    <div className={`w-2 h-2 rounded-full bg-current`} />
                    {statusConfig.label[texts.lang]}
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">{data.title}</h2>
                <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">{data.description}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8 max-w-2xl">
                {data.details.map((detail, idx) => (
                    <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <div className="text-[10px] uppercase text-slate-400 font-bold mb-1 break-words">{detail.label}</div>
                        <div className="text-sm font-semibold text-slate-800 break-words">{detail.value}</div>
                    </div>
                ))}
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-inner relative">
                
                 {/* REPLACEMENT: Percentage-based positioning for years */}
                 <div className="relative w-full h-6 text-[10px] text-slate-400 font-mono mb-2 border-b border-slate-200">
                    {Array.from({ length: Math.ceil((CHART_END - CHART_START) / 2) + 1 }, (_, i) => CHART_START + i * 2).map(y => {
                        const pct = ((y - CHART_START) / (CHART_END - CHART_START)) * 100;
                        let translate = '-translate-x-1/2';
                        if (pct === 0) translate = '-translate-x-0';
                        if (pct >= 100) translate = '-translate-x-full';
                        
                        return (
                            <span 
                                key={y} 
                                className={`absolute bottom-2 ${translate}`} 
                                style={{ left: `${pct}%` }}
                            >
                                {y}
                            </span>
                        );
                    })}
                </div>

                <div className="space-y-3 relative z-0">
                    <TodayLine date={todayPosition} label={texts.gantt.today} />

                    <div>
                        <div className="text-xs font-medium text-slate-500 mb-1">{texts.gantt.initial}</div>
                        <GanttBar 
                            range={data.gantt.initial.range} 
                            type="initial" 
                            label=""
                            lang={texts.lang}
                        />
                    </div>

                    <div>
                        <div className="text-xs font-medium text-slate-500 mb-1">{texts.gantt.actual}</div>
                        {data.gantt.actualRows ? (
                            <div className="space-y-2">
                                {data.gantt.actualRows.map((row, rowIdx) => (
                                    <div key={rowIdx}>
                                        <div className="text-[11px] font-semibold text-slate-500 mb-1">
                                            {typeof row.label === 'string' ? row.label : row.label[texts.lang]}
                                        </div>
                                        <GanttBar
                                            segments={row.segments}
                                            type="actual"
                                            label=""
                                            lang={texts.lang}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <GanttBar 
                                segments={data.gantt.actual} 
                                type="actual" 
                                label=""
                                lang={texts.lang}
                            />
                        )}
                    </div>
                </div>

                {/* More Details Button */}
                <div className="flex justify-end">
                    <button
                        onClick={() => navigate(`/${data.id}`)}
                        className="mt-6 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
                    >
                        <span>{texts.lang === 'pt' ? 'Mais detalhes' : 'More details'}</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Section;