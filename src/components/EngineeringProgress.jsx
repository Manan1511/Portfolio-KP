import React from 'react';
import { motion } from 'framer-motion';

const SystemMeter = ({ label, value, colorClass }) => (
    <div className="mb-8">
        <div className="flex justify-between items-end mb-2">
            <span className="text-slate uppercase tracking-widest text-xs font-semibold">{label}</span>
            <span className={`text-xs font-mono font-bold ${colorClass.text}`}>{value}%</span>
        </div>
        <div className="h-1 w-full bg-deep-space border border-slate/20 relative overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${value}%` }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className={`absolute top-0 left-0 h-full ${colorClass.bg} shadow-[0_0_10px_currentColor]`}
            />
            {/* HUD scanning line effect */}
            <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="absolute top-0 w-8 h-full bg-white/30 skew-x-[-20deg]"
            />
        </div>
    </div>
);

const TagDisplay = ({ title, tags }) => (
    <div className="relative p-6 border-l border-cyan/20 bg-cyan/5">
        <div className="absolute -left-[5px] top-6 w-2 h-2 rounded-full bg-cyan" />
        <h3 className="text-cyan text-sm uppercase tracking-widest mb-4 font-semibold">{title}</h3>
        <div className="flex flex-wrap gap-3">
            {tags.map((tag, i) => (
                <span
                    key={i}
                    className="px-3 py-1 text-xs font-mono text-off-white/80 border border-slate/30 bg-deep-space uppercase hover:border-cyan/50 hover:text-cyan transition-colors"
                >
                    {tag}
                </span>
            ))}
        </div>
    </div>
);

export default function EngineeringProgress() {
    return (
        <section className="relative w-full py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

                {/* Left Column: System Loading Meters (Offset down) */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="lg:col-span-5 lg:mt-32"
                >
                    <div className="flex items-center gap-3 mb-12">
                        <span className="h-4 w-4 border-2 border-orange rotate-45" />
                        <h2 className="text-2xl font-bold text-off-white uppercase tracking-wider">
                            System Diagnostics
                        </h2>
                    </div>

                    <SystemMeter
                        label="Current Status : Building Core Engineering Fundamentals"
                        value={90}
                        colorClass={{ text: "text-cyan", bg: "bg-cyan" }}
                    />
                    <SystemMeter
                        label="Core Focus : Mechanics, Thermodynamics & Analytical Thinking"
                        value={78}
                        colorClass={{ text: "text-orange", bg: "bg-orange" }}
                    />
                    <SystemMeter
                        label="Long-term : Aerospace Systems & Advanced Propulsion"
                        value={100}
                        colorClass={{ text: "text-off-white", bg: "bg-off-white" }}
                    />
                </motion.div>

                {/* Right Column: Floating Data Tags (Offset up) */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="lg:col-span-6 lg:col-start-7 lg:-mt-12"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
                        {/* Background design element */}
                        <div className="absolute -inset-4 border border-slate/10 -z-10 bg-deep-space/50 backdrop-blur-sm" />

                        <TagDisplay
                            title="Fundamentals"
                            tags={[
                                "Engineering Mathematics",
                                "Engineering Mechanics",
                                "Thermodynamics",
                                "Fluid Mechanics",
                                "Strength of Materials"
                            ]}
                        />

                        <TagDisplay
                            title="Technical Stack"
                            tags={[
                                "SolidWorks (Learning)",
                                "AutoCAD",
                                "MATLAB (Learning)",
                                "Fundamentals of C",
                                "Python",
                                "Fundamentals of Java"
                            ]}
                        />
                    </div>

                    {/* Decorative floating text */}
                    <div className="mt-16 text-right">
                        <p className="font-mono text-cyan/30 text-sm">
                            &lt; !-- SYS.OP.READY --&gt;<br />
                            DATA_LINK: ESTABLISHED<br />
                            PING: 12ms
                        </p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
