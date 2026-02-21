import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Generate random points in a sphere to simulate orbital particles
const generateParticles = (count: number) => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
        // Spherical distribution
        const radius = 10 + Math.random() * 5;
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos((Math.random() * 2) - 1);

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta); // x
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta); // y
        positions[i * 3 + 2] = radius * Math.cos(phi); // z

        // Subtle Aerospace Blue / Orange coloring
        const isBlue = Math.random() > 0.2;
        color.set(isBlue ? '#3b82f6' : '#f97316');
        color.toArray(colors, i * 3);
    }
    return { positions, colors };
};

const OrbitalField = () => {
    const ref = useRef<THREE.Points>(null);

    const particleCount = 1200;
    const { positions, colors } = useMemo(() => generateParticles(particleCount), [particleCount]);

    useFrame((state, delta) => {
        if (ref.current) {
            // Gentle constant rotation to simulate orbit
            ref.current.rotation.y -= delta * 0.05;
            ref.current.rotation.x -= delta * 0.02;

            // Mouse interactive sway
            const mouseX = (state.pointer.x * Math.PI) / 8;
            const mouseY = (state.pointer.y * Math.PI) / 8;
            ref.current.rotation.y += (mouseX - ref.current.rotation.y) * 0.02;
            ref.current.rotation.x += (mouseY - ref.current.rotation.x) * 0.02;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    vertexColors
                    size={0.08}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
            {/* Central subtle wireframe mesh for technical feel */}
            <mesh>
                <icosahedronGeometry args={[5, 1]} />
                <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.05} />
            </mesh>
        </group>
    );
};

const OrbitalSimulation: React.FC = () => {
    return (
        <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <OrbitalField />
        </Canvas>
    );
};

export default OrbitalSimulation;
