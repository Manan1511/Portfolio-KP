import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Target, Compass } from 'lucide-react';

const cards = [
    {
        title: 'Current Status',
        icon: <Rocket size={20} color="var(--color-accent-blue)" strokeWidth={1.5} />,
        description: 'Transitioning from Mechanical Engineering to Aerospace. Currently mastering orbital mechanics and advanced CAD modeling.',
        progress: 45,
    },
    {
        title: 'Core Focus',
        icon: <Target size={20} color="var(--color-accent-orange)" strokeWidth={1.5} />,
        description: 'Developing a deep intuitive understanding of thermodynamics and fluid dynamics applicable to propulsion systems.',
        progress: 70,
    },
    {
        title: 'Long-term Direction',
        icon: <Compass size={20} color="var(--color-text-primary)" strokeWidth={1.5} />,
        description: 'Contributing to the design and testing of next-generation launch vehicles to make interstellar travel reliable.',
        progress: 20,
    }
];

const EngineeringProgress: React.FC = () => {
    return (
        <section className="section hud-container" id="engineering-progress">
            <motion.div
                className="hud-crosshair"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4 }}
                style={{ marginBottom: '6rem', padding: '2rem 0 0 2rem' }}
            >
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent-blue)', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase' }}>// Systems Check</span>
                <h2 style={{ fontSize: '3rem', margin: '0.5rem 0 1.5rem 0', fontWeight: 500, letterSpacing: '-0.02em' }}>Engineering in Progress</h2>
                <p style={{ color: 'var(--color-text-secondary)', maxWidth: '500px', fontSize: '1.1rem' }}>
                    My journey is a continuous cycle of learning, building, and iterating.
                    Here is a transparent look at where I stand natively in the stack.
                </p>
            </motion.div>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4rem',
                paddingLeft: '1rem'
            }}>
                {cards.map((card, index) => (
                    <motion.div
                        key={card.title}
                        className="raw-box"
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            maxWidth: '600px',
                            marginLeft: index % 2 !== 0 ? '6rem' : '0'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <div style={{ opacity: 0.7 }}>
                                {card.icon}
                            </div>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 500 }}>{card.title}</h3>
                        </div>

                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
                            {card.description}
                        </p>

                        <div style={{ width: '100%', marginTop: '0.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                <span style={{ color: 'var(--color-text-muted)' }}>Completion_</span>
                                <span style={{ color: 'var(--color-accent-blue)' }}>{card.progress}%</span>
                            </div>
                            <div style={{
                                height: '2px',
                                background: 'var(--color-border)',
                                position: 'relative'
                            }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${card.progress}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, ease: "circOut" }}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        height: '100%',
                                        background: 'var(--color-accent-blue)',
                                        boxShadow: '0 0 8px var(--color-accent-glow)'
                                    }}
                                />
                                {/* HUD ticks on progress bar */}
                                <div style={{ position: 'absolute', right: 0, top: '-4px', width: '1px', height: '10px', background: 'var(--color-text-muted)' }} />
                                <div style={{ position: 'absolute', left: '50%', top: '-2px', width: '1px', height: '6px', background: 'var(--color-border)' }} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default EngineeringProgress;
