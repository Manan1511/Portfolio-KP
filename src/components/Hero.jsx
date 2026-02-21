import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Crosshair } from 'lucide-react';
import Starfield from './Starfield';

export default function Hero() {
    const { scrollY } = useScroll();

    // Scroll-linked telemetry values
    const altitude = useTransform(scrollY, [0, 1000], [0, 85000]);
    const velocity = useTransform(scrollY, [0, 1000], [0, 3400]);
    const q_pressure = useTransform(scrollY, [0, 500, 1000], [0, 35000, 0]);

    const [telemetry, setTelemetry] = useState({ alt: 0, vel: 0, q: 0 });

    useEffect(() => {
        const unsubAlt = altitude.on("change", v => setTelemetry(t => ({ ...t, alt: Math.round(v) })));
        const unsubVel = velocity.on("change", v => setTelemetry(t => ({ ...t, vel: Math.round(v) })));
        const unsubQ = q_pressure.on("change", v => setTelemetry(t => ({ ...t, q: Math.round(v) })));

        return () => {
            unsubAlt();
            unsubVel();
            unsubQ();
        };
    }, [altitude, velocity, q_pressure]);

    return (
        <section className="relative w-full h-screen overflow-hidden flex items-center justify-center pt-20">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
                <Canvas
                    camera={{ position: [0, 0, 8], fov: 45 }}
                    eventSource={document.getElementById('root')}
                    eventPrefix="client"
                >
                    <ambientLight intensity={0.5} />
                    <Starfield position={[0, 0, 0]} />
                </Canvas>
            </div>

            {/* Main Content */}
            <div className="z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-start pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <Crosshair className="text-cyan w-5 h-5 animate-pulse" />
                        <span className="text-cyan text-sm tracking-[0.2em] uppercase font-semibold">
                            System Online
                        </span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-bold text-off-white tracking-tight uppercase mb-2">
                        Krishna Patel
                    </h1>
                    <h2 className="text-2xl md:text-4xl text-slate font-light tracking-wide mb-6">
                        Aerospace Engineer
                    </h2>

                    <div className="flex items-center gap-4 mb-10 overflow-hidden">
                        <span className="h-[1px] w-12 bg-cyan/50"></span>
                        <motion.p
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="text-cyan/80 text-lg uppercase tracking-widest"
                        >
                            Mechanical → Aerospace Journey
                        </motion.p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6">
                        <button className="hud-focus relative overflow-hidden group px-8 py-3 rounded-full border border-cyan/50 bg-cyan/10 hover:bg-cyan/20 transition-all duration-300">
                            <span className="relative z-10 text-cyan uppercase tracking-widest text-sm font-semibold">
                                Explore My Work
                            </span>
                            <div className="absolute inset-0 w-full h-full bg-cyan/20 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></div>
                        </button>
                        <button className="hud-focus px-8 py-3 rounded-full border border-slate/30 text-slate hover:text-off-white hover:border-off-white/50 transition-all duration-300 uppercase tracking-widest text-sm font-semibold">
                            My Engineering Journey
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-xs text-slate uppercase tracking-widest">Scroll to Launch</span>
                <ChevronDown className="text-cyan w-5 h-5 animate-bounce" />
            </motion.div>

            {/* Telemetry HUD */}
            <div className="absolute bottom-8 right-8 z-20 font-mono text-xs hidden md:flex flex-col gap-1 text-right">
                <div className="text-slate">LIVE TELEMETRY</div>
                <div className="w-32 h-[1px] bg-cyan/30 my-1 self-end"></div>
                <div className="flex justify-between gap-8">
                    <span className="text-cyan/60">ALT</span>
                    <span className="text-cyan font-bold">{telemetry.alt.toLocaleString()} m</span>
                </div>
                <div className="flex justify-between gap-8">
                    <span className="text-cyan/60">VEL</span>
                    <span className="text-cyan font-bold">{telemetry.vel.toLocaleString()} m/s</span>
                </div>
                <div className="flex justify-between gap-8">
                    <span className="text-orange/80">MAX-Q</span>
                    <span className="text-orange font-bold">{telemetry.q.toLocaleString()} Pa</span>
                </div>
            </div>
        </section>
    );
}
