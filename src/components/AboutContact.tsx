import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';

const AboutContact: React.FC = () => {
    return (
        <>
            <section className="section hud-container" id="about-contact" style={{ marginBottom: '4rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>

                    {/* Gritty Workspace Image Placeholder */}
                    <motion.div
                        className="hud-crosshair"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        style={{
                            position: 'relative',
                            aspectRatio: '4/3',
                            border: '1px solid var(--color-border)',
                            padding: '0.5rem',
                            background: 'rgba(255,255,255,0.02)'
                        }}
                    >
                        <div style={{
                            width: '100%', height: '100%',
                            // Dark engineering workspace image
                            background: 'url(https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800) center/cover',
                            filter: 'grayscale(80%) sepia(20%) hue-rotate(180deg) contrast(1.2)',
                            opacity: 0.8
                        }} />
                        {/* Technical HUD overlay marks */}
                        <div style={{ position: 'absolute', top: '10px', left: '10px', width: '10px', height: '10px', borderLeft: '2px solid var(--color-accent-orange)', borderTop: '2px solid var(--color-accent-orange)' }} />
                        <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '10px', height: '10px', borderRight: '2px solid var(--color-accent-orange)', borderBottom: '2px solid var(--color-accent-orange)' }} />
                    </motion.div>

                    {/* About Text & Contact */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{ paddingLeft: '2rem' }}
                    >
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)', fontWeight: 500, letterSpacing: '-0.02em' }}>The_Human_Error</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                            <p>
                                My philosophy is simple: engineering is the systematic reduction of human error. It’s an iterative process of testing boundaries, failing safely, and modeling better solutions.
                            </p>
                            <p>
                                As an aspiring rocket engineer, I don't just want to build things that fly; I want to understand the intricate physical interactions that allow them to endure the most hostile environments known to humanity.
                            </p>
                            <p>
                                If you are working on something impossible, or just want to talk about propulsion systems and simulation parameters, establish a connection.
                            </p>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem' }}>
                            <a href="mailto:krishna@example.com" className="snappy-hover" style={{
                                display: 'flex', alignItems: 'center', gap: '0.8rem',
                                padding: '0.8rem 1.5rem',
                                border: '1px solid var(--color-accent-blue)',
                                color: 'var(--color-text-primary)'
                            }}>
                                <Mail size={18} color="var(--color-accent-blue)" />
                                <span style={{ fontWeight: 500, fontFamily: 'var(--font-mono)', letterSpacing: '1px', textTransform: 'uppercase' }}>Initialize_Comm</span>
                            </a>
                            <a href="#" className="snappy-hover" style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                width: '3.2rem', height: '3.2rem',
                                border: '1px solid var(--color-border)',
                                color: 'var(--color-text-primary)'
                            }}>
                                <Linkedin size={20} />
                            </a>
                            <a href="#" className="snappy-hover" style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                width: '3.2rem', height: '3.2rem',
                                border: '1px solid var(--color-border)',
                                color: 'var(--color-text-primary)'
                            }}>
                                <Github size={20} />
                            </a>
                        </div>
                    </motion.div>

                </div>
            </section>

            {/* Footer */}
            <footer style={{
                padding: '4rem 1.5rem',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1rem',
                        color: 'var(--color-text-muted)',
                        marginBottom: '1rem',
                        textTransform: 'uppercase',
                        letterSpacing: '2px'
                    }}>
                        "Progress is not inevitable, it's engineered."
                    </p>
                    <div style={{ color: 'var(--color-text-muted)', opacity: 0.5, fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
                        © {new Date().getFullYear()} Krishna_Patel // Designed for extreme environments.
                    </div>
                </motion.div>
            </footer>
        </>
    );
};

export default AboutContact;
