import React from 'react';
import { motion } from 'framer-motion';

const fundamentals = ['Mechanics', 'Thermodynamics', 'Strength of Materials', 'Fluid Dynamics'];
const tools = ['CAD Modeling', 'MATLAB', 'Python', 'AutoCAD', 'Excel', 'SolidWorks'];

const LearningStack: React.FC = () => {
    return (
        <section className="section hud-container" id="learning-stack">
            <motion.div
                className="hud-crosshair"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                style={{ marginBottom: '5rem', paddingLeft: '2rem' }}
            >
                <h2 style={{ fontSize: '3rem', margin: '0.5rem 0 1rem 0', fontWeight: 500, letterSpacing: '-0.02em' }}>Learning Stack</h2>
                <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', fontSize: '1.1rem' }}>
                    An honest representation of my current technical proficiencies and ongoing studies.
                </p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', paddingLeft: '1rem' }}>

                {/* Fundamentals Category */}
                <motion.div
                    className="raw-box"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4 }}
                >
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--color-accent-blue)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '2px' }}>[ Fundamentals ]</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {fundamentals.map((item, idx) => (
                            <motion.div
                                key={item}
                                className="snappy-hover"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.2, delay: idx * 0.05 }}
                                style={{
                                    padding: '0.5rem 0',
                                    borderBottom: '1px solid var(--color-border)',
                                    fontSize: '1rem',
                                    color: 'var(--color-text-primary)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    cursor: 'crosshair'
                                }}
                            >
                                <span>{item}</span>
                                <span style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>SYS_OK</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Tools Category */}
                <motion.div
                    className="raw-box"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    style={{ borderLeftColor: 'var(--color-accent-orange)', marginTop: '2rem' }}
                >
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--color-accent-orange)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '2px' }}>[ Tools_Software ]</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {tools.map((item, idx) => (
                            <motion.div
                                key={item}
                                className="snappy-hover"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.2, delay: idx * 0.05 }}
                                style={{
                                    padding: '0.5rem 0',
                                    borderBottom: '1px solid var(--color-border)',
                                    fontSize: '1rem',
                                    color: 'var(--color-text-primary)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    cursor: 'crosshair'
                                }}
                            >
                                <span>{item}</span>
                                <span style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>ACTIVE</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default LearningStack;
