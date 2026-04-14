import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Routes, Route, useLocation, Link, useNavigate } from 'react-router-dom';
import LegendItem from './components/LegendItem';
import Section from './components/Section';
import MapStation from './components/MapStation';
import TimelineDetail from './components/TimelineDetail';
import SubmitUpdates from './components/SubmitUpdates';
import CompleteGanttChart from './components/CompleteGanttChart';
import ComboiosMapView from './components/ComboiosMapView';
import { getContentByLang, STATUS_CONFIG} from './data';

import { Train, Globe, ChevronDown, Send } from './components/Icons'; // Adjusted casing to match the file name

function MainApp({ lang, setLang }) {
    const [activeSection, setActiveSection] = useState('ppp1');
    const [activeChapter, setActiveChapter] = useState('porto-lisboa');
    const [isTabMenuOpen, setIsTabMenuOpen] = useState(false);
    const [hoveredPath, setHoveredPath] = useState(null);
    const [hoveredSignal, setHoveredSignal] = useState(null);
    const scrollContainerRef = useRef(null);
    const tabMenuContainerRef = useRef(null);
    const comboiosHeaderRef = useRef(null);
    const hasScrolledToHash = useRef(false);
    const [comboiosHeaderHeight, setComboiosHeaderHeight] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();

    // Get build date - automatically injected by Vite at build time
    const buildDate = new Date(__BUILD_DATE__);
    const formattedBuildDate = buildDate.toLocaleDateString(lang === 'pt' ? 'pt-PT' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const t = getContentByLang(lang);

    const getSignalingStatusKey = () => {
        const sigSection = t.sections.find(s => s.id === 'sinalizacao-telecomunicacoes');
        if (!sigSection) return 's1';
        return sigSection.statusKey;
    };

    const getSignalingStatusColor = () => {
        const statusKey = getSignalingStatusKey();
        return STATUS_CONFIG[statusKey]?.hex || STATUS_CONFIG.s1.hex;
    };

    const getLisboaMadridSignalingStatusKey = () => {
        const sigSection = t.sections.find(s => s.id === 'lav-lisboa-madrid-sinalizacao-telecomunicacoes');
        if (!sigSection) return 's1';
        return sigSection.statusKey;
    };

    const getLisboaMadridSignalingStatusColor = () => {
        const statusKey = getLisboaMadridSignalingStatusKey();
        return STATUS_CONFIG[statusKey]?.hex || STATUS_CONFIG.s1.hex;
    };

    const isMobile = window.innerWidth < 768;

    const shouldShowLight = (lightPosition) => {
        const statusKey = getSignalingStatusKey();
        // s5 = contract, show only first light
        if (statusKey === 's5') return lightPosition === 'first';
        // s6 = construction, show only middle light
        if (statusKey === 's6') return lightPosition === 'middle';
        // s7 = finished, show only last light
        if (statusKey === 's7') return lightPosition === 'last';
        // By default (s1 and others), show all lights
        return true;
    };

    const shouldShowLisboaMadridLight = (lightPosition) => {
        const statusKey = getLisboaMadridSignalingStatusKey();
        // s5 = contract, show only first light
        if (statusKey === 's5') return lightPosition === 'first';
        // s6 = construction, show only middle light
        if (statusKey === 's6') return lightPosition === 'middle';
        // s7 = finished, show only last light
        if (statusKey === 's7') return lightPosition === 'last';
        // By default (s1 and others), show all lights
        return true;
    };

    const chapters = useMemo(() => {
        const pppSections = t.sections.filter(
            s => s.id !== 'comboios' && !s.id.includes('lav-lisboa-madrid') && !s.id.includes('lav-porto-vigo')
        );
        const portoVigoSections = t.sections.filter(s => s.id.includes('lav-porto-vigo'));
        const lisboaMadridSections = t.sections.filter(s => s.id.includes('lav-lisboa-madrid'));
        const comboiosSections = t.sections.filter(s => s.id === 'comboios');
        
        return [
            {
                id: 'porto-lisboa',
                title: lang === 'pt' ? 'LAV Porto - Lisboa' : 'LAV Porto - Lisbon',
                subtitle: t.subtitle,
                sections: pppSections
            },
            {
                id: 'lisboa-madrid',
                title: lang === 'pt' ? 'LAV Lisboa - Madrid' : 'LAV Lisbon - Madrid',
                subtitle: lang === 'pt'
                    ? 'Projetos estruturantes do corredor de Alta Velocidade Lisboa-Madrid'
                    : 'Structuring projects of the Lisbon-Madrid High-Speed corridor',
                sections: lisboaMadridSections
            },
            {
                id: 'porto-vigo',
                title: lang === 'pt' ? 'LAV Porto - Vigo' : 'LAV Porto - Vigo',
                subtitle: lang === 'pt'
                    ? 'Novo corredor internacional Porto - Vigo em duas fases de desenvolvimento.'
                    : 'New Porto - Vigo international corridor in two development phases.',
                sections: portoVigoSections
            },
            {
                id: 'comboios-portugal',
                title: lang === 'pt' ? 'Comboios de Portugal' : 'Comboios de Portugal',
                subtitle: lang === 'pt'
                    ? 'Informações sobre a aquisição de material circulante.'
                    : 'Information about rolling stock acquisition.',
                sections: comboiosSections
            }
        ];
    }, [lang, t.sections, t.subtitle]);

    const activeChapterData = useMemo(
        () => chapters.find((chapter) => chapter.id === activeChapter) || chapters[0],
        [chapters, activeChapter]
    );

    useEffect(() => {
        const handleScroll = () => {
            let currentScrollPos;
            // Determine if desktop or mobile for scroll calculation
            if (window.innerWidth >= 768) {
                if (!scrollContainerRef.current) return;
                // On desktop, scroll is inside the right div
                currentScrollPos = scrollContainerRef.current.scrollTop + (window.innerHeight / 3);
            } else {
                // On mobile, scroll is the window itself
                currentScrollPos = window.scrollY + (window.innerHeight / 3);
            }

            const chapterSectionIds = activeChapterData?.sections.map((section) => section.id) || [];

            if (chapterSectionIds.length === 0) return;

            for (const id of chapterSectionIds) {
                const el = document.getElementById(id);
                if (el) {
                    const top = el.offsetTop;
                    const bottom = top + el.offsetHeight;
                    if (top <= currentScrollPos && bottom > currentScrollPos) {
                        setActiveSection(id);
                        break;
                    }
                }
            }
        };

        const container = scrollContainerRef.current;

        // Attach to container (for desktop)
        if (container) container.addEventListener('scroll', handleScroll);
        // Attach to window (for mobile)
        window.addEventListener('scroll', handleScroll);

        return () => {
            if (container) container.removeEventListener('scroll', handleScroll);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [activeChapterData]);

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (!el) return;

        if (window.innerWidth >= 768 && scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
        } else {
            window.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
        }
    };

    const setActiveTab = (chapterId) => {
        setIsTabMenuOpen(false);
        setActiveChapter(chapterId);
        const chapter = chapters.find((item) => item.id === chapterId);
        if (!chapter || chapter.sections.length === 0) return;

        const activeInChapter = chapter.sections.some((section) => section.id === activeSection);
        const nextSectionId = activeInChapter ? activeSection : chapter.sections[0].id;
        setActiveSection(nextSectionId);
        navigate('/');

        if (window.innerWidth >= 768 && scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        if (scrollContainerRef.current) {
            const panelTop = scrollContainerRef.current.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: panelTop, behavior: 'smooth' });
        }
    };

    // Scroll to section based on URL hash when landing on main page
    useEffect(() => {
        const hash = location.hash;
        if (!hash) return;
        const id = hash.replace('#', '');
        
        // Find which chapter this section belongs to
        const sectionChapter = chapters.find(ch => 
            ch.sections.some(s => s.id === id)
        );
        
        // Set the active chapter if needed
        if (sectionChapter && activeChapter !== sectionChapter.id) {
            setActiveChapter(sectionChapter.id);
            return; // Wait for next render after chapter is set
        }

        // Don't scroll again if we already did
        if (hasScrolledToHash.current) return;

        const el = document.getElementById(id);
        if (!el) return;

        // Small delay to ensure the DOM is ready after chapter change
        setTimeout(() => {
            // Desktop: scroll the right container; Mobile: window scroll
            if (window.innerWidth >= 768 && scrollContainerRef.current) {
                scrollContainerRef.current.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
            } else {
                window.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
            }
            setActiveSection(id);
            hasScrolledToHash.current = true;
        }, 100);
    }, [activeChapter, location.hash, chapters]);

    // Reset the scroll flag when hash changes
    useEffect(() => {
        hasScrolledToHash.current = false;
    }, [location.hash]);

    useEffect(() => {
        const handleOutsideTap = (event) => {
            if (!isTabMenuOpen) return;
            if (tabMenuContainerRef.current?.contains(event.target)) return;
            setIsTabMenuOpen(false);
        };

        document.addEventListener('mousedown', handleOutsideTap);
        document.addEventListener('touchstart', handleOutsideTap);

        return () => {
            document.removeEventListener('mousedown', handleOutsideTap);
            document.removeEventListener('touchstart', handleOutsideTap);
        };
    }, [isTabMenuOpen]);

    const getPathColor = (sectionId) => {
        const isMobile = window.innerWidth < 768;
        const isFocused = activeSection === sectionId || activeSection === 'comboios';
        const isCP = activeSection === 'comboios';

        let baseColor = '#e2e8f0';

        // Mapeamento dos troços para as cores dos novos estados
        if (sectionId === 'ppp1') baseColor = STATUS_CONFIG.s5.hex; // Contrato
        if (sectionId === 'ppp2') baseColor = STATUS_CONFIG.s3.hex; // Concurso
        if (sectionId === 'ppp3') baseColor = STATUS_CONFIG.s2.hex; // DIA
        if (sectionId === 'quadruplicacao-linha-norte') baseColor = STATUS_CONFIG.s1.hex; // Estudo
        if (sectionId === 'sinalizacao-telecomunicacoes') baseColor = STATUS_CONFIG.s1.hex; // Estudo
        if (sectionId === 'lav-lisboa-madrid-terceira-travessia') baseColor = STATUS_CONFIG.s1.hex; // Estudo
        if (sectionId === 'lav-lisboa-madrid-barreiro-evora') baseColor = STATUS_CONFIG.s1.hex; // Estudo
        if (sectionId === 'lav-lisboa-madrid-duplicacao-evora-elvas') baseColor = STATUS_CONFIG.s1.hex; // Estudo
        if (sectionId === 'lav-lisboa-madrid-ligacao-transfonteiriça') baseColor = STATUS_CONFIG.s1.hex; // Estudo
        if (sectionId === 'lav-lisboa-madrid-sinalizacao-telecomunicacoes') baseColor = STATUS_CONFIG.s1.hex; // Estudo
        if (sectionId === 'lav-porto-vigo-fase-1') baseColor = STATUS_CONFIG.s1.hex; // Estudo
        if (sectionId === 'lav-porto-vigo-fase-2') baseColor = STATUS_CONFIG.s1.hex; // Estudo

        // On mobile, show all sections as active (full color)
        if (isMobile) return baseColor;
        if (activeSection === sectionId) return baseColor;
        return isCP ? baseColor : baseColor + '60';
    };

    const getStrokeWidth = (sectionId) => {
        const isMobile = window.innerWidth < 768;
        // On mobile, show all sections with full width
        if (isMobile) return 14;
        return activeSection === sectionId ? 14 : 7;
    };

    const goToSectionFromMap = (sectionId) => {
        const sectionChapter = chapters.find(chapter =>
            chapter.sections.some(section => section.id === sectionId)
        );

        if (sectionChapter) {
            setActiveChapter(sectionChapter.id);
        }

        setActiveSection(sectionId);
        navigate(`/#${sectionId}`);

        setTimeout(() => {
            scrollToSection(sectionId);
        }, 100);
    };

    const getInteractivePathStrokeWidth = (sectionId) => {
        const isMobile = window.innerWidth < 768;
        const baseWidth = sectionId === 'quadruplicacao-linha-norte'
            ? (isMobile ? 8 : (activeSection === 'quadruplicacao-linha-norte' ? 8 : 4))
            : getStrokeWidth(sectionId);

        if (hoveredPath === sectionId) {
            return Math.max(baseWidth, isMobile ? 14 : 10);
        }

        return baseWidth;
    };

    const getInteractivePathClassName = (sectionId) => (
        `transition-all duration-700 cursor-pointer ${hoveredPath === sectionId ? 'brightness-110' : 'hover:brightness-110'}`
    );

    const isComboiosMapView = activeChapter === 'comboios-portugal' || activeSection === 'comboios';

    useEffect(() => {
        if (!isComboiosMapView) return;

        const updateHeaderHeight = () => {
            const headerEl = comboiosHeaderRef.current;
            if (!headerEl) {
                setComboiosHeaderHeight(0);
                return;
            }

            // Reserve from the top of the map container down to the bottom of the title block.
            setComboiosHeaderHeight(headerEl.offsetTop + headerEl.offsetHeight);
        };

        updateHeaderHeight();

        if (typeof ResizeObserver === 'undefined') {
            window.addEventListener('resize', updateHeaderHeight);
            return () => window.removeEventListener('resize', updateHeaderHeight);
        }

        const observer = new ResizeObserver(updateHeaderHeight);

        if (comboiosHeaderRef.current) {
            observer.observe(comboiosHeaderRef.current);
        }

        window.addEventListener('resize', updateHeaderHeight);

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', updateHeaderHeight);
        };
    }, [isComboiosMapView]);

    return (
        <div className="flex flex-col md:flex-row min-h-screen md:h-screen bg-slate-50 font-sans md:overflow-hidden">

            {/* LEFT: Map Area (Static on Desktop, Top Scroll on Mobile) */}
            <div className="w-full md:w-1/2 md:h-full bg-slate-100 relative border-r border-slate-200 shadow-xl z-10 flex flex-col transition-colors duration-700">
                
                {/* Map Container */}
                <div className="h-[80vh] md:h-full relative flex items-center justify-center pt-24 md:pt-6 px-1 md:px-6 py-6">
                    <div ref={comboiosHeaderRef} className="absolute top-6 left-6 pr-6 z-20">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="bg-slate-900 text-white p-1.5 rounded">
                                <Train size={16} />
                            </div>
                            <span className="text-xs font-bold text-slate-500 tracking-widest">LAV TRACKER</span>
                        </div>
                        <h1 className="text-2xl font-black text-slate-900 leading-tight">{t.title}</h1>
                        <p className="text-sm text-slate-600 font-medium">{t.subtitle}</p>
                    </div>

                    <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
                        <Link
                            to="/submit"
                            className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm flex items-center gap-2"
                        >
                            <Send size={14} />
                            {lang === 'pt' ? 'Submeter Novidades' : 'Submit Updates'}
                        </Link>
                        <button
                            onClick={() => setLang(l => l === 'pt' ? 'en' : 'pt')}
                            className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                        >
                            <Globe size={14} />
                            {lang === 'pt' ? 'EN' : 'PT'}
                        </button>
                    </div>

                    {/* Legend - Desktop only (absolute positioned) */}
                    {!isComboiosMapView && (
                        <div className="hidden md:block absolute bottom-6 left-6 z-20 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-200/50 max-w-[200px]">
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 border-b pb-1">{t.legendTitle}</h4>
                            <div className="space-y-1.5">
                                <LegendItem statusKey="s1" texts={{ lang }} />
                                <LegendItem statusKey="s2" texts={{ lang }} />
                                <LegendItem statusKey="s3" texts={{ lang }} />
                                <LegendItem statusKey="s4" texts={{ lang }} />
                                <LegendItem statusKey="s5" texts={{ lang }} />
                                <LegendItem statusKey="s6" texts={{ lang }} />
                                <LegendItem statusKey="s7" texts={{ lang }} />
                            </div>
                        </div>
                    )}

                    <div
                        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out ${
                            isComboiosMapView ? 'opacity-0 pointer-events-none' : 'opacity-100'
                        }`}
                    >
                        <svg viewBox="-100 200 1100 1950" className="h-full w-full max-w-none md:max-w-lg drop-shadow-2xl">
                    <defs>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    <polygon
                        points="498.85500,1957.2700 500.75100,1952.9400 497.19000,1940.2600 498.53100,1925.3700 497.32300,1910.9500 495.04000,1898.0500 494.02700,1884.9000 483.99700,1873.3700 481.33400,1865.8500 490.45200,1849.6000 501.05800,1834.4000 503.70600,1819.2900 512.80900,1803.0400 525.86000,1794.0500 537.41500,1784.0300 545.21100,1768.0100 553.25000,1753.2800 553.18500,1745.3000 558.49600,1737.7000 573.15100,1737.7700 585.52100,1724.9300 600.86200,1728.8700 614.13100,1721.1900 618.29800,1707.1400 627.62600,1692.1600 631.35500,1675.5400 619.26500,1675.0200 605.75000,1681.3900 592.17600,1679.8200 587.74600,1669.9300 584.18800,1657.2700 573.69700,1643.1300 567.52800,1630.9400 558.78800,1619.1700 555.06400,1613.1800 544.80500,1600.3500 548.59700,1591.6900 545.10000,1586.9800 550.19700,1578.0900 555.41200,1562.5300 564.75800,1547.5600 561.16700,1534.8800 560.70900,1532.3000 563.37300,1517.1900 575.35100,1509.7400 583.48700,1502.9700 595.00400,1492.9300 606.78700,1484.2000 617.85000,1471.6000 619.91100,1460.6000 629.23900,1445.6200 639.84700,1430.4300 635.28500,1427.2200 634.06500,1412.8100 619.70500,1399.3800 617.35200,1401.1300 603.38200,1404.9300 591.07700,1380.4700 575.64000,1368.5600 576.99800,1353.6700 578.06400,1352.1800 569.11000,1339.1200 562.70800,1325.6100 562.48000,1324.3200 567.77700,1294.0900 561.92900,1291.1300 546.97900,1281.8000 538.22400,1270.0400 529.25600,1256.9800 519.22600,1245.4500 515.20600,1230.1800 526.20600,1232.2500 543.29500,1238.5400 556.65700,1238.8200 569.56400,1236.5300 583.99100,1235.3100 597.60000,1236.8900 610.72100,1235.9000 624.55900,1238.7900 633.34900,1235.8900 641.40700,1221.1600 645.34600,1205.8200 644.33300,1192.6700 645.41200,1191.1700 655.03400,1185.4500 662.84600,1169.4300 668.09100,1153.8500 672.24500,1139.8100 671.94900,1130.5400 664.49700,1118.5300 658.09500,1105.0200 643.60600,1098.2800 642.36700,1083.8600 646.32400,1068.5300 659.83500,1062.1300 665.21000,1062.5100 679.18100,1058.7000 686.17300,1045.4800 698.54300,1032.6400 688.50800,1021.0900 684.69200,1007.1400 692.73500,992.42100 696.67400,977.07900 690.28700,963.56600 692.64900,961.78000 693.47100,958.99400 698.47200,942.13300 697.24800,927.70600 693.67200,915.02700 697.84000,900.97700 701.55000,884.34600 700.63600,879.18300 691.89600,867.41800 686.80000,853.67700 679.35200,841.68400 677.83200,840.62200 674.11000,834.64100 676.23200,831.58600 686.78600,831.04900 701.21600,829.84000 702.50700,829.61100 713.12500,814.40300 717.29300,800.35300 728.59700,789.01100 740.51600,773.62500 753.42300,771.33900 767.16100,766.22800 780.21900,757.27400 781.27800,755.74000 793.04200,747.00000 802.37000,732.01600 817.02900,732.10300 822.48700,717.82400 829.00800,702.02500 835.60900,694.20100 846.23100,679.00700 840.30100,668.07600 828.75500,655.49300 813.78700,646.14700 798.67400,643.49900 783.41400,647.53300 768.67800,639.49200 767.68300,626.35600 766.99900,622.49900 773.52100,606.70100 777.46000,591.36100 767.19800,578.51900 772.65600,564.23900 757.77300,562.88200 743.34600,564.10600 729.75200,562.51900 714.18500,557.30400 699.98700,559.81900 685.10100,558.44700 677.04700,550.55400 668.92700,557.31700 639.91200,543.81900 631.87100,558.55400 625.35100,574.35300 615.26800,577.47000 603.03100,583.63100 589.45300,582.04100 576.85600,593.59100 574.17800,586.07800 562.87300,574.76800 551.32200,584.80100 535.39100,584.96000 532.87600,570.76200 518.12700,562.74000 503.69800,563.94900 490.80500,566.23200 476.15000,566.16500 472.55800,553.48900 463.22800,568.45400 449.71800,574.85600 437.74000,582.30100 428.91600,585.17900 413.80300,582.53100 410.83200,565.75100 405.44000,565.37500 404.06800,557.63000 411.87600,541.58400 422.74600,527.69900 434.26600,517.67200 427.87900,504.15900 414.13800,509.25400 412.91400,494.82800 411.93400,481.68900 406.16600,486.70400 393.47200,490.28400 380.64500,500.54300 367.28100,500.24800 353.70300,498.65800 339.04800,498.59200 325.53900,504.99400 312.61500,507.28200 311.56600,508.78300 300.70000,522.68800 287.87400,532.94800 276.34100,542.99300 264.57300,551.71700 255.24300,566.68200 255.17600,581.33700 253.83400,596.21900 259.98000,608.45900 264.91100,606.23800 267.49200,605.78100 281.08500,607.36700 279.79400,607.59500 266.67400,608.58800 261.51100,609.50300 262.88300,617.24700 264.09200,631.67600 268.20600,654.90900 268.05800,661.59200 269.28200,676.01800 267.23800,687.03100 268.46200,701.45700 273.33000,713.90800 274.24600,719.08500 275.47000,733.51200 276.46300,746.63300 278.97300,760.81100 280.26500,760.58200 293.10900,772.97300 285.90500,784.91300 286.89700,798.03400 289.41200,812.23200 288.80700,816.33300 284.63800,830.38400 281.99400,845.51100 276.54700,859.77200 273.88400,874.88800 267.15000,889.39300 261.69100,903.67100 261.60900,918.33000 268.13000,902.53100 271.02200,888.70700 279.06200,873.97000 284.27700,858.40300 289.37300,872.14500 277.83700,882.17400 277.54100,895.54000 282.41100,908.00500 271.78700,923.18300 267.00100,918.70500 255.23800,927.46100 251.29900,942.80200 247.14500,956.83500 245.46200,962.45700 240.23200,978.02700 231.06300,1008.9400 225.60400,1023.2200 219.08400,1039.0100 211.04600,1053.7700 221.30500,1066.5900 219.86400,1073.4900 217.38100,1081.9300 210.86100,1097.7300 205.15600,1110.7000 202.19800,1116.5500 196.75500,1130.8300 191.28100,1145.1100 184.53200,1159.6200 175.44100,1175.8500 168.92000,1191.6500 163.46500,1205.9500 157.99100,1220.2300 154.06700,1235.5700 143.43400,1250.7800 131.44000,1258.2300 120.81700,1273.4100 128.26500,1285.4000 112.69600,1280.1700 99.179500,1286.5400 88.104500,1299.1700 91.925700,1313.1400 91.076400,1315.9500 90.781100,1329.3100 84.259700,1345.1100 74.925900,1360.0600 67.114600,1376.0800 65.531800,1389.7000 66.755500,1404.1200 64.107300,1419.2400 58.876900,1434.8100 49.546600,1449.7700 43.040600,1465.5700 46.831000,1479.5400 55.588500,1491.3100 69.164000,1492.8900 84.276300,1495.5400 97.183200,1493.2500 112.06800,1494.6100 123.47100,1491.2600 135.84000,1478.4200 137.41100,1464.8300 144.15700,1450.3000 156.75800,1438.7700 164.79900,1424.0300 163.13200,1429.6500 164.12900,1442.8100 169.24100,1456.5400 173.40400,1465.1100 174.62900,1479.5400 161.95000,1483.1100 148.43900,1489.5100 163.40100,1498.8300 150.57500,1509.0900 136.75300,1506.2100 141.62100,1518.6600 127.58500,1514.4900 119.89300,1501.2100 111.92000,1501.2900 97.492700,1502.5100 101.06900,1515.1900 106.18000,1528.9300 108.69500,1543.1300 108.38500,1556.5000 101.63500,1571.0100 117.20500,1576.2400 131.62800,1574.9900 145.61700,1571.2000 158.90100,1563.5300 170.65300,1554.8000 185.76300,1557.4400 198.61800,1569.8000 204.06100,1555.5300 214.91300,1541.6400 216.44500,1542.6800 213.55400,1556.5100 214.54500,1569.6200 219.64100,1583.3700 235.67200,1591.2000 220.33000,1587.2600 206.29500,1583.0900 192.09700,1585.6000 184.42000,1572.3200 174.37300,1560.7900 182.05100,1574.0700 190.79100,1585.8300 194.61200,1599.8000 197.12600,1614.0000 197.04400,1628.6600 196.76300,1642.0200 197.68100,1647.2000 193.72400,1662.5300 189.78500,1677.8700 183.26300,1693.6600 175.45200,1709.6900 171.28500,1723.7400 172.81900,1724.8000 185.64400,1737.1700 185.57700,1751.8300 185.28200,1765.1900 184.22000,1766.7100 178.99000,1782.2800 190.31000,1793.5900 181.81400,1805.7400 176.35600,1820.0200 176.28800,1834.6800 178.80300,1848.8800 177.44500,1863.7600 174.79600,1878.8700 173.73100,1880.3700 166.98500,1894.9000 157.88300,1911.1600 156.31200,1924.7500 150.83800,1939.0300 141.73600,1955.2800 136.50500,1970.8500 127.40400,1987.1100 124.52700,2000.9300 138.13500,2002.5100 150.34200,1996.3600 164.08300,1991.2600 177.21900,1990.2700 191.41700,1987.7500 203.41000,1980.3000 217.85100,1979.0800 231.59600,1974.0000 232.64000,1972.4600 236.74300,1973.0800 234.16100,1973.5400 236.21600,1985.1400 250.49500,1990.6000 264.92200,1989.3800 278.53100,1990.9600 293.02300,1997.7100 307.22100,1995.2000 322.33300,1997.8500 336.85600,2004.5900 352.26600,2016.5200 366.53800,2021.9500 380.13500,2023.5500 394.33300,2021.0400 407.01200,2017.4600 409.21700,2022.4000 420.98100,2013.6600 434.49400,2007.2700 447.54500,1998.2800 460.37500,1988.0400 473.05100,1984.4500 486.79500,1979.3700 500.30800,1972.9800 499.85100,1970.4000 498.85500,1957.2700 "
                        fill="#ffffff"
                        stroke="#cbd5e1"
                        strokeWidth="2"
                    />

                    {/* Gray dashed reference subpaths (under all route paths/text) */}
                    <path
                        d="M 315,765 L 320,685"
                        fill="none"
                        stroke="#94a3b8"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeDasharray="8 8"
                        opacity="0.8"
                        pointerEvents="none"
                    />

                    <path
                        d="M 320,685 L 345,665"
                        fill="none"
                        stroke="#94a3b8"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeDasharray="8 8"
                        opacity="0.8"
                        pointerEvents="none"
                    />

                    {/* Invisible full-width hitboxes to make route hover/click easier */}
                    <rect
                        x={-100}
                        y={765}
                        width={1100}
                        height={180}
                        fill="rgba(0,0,0,0)"
                        pointerEvents="all"
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredPath('ppp1')}
                        onMouseLeave={() => setHoveredPath(null)}
                        onClick={() => goToSectionFromMap('ppp1')}
                    />

                    <rect
                        x={-100}
                        y={945}
                        width={1100}
                        height={130}
                        fill="rgba(0,0,0,0)"
                        pointerEvents="all"
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredPath('ppp2')}
                        onMouseLeave={() => setHoveredPath(null)}
                        onClick={() => goToSectionFromMap('ppp2')}
                    />

                    <rect
                        x={-100}
                        y={1075}
                        width={1100}
                        height={355}
                        fill="rgba(0,0,0,0)"
                        pointerEvents="all"
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredPath('ppp3')}
                        onMouseLeave={() => setHoveredPath(null)}
                        onClick={() => goToSectionFromMap('ppp3')}
                    />

                    <rect
                        x={-100}
                        y={1430}
                        width={1100}
                        height={40}
                        fill="rgba(0,0,0,0)"
                        pointerEvents="all"
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredPath('quadruplicacao-linha-norte')}
                        onMouseLeave={() => setHoveredPath(null)}
                        onClick={() => goToSectionFromMap('quadruplicacao-linha-norte')}
                    />

                    <rect
                        x={-100}
                        y={745}
                        width={1100}
                        height={20}
                        fill="rgba(0,0,0,0)"
                        pointerEvents="all"
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredPath('lav-porto-vigo-fase-1')}
                        onMouseLeave={() => setHoveredPath(null)}
                        onClick={() => goToSectionFromMap('lav-porto-vigo-fase-1')}
                    />

                    <rect
                        x={-100}
                        y={515}
                        width={1100}
                        height={150}
                        fill="rgba(0,0,0,0)"
                        pointerEvents="all"
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredPath('lav-porto-vigo-fase-1')}
                        onMouseLeave={() => setHoveredPath(null)}
                        onClick={() => goToSectionFromMap('lav-porto-vigo-fase-1')}
                    />

                    <rect
                        x={-100}
                        y={685}
                        width={1100}
                        height={60}
                        fill="rgba(0,0,0,0)"
                        pointerEvents="all"
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredPath('lav-porto-vigo-fase-2')}
                        onMouseLeave={() => setHoveredPath(null)}
                        onClick={() => goToSectionFromMap('lav-porto-vigo-fase-2')}
                    />

                    <rect
                        x={135}
                        y={1470}
                        width={15}
                        height={20}
                        fill="rgba(0,0,0,0)"
                        pointerEvents="all"
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredPath('lav-lisboa-madrid-terceira-travessia')}
                        onMouseLeave={() => setHoveredPath(null)}
                        onClick={() => goToSectionFromMap('lav-lisboa-madrid-terceira-travessia')}
                    />

                    <rect
                        x={150}
                        y={1490}
                        width={250}
                        height={60}
                        fill="rgba(0,0,0,0)"
                        pointerEvents="all"
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredPath('lav-lisboa-madrid-barreiro-evora')}
                        onMouseLeave={() => setHoveredPath(null)}
                        onClick={() => goToSectionFromMap('lav-lisboa-madrid-barreiro-evora')}
                    />

                    <rect
                        x={400}
                        y={1472}
                        width={200}
                        height={78}
                        fill="rgba(0,0,0,0)"
                        pointerEvents="all"
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredPath('lav-lisboa-madrid-duplicacao-evora-elvas')}
                        onMouseLeave={() => setHoveredPath(null)}
                        onClick={() => goToSectionFromMap('lav-lisboa-madrid-duplicacao-evora-elvas')}
                    />

                    <rect
                        x={600}
                        y={1472}
                        width={20}
                        height={1}
                        fill="rgba(0,0,0,0)"
                        pointerEvents="all"
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredPath('lav-lisboa-madrid-ligacao-transfonteiriça')}
                        onMouseLeave={() => setHoveredPath(null)}
                        onClick={() => goToSectionFromMap('lav-lisboa-madrid-ligacao-transfonteiriça')}
                    />

                    <path
                        d="M 315,765 L 310,785 L 275,920 L 290, 945"
                        fill="none"
                        stroke={getPathColor('ppp1')}
                        strokeWidth={getInteractivePathStrokeWidth('ppp1')}
                        strokeLinecap="round"
                        className={getInteractivePathClassName('ppp1')}
                        onMouseEnter={() => setHoveredPath('ppp1')}
                        onMouseLeave={() => setHoveredPath(null)}
                        onClick={() => goToSectionFromMap('ppp1')}
                    />

                    <path
                        d="M 290,945 L 315,1055 L 310,1075"
                        fill="none"
                        stroke={getPathColor('ppp2')}
                        strokeWidth={getInteractivePathStrokeWidth('ppp2')}
                        strokeLinecap="round"
                        className={getInteractivePathClassName('ppp2')}
                        onMouseEnter={() => setHoveredPath('ppp2')}
                        onMouseLeave={() => setHoveredPath(null)}
                        onClick={() => goToSectionFromMap('ppp2')}
                    />

                    <path
                        d="M 310,1075 L 280,1200 L 155,1430"
                        fill="none"
                        stroke={getPathColor('ppp3')}
                        strokeWidth={getInteractivePathStrokeWidth('ppp3')}
                        strokeLinecap="round"
                        className={getInteractivePathClassName('ppp3')}
                        onMouseEnter={() => setHoveredPath('ppp3')}
                        onMouseLeave={() => setHoveredPath(null)}
                        onClick={() => goToSectionFromMap('ppp3')}
                    />

                    <path
                        d="M 155,1430 L 135,1470"
                        fill="none"
                        stroke={getPathColor('quadruplicacao-linha-norte')}
                        strokeWidth={getInteractivePathStrokeWidth('quadruplicacao-linha-norte')}
                        strokeLinecap="round"
                        strokeDasharray="6 6"
                        className={getInteractivePathClassName('quadruplicacao-linha-norte')}
                        onMouseEnter={() => setHoveredPath('quadruplicacao-linha-norte')}
                        onMouseLeave={() => setHoveredPath(null)}
                        onClick={() => goToSectionFromMap('quadruplicacao-linha-norte')}
                    />

                    {/* LAV Porto-Vigo Paths */}
                    <path
                        d="M 315,765 L 295,745 M 345,665 L 320,595 L 310,515"
                        fill="none"
                        stroke={getPathColor('lav-porto-vigo-fase-1')}
                        strokeWidth={getInteractivePathStrokeWidth('lav-porto-vigo-fase-1')}
                        strokeLinecap="round"
                        className={getInteractivePathClassName('lav-porto-vigo-fase-1')}
                        onMouseEnter={() => setHoveredPath('lav-porto-vigo-fase-1')}
                        onMouseLeave={() => setHoveredPath(null)}
                        onClick={() => goToSectionFromMap('lav-porto-vigo-fase-1')}
                    />

                    <path
                        d="M 295,745 L 320,685"
                        fill="none"
                        stroke={getPathColor('lav-porto-vigo-fase-2')}
                        strokeWidth={getInteractivePathStrokeWidth('lav-porto-vigo-fase-2')}
                        strokeLinecap="round"
                        className={getInteractivePathClassName('lav-porto-vigo-fase-2')}
                        onMouseEnter={() => setHoveredPath('lav-porto-vigo-fase-2')}
                        onMouseLeave={() => setHoveredPath(null)}
                        onClick={() => goToSectionFromMap('lav-porto-vigo-fase-2')}
                    />

                    {/* LAV Lisboa-Madrid Paths */}
                    
                    <path
                        d="M 135,1470 L 150,1490"
                        fill="none"
                        stroke={getPathColor('lav-lisboa-madrid-terceira-travessia')}
                        strokeWidth={getInteractivePathStrokeWidth('lav-lisboa-madrid-terceira-travessia')}
                        strokeLinecap="round"
                        className={getInteractivePathClassName('lav-lisboa-madrid-terceira-travessia')}
                        onMouseEnter={() => setHoveredPath('lav-lisboa-madrid-terceira-travessia')}
                        onMouseLeave={() => setHoveredPath(null)}
                        onClick={() => goToSectionFromMap('lav-lisboa-madrid-terceira-travessia')}
                    />

                    <path
                        d="M 150,1490 L 220,1490 L 280,1510 L 340,1530 L 400,1550"
                        fill="none"
                        stroke={getPathColor('lav-lisboa-madrid-barreiro-evora')}
                        strokeWidth={getInteractivePathStrokeWidth('lav-lisboa-madrid-barreiro-evora')}
                        strokeLinecap="round"
                        className={getInteractivePathClassName('lav-lisboa-madrid-barreiro-evora')}
                        onMouseEnter={() => setHoveredPath('lav-lisboa-madrid-barreiro-evora')}
                        onMouseLeave={() => setHoveredPath(null)}
                        onClick={() => goToSectionFromMap('lav-lisboa-madrid-barreiro-evora')}
                    />

                    <path
                        d="M 400,1550 L 500,1520 L 600,1472"
                        fill="none"
                        stroke={getPathColor('lav-lisboa-madrid-duplicacao-evora-elvas')}
                        strokeWidth={getInteractivePathStrokeWidth('lav-lisboa-madrid-duplicacao-evora-elvas')}
                        strokeLinecap="round"
                        className={getInteractivePathClassName('lav-lisboa-madrid-duplicacao-evora-elvas')}
                        onMouseEnter={() => setHoveredPath('lav-lisboa-madrid-duplicacao-evora-elvas')}
                        onMouseLeave={() => setHoveredPath(null)}
                        onClick={() => goToSectionFromMap('lav-lisboa-madrid-duplicacao-evora-elvas')}
                    />

                    <path
                        d="M 600,1472 L 620,1472"
                        fill="none"
                        stroke={getPathColor('lav-lisboa-madrid-ligacao-transfonteiriça')}
                        strokeWidth={getInteractivePathStrokeWidth('lav-lisboa-madrid-ligacao-transfonteiriça')}
                        strokeLinecap="round"
                        className={getInteractivePathClassName('lav-lisboa-madrid-ligacao-transfonteiriça')}
                        onMouseEnter={() => setHoveredPath('lav-lisboa-madrid-ligacao-transfonteiriça')}
                        onMouseLeave={() => setHoveredPath(null)}
                        onClick={() => goToSectionFromMap('lav-lisboa-madrid-ligacao-transfonteiriça')}
                    />

                    {/* Central Status Traffic Light */}
                    <g
                        className={`transition-all duration-500 cursor-pointer ${isMobile || activeSection === 'sinalizacao-telecomunicacoes' || activeSection === 'comboios' || hoveredSignal === 'sinalizacao-telecomunicacoes' ? 'opacity-100' : 'opacity-30'}`}
                        onMouseEnter={() => setHoveredSignal('sinalizacao-telecomunicacoes')}
                        onMouseLeave={() => setHoveredSignal(null)}
                        onClick={() => goToSectionFromMap('sinalizacao-telecomunicacoes')}
                    >
                        {/* Pole */}
                        <rect x={236} y={1050} width="20" height="80" fill="#2c3e50" stroke="#1a252f" strokeWidth="1" rx="2" />
                        
                        {/* Top light (First/Contract) */}
                        <circle cx={246} cy={1065} r="8" fill="#ddd" stroke="#999" strokeWidth="1" />
                        {shouldShowLight('first') && <circle cx={246} cy={1065} r="6" fill={getSignalingStatusColor()} filter="url(#glow)" />}
                        
                        {/* Middle light (Construction) */}
                        <circle cx={246} cy={1090} r="8" fill="#ddd" stroke="#999" strokeWidth="1" />
                        {shouldShowLight('middle') && <circle cx={246} cy={1090} r="6" fill={getSignalingStatusColor()} filter="url(#glow)" />}
                        
                        {/* Bottom light (Finished) */}
                        <circle cx={246} cy={1115} r="8" fill="#ddd" stroke="#999" strokeWidth="1" />
                        {shouldShowLight('last') && <circle cx={246} cy={1115} r="6" fill={getSignalingStatusColor()} filter="url(#glow)" />}
                    </g>

                    {/* Lisboa-Madrid Status Traffic Light */}
                    <g
                        className={`transition-all duration-500 cursor-pointer ${isMobile || activeSection === 'lav-lisboa-madrid-sinalizacao-telecomunicacoes' || activeSection === 'comboios' || hoveredSignal === 'lav-lisboa-madrid-sinalizacao-telecomunicacoes' ? 'opacity-100' : 'opacity-30'}`}
                        onMouseEnter={() => setHoveredSignal('lav-lisboa-madrid-sinalizacao-telecomunicacoes')}
                        onMouseLeave={() => setHoveredSignal(null)}
                        onClick={() => goToSectionFromMap('lav-lisboa-madrid-sinalizacao-telecomunicacoes')}
                    >
                        {/* Pole */}
                        <rect x={240} y={1520} width="20" height="80" fill="#2c3e50" stroke="#1a252f" strokeWidth="1" rx="2" />
                        
                        {/* Top light (First/Contract) */}
                        <circle cx={250} cy={1535} r="8" fill="#ddd" stroke="#999" strokeWidth="1" />
                        {shouldShowLisboaMadridLight('first') && <circle cx={250} cy={1535} r="6" fill={getLisboaMadridSignalingStatusColor()} filter="url(#glow)" />}
                        
                        {/* Middle light (Construction) */}
                        <circle cx={250} cy={1560} r="8" fill="#ddd" stroke="#999" strokeWidth="1" />
                        {shouldShowLisboaMadridLight('middle') && <circle cx={250} cy={1560} r="6" fill={getLisboaMadridSignalingStatusColor()} filter="url(#glow)" />}
                        
                        {/* Bottom light (Finished) */}
                        <circle cx={250} cy={1585} r="8" fill="#ddd" stroke="#999" strokeWidth="1" />
                        {shouldShowLisboaMadridLight('last') && <circle cx={250} cy={1585} r="6" fill={getLisboaMadridSignalingStatusColor()} filter="url(#glow)" />}
                    </g>

                    {/* Stations layer kept last so dots/labels stay above all paths and symbols */}
                    <g>
                        <MapStation cx={315} cy={765} label="Campanhã" isActive={window.innerWidth < 768 || activeSection === 'ppp1'} />
                        <MapStation cx={310} cy={785} label="Santo Ovídio" isActive={window.innerWidth < 768 || activeSection === 'ppp1'} />
                        <MapStation cx={275} cy={920} label="Aveiro" isActive={window.innerWidth < 768 || activeSection === 'ppp1'} />
                        <MapStation cx={315} cy={1055} label="Coimbra-B" isActive={window.innerWidth < 768 || activeSection === 'ppp2'} />
                        <MapStation cx={280} cy={1200} label="Leiria" isActive={window.innerWidth < 768 || activeSection === 'ppp3'} />
                        <MapStation cx={135} cy={1470} label="Lisboa-Oriente" isActive={window.innerWidth < 768 || activeSection === 'quadruplicacao-linha-norte' || activeSection === 'lav-lisboa-madrid-terceira-travessia'}  labelOffsetY={-6} />

                        {/* LAV Porto-Vigo Stations */}
                        <MapStation cx={295} cy={745} label="Aeroporto Francisco Sá Carneiro" isActive={window.innerWidth < 768 || activeSection === 'lav-porto-vigo-fase-1' || activeSection === 'lav-porto-vigo-fase-2'} labelOffsetY={-8} />
                        <MapStation cx={320} cy={685} label="Nine" isActive={window.innerWidth < 768 || activeSection === 'lav-porto-vigo-fase-2'} labelOffsetY={8} />
                        <MapStation cx={345} cy={665} label="Braga" isActive={window.innerWidth < 768 || activeSection === 'lav-porto-vigo-fase-1'} labelOffsetY={-8} />
                        <MapStation cx={320} cy={595} label="Ponte de Lima" isActive={window.innerWidth < 768 || activeSection === 'lav-porto-vigo-fase-1'} labelOffsetY={-6} />
                        <MapStation cx={310} cy={515} label="Valença" isActive={window.innerWidth < 768 || activeSection === 'lav-porto-vigo-fase-1'} labelOffsetY={-6} />

                        {/* LAV Lisboa-Madrid Stations */}
                        <MapStation cx={220} cy={1490} label="Aeroporto Luís de Camões" isActive={window.innerWidth < 768 || activeSection === 'lav-lisboa-madrid-barreiro-evora'} labelOffsetY={-6} />
                        <MapStation cx={400} cy={1550} label="Évora" isActive={window.innerWidth < 768 || activeSection === 'lav-lisboa-madrid-barreiro-evora' || activeSection === 'lav-lisboa-madrid-duplicacao-evora-elvas'} labelOffsetY={10} />
                        <MapStation cx={600} cy={1472} label="Elvas-Caia" isActive={window.innerWidth < 768 || activeSection === 'lav-lisboa-madrid-duplicacao-evora-elvas' || activeSection === 'lav-lisboa-madrid-ligacao-transfonteiriça'} labelOffsetY={14} />
                    </g>
                        </svg>
                    </div>

                    <div
                        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out ${
                            isComboiosMapView ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                    >
                        <ComboiosMapView lang={lang} topReserve={comboiosHeaderHeight} />
                    </div>

                    {!isComboiosMapView && (
                        <div className="md:hidden absolute bottom-4 right-4 animate-bounce text-slate-400 bg-white p-2 rounded-full shadow">
                            <ChevronDown size={20} />
                        </div>
                    )}
                </div>

                {/* Legend - Mobile only (below map) */}
                {!isComboiosMapView && (
                    <div className="md:hidden bg-white/90 backdrop-blur-sm p-4 mx-4 mb-4 rounded-xl shadow-lg border border-slate-200/50">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 border-b pb-1">{t.legendTitle}</h4>
                        <div className="space-y-1.5">
                            <LegendItem statusKey="s1" texts={{ lang }} />
                            <LegendItem statusKey="s2" texts={{ lang }} />
                            <LegendItem statusKey="s3" texts={{ lang }} />
                            <LegendItem statusKey="s4" texts={{ lang }} />
                            <LegendItem statusKey="s5" texts={{ lang }} />
                            <LegendItem statusKey="s6" texts={{ lang }} />
                            <LegendItem statusKey="s7" texts={{ lang }} />
                        </div>
                    </div>
                )}
            </div>

            {/* RIGHT: Scrollable Content Area */}
            <div
                ref={scrollContainerRef}
                className="w-full md:w-1/2 h-full md:overflow-y-auto scroll-smooth bg-white scroller"
            >
                <div className="hidden md:block h-8 bg-white"></div>

                <div className="px-4 md:px-6 pb-10">
                    <div className="sticky top-0 z-[5] md:z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200 pt-4 pb-3 relative">
                        <div ref={tabMenuContainerRef} className="2xl:hidden">
                            <button
                                type="button"
                                onClick={() => setIsTabMenuOpen((prev) => !prev)}
                                className="w-full flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left shadow-sm"
                            >
                                <span className="text-sm font-bold text-slate-800 truncate">
                                    {activeChapterData?.title}
                                </span>
                                <span className={`text-slate-500 transition-transform ${isTabMenuOpen ? 'rotate-180' : ''}`}>
                                    <ChevronDown size={16} />
                                </span>
                            </button>

                            {isTabMenuOpen && (
                                <div className="absolute left-0 right-0 top-full mt-2 rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden">
                                    {chapters.map((chapter) => {
                                        const isActiveTab = chapter.id === activeChapterData?.id;
                                        return (
                                            <button
                                                key={chapter.id}
                                                type="button"
                                                onClick={() => setActiveTab(chapter.id)}
                                                className={`w-full px-4 py-3 text-left text-sm border-b border-slate-100 last:border-b-0 transition-colors ${
                                                    isActiveTab
                                                        ? 'bg-slate-900 text-white font-semibold'
                                                        : 'text-slate-700 hover:bg-slate-50'
                                                }`}
                                            >
                                                {chapter.title}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <div className="hidden 2xl:flex w-full gap-2">
                            {chapters.map((chapter) => {
                                const isActiveTab = chapter.id === activeChapterData?.id;
                                const tabWeight = Math.max(chapter.title.length, 12);
                                return (
                                    <button
                                        key={chapter.id}
                                        type="button"
                                        onClick={() => setActiveTab(chapter.id)}
                                        style={{ flexGrow: tabWeight, flexBasis: 0 }}
                                        className={`min-w-0 px-4 py-2.5 rounded-full border text-sm font-bold transition-all ${
                                            isActiveTab
                                                ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                                        }`}
                                    >
                                        <span className="block truncate text-center">{chapter.title}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mt-4 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                        {activeChapterData?.sections.length > 0 ? (
                            <div>
                                {activeChapterData.sections.map((section, idx) => (
                                    <Section
                                        key={section.id}
                                        data={section}
                                        isActive={activeSection === section.id}
                                        texts={{ lang, ...t }}
                                        isFirst={idx === 0}
                                        isLast={idx === activeChapterData.sections.length - 1}
                                        idx={idx}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="p-6 text-sm text-slate-500">
                                {lang === 'pt'
                                    ? 'Em breve adicionamos detalhes sobre este projeto.'
                                    : 'Details for this project are coming soon.'}
                            </div>
                        )}
                    </div>
                </div>

                {/* Complete Gantt Chart Overview */}
                <div className="py-12 px-4 bg-white border-b border-slate-200">
                    <div className="max-w-full mx-auto">
                        <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">
                            {lang === 'pt' ? 'Timeline Completa de Todos os Projetos' : 'Complete Timeline of All Projects'}
                        </h2>
                        <p className="text-slate-600 text-center mb-8">
                            {lang === 'pt' ? 'Visualização agregada de todos os cronogramas' : 'Aggregated view of all schedules'}
                        </p>
                        
                        <CompleteGanttChart sections={t.sections} lang={lang} chapters={chapters} />
                    </div>
                </div>

                {lang === 'pt' ? (
                    <div className="h-[30vh] flex items-center justify-center p-8 bg-slate-50 text-center">
                        <div>
                            <p className="text-slate-400 text-sm font-medium mb-2">Última Atualização: {formattedBuildDate}</p>
                            <p className="text-slate-300 text-xs max-w-xs mx-auto">
                                Os dados baseiam-se em anúncios públicos da Infraestruturas de Portugal, decretos do Governo, e notícias de imprensa.
                                As previsões são meramente indicativas e não vinculativas, baseando-se na minha intuição pessoal.
                            </p>
                            <p className="text-slate-300 text-xs max-w-xs mx-auto mt-2">
                                <b>Nota: eu sou uma pessoa muito otimista! As minhas estimativas de prazos podem ser consideradas ambiciosas.</b>
                            </p>
                            <p className="text-slate-300 text-xs max-w-xs mx-auto mt-2">
                                Este website não é oficial, tratando-se de um projeto independente e sem afiliação com as instituições envolvidas na LAV.
                            </p>
                            <p className="text-slate-400 text-xs mt-4">
                                © 2026 - Desenvolvido por um entusiasta de ferrovia. Todos os direitos reservados.
                            </p>
                            <p className="text-slate-400 text-xs mt-2">
                                Cláudio Gomes - <a href="https://cfpgomes.github.io/" className="underline hover:text-slate-600">cfpgomes.github.io</a>
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="h-[30vh] flex items-center justify-center p-8 bg-slate-50 text-center">
                        <div>
                            <p className="text-slate-400 text-sm font-medium mb-2">Last Updated: {formattedBuildDate}</p>
                            <p className="text-slate-300 text-xs max-w-xs mx-auto">
                                Data is based on public announcements from Infraestruturas de Portugal, government decrees, and press reports.
                                Forecasts are indicative only and not binding, based on personal assessment.
                            </p>
                            <p className="text-slate-300 text-xs max-w-xs mx-auto mt-2">
                                <b>Disclaimer: I am very optimistic! My timeline estimates may be considered ambitious.</b>
                            </p>
                            <p className="text-slate-300 text-xs max-w-xs mx-auto mt-2">
                                This website is unofficial and independent, with no affiliation to the organizations involved in the high-speed rail project.
                            </p>
                            <p className="text-slate-400 text-xs mt-4">
                                © 2026 - Developed by a rail enthusiast. All rights reserved.
                            </p>
                            <p className="text-slate-400 text-xs mt-2">
                                Cláudio Gomes - <a href="https://cfpgomes.github.io/" className="underline hover:text-slate-600">cfpgomes.github.io</a>
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function App() {
    const [lang, setLang] = useState(() => {
        try {
            const saved = localStorage.getItem('lav-lang');
            if (saved === 'pt' || saved === 'en') return saved;
        } catch {}
        const nav = (navigator.languages && navigator.languages[0]) || navigator.language || '';
        const isPortuguese = /^pt\b/i.test(nav);
        const initial = isPortuguese ? 'pt' : 'en';
        try { localStorage.setItem('lav-lang', initial); } catch {}
        return initial;
    });

    // Persist language after user toggles; do not re-detect
    useEffect(() => {
        try { localStorage.setItem('lav-lang', lang); } catch {}
    }, [lang]);

    return (
        <Routes>
            <Route path="/" element={<MainApp lang={lang} setLang={setLang} />} />
            <Route path=":sectionId" element={<TimelineDetail lang={lang} />} />
            <Route path="/submit" element={<SubmitUpdates lang={lang} />} />
        </Routes>
    );
}

export default App;