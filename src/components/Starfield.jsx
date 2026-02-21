import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

export default function Starfield(props) {
    const mouseGroupRef = useRef(null);
    const starsGroupRef = useRef(null);

    useFrame((state, delta) => {
        // 1. Continuous slow rotation for the stars
        if (starsGroupRef.current) {
            starsGroupRef.current.rotation.y += delta * 0.02;
            starsGroupRef.current.rotation.z += delta * 0.01;
        }

        // 2. Extremely smooth, damped mouse parallax on the wrapper
        if (mouseGroupRef.current) {
            // Small movement range so it feels distant and subtle
            const targetX = (state.pointer.x * Math.PI) / 8;
            const targetY = (state.pointer.y * Math.PI) / 8;

            // Use time-corrected lerp for buttery smooth movement that doesn't jitter
            mouseGroupRef.current.rotation.x = THREE.MathUtils.lerp(mouseGroupRef.current.rotation.x, -targetY, delta * 2);
            mouseGroupRef.current.rotation.y = THREE.MathUtils.lerp(mouseGroupRef.current.rotation.y, targetX, delta * 2);
        }
    });

    return (
        <group ref={mouseGroupRef} {...props}>
            <group ref={starsGroupRef}>
                <Stars
                    radius={50}
                    depth={50}
                    count={4000}
                    factor={3}
                    saturation={1.5}
                    fade
                    speed={1}
                />
            </group>
        </group>
    );
}
