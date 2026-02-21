import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Settings, Maximize, AlertCircle } from 'lucide-react';

// Image Comparison Slider Component for Exploded View
const ExplodedViewSlider = () => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const containerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    const handlePointerUp = useCallback(() => setIsDragging(false), []);

    useEffect(() => {
        const handleMove = (clientX) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
            const percentage = (x / rect.width) * 100;
            setSliderPosition(percentage);
        };

        const handlePointerMove = (e) => {
            if (!isDragging) return;
            handleMove(e.clientX || e.touches[0].clientX);
        };

        if (isDragging) {
            window.addEventListener('pointermove', handlePointerMove);
            window.addEventListener('pointerup', handlePointerUp);
        } else {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        }
        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        };
    }, [isDragging, containerRef, setSliderPosition, handlePointerUp]); // Added handlePointerUp to dependencies

    const handlePointerDown = (e) => {
        setIsDragging(true);
        // Call handleMove directly here, as it's now defined within the effect and not directly accessible outside.
        // However, the original handleMove was outside. Let's keep the original logic for handlePointerDown
        // and ensure handleMove is accessible or refactor handlePointerDown into the effect as well.
        // For now, let's re-introduce a local handleMove for handlePointerDown.
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min((e.clientX || e.touches[0].clientX) - rect.left, rect.width));
        const percentage = (x / rect.width) * 100;
        setSliderPosition(percentage);
    };

    return (
        <div
            className="relative w-full aspect-video bg-black/50 overflow-hidden cursor-ew-resize select-none border border-cyan/20 group hover:border-cyan/50 transition-colors"
            ref={containerRef}
            onPointerDown={handlePointerDown}
        >
            {/* Background: Exploded View (Wireframe/Technical placeholder) */}
            <div className="absolute inset-0 bg-deep-space flex flex-col items-center justify-center p-4">
                {/* Placeholder for exploded CAD */}
                <div className="relative w-full h-full border border-orange/20 rounded grid grid-cols-3 grid-rows-3 gap-2 p-2">
                    <div className="col-start-2 border-t-2 border-orange/50"></div>
                    <div className="row-start-2 col-start-1 border-l-2 border-orange/50"></div>
                    <div className="row-start-2 col-start-3 border-r-2 border-orange/50"></div>
                    <div className="row-start-3 col-start-2 border-b-2 border-orange/50"></div>
                    <div className="absolute inset-0 flex items-center justify-center -translate-y-4">
                        <span className="text-orange/60 font-mono text-xs rotate-[-15deg] uppercase tracking-widest border border-orange/30 p-1">Exploded Assembly</span>
                    </div>
                </div>
            </div>

            {/* Foreground: Assembled View (Solid placeholder) */}
            <div
                className="absolute inset-0 bg-slate-900 border-r border-cyan shadow-[2px_0_10px_rgba(0,212,255,0.5)] flex items-center justify-center"
                style={{ width: `${sliderPosition}%` }}
            >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 to-black overflow-hidden flex items-center justify-center">
                    {/* Placeholder for assembled part */}
                    <div className="w-1/2 h-1/2 bg-slate-700 rounded-sm shadow-2xl skew-x-[-10deg] flex items-center justify-center">
                        <span className="text-slate/50 font-mono text-xs uppercase tracking-widest">Assembled State</span>
                    </div>
                </div>
            </div>

            {/* Slider Handle */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-cyan -ml-[2px] pointer-events-none flex items-center justify-center"
                style={{ left: `${sliderPosition}%` }}
            >
                <div className="w-6 h-12 bg-deep-space border-2 border-cyan rounded-full flex items-center justify-center gap-1 shadow-[0_0_10px_rgba(0,212,255,0.8)]">
                    <div className="w-0.5 h-3 bg-cyan/50" />
                    <div className="w-0.5 h-3 bg-cyan/50" />
                </div>
            </div>

            {/* Label */}
            <div className="absolute bottom-4 right-4 bg-deep-space/80 backdrop-blur-sm border border-cyan/30 px-3 py-1 font-mono text-[10px] text-cyan uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Drag for Exploded View
            </div>
        </div>
    );
};

