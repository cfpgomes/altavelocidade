import React, { useState } from 'react';
import { STATUS_CONFIG, formatDecimalDate, CHART_START, CHART_END } from '../data';
import TodayLine from './TodayLine';

const CompleteGanttChart = ({ sections, lang, chapters }) => {
    const [hoveredSegment, setHoveredSegment] = useState(null);
    const chartStart = CHART_START;
    const chartEnd = CHART_END;
    const totalDuration = chartEnd - chartStart;

    // Compute today's position
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const decimalYear = currentYear + (currentMonth / 12) + (currentDay / daysInMonth / 12);
    const todayPosition = ((decimalYear - chartStart) / totalDuration) * 100;

    // Group sections by chapter
    const sectionsWithChapter = sections.map(section => {
        const chapter = chapters?.find(ch => ch.sections.some(s => s.id === section.id));
        return { ...section, chapterId: chapter?.id, chapterTitle: chapter?.title };
    });

    // Group consecutive sections by chapter
    const groupedSections = [];
    let currentChapter = null;
    let currentGroup = [];

    sectionsWithChapter.forEach(section => {
        if (section.chapterId !== currentChapter) {
            if (currentGroup.length > 0) {
                groupedSections.push({ chapterId: currentChapter, chapterTitle: currentGroup[0].chapterTitle, sections: currentGroup });
            }
            currentChapter = section.chapterId;
            currentGroup = [section];
        } else {
            currentGroup.push(section);
        }
    });

    if (currentGroup.length > 0) {
        groupedSections.push({ chapterId: currentChapter, chapterTitle: currentGroup[0].chapterTitle, sections: currentGroup });
    }

    return (
        <div className="overflow-x-auto">
            <div className="inline-block min-w-full relative">
                {/* Today Line - positioned absolutely relative to entire chart */}
                <div
                    className="absolute top-0 bottom-0 w-0.5 z-20 bg-red-500 pointer-events-none"
                    style={{ left: `calc(12rem + (100% - 12rem) * ${todayPosition / 100})` }}
                >
                    <div className="absolute top-8 left-0">
                        <span className="absolute -translate-x-1/2 text-xs font-mono font-medium text-white bg-red-500 px-1.5 py-0.5 rounded-md shadow-md whitespace-nowrap">
                            {lang === 'pt' ? 'Hoje' : 'Today'}
                        </span>
                    </div>
                </div>

                {/* Year Header */}
                <div className="flex gap-0 mb-4">
                    <div className="w-48 flex-shrink-0" />
                    <div className="flex-1 flex gap-0">
                        {Array.from({ length: totalDuration }, (_, i) => chartStart + i).map((year) => (
                            <div
                                key={year}
                                className="flex-1 text-center text-xs font-semibold text-slate-600 py-2 border-l border-slate-300"
                                style={{ minWidth: `${100 / totalDuration}%` }}
                            >
                                {year}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Gantt Rows with Chapter Separators */}
                <div className="space-y-6">
                    {groupedSections.map((group, groupIdx) => (
                        <div key={groupIdx}>
                            {/* Chapter Header */}
                            <div className="mb-3 pl-48">
                                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                                    {group.chapterTitle}
                                </h3>
                            </div>

                            {/* Rows for this chapter */}
                            <div className="space-y-2">
                                {group.sections.map((section) => {
                                    const rows = section.gantt?.actualRows
                                        ? section.gantt.actualRows
                                        : section.gantt?.actual
                                            ? [{ label: null, segments: section.gantt.actual }]
                                            : [];

                                    return rows.map((row, rowIdx) => (
                                        <div key={`${section.id}-${rowIdx}`} className="flex gap-0 group">
                                            <div className="w-48 flex-shrink-0 pr-4">
                                                <p className="text-xs font-medium text-slate-600 truncate">
                                                    {row.label
                                                        ? `${section.title} — ${typeof row.label === 'string' ? row.label : row.label[lang]}`
                                                        : section.title}
                                                </p>
                                            </div>
                                            <div className="flex-1 relative h-8 bg-slate-50 rounded border border-slate-200 overflow-visible">
                                                {/* Tooltip */}
                                                {hoveredSegment?.sectionId === section.id && hoveredSegment?.rowIdx === rowIdx && hoveredSegment?.segmentIdx !== undefined && (
                                                    <div
                                                        className="absolute -top-12 left-0 z-50 pointer-events-none"
                                                        style={{
                                                            left: `${(((row.segments[hoveredSegment.segmentIdx].range.start + row.segments[hoveredSegment.segmentIdx].range.end) / 2 - chartStart) / totalDuration) * 100}%`,
                                                            transform: 'translateX(-50%)'
                                                        }}
                                                    >
                                                        <div className="bg-slate-900 text-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap text-sm font-medium">
                                                            <div>
                                                                {typeof row.segments[hoveredSegment.segmentIdx].tooltip === 'string'
                                                                    ? row.segments[hoveredSegment.segmentIdx].tooltip
                                                                    : row.segments[hoveredSegment.segmentIdx].tooltip[lang]}
                                                            </div>
                                                            <div className="text-xs opacity-90 mt-1">
                                                                {lang === 'pt'
                                                                    ? `${row.segments[hoveredSegment.segmentIdx].range.startLabelPT} – ${row.segments[hoveredSegment.segmentIdx].range.endLabelPT}`
                                                                    : `${row.segments[hoveredSegment.segmentIdx].range.startLabelEN} – ${row.segments[hoveredSegment.segmentIdx].range.endLabelEN}`}
                                                            </div>
                                                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Segments */}
                                                {row.segments.map((seg, idx) => {
                                                    const segLeft = ((seg.range.start - chartStart) / totalDuration) * 100;
                                                    const segWidth = ((seg.range.end - seg.range.start) / totalDuration) * 100;
                                                    const config = STATUS_CONFIG[seg.statusKey];
                                                    const hasLink = seg.source && seg.source !== '#';

                                                    return (
                                                        <div
                                                            key={idx}
                                                            className="absolute h-full top-0 transition-all duration-200 hover:brightness-110 hover:shadow-lg border-r border-white/20 last:border-0 cursor-pointer"
                                                            style={{
                                                                left: `${segLeft}%`,
                                                                width: `${segWidth}%`,
                                                                backgroundColor: config.hex,
                                                                opacity: hasLink ? 1 : 0.4
                                                            }}
                                                            onMouseEnter={() => setHoveredSegment({ sectionId: section.id, rowIdx, segmentIdx: idx })}
                                                            onMouseLeave={() => setHoveredSegment(null)}
                                                            onClick={() => {
                                                                if (hasLink) {
                                                                    window.open(seg.source, '_blank');
                                                                }
                                                            }}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ));
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CompleteGanttChart;
