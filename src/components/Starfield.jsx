import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Generate custom starfield with specific colors once, outside the component
// to avoid impure Math.random() calls during React render
const count = 4000;
const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);

const colorObj = new THREE.Color();

for (let i = 0; i < count; i++) {
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
        </group>
    );
}
