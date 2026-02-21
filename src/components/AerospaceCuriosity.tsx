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
        <section className="section container" id="explorations">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                style={{ marginBottom: '4rem' }}
            >
                <span style={{ color: 'var(--color-accent-blue)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem' }}>Why Aerospace?</span>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', marginTop: '0.5rem' }}>Curiosity & Explorations</h2>
                <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px' }}>
                    My transition into aerospace is driven by a fascination with systems operating at the physical limits of materials and thermodynamics.
                </p>
            </motion.div>

            {/* Focus Areas */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '5rem' }}>
                {focusAreas.map((area, idx) => (
                    <motion.div
                        key={area.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        style={{
                            padding: '2rem',
                            border: '1px solid var(--color-border)',
                            borderRadius: '16px',
                            background: 'linear-gradient(135deg, rgba(17,17,22,0.8) 0%, rgba(17,17,22,0.2) 100%)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Blueprint grid background element */}
                        <div style={{
                            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                            backgroundSize: '20px 20px',
                            backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)',
                            zIndex: 0, pointerEvents: 'none'
                        }} />

                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{ marginBottom: '1.5rem', opacity: 0.8 }}>{area.icon}</div>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>{area.title}</h3>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>{area.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Mini Projects Grid */}
            <h3 id="projects" style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Mini Projects</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                {miniProjects.map((project, idx) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        whileHover="hover"
                        style={{
                            borderRadius: '16px',
                            overflow: 'hidden',
                            position: 'relative',
                            border: '1px solid var(--color-border)',
                            cursor: 'pointer',
                            aspectRatio: '16/10'
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                backgroundImage: `url(${project.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                filter: 'grayscale(80%) contrast(1.2)'
                            }}
                        />
                        {/* Dark overlay */}
                        <div style={{
                            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                            background: 'linear-gradient(to top, rgba(10,10,12,0.9) 0%, rgba(10,10,12,0.3) 100%)',
                            transition: 'background 0.3s ease'
                        }} />

                        {/* Hover Content */}
                        <motion.div
                            variants={{
                                hover: { y: 0, opacity: 1 }
                            }}
                            initial={{ y: 20, opacity: 0.8 }}
                            style={{
                                position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '2rem',
                                display: 'flex', flexDirection: 'column', gap: '0.5rem'
                            }}
                        >
                            <span style={{ fontSize: '0.8rem', color: 'var(--color-accent-blue)', fontFamily: 'var(--font-mono)' }}>{project.category}</span>
                            <h4 style={{ fontSize: '1.4rem' }}>{project.title}</h4>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>{project.description}</p>

                            <motion.div
                                variants={{
                                    hover: { opacity: 1, x: 0 }
                                }}
                                initial={{ opacity: 0, x: -10 }}
                                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-primary)' }}
                            >
                                <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>View Details</span>
                                <ExternalLink size={16} />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default AerospaceCuriosity;
