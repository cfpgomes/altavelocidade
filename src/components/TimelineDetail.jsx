import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getContentByLang, formatDecimalDate } from '../data';
import { ChevronDown } from './Icons';
import Train from './Train';

const TimelineDetail = ({ lang }) => {
    const { sectionId } = useParams();
    const navigate = useNavigate();
    
    const t = getContentByLang(lang);
    const section = t.sections.find(s => s.id === sectionId);

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [sectionId]);
    
    if (!section) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-6">
                <div className="text-center">
                    <h1 className="text-4xl font-black text-slate-900 mb-2">404</h1>
                    <p className="text-lg text-slate-600 mb-6">{lang === 'pt' ? 'Seção não encontrada' : 'Section not found'}</p>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2 rounded-lg font-semibold transition-all"
                    >
                        {lang === 'pt' ? 'Voltar ao Início' : 'Back to Home'}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-200">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                        <button
                            onClick={() => navigate(`/#${sectionId}`)}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors flex items-center justify-center"
                            title="Voltar"
                        >
                            <ChevronDown size={20} className="rotate-90" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-black text-slate-900">{section.title}</h1>
                            <p className="text-sm text-slate-500">{lang === 'pt' ? 'Cronograma detalhado' : 'Detailed Timeline'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Timeline Content - Flex Row */}
            <div className="flex-1 flex w-full justify-center">
                {/* Track Container - Fixed width */}
                <div className="relative w-16 flex-shrink-0 overflow-hidden">
                    {/* Railway Track - Ties (underneath) */}
                    <div 
                        className="absolute left-5 top-0 bottom-0 pointer-events-none z-0"
                        style={{
                            width: '28px',
                            backgroundImage: `repeating-linear-gradient(
                                to bottom,
                                transparent 0px,
                                transparent 28px,
                                #94a3b8 28px,
                                #94a3b8 34px
                            )`,
                            backgroundSize: '100% 34px'
                        }}
                    />
                    
                    {/* Railway Track - Left Rail */}
                    <div className="absolute left-6 top-0 bottom-0 w-1 bg-slate-800 z-10" />
                    
                    {/* Railway Track - Right Rail */}
                    <div className="absolute left-10 top-0 bottom-0 w-1 bg-slate-800 z-10" />
                    
                    {/* Railway Track - Gradient Overlay */}
                    <div 
                        className="absolute left-5 top-0 bottom-0 pointer-events-none z-20"
                        style={{
                            width: '28px',
                            backgroundImage: `linear-gradient(
                                to bottom,
                                rgba(255, 255, 255, 0.8) 0%,
                                rgba(255, 255, 255, 0.4) 30%,
                                rgba(255, 255, 255, 0) 60%,
                                rgba(0, 0, 0, 0) 100%
                            )`
                        }}
                    />

                    {/* High-speed Train inside the track */}
                    <Train />
                </div>

                {/* Content Container */}
                <div className="flex-1 max-w-3xl px-6 overflow-y-auto">
                    {/* Timeline Items */}
                    <div className="space-y-8 py-12">
                        {section.timeline && section.timeline.length > 0 ? (
                            section.timeline.map((event, idx) => {
                                const dateInfo = formatDecimalDate(event.date);
                                const dateDisplay = lang === 'pt' ? dateInfo.pt : dateInfo.en;
                                
                                return (
                                    <div key={idx} className="relative">
                                        {/* Card */}
                                        <a
                                            href={event.link}
                                            target={event.link !== '#' ? '_blank' : undefined}
                                            rel={event.link !== '#' ? 'noopener noreferrer' : undefined}
                                            className={`block p-6 rounded-lg border-2 transition-all duration-200 ${
                                                event.link === '#'
                                                    ? 'bg-slate-50 border-slate-200 cursor-default'
                                                    : 'bg-white border-slate-200 hover:border-slate-900 hover:shadow-lg hover:-translate-y-1'
                                            }`}
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-2">
                                                        {dateDisplay}
                                                    </div>
                                                    <p className="text-lg font-semibold text-slate-900">
                                                        {event.label[lang]}
                                                    </p>
                                                </div>
                                                {event.link !== '#' && (
                                                    <div className="text-slate-400 group-hover:text-slate-900 transition-colors">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                        </a>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-slate-500">{lang === 'pt' ? 'Nenhum evento no cronograma' : 'No timeline events'}</p>
                            </div>
                        )}
                    </div>
                    
                    {/* Back Button */}
                    <div className="flex justify-end py-8">
                        <button
                            onClick={() => navigate(`/#${sectionId}`)}
                            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-all duration-200"
                        >
                            {lang === 'pt' ? '← Voltar ao Início' : '← Back to Home'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimelineDetail;
