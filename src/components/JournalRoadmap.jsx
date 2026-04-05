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
                        date="LOG ENTRY: 112 – Hands-On Aerospace"
                        title="F62 Plane — DJS Skylark Competition"
                        content="Competed in the DJS Skylark aeromodelling competition, designing and building an F62 model aircraft. First real hands-on aerospace experience — applying aerodynamic principles, structural design, and fabrication skills under competitive pressure."
                    />
                    <JournalEntry
                        date="LOG ENTRY: 097 – Leadership & Coordination"
                        title="Youth Summit — DJ MUNSOC"
                        content="Coordinated and supported planning & execution of a large-scale student event as Associate Team Member. Managed cross-functional teams to ensure smooth operations. Developed leadership, teamwork, and time management skills."
                    />
                    <JournalEntry
                        date="LOG ENTRY: 083 – Innovation & Volunteering"
                        title="IIC Innovation Council"
                        content="Volunteered in the institution's Innovation Council (IIC) event, contributing to its successful execution at the college level. Demonstrated teamwork and event management skills through active participation in first-year college initiatives."
                    />
                </motion.div>

                {/* Right Column: Future Timeline */}
                <motion.div
                    id="mission-timeline"
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
                            title="School Foundation – St. Xavier's Boys Academy"
                            desc="Built early academic discipline and analytical skills."
                            date="2012 – 2023"
                        />
                        <TimelineNode
                            status="completed"
                            title="Higher Secondary – KC College (Junior College)"
                            desc="Completed 12th grade with focus on science stream, strengthening physics and mathematics base."
                            date="2023 – 2025"
                        />
                        <TimelineNode
                            status="in-progress"
                            title="B.Tech – Dwarkadas J. Sanghvi College of Engineering"
                            desc="Pursuing B.Tech in Mechanical Engineering while building a long-term pathway toward Aerospace specialization. Associate Team Member – DJS MUNSOC Youth Summit."
                            date="2025 – PRESENT"
                        />
                        <TimelineNode
                            status="future"
                            title="Masters in Aerospace Engineering"
                            desc="Targeting specialization in Aerospace Engineering with focus on propulsion systems, aerodynamics, and advanced structural analysis."
                            date="T-PLUS 3-4 YRS"
                        />
                        <TimelineNode
                            status="future"
                            title="Aerospace Industry Role"
                            desc="Aspiring to work in high-performance aerospace environments focused on design, optimization, and next-generation engineering systems."
                            date="T-PLUS 5 YRS"
                        />
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
