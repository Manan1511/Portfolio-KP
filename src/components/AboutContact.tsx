import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';

const AboutContact: React.FC = () => {
    return (
        <>
            <section className="section container" id="about-contact" style={{ marginBottom: '4rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>

                    {/* Portrait/Illustration Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        style={{
                            position: 'relative',
                            aspectRatio: '3/4',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                            border: '1px solid var(--color-border)'
                        }}
                    >
                        <div style={{
                            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                            background: 'url(https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800) center/cover',
                            filter: 'grayscale(100%) contrast(1.1)',
                            opacity: 0.8
                        }} />
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(to top, var(--color-bg) 5%, transparent 60%)'
                        }} />
                    </motion.div>

                    {/* About Text & Contact */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>The Human Error</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                            <p>
                                My philosophy is simple: engineering is the systematic reduction of human error. It’s an iterative process of testing boundaries, failing safely, and modeling better solutions.
                            </p>
                            <p>
                                As an aspiring rocket engineer, I don't just want to build things that fly; I want to understand the intricate physical interactions that allow them to endure the most hostile environments known to humanity.
                            </p>
                            <p>
                                If you are working on something impossible, or just want to talk about propulsion systems and simulation parameters, let's connect.
                            </p>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem' }}>
                            <a href="mailto:krishna@example.com" style={{
                                display: 'flex', alignItems: 'center', gap: '0.8rem',
                                padding: '0.8rem 1.5rem',
                                borderRadius: '12px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid var(--color-border)',
                                transition: 'all 0.2s ease',
                            }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-text-primary)'; e.currentTarget.style.color = 'var(--color-bg)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'inherit'; }}
                            >
                                <Mail size={18} />
                                <span style={{ fontWeight: 500 }}>Email</span>
                            </a>
                            <a href="#" style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                width: '3.2rem', height: '3.2rem',
                                borderRadius: '12px',
                                background: 'rgba(59, 130, 246, 0.1)',
                                color: 'var(--color-accent-blue)',
                                border: '1px solid transparent',
                                transition: 'all 0.2s ease'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-accent-blue)'}
                                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
                            >
                                <Linkedin size={20} />
                            </a>
                            <a href="#" style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                width: '3.2rem', height: '3.2rem',
                                borderRadius: '12px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid var(--color-border)',
                                transition: 'all 0.2s ease'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
                            >
                                <Github size={20} />
                            </a>
                        </div>
                    </motion.div>

                </div>
            </section>

            {/* Footer */}
            <footer style={{
                padding: '4rem 1.5rem',
                borderTop: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                background: 'rgba(17,17,22,0.3)'
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.2rem',
                        fontStyle: 'italic',
                        color: 'var(--color-text-secondary)',
                        marginBottom: '1rem'
                    }}>
                        "Progress is not inevitable, it's engineered."
                    </p>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
                        © {new Date().getFullYear()} Krishna Patel. Designed for deep space.
                    </div>
                </motion.div>
            </footer>
        </>
    );
};

export default AboutContact;
