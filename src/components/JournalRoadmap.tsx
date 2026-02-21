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
        <section className="section hud-container" id="journal-roadmap" style={{ position: 'relative' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '6rem' }}>

                {/* Journal Section */}
                <motion.div
                    className="hud-crosshair"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    style={{ paddingLeft: '2rem' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '3rem' }}>
                        <BookOpen color="var(--color-accent-blue)" size={28} strokeWidth={1.5} />
                        <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', fontWeight: 500, letterSpacing: '-0.02em' }}>Log_<br />Entries</h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                        {blogPosts.map((post, idx) => (
                            <article
                                key={post.id}
                                className="raw-box snappy-hover"
                                style={{
                                    paddingBottom: '2rem',
                                    borderBottom: '1px dotted var(--color-border)',
                                    marginLeft: idx % 2 === 0 ? '0' : '2rem',
                                    cursor: 'crosshair'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.8rem', color: 'var(--color-text-muted)', fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>
                                    <span style={{ color: 'var(--color-accent-blue)' }}>{post.date}</span>
                                    <span>//</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        <Clock size={14} />
                                        {post.readTime}
                                    </span>
                                </div>
                                <h3 style={{ fontSize: '1.6rem', marginBottom: '1rem', transition: 'color 0.1s ease', fontWeight: 500 }}>
                                    {post.title}
                                </h3>
                                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '1rem' }}>
                                    {post.excerpt}
                                </p>
                                <button style={{
                                    color: 'var(--color-accent-blue)', fontWeight: 500, fontSize: '0.95rem',
                                    background: 'transparent', border: 'none', cursor: 'inherit',
                                    padding: 0, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px'
                                }}>
                                    Read_Full_Entry &gt;
                                </button>
                            </article>
                        ))}
                    </div>
                </motion.div>

                {/* Roadmap Section */}
                <motion.div
                    className="hud-crosshair"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    style={{ paddingLeft: '2rem' }}
                >
                    <h2 id="trajectory-map" style={{ fontSize: '2.5rem', marginBottom: '3rem', fontWeight: 500, letterSpacing: '-0.02em' }}>Trajectory<br />Roadmap</h2>

                    <div style={{ position: 'relative', paddingLeft: '3rem' }}>
                        {/* Technical vertical timeline line */}
                        <div style={{
                            position: 'absolute',
                            left: '11px',
                            top: '0px',
                            bottom: '0px',
                            width: '2px',
                            background: 'repeating-linear-gradient(to bottom, var(--color-accent-blue) 0, var(--color-accent-blue) 10px, transparent 10px, transparent 15px)'
                        }} />

                        {roadmap.map((item) => (
                            <div key={item.id} className="snappy-hover" style={{ position: 'relative', marginBottom: '3.5rem', cursor: 'crosshair' }}>
                                {/* Status Indicator */}
                                <div style={{ position: 'absolute', left: '-3rem', top: '0.2rem', background: 'var(--color-bg)', padding: '4px 0' }}>
                                    {item.status === 'completed' && <CheckCircle2 size={24} color="var(--color-accent-blue)" strokeWidth={1} />}
                                    {item.status === 'in-progress' && (
                                        <motion.div
                                            animate={{ opacity: [0.5, 1, 0.5] }}
                                            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                                        >
                                            <Circle size={24} color="var(--color-accent-orange)" strokeWidth={2} />
                                        </motion.div>
                                    )}
                                    {item.status === 'upcoming' && <Circle size={24} color="var(--color-text-muted)" strokeWidth={1} />}
                                </div>

                                <div
                                    style={{
                                        opacity: item.status === 'upcoming' ? 0.4 : 1,
                                        transition: 'all 0.1s ease',
                                        borderLeft: item.status === 'in-progress' ? '2px solid var(--color-accent-orange)' : '2px solid transparent',
                                        paddingLeft: '1rem'
                                    }}
                                >
                                    <span style={{ fontSize: '0.85rem', color: item.status === 'in-progress' ? 'var(--color-accent-orange)' : 'var(--color-text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '1px' }}>[{item.date}]</span>
                                    <h3 style={{ fontSize: '1.4rem', marginTop: '0.3rem', fontWeight: 500, color: item.status === 'in-progress' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)' }}>
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