const ProjectCard = ({ title, description, icon: Icon, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay, duration: 0.6 }}
        className="relative pl-8 pb-16 border-l border-slate/20 last:border-l-transparent last:pb-0"
    >
        {/* Timeline dot */}
        <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-cyan shadow-[0_0_8px_currentColor]" />

        <div className="flex items-start gap-4 mb-3">
            <div className="p-2 border border-slate/20 bg-deep-space shadow-inner mt-[-8px]">
                <Icon className="w-5 h-5 text-off-white" />
            </div>
            <div>
                <h3 className="text-xl font-bold text-off-white font-sans tracking-wide leading-tight">{title}</h3>
            </div>
        </div>

        <p className="text-slate text-sm font-sans mb-8 max-w-2xl leading-relaxed">
            {description}
        </p>

        {/* Exploded View Slider Container */}
        <div className="max-w-3xl mb-6">
            <ExplodedViewSlider />
        </div>

        <button className="hud-focus px-6 py-2 rounded-full border border-cyan/30 text-cyan text-xs font-semibold uppercase tracking-widest hover:bg-cyan/10 transition-colors">
            View Details
        </button>
    </motion.div>
);

export default function AerospaceProjects() {
    return (
        <section className="relative w-full py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">

                {/* Section Header */}
                <div className="mb-20">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <Settings className="w-4 h-4 text-cyan animate-[spin_4s_linear_infinite]" />
                        <span className="text-cyan font-mono text-xs uppercase tracking-[0.2em]">R&D / Mini Projects</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-off-white uppercase tracking-tight">
                        Aerospace Curiosity <br />
                        <span className="text-slate focus-within:text-off-white transition-colors block mt-2 text-2xl font-light">
                            Testing boundaries. Failing safely.
                        </span>
                    </h2>
                </div>

                {/* Why Aerospace / Icon row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 relative">
                    <div className="absolute inset-0 border-y border-dashed border-slate/20 top-1/2 -z-10 hidden md:block" />

                    {[
                        { label: "Aircraft Design", desc: "Aerodynamic stability & structural modeling" },
                        { label: "Propulsion", desc: "Thermodynamic cycles & thrust optimization" },
                        { label: "Space Systems", desc: "Orbital mechanics & extreme environments" }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="bg-deep-space border border-cyan/10 p-6 flex flex-col items-center text-center shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                        >
                            <div className="w-16 h-16 border border-cyan/30 mb-4 flex items-center justify-center rotate-45 group">
                                <div className="w-10 h-10 border border-cyan/50 -rotate-45 group-hover:bg-cyan/10 transition-colors" />
                            </div>
                            <h4 className="text-off-white font-bold uppercase tracking-wider mb-2 text-sm">{item.label}</h4>
                            <p className="text-slate text-xs font-mono">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Projects Timeline style */}
                <div className="ml-2 md:ml-8 mt-12">
                    <ProjectCard
                        title="Solid Rocket Motor Casing Stress Analysis"
                        description="FEA simulation of a composite motor casing under maximum expected operating pressure (MEOP). Focus on weight reduction and burst-pressure failure prediction using ANSYS."
                        icon={AlertCircle}
                        delay={0.1}
                    />
                    <ProjectCard
                        title="Converging-Diverging Nozzle Flow Optimization"
                        description="1D and 2D compressible flow analysis using MATLAB to optimize the thrust coefficient for a suborbital payload."
                        icon={Maximize}
                        delay={0.2}
                    />
                    <ProjectCard
                        title="1U CubeSat Deployment Mechanism"
                        description="Kinematic design and CAD modeling of a spring-loaded deployment system, tested virtually for high-vibration launch environments."
                        icon={Settings}
                        delay={0.3}
                    />
                </div>

            </div>
        </section>
    );
}
