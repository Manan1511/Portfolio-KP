import React from 'react';
import { motion } from 'framer-motion';
import { Clock, BookOpen, CheckCircle2, Circle } from 'lucide-react';

const blogPosts = [
    {
        id: 1,
        date: 'February 20, 2026',
        title: 'Why I left Mechanical Engineering for the Stars',
        excerpt: 'The transition wasn\'t easy. Moving from terrestrial constraints to orbital mechanics required a paradigm shift in how I viewed propulsion and material limits.',
        readTime: '5 min read'
    },
    {
        id: 2,
        date: 'January 14, 2026',
        title: 'Failing my first Turbine Blade Stress Test',
        excerpt: 'Failure is the best instructor. My FEA analysis on the first iteration of the compressor blade failed spectacularly under simulated acoustic resonance. Here is what I learned.',
        readTime: '8 min read'
    }
];

const roadmap = [
    {
        id: 1,
        title: 'Master SolidWorks & ANSYS',
        status: 'completed',
        date: '2025'
    },
    {
        id: 2,
        title: 'Liquid Rocket Engine Injector Design',
        status: 'in-progress',
        date: 'Q2 2026'
    },
    {
        id: 3,
        title: 'Propulsion Systems Internship',
        status: 'upcoming',
        date: 'Q4 2026'
    },
    {
        id: 4,
        title: 'First Suborbital Payload Launch',
        status: 'upcoming',
        date: '2028'
    }
];

const JournalRoadmap: React.FC = () => {
    return (
        <section className="section container" id="journal-roadmap" style={{ position: 'relative' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>

                {/* Journal Section */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem' }}>
                        <BookOpen color="var(--color-accent-blue)" size={28} />
                        <h2 style={{ fontSize: '2.2rem' }}>Journal & Insights</h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                        {blogPosts.map((post) => (
                            <article key={post.id} style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '2.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.8rem', color: 'var(--color-text-muted)', fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>
                                    <span>{post.date}</span>
                                    <span>•</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        <Clock size={14} />
                                        {post.readTime}
                                    </span>
                                </div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', cursor: 'pointer', transition: 'color 0.2s ease' }} className="hover-text-accent">
                                    {post.title}
                                </h3>
                                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                                    {post.excerpt}
                                </p>
                                <button style={{ color: 'var(--color-accent-blue)', fontWeight: 500, fontSize: '0.95rem' }}>
                                    Read full entry →
                                </button>
                            </article>
                        ))}
                    </div>
                </motion.div>

                {/* Roadmap Section */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 id="trajectory-map" style={{ fontSize: '2.2rem', marginBottom: '2rem' }}>Trajectory Roadmap</h2>

                    <div style={{ position: 'relative', paddingLeft: '2rem' }}>
                        {/* Vertical timeline line */}
                        <div style={{
                            position: 'absolute',
                            left: '11px',
                            top: '10px',
                            bottom: '10px',
                            width: '2px',
                            background: 'linear-gradient(to bottom, var(--color-accent-blue), var(--color-border))'
                        }} />

                        {roadmap.map((item) => (
                            <div key={item.id} style={{ position: 'relative', marginBottom: '3rem' }}>
                                {/* Status Indicator */}
                                <div style={{ position: 'absolute', left: '-2rem', top: '0.2rem', background: 'var(--color-bg)' }}>
                                    {item.status === 'completed' && <CheckCircle2 size={24} color="var(--color-accent-blue)" />}
                                    {item.status === 'in-progress' && (
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            <Circle size={24} color="var(--color-accent-orange)" style={{ fill: 'rgba(249, 115, 22, 0.2)' }} />
                                        </motion.div>
                                    )}
                                    {item.status === 'upcoming' && <Circle size={24} color="var(--color-text-muted)" />}
                                </div>

                                <div
                                    style={{
                                        opacity: item.status === 'upcoming' ? 0.5 : 1,
                                        transform: item.status === 'upcoming' ? 'scale(0.98)' : 'scale(1)',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>{item.date}</span>
                                    <h3 style={{ fontSize: '1.4rem', marginTop: '0.3rem', color: item.status === 'in-progress' ? 'var(--color-accent-orange)' : 'var(--color-text-primary)' }}>
                                        {item.title}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default JournalRoadmap;
