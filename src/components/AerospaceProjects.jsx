import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Maximize, Plane, Wrench } from 'lucide-react';

const ProjectCard = ({ title, description, tags, icon: Icon, delay }) => (
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

        <p className="text-slate text-sm font-sans mb-6 max-w-2xl leading-relaxed">
            {description}
        </p>

        {/* Tech tags */}
        {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
                {tags.map((tag, i) => (
                    <span
                        key={i}
                        className="px-3 py-1 text-[10px] font-mono text-cyan/80 border border-cyan/20 bg-cyan/5 uppercase tracking-widest hover:border-cyan/50 transition-colors"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        )}
    </motion.div>
);

export default function AerospaceProjects() {
    return (
        <section id="projects" className="relative w-full py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">

                {/* Section Header */}
                <div className="mb-20">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <Settings className="w-4 h-4 text-cyan animate-[spin_4s_linear_infinite]" />
                        <span className="text-cyan font-mono text-xs uppercase tracking-[0.2em]">R&D / Projects</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-off-white uppercase tracking-tight">
                        Domain Curiosity <br />
                        <span className="text-slate focus-within:text-off-white transition-colors block mt-2 text-2xl font-light">
                            Building Hands-On Experience Through Competitions & Coursework
                        </span>
                    </h2>
                </div>

                {/* Why Aerospace / Icon row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 relative">
                    <div className="absolute inset-0 border-y border-dashed border-slate/20 top-1/2 -z-10 hidden md:block" />

                    {[
                        { label: "Engineering Mechanics & Structural Logic", desc: "Developing strong intuition for force systems, stress-strain relationships, equilibrium analysis, and mechanical behavior under loading conditions." },
                        { label: "Thermodynamics & Fluid Flow Foundations", desc: "Building conceptual clarity in energy systems, heat transfer mechanisms, and fluid behavior — key pillars for future aerospace propulsion and aerodynamic systems." },
                        { label: "Aerospace-Oriented Curiosity", desc: "Deep interest in aircraft structures, propulsion systems, orbital mechanics, and high-performance engineering environments. Actively exploring how mechanical fundamentals translate into aerospace applications." }
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

                {/* Projects Timeline */}
                <div className="ml-2 md:ml-8 mt-12">
                    <ProjectCard
                        title="F62 Plane — DJS Skylark Aeromodelling Competition"
                        description="Designed and built an F62 model aircraft for a competitive aeromodelling event organized by DJS Skylark. Applied aerodynamic principles, structural design, and hands-on fabrication skills under competitive pressure. First real aerospace engineering experience bridging theoretical knowledge with practical application."
                        tags={["Aerodynamics", "Structural Design", "Fabrication", "Competition"]}
                        icon={Plane}
                        delay={0.1}
                    />
                    <ProjectCard
                        title="Gear Assembly Design & Simulation"
                        description="Designed and simulated a functional gear assembly demonstrating core engineering principles. Collaborated in a team to solve design challenges and optimize system functionality. Enhanced problem-solving skills and hands-on engineering experience."
                        tags={["Mechanical Design", "Simulation", "Team Collaboration", "CAD"]}
                        icon={Wrench}
                        delay={0.2}
                    />
                    <ProjectCard
                        title="Technical Exploration & Skill Building"
                        description="Actively learning CAD tools (SolidWorks, AutoCAD), computational platforms (MATLAB, Python), and programming languages (C, Java) to prepare for future research projects and aerospace-oriented technical work."
                        tags={["SolidWorks", "AutoCAD", "C Programming", "Java", "MATLAB"]}
                        icon={Maximize}
                        delay={0.3}
                    />
                </div>

            </div>
        </section>
    );
}
