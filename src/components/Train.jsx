import React, { useEffect, useRef, useState } from 'react';
import frontcar from '../../frontcarexport.svg';
import middlecar from '../../middlecarexport.svg';

// Train mounted inside the track container, moving vertically
const Train = () => {
    const [runKey, setRunKey] = useState(0);
    const [running, setRunning] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        let mounted = true;

        const scheduleNextRun = () => {
            const delay = 8000 + Math.floor(Math.random() * 6000); // 8-14s delay
            timeoutRef.current = setTimeout(() => {
                if (!mounted) return;
                setRunning(true);
                // bump key to restart CSS animation
                setRunKey(k => k + 1);

                const duration = 3500; // ms for crossing animation
                setTimeout(() => {
                    if (!mounted) return;
                    setRunning(false);
                    scheduleNextRun();
                }, duration + 100);
            }, delay);
        };

        scheduleNextRun();
        return () => {
            mounted = false;
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    if (!running) return null; // invisible between cycles

    return (
        <div
            className="absolute left-5 top-0 w-[28px] z-30 pointer-events-none"
            aria-hidden="true"
        >
            {/* Animated runner moving top→bottom */}
            <div key={runKey} className={'train-animate-y'}>
                <div className="flex flex-col items-center">
                    {/* Front car (flipped vertically at top) */}
                    <img src={frontcar} alt="" className="w-[28px] h-auto relative z-10" style={{ transform: 'scaleY(-1)' }} />

                    {/* Connectors and middle cars */}
                    {Array.from({ length: 7 }).map((_, i) => (
                        <React.Fragment key={i}>
                            <div className="relative my-[2px] -mt-[1px] -mb-[1px] flex items-center justify-center">
                                <div className="relative z-0 w-[26px] h-[4px] bg-black rounded-[1px]" />
                            </div>
                            <img src={middlecar} alt="" className="w-[28px] h-auto relative z-10" />
                        </React.Fragment>
                    ))}

                    {/* Connector before bottom front car */}
                    <div className="relative my-[2px] -mt-[1px] -mb-[1px] flex items-center justify-center">
                        <div className="relative z-0 w-[26px] h-[4px] bg-black rounded-[1px]" />
                    </div>
                    {/* Bottom front car (not flipped) */}
                    <img src={frontcar} alt="" className="w-[28px] h-auto relative z-10" />
                </div>
            </div>
        </div>
    );
};

export default Train;
