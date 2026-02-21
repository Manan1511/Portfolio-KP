import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Wind, Orbit, ExternalLink } from 'lucide-react';

const focusAreas = [
    {
        title: 'Aircraft Design',
        icon: <Plane size={32} color="var(--color-accent-blue)" strokeWidth={1.5} />,
        description: 'Conceptualizing fixed-wing layouts with an emphasis on weight optimization and structural integrity.'
    },
    {
        title: 'Aerodynamics',
        icon: <Wind size={32} color="var(--color-accent-orange)" strokeWidth={1.5} />,
        description: 'Fluid modeling, minimizing drag coefficient, and analyzing airflow separation in transonic regimes.'
    },
    {
        title: 'Space Systems',
        icon: <Orbit size={32} color="var(--color-text-primary)" strokeWidth={1.5} />,
        description: 'Orbital mechanics, propulsion efficiency, and the physics of interplanetary navigation.'
    }
];

const miniProjects = [
    {
        id: 1,
        title: 'Nozzle Flow Simulation',
        category: 'Theoretical Simulation',
        image: 'https://images.unsplash.com/photo-1541873676-a18131494184?auto=format&fit=crop&q=80&w=800',
        description: '1D compressible flow analysis of a converging-diverging rocket nozzle.'
    },
    {
        id: 2,
        title: 'CubeSat Frame CAD',
        category: 'CAD Model',
        image: 'https://images.unsplash.com/photo-1582650570701-081e8ebcc112?auto=format&fit=crop&q=80&w=800',
        description: 'Structural design of a 1U CubeSat chassis adhering to standard deployment constraints.'
    },
    {
        id: 3,
        title: 'Airfoil Lift Analysis',
        category: 'Manual Analysis',
        image: 'https://images.unsplash.com/photo-1559297434-fae8a1016aeb?auto=format&fit=crop&q=80&w=800',
        description: 'Vortex panel method applied to symmetric airfoils to estimate lift curves.'
    }
];

const AerospaceCuriosity: React.FC = () => {
    return (
        <section className="section hud-container" id="explorations" style={{ paddingLeft: 0, paddingRight: 0 }}>
            <motion.div
                className="hud-crosshair"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                style={{ marginBottom: '5rem', paddingLeft: '2rem' }}
            >
                <span style={{ color: 'var(--color-accent-blue)', fontFamily: 'var(--font-mono)', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem' }}>// INIT: Aerospace Vector</span>
                <h2 style={{ fontSize: '3rem', margin: '0.5rem 0 1rem 0', fontWeight: 500, letterSpacing: '-0.02em' }}>Curiosity & Explorations</h2>
                <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', fontSize: '1.1rem' }}>
                    My transition into aerospace is driven by a fascination with systems operating at the physical limits of materials and thermodynamics.
                </p>
            </motion.div>

            {/* Focus Areas - Asymmetrical HUD List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginBottom: '8rem', paddingLeft: '2rem' }}>
                {focusAreas.map((area, idx) => (
                    <motion.div
                        key={area.title}
                        className="raw-box snappy-hover"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                        style={{
                            padding: '1rem 0 1rem 1.5rem',
                            position: 'relative',
                            marginLeft: `${idx * 2}rem`,
                            maxWidth: '600px',
                            cursor: 'crosshair',
                            borderLeftColor: idx === 1 ? 'var(--color-accent-orange)' : 'var(--color-accent-blue)'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                            <div style={{ opacity: 0.8 }}>{area.icon}</div>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 500, fontFamily: 'var(--font-mono)', letterSpacing: '1px', textTransform: 'uppercase' }}>{area.title}</h3>
                        </div>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>{area.description}</p>

                        {/* Technical faint overlay text */}
                        <div style={{ position: 'absolute', top: '-1rem', right: '-2rem', opacity: 0.05, fontSize: '4rem', fontWeight: 700, pointerEvents: 'none', userSelect: 'none' }}>
                            0{idx + 1}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Mini Projects Grid - Bleeding images and overlapping text */}
            <div style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
                <h3 id="projects" style={{ fontSize: '2rem', marginBottom: '3rem', fontFamily: 'var(--font-mono)', letterSpacing: '2px', textTransform: 'uppercase' }}>[ Mini_Projects ]</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
                {miniProjects.map((project, idx) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        style={{
                            position: 'relative',
                            width: '100%',
                            display: 'flex',
                            flexDirection: idx % 2 === 0 ? 'row' : 'row-reverse',
                            alignItems: 'center',
                            justifyContent: 'flex-start'
                        }}
                    >
                        {/* Bleeding Background Image */}
                        <div
                            style={{
                                width: '80%',
                                height: '400px',
                                backgroundImage: `url(${project.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                filter: 'grayscale(100%) contrast(1.5) opacity(0.4)',
                                position: 'relative',
                                marginLeft: idx % 2 === 0 ? '-2rem' : '0',
                                marginRight: idx % 2 !== 0 ? '-2rem' : '0',
                                transition: 'filter 0.1s cubic-bezier(0, 0, 0.2, 1)'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.filter = 'grayscale(50%) contrast(1.2) opacity(0.8)'}
                            onMouseLeave={(e) => e.currentTarget.style.filter = 'grayscale(100%) contrast(1.5) opacity(0.4)'}
                        >
                            {/* Mechanical grid overlay on image */}
                            <div style={{
                                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                backgroundSize: '10px 10px',
                                backgroundImage: 'linear-gradient(to right, rgba(59,130,246,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(59,130,246,0.1) 1px, transparent 1px)',
                                pointerEvents: 'none'
                            }} />

                            {/* Overlapping Text Container */}
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                [idx % 2 === 0 ? 'right' : 'left']: '-10%',
                                width: '50%',
                                minWidth: '320px',
                                background: 'rgba(10, 10, 12, 0.95)',
                                padding: '2rem',
                                border: '1px solid var(--color-border)',
                                borderTop: `2px solid ${idx % 2 === 0 ? 'var(--color-accent-blue)' : 'var(--color-accent-orange)'}`,
                                zIndex: 10,
                                pointerEvents: 'auto'
                            }}>
                                <span style={{ fontSize: '0.85rem', color: idx % 2 === 0 ? 'var(--color-accent-blue)' : 'var(--color-accent-orange)', fontFamily: 'var(--font-mono)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                                    {project.category}
                                </span>
                                <h4 style={{ fontSize: '1.8rem', margin: '0.5rem 0 1rem 0' }}>{project.title}</h4>
                                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                                    {project.description}
                                </p>

                                <button
                                    className="snappy-hover"
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-primary)',
                                        fontFamily: 'var(--font-mono)', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px',
                                        background: 'transparent', border: 'none', cursor: 'crosshair', padding: 0
                                    }}
                                >
                                    <span>Access Terminal</span>
                                    <ExternalLink size={16} color={idx % 2 === 0 ? 'var(--color-accent-blue)' : 'var(--color-accent-orange)'} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default AerospaceCuriosity;
