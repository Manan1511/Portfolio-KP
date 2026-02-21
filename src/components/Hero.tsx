import React from 'react';
import OrbitalSimulation from './Canvas/OrbitalSimulation';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
    return (
        <section className="hero-section" style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
            {/* 3D Background */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                <OrbitalSimulation />
            </div>

            {/* Foreground Content */}
            <div
                className="container"
                style={{
                    position: 'relative',
                    zIndex: 1,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    pointerEvents: 'none' /* Let clicks pass through to canvas if needed, or explicitly enable on buttons */
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 style={{ fontSize: '4.5rem', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                        Krishna Patel
                    </h1>
                    <h2 style={{
                        fontSize: '1.8rem',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--color-accent-blue)',
                        fontWeight: 400,
                        marginBottom: '1.5rem'
                    }}>
                        Aspiring Rocket Engineer
                    </h2>

                    <motion.p
                        style={{
                            fontSize: '1.2rem',
                            color: 'var(--color-text-secondary)',
                            maxWidth: '600px',
                            fontFamily: 'var(--font-mono)',
                            lineHeight: 1.6
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        A Mechanical to Aerospace journey. Engineering robust solutions for the frontier of space exploration.
                    </motion.p>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem', pointerEvents: 'auto' }}>
                        <button
                            className="glass-panel"
                            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                            style={{
                                padding: '0.8rem 1.5rem',
                                color: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                border: '1px solid var(--color-accent-blue)',
                                background: 'rgba(59, 130, 246, 0.1)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)'}
                        >
                            Explore My Work
                            <ArrowDown size={18} />
                        </button>
                        <button
                            className="glass-panel"
                            onClick={() => document.getElementById('trajectory-map')?.scrollIntoView({ behavior: 'smooth' })}
                            style={{ padding: '0.8rem 1.5rem', color: 'var(--color-text-primary)' }}
                        >
                            My Engineering Journey
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Decorative Grid Gradient */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '40%',
                    background: 'linear-gradient(to top, var(--color-bg), transparent)',
                    zIndex: 0,
                    pointerEvents: 'none'
                }}
            />
        </section>
    );
};

export default Hero;
