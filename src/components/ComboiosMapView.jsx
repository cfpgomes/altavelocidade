import React, { useLayoutEffect, useRef, useState } from 'react';
import frontcar from '../../frontcarexport.svg';
import middlecar from '../../middlecarexport.svg';

const TRAIN_UNITS = 10;

const StaticTrain = ({ muted = false }) => {
    const middleUnits = TRAIN_UNITS - 2;

    return (
        <div className={`flex flex-col items-center ${muted ? 'opacity-45 saturate-50' : ''}`}>
            <img src={frontcar} alt="" className="w-[6px] md:w-[7px] h-auto" style={{ transform: 'scaleY(-1)' }} />

            {Array.from({ length: middleUnits }).map((_, idx) => (
                <React.Fragment key={idx}>
                    <div className="my-[1px] flex items-center justify-center">
                        <div className="w-[6px] md:w-[7px] h-[1px] bg-slate-900 rounded-[1px]" />
                    </div>
                    <img src={middlecar} alt="" className="w-[6px] md:w-[7px] h-auto" />
                </React.Fragment>
            ))}

            <div className="my-[1px] flex items-center justify-center">
                <div className="w-[6px] md:w-[7px] h-[1px] bg-slate-900 rounded-[1px]" />
            </div>
            <img src={frontcar} alt="" className="w-[6px] md:w-[7px] h-auto" />
        </div>
    );
};

const TrainCluster = ({ count, muted = false }) => (
    <div className="h-full flex flex-nowrap items-end gap-2 md:gap-3">
        {Array.from({ length: count }).map((_, idx) => (
            <div key={idx} className="h-full">
                <StaticTrain muted={muted} />
            </div>
        ))}
    </div>
);

const ComboiosMapView = ({ lang, topReserve = 0 }) => {
    const labels = {
        unitLength: lang === 'pt' ? '~ 200 metros' : '~ 200 meters'
    };
    const topSpacing = 20;

    const viewportRef = useRef(null);
    const rowRef = useRef(null);
    const primaryClusterRef = useRef(null);
    const [scale, setScale] = useState(null);
    const [trainBlockHeight, setTrainBlockHeight] = useState(0);

    useLayoutEffect(() => {
        const updateScale = () => {
            const viewport = viewportRef.current;
            const row = rowRef.current;
            if (!viewport || !row) return;

            const availableHeight = viewport.clientHeight;
            const availableWidth = viewport.clientWidth;
            const naturalHeight = row.offsetHeight;
            const naturalWidth = row.offsetWidth;
            const measuredTrainHeight = primaryClusterRef.current?.offsetHeight || 0;

            if (!availableHeight || !availableWidth || !naturalHeight || !naturalWidth) return;

            if (measuredTrainHeight && Math.abs(measuredTrainHeight - trainBlockHeight) > 1) {
                setTrainBlockHeight(measuredTrainHeight);
            }

            const scaleY = (availableHeight - 8) / naturalHeight;
            const scaleX = (availableWidth - 8) / naturalWidth;
            const next = Math.min(1, Math.min(scaleX, scaleY));

            setScale(Number.isFinite(next) && next > 0 ? next : 0.0001);
        };

        updateScale();

        const observer = new ResizeObserver(updateScale);
        if (viewportRef.current) observer.observe(viewportRef.current);
        if (rowRef.current) observer.observe(rowRef.current);
        if (primaryClusterRef.current) observer.observe(primaryClusterRef.current);

        window.addEventListener('resize', updateScale);
        return () => {
            observer.disconnect();
            window.removeEventListener('resize', updateScale);
        };
    }, [topReserve]);

    return (
        <div className="relative h-full w-full">
            <div
                ref={viewportRef}
                className="absolute inset-x-0 bottom-0 px-2 md:px-4 pb-8 overflow-visible bg-transparent"
                style={{ top: Math.max(0, topReserve + topSpacing) }}
            >
                <div className="h-full w-full flex items-center justify-center">
                    <div
                        ref={rowRef}
                        className="flex items-end justify-center gap-3 md:gap-8 origin-center"
                        style={{ transform: `scale(${scale ?? 1})`, opacity: scale === null ? 0 : 1 }}
                    >
                        <div
                            className="flex items-end gap-0 text-slate-600 shrink-0"
                            style={{ height: trainBlockHeight ? `${trainBlockHeight}px` : '540px' }}
                        >
                            <div className="h-full flex items-center">
                                <p className="origin-center -rotate-90 whitespace-nowrap text-[11px] md:text-xs font-semibold uppercase tracking-wide leading-none shrink-0">
                                    {labels.unitLength}
                                </p>
                            </div>
                            <div className="relative h-full w-6 shrink-0 -ml-4 md:-ml-6">
                                <div className="absolute left-3 top-0 w-4 border-t-2 border-slate-500 -translate-x-1/2" />
                                <div className="absolute left-3 top-0 bottom-0 border-l-2 border-slate-500 -translate-x-1/2" />
                                <div className="absolute left-3 bottom-0 w-4 border-b-2 border-slate-500 -translate-x-1/2" />
                            </div>
                        </div>

                        <div ref={primaryClusterRef} className="shrink-0">
                            <TrainCluster count={12} />
                        </div>

                        <span className="shrink-0 text-3xl md:text-5xl font-black text-slate-500 leading-none self-center">+</span>

                        <div
                            className="shrink-0"
                            style={{ height: trainBlockHeight ? `${trainBlockHeight}px` : '540px' }}
                        >
                            <TrainCluster count={8} muted />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComboiosMapView;
