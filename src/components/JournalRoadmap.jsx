import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Clock, CheckCircle, Target } from 'lucide-react';

const JournalEntry = ({ date, title, content }) => (
    <div className="mb-12 border-l-2 border-slate/20 pl-6 relative">
        <div className="absolute -left-[5px] top-0 w-2 h-2 bg-orange transform rotate-45 shadow-[0_0_8px_var(--color-orange)]" />
        <span className="text-orange font-mono text-xs uppercase tracking-widest block mb-2">{date}</span>
        <h3 className="text-xl font-bold text-off-white mb-3">{title}</h3>
        <p className="text-slate text-sm font-sans leading-relaxed">{content}</p>
    </div>
);

const TimelineNode = ({ status, title, desc, date }) => {
    const isPast = status === 'completed';
    const isActive = status === 'in-progress';

    return (
        <div className={`relative pl-8 pb-12 last:pb-0 ${isPast ? 'opacity-70' : isActive ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`absolute left-[-11px] top-0 w-5 h-5 rounded-full flex items-center justify-center bg-deep-space border-2 ${isPast ? 'border-cyan' : isActive ? 'border-orange shadow-[0_0_10px_var(--color-orange)]' : 'border-slate/50 bg-slate/10'
                }`}>
                {isPast && <CheckCircle className="w-3 h-3 text-cyan" />}
                {isActive && <div className="w-2 h-2 bg-orange rounded-full animate-pulse" />}
                {!isPast && !isActive && <Target className="w-3 h-3 text-slate/50" />}
            </div>

            {/* Timeline stroke */}
            <div className={`absolute left-[-2px] top-6 bottom-[-6px] w-[2px] ${isPast ? 'bg-cyan/50' : isActive ? 'bg-gradient-to-b from-orange/50 to-slate/20' : 'bg-slate/20'
                }`} />

            <div className="mt-[-4px]">
                <div className="flex items-baseline justify-between mb-1">
                    <h4 className={`text-md font-bold uppercase tracking-wide ${isPast ? 'text-cyan' : isActive ? 'text-orange' : 'text-slate'}`}>
                        {title}
                    </h4>
                    <span className="font-mono text-xs text-slate">{date}</span>
                </div>
                <p className="text-slate text-sm font-light">{desc}</p>
            </div>
        </div>
    );
};

export default function JournalRoadmap() {
    return (
        <section className="relative w-full py-24 bg-deep-space/80">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20">

                {/* Left Column: Journal / Insights */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-3 mb-12 border-b border-slate/20 pb-4">
                        <Terminal className="text-cyan w-5 h-5" />
                        <h2 className="text-2xl font-bold text-off-white uppercase tracking-wider">
                            Engineering Logs
                        </h2>
                    </div>

                    <JournalEntry
                        date="LOG ENTRY: 094"
                        title="The 40,000 RPM Catastrophe"
                        content="Testing a 3D printed impeller at full RPM resulted in rapid unplanned disassembly. The resin wasn't cured uniformly, introducing microscopic stress concentrators. Lesson learned: SLA prints need strict thermal curing profiles if they are anywhere near the rotational path. Re-designing with continuous carbon fiber inlay and a better balancing rig."
                    />
                    <JournalEntry
                        date="LOG ENTRY: 081"
                        title="Convergence Failure in Fluent"
                        content="Spent three days fighting residuals in Ansys Fluent. The combustion simulation kept diverging at the nozzle throat. Turns out using a k-epsilon model in a highly compressible shear layer was a conceptual error. Switching to a k-omega SST model and refining the boundary layer mesh solved the divergence immediately."
                    />
                    <JournalEntry
                        date="LOG ENTRY: 062"
                        title="Weight vs. Rigidity"
                        content="In early drone frame designs, I prioritized absolute weight reduction, which led to high-frequency resonance destroying the flight controller's gyro readings. Sometimes adding 15 grams of strategically placed bracing saves you from writing 2,000 lines of complex filtering code. Physics first, software second."
                    />
                </motion.div>

                {/* Right Column: Future Timeline */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-[#0f172a]/50 p-8 border border-slate/10 shadow-2xl relative"
                >
                    {/* Decorative frame corners */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan/50" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan/50" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan/50" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan/50" />

                    <div className="flex items-center gap-3 mb-12 border-b border-slate/20 pb-4">
                        <Clock className="text-orange w-5 h-5" />
                        <h2 className="text-2xl font-bold text-off-white uppercase tracking-wider">
                            Mission Timeline
                        </h2>
                    </div>

                    <div className="ml-2">
                        <TimelineNode
                            status="completed"
                            title="B.S. Mechanical Engineering"
                            desc="Built core foundation in mechanics, thermodynamics, and manufacturing."
                            date="T-MINUS 2 YRS"
                        />
                        <TimelineNode
                            status="in-progress"
                            title="M.S. Aerospace Engineering"
                            desc="Specializing in propulsion systems and advanced composite structures."
                            date="CURRENT"
                        />
                        <TimelineNode
                            status="future"
                            title="Propulsion Engineer Role"
                            desc="Targeting hardware-rich aerospace startups testing novel engine architectures."
                            date="T-PLUS 1 YR"
                        />
                        <TimelineNode
                            status="future"
                            title="Orbital Delivery Systems"
                            desc="Leading sub-team designing payload integration mechanisms for LEO launch vehicles."
                            date="T-PLUS 3 YRS"
                        />
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
