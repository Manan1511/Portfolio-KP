import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Target, Compass } from 'lucide-react';

const cards = [
    {
        title: 'Current Status',
        icon: <Rocket size={24} color="var(--color-accent-blue)" />,
        description: 'Transitioning from Mechanical Engineering to Aerospace. Currently mastering orbital mechanics and advanced CAD modeling.',
        progress: 45,
    },
    {
        title: 'Core Focus',
        icon: <Target size={24} color="var(--color-accent-orange)" />,
        description: 'Developing a deep intuitive understanding of thermodynamics and fluid dynamics applicable to propulsion systems.',
        progress: 70,
    },
    {
        title: 'Long-term Direction',
        icon: <Compass size={24} color="var(--color-text-primary)" />,
        description: 'Contributing to the design and testing of next-generation launch vehicles to make interstellar travel reliable.',
        progress: 20,
    }
];

const EngineeringProgress: React.FC = () => {
    return (
        <section className="section container" id="engineering-progress">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                style={{ marginBottom: '4rem' }}
            >
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Engineering in Progress</h2>
                <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px' }}>
                    My journey is a continuous cycle of learning, building, and iterating.
                    Here is a transparent look at where I stand.
                </p>
            </motion.div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem'
            }}>
                {cards.map((card, index) => (
                    <motion.div
                        key={card.title}
                        className="glass-panel"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ y: -8, transition: { duration: 0.2 } }}
                        style={{
                            padding: '2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem',
                            cursor: 'default'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{
                                padding: '0.8rem',
                                background: 'rgba(255,255,255,0.03)',
                                borderRadius: '12px',
                                border: '1px solid var(--color-border)'
                            }}>
                                {card.icon}
                            </div>
                            <h3 style={{ fontSize: '1.25rem' }}>{card.title}</h3>
                        </div>

                        <p style={{ color: 'var(--color-text-secondary)', flexGrow: 1, fontSize: '0.95rem' }}>
                            {card.description}
                        </p>

                        <div style={{ width: '100%', marginTop: 'auto' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                                <span style={{ color: 'var(--color-text-muted)' }}>Phase Completion</span>
                                <span style={{ color: 'var(--color-accent-blue)' }}>{card.progress}%</span>
                            </div>
                            <div style={{
                                height: '6px',
                                background: 'rgba(255,255,255,0.1)',
                                borderRadius: '3px',
                                overflow: 'hidden'
                            }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${card.progress}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
                                    style={{
                                        height: '100%',
                                        background: 'var(--color-accent-blue)',
                                        boxShadow: '0 0 10px var(--color-accent-glow)'
                                    }}
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default EngineeringProgress;
