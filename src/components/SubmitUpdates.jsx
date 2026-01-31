import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getContentByLang } from '../data';

const STATUS_STYLES = {
    analysis: {
        label: { pt: 'Em análise', en: 'Under analysis' },
        rowClassName: 'bg-amber-50/60'
    },
    approved: {
        label: { pt: 'Aprovado', en: 'Approved' },
        rowClassName: 'bg-emerald-50/60'
    }
};

const SubmitUpdates = ({ lang }) => {
    const [formState, setFormState] = useState({
        username: '',
        headline: '',
        section: '',
        sourceLink: ''
    });
    const [status, setStatus] = useState({ type: 'idle', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [remoteSuggestions, setRemoteSuggestions] = useState([]);
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(true);
    const [suggestionsError, setSuggestionsError] = useState('');
    const [page, setPage] = useState(1);
    const pageSize = 5;

    const content = useMemo(() => getContentByLang(lang), [lang]);

    const sectionOptions = useMemo(() => (
        content.sections.map((section) => ({ id: section.id, label: section.title }))
    ), [content.sections]);

    const sectionTitleById = useMemo(() => (
        sectionOptions.reduce((acc, section) => {
            acc[section.id] = section.label;
            return acc;
        }, {})
    ), [sectionOptions]);

    const t = useMemo(() => {
        const isPT = lang === 'pt';
        return {
            heading: isPT ? 'Submeter novidades' : 'Submit updates',
            subtitle: isPT
                ? 'Ajude a manter o tracker atualizado com sugestões, links ou correções.'
                : 'Help keep the tracker up to date with suggestions, links, or corrections.',
            tableTitle: isPT ? 'Sugestões em análise ou aprovadas' : 'Suggestions under analysis or approved',
            tableDescription: isPT
                ? 'Lista pública de novidades recebidas e o seu estado.'
                : 'Public list of received updates and their status.',
            formTitle: isPT ? 'Enviar sugestão' : 'Send a suggestion',
            formDescription: isPT
                ? 'Preencha o formulário abaixo. As sugestões são verificadas antes de serem publicadas.'
                : 'Fill out the form below. Submissions are reviewed before publishing.',
            fields: {
                username: isPT ? 'Username (opcional)' : 'Username (optional)',
                headline: isPT ? 'Cabeçalho da sugestão' : 'Suggestion headline',
                section: isPT ? 'Secção' : 'Section',
                sourceLink: isPT ? 'Link da fonte' : 'Source link'
            },
            sectionPlaceholder: isPT ? 'Escolha uma secção' : 'Choose a section',
            submit: isPT ? 'Submeter' : 'Submit',
            back: isPT ? '← Voltar ao início' : '← Back to home',
            privacy: isPT
                ? 'Os dados serão usados apenas para validar a sugestão.'
                : 'Data will only be used to validate the suggestion.'
        };
    }, [lang]);

    useEffect(() => {
        const endpoint = import.meta.env.VITE_SUGGESTIONS_ENDPOINT;
        if (!endpoint) {
            setIsLoadingSuggestions(false);
            return;
        }

        const callbackName = `loadSuggestions_${Date.now()}_${Math.random().toString(36).slice(2)}`;
        let didRespond = false;

        window[callbackName] = (data) => {
            didRespond = true;
            const items = Array.isArray(data) ? data : (data.items || []);
            setRemoteSuggestions(items);
            setIsLoadingSuggestions(false);
            delete window[callbackName];
        };

        const script = document.createElement('script');
        script.src = `${endpoint}?callback=${callbackName}`;
        script.async = true;
        script.onerror = () => {
            if (!didRespond) {
                setSuggestionsError(lang === 'pt'
                    ? 'Não foi possível carregar as sugestões.'
                    : 'Unable to load suggestions.');
                setIsLoadingSuggestions(false);
            }
        };

        document.body.appendChild(script);

        return () => {
            // Cleanup: avoid removing callback too early (StrictMode runs effects twice)
            if (!didRespond && window[callbackName]) {
                const staleCallback = window[callbackName];
                setTimeout(() => {
                    if (window[callbackName] === staleCallback) {
                        delete window[callbackName];
                    }
                }, 30000);
            } else if (window[callbackName]) {
                delete window[callbackName];
            }

            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, [lang]);

    const rows = useMemo(() => {
        const baseRows = remoteSuggestions;
        const isVisible = (value) => {
            if (value === undefined || value === null || value === '') return true;
            const normalized = String(value).toLowerCase();
            return ['visible', 'public', 'yes', '1', 'true'].includes(normalized);
        };

        return baseRows
            .filter((item) => (item.visibility !== undefined ? isVisible(item.visibility) : true))
            .map((item, index) => {
                const statusKey = (item.status || '').toString().toLowerCase() || 'analysis';
                const statusConfig = STATUS_STYLES[statusKey] || STATUS_STYLES.analysis;
                const title = item.title ? item.title[lang === 'pt' ? 'pt' : 'en'] : (item.headline || item.title || '');
                const areaKey = item.section || item.area;
                const areaLabel = sectionTitleById[areaKey]
                    || (item.area ? (item.area[lang === 'pt' ? 'pt' : 'en'] || item.area) : areaKey || '');
                const dateValue = item.date || item.submittedAt || item.timestamp || '';
                const parsedDate = dateValue ? new Date(dateValue) : null;
                const displayDate = parsedDate && !Number.isNaN(parsedDate.getTime())
                    ? parsedDate.toLocaleDateString(lang === 'pt' ? 'pt-PT' : 'en-US', { year: 'numeric', month: 'short' })
                    : (dateValue || '');

                return {
                    id: item.id || `remote-${index}`,
                    status: statusKey,
                    statusLabel: statusConfig.label[lang === 'pt' ? 'pt' : 'en'],
                    rowClassName: statusConfig.rowClassName,
                    title,
                    area: areaLabel,
                    username: item.username || '',
                    sourceLink: item.sourceLink || item.source || '#',
                    date: displayDate || item.date || ''
                };
            });
    }, [lang, remoteSuggestions, sectionTitleById]);

    const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const startIndex = (currentPage - 1) * pageSize;
    const visibleRows = rows.slice(startIndex, startIndex + pageSize);
    const emptyRows = Math.max(0, pageSize - visibleRows.length);

    useEffect(() => {
        setPage(1);
    }, [rows.length]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus({ type: 'idle', message: '' });

        const endpoint = import.meta.env.VITE_SUGGESTIONS_ENDPOINT;
        if (!endpoint) {
            setStatus({
                type: 'error',
                message: lang === 'pt'
                    ? 'Endpoint não configurado. Veja GOOGLE_SHEETS_SETUP.md para instruções.'
                    : 'Endpoint not configured. See GOOGLE_SHEETS_SETUP.md for instructions.'
            });
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(endpoint, {
                redirect: "follow",
                method: 'POST',
                body: JSON.stringify({
                    ...formState,
                    submittedAt: new Date().toISOString(),
                    source: 'lav-tracker'
                })
            });

            if (!response.ok) {
                throw new Error('Submission failed');
            }

            setFormState({
                username: '',
                headline: '',
                section: '',
                sourceLink: ''
            });
            setStatus({
                type: 'success',
                message: lang === 'pt'
                    ? 'Obrigado! A sugestão foi enviada com sucesso.'
                    : 'Thanks! Your suggestion was submitted successfully.'
            });
        } catch (error) {
            setStatus({
                type: 'error',
                message: lang === 'pt'
                    ? 'Não foi possível enviar a sugestão. Tente novamente.'
                    : 'Could not submit the suggestion. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            <div className="max-w-6xl mx-auto px-6 py-10">
                <div className="flex items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">{t.heading}</h1>
                        <p className="text-slate-600 text-lg max-w-2xl">{t.subtitle}</p>
                    </div>
                    <Link
                        to="/"
                        className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
                    >
                        {t.back}
                    </Link>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-1/2 bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-slate-900 mb-2">{t.tableTitle}</h2>
                            <p className="text-sm text-slate-500">{t.tableDescription}</p>
                            {!!suggestionsError && (
                                <p className="text-xs text-slate-400 mt-2">
                                    {suggestionsError}
                                </p>
                            )}
                        </div>

                        <div className="relative bg-slate-50/60 border border-slate-100 rounded-xl overflow-hidden">
                            {isLoadingSuggestions && (
                                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur-sm">
                                    <span className="text-xs font-semibold text-slate-500">
                                        {lang === 'pt' ? 'A carregar sugestões...' : 'Loading suggestions...'}
                                    </span>
                                </div>
                            )}
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="text-xs uppercase tracking-widest text-slate-500 border-b border-slate-200/60 bg-slate-100/70 h-12">
                                        <th className="px-3 py-3 w-3/10">{lang === 'pt' ? 'Tema' : 'Topic'}</th>
                                        <th className="px-3 py-3 w-1/4">{lang === 'pt' ? 'Área' : 'Area'}</th>
                                        <th className="px-3 py-3 w-1/5">{lang === 'pt' ? 'Utilizador' : 'Username'}</th>
                                        <th className="px-3 py-3 w-1/6">{lang === 'pt' ? 'Fonte' : 'Source'}</th>
                                        <th className="px-3 py-3 w-1/10">{lang === 'pt' ? 'Data' : 'Date'}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200/60">
                                    {visibleRows.map((row) => (
                                        <tr key={row.id} className={`text-slate-700 ${row.rowClassName} transition-colors h-16`}>
                                            <td className="px-3 py-2 font-semibold text-slate-900 whitespace-normal overflow-hidden"><div className="line-clamp-2">{row.title}</div></td>
                                            <td className="px-3 py-2 text-slate-600 whitespace-normal overflow-hidden"><div className="line-clamp-2">{row.area}</div></td>
                                            <td className="px-3 py-2 text-slate-600 whitespace-normal overflow-hidden"><div className="line-clamp-2">{row.username || (lang === 'pt' ? 'Anónimo' : 'Anonymous')}</div></td>
                                            <td className="px-3 py-2 text-slate-600 whitespace-normal overflow-hidden">
                                                <a
                                                    href={row.sourceLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-slate-600 hover:text-slate-900 underline line-clamp-2"
                                                >
                                                    {lang === 'pt' ? 'Abrir' : 'Open'}
                                                </a>
                                            </td>
                                            <td className="px-3 py-2 text-slate-600 whitespace-normal overflow-hidden"><div className="line-clamp-2">{row.date}</div></td>
                                        </tr>
                                    ))}
                                    {Array.from({ length: emptyRows }).map((_, index) => (
                                        <tr key={`empty-${index}`} className="text-slate-300 h-16">
                                            <td className="px-3 py-2">&nbsp;</td>
                                            <td className="px-3 py-2">&nbsp;</td>
                                            <td className="px-3 py-2">&nbsp;</td>
                                            <td className="px-3 py-2">&nbsp;</td>
                                            <td className="px-3 py-2">&nbsp;</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                            <div className="inline-flex items-center gap-4 rounded-full border border-slate-100 bg-slate-50/60 px-4 py-2 text-xs font-semibold text-slate-500">
                                <span className="inline-flex items-center gap-2">
                                    <span className="inline-flex h-2.5 w-2.5 rounded-full border border-amber-200 bg-amber-200/70" />
                                    {STATUS_STYLES.analysis.label[lang === 'pt' ? 'pt' : 'en']}
                                </span>
                                <span className="inline-flex items-center gap-2">
                                    <span className="inline-flex h-2.5 w-2.5 rounded-full border border-emerald-200 bg-emerald-200/70" />
                                    {STATUS_STYLES.approved.label[lang === 'pt' ? 'pt' : 'en']}
                                </span>
                            </div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-slate-100 bg-white px-2 py-1 text-xs font-semibold text-slate-500">
                                <button
                                    type="button"
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="px-2 py-1 rounded-full hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {lang === 'pt' ? 'Anterior' : 'Prev'}
                                </button>
                                <span className="px-2">
                                    {lang === 'pt' ? `Página ${currentPage} de ${totalPages}` : `Page ${currentPage} of ${totalPages}`}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="px-2 py-1 rounded-full hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {lang === 'pt' ? 'Seguinte' : 'Next'}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-slate-900 mb-2">{t.formTitle}</h2>
                            <p className="text-sm text-slate-500">{t.formDescription}</p>
                        </div>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{t.fields.headline}</label>
                                <input
                                    type="text"
                                    name="headline"
                                    value={formState.headline}
                                    onChange={handleChange}
                                    required
                                    className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{t.fields.section}</label>
                                <select
                                    name="section"
                                    value={formState.section}
                                    onChange={handleChange}
                                    required
                                    className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900"
                                >
                                    <option value="" disabled>{t.sectionPlaceholder}</option>
                                    {sectionOptions.map((section) => (
                                        <option key={section.id} value={section.id}>{section.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{t.fields.sourceLink}</label>
                                <input
                                    type="url"
                                    name="sourceLink"
                                    value={formState.sourceLink}
                                    onChange={handleChange}
                                    required
                                    className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{t.fields.username}</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formState.username}
                                    onChange={handleChange}
                                    className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900"
                                />
                            </div>

                            <p className="text-xs text-slate-400">{t.privacy}</p>

                            {status.message && (
                                <div className={`text-sm font-medium ${status.type === 'success' ? 'text-emerald-600' : 'text-rose-600'}`}>
                                    {status.message}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full md:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (lang === 'pt' ? 'A enviar...' : 'Submitting...') : t.submit}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-8 md:hidden">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
                    >
                        {t.back}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SubmitUpdates;
