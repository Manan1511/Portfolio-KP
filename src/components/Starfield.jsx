import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Generate custom starfield with specific colors once, outside the component
// to avoid impure Math.random() calls during React render
const STAR_COUNT = 4000;
const positions = new Float32Array(STAR_COUNT * 3);
const colors = new Float32Array(STAR_COUNT * 3);

const colorObj = new THREE.Color();

for (let i = 0; i < STAR_COUNT; i++) {
    // Distribute stars in a sphere-like or box volume
    const r = 20 + Math.random() * 80;
    const theta = 2 * Math.PI * Math.random();
    const phi = Math.acos(2 * Math.random() - 1);

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    // Give ~15% of stars a bright yellow/orange hue
    if (Math.random() > 0.85) {
        // Variations of golden/yellow
        const hues = ['#FFD700', '#FFA500', '#FFFF66', '#FFDF00'];
        const randomHue = hues[Math.floor(Math.random() * hues.length)];
        colorObj.set(randomHue);
    } else {
        // White/slight blue tint for the rest
        if (Math.random() > 0.9) {
            colorObj.set('#CCFFFF');
        } else {
            colorObj.set('#FFFFFF');
        }
    }

    colorObj.toArray(colors, i * 3);
}

// --- Easter Egg: Procedural 3D Rocket ---
const EasterEggRocket = () => {
    const rocketRef = useRef(null);

    useFrame((state, delta) => {
        if (!rocketRef.current) return;
        // Slow tumble
        rocketRef.current.rotation.y += delta * 0.3;
        rocketRef.current.rotation.z += delta * 0.1;
        // Gentle bobbing motion (relative to group position)
        rocketRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    });

    const BODY_COLOR = '#94A3B8';
    const NOSE_COLOR = '#FF5722';
    const ENGINE_COLOR = '#0B132B';
    const GLOW_COLOR = '#00D4FF';
    const FIN_COLOR = '#94A3B8';

    return (
        <group ref={rocketRef} position={[5, -4, -12]} scale={1} rotation={[0.3, 0.5, -0.4]}>
            {/* Nose Cone */}
            <mesh position={[0, 3.2, 0]}>
                <coneGeometry args={[0.5, 1.5, 16]} />
                <meshStandardMaterial color={NOSE_COLOR} metalness={0.4} roughness={0.5} emissive={NOSE_COLOR} emissiveIntensity={0.3} />
            </mesh>

            {/* Body Tube */}
            <mesh position={[0, 1.0, 0]}>
                <cylinderGeometry args={[0.5, 0.5, 3, 16]} />
                <meshStandardMaterial color={BODY_COLOR} metalness={0.6} roughness={0.3} emissive={'#445566'} emissiveIntensity={0.2} />
            </mesh>

            {/* Engine Bell / Nozzle */}
            <mesh position={[0, -1.0, 0]}>
                <cylinderGeometry args={[0.5, 0.7, 0.8, 16]} />
                <meshStandardMaterial color={ENGINE_COLOR} metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Engine Glow (emissive inner ring) */}
            <mesh position={[0, -1.5, 0]}>
                <circleGeometry args={[0.55, 16]} />
                <meshStandardMaterial
                    color={GLOW_COLOR}
                    emissive={GLOW_COLOR}
                    emissiveIntensity={4}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Fin 1 */}
            <mesh position={[0.6, -0.6, 0]} rotation={[0, 0, -Math.PI / 6]}>
                <boxGeometry args={[0.6, 1.2, 0.05]} />
                <meshStandardMaterial color={FIN_COLOR} metalness={0.5} roughness={0.4} />
            </mesh>
            {/* Fin 2 */}
            <mesh position={[-0.6, -0.6, 0]} rotation={[0, 0, Math.PI / 6]}>
                <boxGeometry args={[0.6, 1.2, 0.05]} />
                <meshStandardMaterial color={FIN_COLOR} metalness={0.5} roughness={0.4} />
            </mesh>
            {/* Fin 3 */}
            <mesh position={[0, -0.6, 0.6]} rotation={[Math.PI / 6, 0, 0]}>
                <boxGeometry args={[0.05, 1.2, 0.6]} />
                <meshStandardMaterial color={FIN_COLOR} metalness={0.5} roughness={0.4} />
            </mesh>
            {/* Fin 4 */}
            <mesh position={[0, -0.6, -0.6]} rotation={[-Math.PI / 6, 0, 0]}>
                <boxGeometry args={[0.05, 1.2, 0.6]} />
                <meshStandardMaterial color={FIN_COLOR} metalness={0.5} roughness={0.4} />
            </mesh>

            {/* Subtle point light to self-illuminate */}
            <pointLight position={[0, -1.5, 0]} color={GLOW_COLOR} intensity={8} distance={15} />
        </group>
    );
};

export default function Starfield(props) {
    const mouseGroupRef = useRef(null);
    const starsGroupRef = useRef(null);

    useFrame((state, delta) => {
        // Continuous slow rotation
        if (starsGroupRef.current) {
            starsGroupRef.current.rotation.y += delta * 0.02;
            starsGroupRef.current.rotation.z += delta * 0.01;
        }

        // Parallax mouse effect
        if (mouseGroupRef.current) {
            const targetX = (state.pointer.x * Math.PI) / 10;
            const targetY = (state.pointer.y * Math.PI) / 10;

            mouseGroupRef.current.rotation.x = THREE.MathUtils.lerp(mouseGroupRef.current.rotation.x, -targetY, delta * 2);
            mouseGroupRef.current.rotation.y = THREE.MathUtils.lerp(mouseGroupRef.current.rotation.y, targetX, delta * 2);
        }
    });

    return (
        <group ref={mouseGroupRef} {...props}>
            <group ref={starsGroupRef}>
                <points>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            count={positions.length / 3}
                            array={positions}
                            itemSize={3}
                        />
                        <bufferAttribute
                            attach="attributes-color"
                            count={colors.length / 3}
                            array={colors}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    {/* Size 0.6 makes them highly visible as clear 'stars', sizeAttenuation ensures depth scaling */}
                    <pointsMaterial
                        size={0.6}
                        vertexColors={true}
                        transparent
                        opacity={0.9}
                        sizeAttenuation={true}
                    />
                </points>
            </group>

            {/* Hidden Easter Egg Rocket floating in the starfield */}
            <EasterEggRocket />
        </group>
    );
}
