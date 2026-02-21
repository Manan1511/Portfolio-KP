import React from 'react';
import { motion } from 'framer-motion';

const fundamentals = ['Mechanics', 'Thermodynamics', 'Strength of Materials', 'Fluid Dynamics'];
const tools = ['CAD Modeling', 'MATLAB', 'Python', 'AutoCAD', 'Excel', 'SolidWorks'];

const LearningStack: React.FC = () => {
    return (
        <section className="section container" id="learning-stack">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                style={{ marginBottom: '3rem' }}
            >
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Learning Stack</h2>
                <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px' }}>
                    An honest representation of my current technical proficiencies and ongoing studies.
                </p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                {/* Fundamentals Category */}
                <motion.div
                    className="glass-panel"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    style={{ padding: '2rem' }}
                >
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--color-accent-blue)' }}>Fundamentals</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                        {fundamentals.map((item, idx) => (
                            <motion.div
                                key={item}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: '20px',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    fontSize: '0.9rem',
                                    color: 'var(--color-text-primary)'
                                }}
                            >
                                {item}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Tools Category */}
                <motion.div
                    className="glass-panel"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{ padding: '2rem' }}
                >
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--color-accent-orange)' }}>Tools & Software</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                        {tools.map((item, idx) => (
                            <motion.div
                                key={item}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(249, 115, 22, 0.2)' }}
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: '20px',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    fontSize: '0.9rem',
                                    color: 'var(--color-text-primary)'
                                }}
                            >
                                {item}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default LearningStack;
