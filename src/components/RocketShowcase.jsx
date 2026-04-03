import React, { useRef, useMemo, useCallback, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Rocket, Eye, RotateCcw } from 'lucide-react';

// ─────────────────────────────────────────
// Constants
// ─────────────────────────────────────────
const FUSE_HEIGHT = 7.2;
const FUSE_RADIUS = 0.56;
const RING_Y_POSITIONS = [1.0, 2.2, 3.6, 5.0, 6.2];
const FIN_ANGLES = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3];
const PLUME_COUNT = 320;
const LAUNCH_DURATION = 7.0;
const LAUNCH_END_Y = 38;

// ─────────────────────────────────────────
// Procedural Brushed-Metal Canvas Texture
// ─────────────────────────────────────────
function makeBrushedMetalTexture(w = 512, h = 512) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#c0c4c8';
  ctx.fillRect(0, 0, w, h);
  const STREAK_COUNT = 2200;
  for (let i = 0; i < STREAK_COUNT; i++) {
    const y = Math.random() * h;
    const alpha = 0.02 + Math.random() * 0.06;
    const bright = Math.random() > 0.5;
    ctx.strokeStyle = bright
      ? `rgba(255,255,255,${alpha})`
      : `rgba(60,60,80,${alpha})`;
    ctx.lineWidth = 0.5 + Math.random() * 1.2;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  const NOISE_COUNT = 400;
  for (let i = 0; i < NOISE_COUNT; i++) {
    const x = Math.random() * w;
    const alpha = 0.015 + Math.random() * 0.03;
    ctx.strokeStyle = `rgba(200,210,220,${alpha})`;
    ctx.lineWidth = 0.4;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 6);
  return tex;
}

function makePanelNormalMap(w = 512, h = 1024) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#8080ff';
  ctx.fillRect(0, 0, w, h);
  const panelColor = '#7070e8';
  ctx.strokeStyle = panelColor;
  ctx.lineWidth = 1.5;
  const PANEL_ROWS = 14;
  for (let i = 0; i <= PANEL_ROWS; i++) {
    const y = (i / PANEL_ROWS) * h;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  const PANEL_COLS = 6;
  for (let j = 0; j < PANEL_COLS; j++) {
    const x = (j / PANEL_COLS) * w;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 8);
  return tex;
}

// ─────────────────────────────────────────
// Exhaust Plume Component
// ─────────────────────────────────────────
function ExhaustPlume({ launchProgress }) {
  const pointsRef = useRef();

  const { positions, velocities, colors } = useMemo(() => {
    const pos = new Float32Array(PLUME_COUNT * 3);
    const col = new Float32Array(PLUME_COUNT * 3);
    const vels = [];

    for (let i = 0; i < PLUME_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.3;
      pos[i * 3 + 1] = -0.8 - Math.random() * 2.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
      vels.push({
        x: (Math.random() - 0.5) * 0.012,
        y: -(0.008 + Math.random() * 0.022),
        z: (Math.random() - 0.5) * 0.012,
        life: Math.random(),
        maxLife: 0.5 + Math.random() * 0.8,
      });
      col[i * 3] = 1.0;
      col[i * 3 + 1] = 0.3 + Math.random() * 0.4;
      col[i * 3 + 2] = 0.0;
    }

    return { positions: pos, velocities: vels, colors: col };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const colAttr = pointsRef.current.geometry.attributes.color;
    const pos = posAttr.array;
    const col = colAttr.array;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < PLUME_COUNT; i++) {
      const v = velocities[i];
      v.life += 0.016;
      if (v.life > v.maxLife) {
        pos[i * 3] = (Math.random() - 0.5) * 0.25;
        pos[i * 3 + 1] = -0.82;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 0.25;
        v.life = 0;
        v.maxLife = 0.5 + Math.random() * 0.8;
        v.x = (Math.random() - 0.5) * 0.012;
        v.y = -(0.008 + Math.random() * 0.022);
        v.z = (Math.random() - 0.5) * 0.012;
      } else {
        pos[i * 3] += v.x;
        pos[i * 3 + 1] += v.y;
        pos[i * 3 + 2] += v.z;
        v.x *= 1.018;
        v.z *= 1.018;
      }
      const lifeRatio = v.life / v.maxLife;
      col[i * 3] = 1.0;
      col[i * 3 + 1] = Math.max(0, 0.72 - lifeRatio * 0.9);
      col[i * 3 + 2] = Math.max(0, 0.2 - lifeRatio * 0.5);
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
    pointsRef.current.material.opacity = 0.65 + 0.12 * Math.sin(t * 5);
    pointsRef.current.material.size =
      launchProgress > 0 ? 0.16 + launchProgress * 0.1 : 0.12;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PLUME_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PLUME_COUNT}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.72}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// ─────────────────────────────────────────
// Stabilizer Fin Component
// ─────────────────────────────────────────
function StabilizerFin({ angle }) {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.lineTo(0, 1.7);
    s.lineTo(-1.2, 0.18);
    s.lineTo(-1.2, 0);
    s.closePath();
    return s;
  }, []);

  const extrudeSettings = useMemo(
    () => ({
      depth: 0.06,
      bevelEnabled: true,
      bevelSize: 0.014,
      bevelThickness: 0.014,
      bevelSegments: 2,
    }),
    []
  );

  return (
    <group rotation-y={angle}>
      <mesh
        position={[FUSE_RADIUS * 1.32, 0, -0.03]}
        castShadow
      >
        <extrudeGeometry args={[shape, extrudeSettings]} />
        <meshStandardMaterial
          color="#d4d8de"
          metalness={0.7}
          roughness={0.32}
          emissive="#1a2440"
          emissiveIntensity={0.15}
        />
      </mesh>
      {/* Red leading edge */}
      <mesh position={[FUSE_RADIUS * 1.32 + 0.012, 0.82, 0.0]}>
        <boxGeometry args={[0.045, 1.65, 0.09]} />
        <meshStandardMaterial
          color="#cc1a1a"
          metalness={0.5}
          roughness={0.45}
        />
      </mesh>
    </group>
  );
}

// ─────────────────────────────────────────
// Main Rocket Model
// ─────────────────────────────────────────
function RocketModel({ launchProgress, isLaunching }) {
  const rocketRef = useRef();
  const coreRef = useRef();
  const haloRef = useRef();
  const engineLightRef = useRef();

  const brushedTex = useMemo(() => makeBrushedMetalTexture(), []);
  const panelNormTex = useMemo(() => makePanelNormalMap(), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const pulse = 0.85 + 0.15 * Math.sin(t * 6.5);

    if (engineLightRef.current) {
      engineLightRef.current.intensity =
        isLaunching ? 5.5 * pulse : 3.2 * pulse;
    }
    if (coreRef.current) {
      coreRef.current.scale.setScalar(pulse);
    }
    if (haloRef.current) {
      haloRef.current.scale.setScalar(0.9 + 0.18 * Math.sin(t * 4.2));
    }

    if (rocketRef.current) {
      const eased = launchProgress * launchProgress;
      rocketRef.current.position.y = eased * LAUNCH_END_Y;
    }
  });

  return (
    <group ref={rocketRef}>
      {/* Main fuselage */}
      <mesh position-y={FUSE_HEIGHT / 2} castShadow>
        <cylinderGeometry
          args={[FUSE_RADIUS, FUSE_RADIUS * 1.04, FUSE_HEIGHT, 64, 32]}
        />
        <meshStandardMaterial
          map={brushedTex}
          normalMap={panelNormTex}
          normalScale={[0.35, 0.35]}
          metalness={0.7}
          roughness={0.32}
          color="#d4d8de"
          emissive="#1a2440"
          emissiveIntensity={0.15}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Upper transition taper */}
      <mesh position-y={FUSE_HEIGHT + 0.45} castShadow>
        <cylinderGeometry
          args={[FUSE_RADIUS * 0.72, FUSE_RADIUS, 0.9, 64, 8]}
        />
        <meshStandardMaterial
          map={brushedTex}
          normalMap={panelNormTex}
          normalScale={[0.35, 0.35]}
          metalness={0.7}
          roughness={0.32}
          color="#d4d8de"
          emissive="#1a2440"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Nosecone */}
      <mesh position-y={FUSE_HEIGHT + 0.9 + 1.3} castShadow>
        <coneGeometry args={[FUSE_RADIUS * 0.72, 2.6, 64, 16]} />
        <meshStandardMaterial
          color="#e0e4ea"
          metalness={0.75}
          roughness={0.2}
          emissive="#1a2a50"
          emissiveIntensity={0.12}
          envMapIntensity={1.6}
        />
      </mesh>

      {/* Nosecone tip */}
      <mesh position-y={FUSE_HEIGHT + 0.9 + 2.6 + 0.19}>
        <coneGeometry args={[0.06, 0.38, 32]} />
        <meshStandardMaterial
          color="#e0e4ea"
          metalness={0.75}
          roughness={0.2}
          emissive="#2a3a60"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Payload fairing stripe */}
      <mesh position-y={FUSE_HEIGHT + 0.9 + 0.06}>
        <cylinderGeometry
          args={[FUSE_RADIUS * 0.722, FUSE_RADIUS * 0.722, 0.12, 64]}
        />
        <meshStandardMaterial
          color="#cc1a1a"
          metalness={0.5}
          roughness={0.45}
        />
      </mesh>

      {/* Panel accent rings */}
      {RING_Y_POSITIONS.map((yp) => (
        <mesh key={yp} position-y={yp} rotation-x={Math.PI / 2}>
          <torusGeometry args={[FUSE_RADIUS * 1.012, 0.018, 16, 80]} />
          <meshStandardMaterial
            color="#1a1e26"
            metalness={0.7}
            roughness={0.4}
          />
        </mesh>
      ))}

      {/* Red accent band */}
      <mesh position-y={1.5}>
        <cylinderGeometry
          args={[FUSE_RADIUS * 1.015, FUSE_RADIUS * 1.015, 0.22, 64]}
        />
        <meshStandardMaterial
          color="#cc1a1a"
          metalness={0.5}
          roughness={0.45}
        />
      </mesh>

      {/* Second accent stripe */}
      <mesh position-y={5.4}>
        <cylinderGeometry
          args={[FUSE_RADIUS * 1.015, FUSE_RADIUS * 1.015, 0.12, 64]}
        />
        <meshStandardMaterial
          color="#cc1a1a"
          metalness={0.5}
          roughness={0.45}
        />
      </mesh>

      {/* Engine skirt */}
      <mesh position-y={0.41}>
        <cylinderGeometry
          args={[FUSE_RADIUS * 1.25, FUSE_RADIUS * 1.38, 0.82, 64, 4]}
        />
        <meshStandardMaterial
          map={brushedTex}
          normalMap={panelNormTex}
          normalScale={[0.35, 0.35]}
          metalness={0.7}
          roughness={0.32}
          color="#d4d8de"
          emissive="#1a2440"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Stabilizer fins */}
      {FIN_ANGLES.map((a, i) => (
        <StabilizerFin key={i} angle={a} />
      ))}

      {/* Engine nozzle bell */}
      <mesh position-y={-0.36}>
        <cylinderGeometry args={[0.28, 0.42, 0.72, 48, 8, true]} />
        <meshStandardMaterial
          color="#3a3a3a"
          metalness={0.95}
          roughness={0.22}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Nozzle rim */}
      <mesh position-y={-0.72} rotation-x={Math.PI / 2}>
        <torusGeometry args={[0.42, 0.028, 16, 60]} />
        <meshStandardMaterial
          color="#3a3a3a"
          metalness={0.95}
          roughness={0.22}
        />
      </mesh>

      {/* Nozzle throat ring */}
      <mesh position-y={0.0} rotation-x={Math.PI / 2}>
        <torusGeometry args={[0.28, 0.022, 16, 60]} />
        <meshStandardMaterial
          color="#3a3a3a"
          metalness={0.95}
          roughness={0.22}
        />
      </mesh>

      {/* Glowing engine core */}
      <mesh ref={coreRef} position-y={-0.8}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshBasicMaterial
          color={new THREE.Color(1.4, 0.55, 0.0)}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Glow halo */}
      <mesh ref={haloRef} position-y={-0.8}>
        <sphereGeometry args={[0.38, 32, 32]} />
        <meshBasicMaterial
          color={new THREE.Color(1.0, 0.35, 0.0)}
          transparent
          opacity={0.55}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Engine point light */}
      <pointLight
        ref={engineLightRef}
        position-y={-0.9}
        color="#ff6600"
        intensity={3.5}
        distance={4.5}
      />

      {/* Exhaust plume */}
      <ExhaustPlume launchProgress={launchProgress} />
    </group>
  );
}

// ─────────────────────────────────────────
// Launch Pad
// ─────────────────────────────────────────
function LaunchPad() {
  const LEG_COUNT = 4;
  return (
    <group>
      {/* Pad base */}
      <mesh position-y={-0.09} receiveShadow>
        <cylinderGeometry args={[1.8, 2.1, 0.18, 8]} />
        <meshStandardMaterial
          color="#2a2d35"
          metalness={0.6}
          roughness={0.55}
        />
      </mesh>

      {/* Support legs */}
      {Array.from({ length: LEG_COUNT }).map((_, i) => {
        const legA = (i / LEG_COUNT) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[
              Math.sin(legA) * 1.55,
              -0.55,
              Math.cos(legA) * 1.55,
            ]}
            rotation={[
              Math.cos(legA) * 0.22,
              0,
              Math.sin(legA) * 0.22,
            ]}
          >
            <cylinderGeometry args={[0.05, 0.07, 1.1, 8]} />
            <meshStandardMaterial
              color="#2a2d35"
              metalness={0.6}
              roughness={0.55}
            />
          </mesh>
        );
      })}

      {/* Ground disc */}
      <mesh position-y={-1.1} receiveShadow>
        <cylinderGeometry args={[9, 9, 0.04, 64]} />
        <meshStandardMaterial
          color="#111318"
          metalness={0.2}
          roughness={0.9}
        />
      </mesh>
    </group>
  );
}

// ─────────────────────────────────────────
// Stars Background (inside the 3D scene)
// ─────────────────────────────────────────
function Stars3D() {
  const STAR_COUNT = 1800;
  const positions = useMemo(() => {
    const pos = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 120 + Math.random() * 80;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={STAR_COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.22}
        sizeAttenuation
        transparent
        opacity={0.85}
      />
    </points>
  );
}

// ─────────────────────────────────────────
// Scene Lighting
// ─────────────────────────────────────────
function SceneLighting() {
  const keyLightRef = useRef();

  return (
    <>
      {/* Key light — warm sun-like */}
      <directionalLight
        ref={keyLightRef}
        color="#fff8f0"
        intensity={4.0}
        position={[8, 14, 6]}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={60}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={16}
        shadow-camera-bottom={-4}
        shadow-bias={-0.0005}
      />

      {/* Fill light — cool blue from opposite */}
      <directionalLight
        color="#8ab4d8"
        intensity={1.8}
        position={[-7, 6, -5]}
      />

      {/* Rim light — back highlight */}
      <directionalLight
        color="#c8e0ff"
        intensity={2.2}
        position={[-3, 10, -8]}
      />

      {/* Front fill — ensures rocket is visible from camera angle */}
      <directionalLight
        color="#e0e8ff"
        intensity={1.5}
        position={[4, 6, 12]}
      />

      {/* Ambient — brighter for overall visibility */}
      <ambientLight color="#2a3050" intensity={2.5} />

      {/* Ground bounce */}
      <pointLight
        color="#ff7722"
        intensity={1.0}
        distance={10}
        position={[0, -0.5, 0]}
      />
    </>
  );
}

// ─────────────────────────────────────────
// Camera Controller for Launch Sequence
// ─────────────────────────────────────────
const CAM_KEYFRAMES = [
  {
    t: 0.0,
    pos: new THREE.Vector3(6, 4, 12),
    target: new THREE.Vector3(0, 2, 0),
  },
  {
    t: 0.18,
    pos: new THREE.Vector3(5, 2, 11),
    target: new THREE.Vector3(0, 1, 0),
  },
  {
    t: 0.42,
    pos: new THREE.Vector3(4, 8, 10),
    target: new THREE.Vector3(0, 6, 0),
  },
  {
    t: 0.68,
    pos: new THREE.Vector3(3, 18, 9),
    target: new THREE.Vector3(0, 20, 0),
  },
  {
    t: 1.0,
    pos: new THREE.Vector3(2, 32, 7),
    target: new THREE.Vector3(0, 36, 0),
  },
];

function lerpKeyframes(kfs, t) {
  let a = kfs[0];
  let b = kfs[kfs.length - 1];
  for (let i = 0; i < kfs.length - 1; i++) {
    if (t >= kfs[i].t && t <= kfs[i + 1].t) {
      a = kfs[i];
      b = kfs[i + 1];
      break;
    }
  }
  const span = b.t - a.t || 1;
  const f = THREE.MathUtils.smoothstep((t - a.t) / span, 0, 1);
  return {
    pos: new THREE.Vector3().lerpVectors(a.pos, b.pos, f),
    target: new THREE.Vector3().lerpVectors(a.target, b.target, f),
  };
}

function CameraController({ isLaunching, launchProgress, controlsRef }) {
  const { camera } = useThree();

  useFrame(() => {
    if (!isLaunching || !controlsRef.current) return;
    const kf = lerpKeyframes(CAM_KEYFRAMES, launchProgress);
    camera.position.lerp(kf.pos, 0.06);
    controlsRef.current.target.lerp(kf.target, 0.06);
  });

  return null;
}

// ─────────────────────────────────────────
// Main Scene Component
// ─────────────────────────────────────────
function RocketScene({ isLaunching, launched, launchProgress, wireframe }) {
  const controlsRef = useRef();

  return (
    <>
      <color attach="background" args={['#050a14']} />
      <fog attach="fog" args={['#050a14', 30, 120]} />

      {/* Environment map for proper metallic reflections */}
      <Environment preset="night" />

      <SceneLighting />
      <Stars3D />

      <RocketModel
        launchProgress={launchProgress}
        isLaunching={isLaunching}
      />
      <LaunchPad />

      <CameraController
        isLaunching={isLaunching}
        launchProgress={launchProgress}
        controlsRef={controlsRef}
      />

      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.06}
        target={[0, 2, 0]}
        minDistance={4}
        maxDistance={40}
        enabled={!isLaunching}
      />
    </>
  );
}

// ─────────────────────────────────────────
// Exported Section Component
// ─────────────────────────────────────────
export default function RocketShowcase() {
  const [isLaunching, setIsLaunching] = useState(false);
  const [launched, setLaunched] = useState(false);
  const [launchProgress, setLaunchProgress] = useState(0);
  const [wireframe, setWireframe] = useState(false);
  const [telemetry, setTelemetry] = useState({ alt: 0, sec: 0 });
  const launchRef = useRef({ launching: false, progress: 0 });
  const animRef = useRef(null);

  const startLaunch = useCallback(() => {
    if (isLaunching || launched) return;
    setIsLaunching(true);
    launchRef.current = { launching: true, progress: 0 };
    let lastTime = performance.now();

    const tick = (now) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      launchRef.current.progress += dt / LAUNCH_DURATION;

      if (launchRef.current.progress >= 1.0) {
        launchRef.current.progress = 1.0;
        setLaunchProgress(1.0);
        setIsLaunching(false);
        setLaunched(true);

        const eased = 1;
        const altM = Math.round(eased * 3200);
        setTelemetry({ alt: altM, sec: Math.floor(LAUNCH_DURATION) });
        return;
      }

      setLaunchProgress(launchRef.current.progress);

      const eased =
        launchRef.current.progress * launchRef.current.progress;
      const altM = Math.round(eased * 3200);
      const sec = Math.floor(
        launchRef.current.progress * LAUNCH_DURATION
      );
      setTelemetry({ alt: altM, sec });

      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
  }, [isLaunching, launched]);

  const resetScene = useCallback(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    setLaunched(false);
    setIsLaunching(false);
    setLaunchProgress(0);
    setTelemetry({ alt: 0, sec: 0 });
    launchRef.current = { launching: false, progress: 0 };
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'l' || e.key === 'L') {
        if (!isLaunching && !launched) startLaunch();
      }
      if (e.key === 'r' || e.key === 'R') {
        if (launched) resetScene();
      }
      if (e.key === 'w' || e.key === 'W') {
        setWireframe((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLaunching, launched, startLaunch, resetScene]);

  return (
    <section
      id="rocket-showcase"
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', minHeight: '600px' }}
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="absolute top-0 left-0 right-0 z-20 pt-8 px-6 lg:px-12"
      >
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-2">
            <Rocket className="w-4 h-4 text-cyan" />
            <span className="text-cyan font-mono text-xs uppercase tracking-[0.2em]">
              Interactive 3D Model
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-off-white uppercase tracking-tight">
            Atlas-VII{' '}
            <span className="text-slate text-lg font-light block mt-1">
              Conceptual Launch Vehicle — Real-Time 3D Render
            </span>
          </h2>
        </div>
      </motion.div>

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          shadows
          camera={{ position: [6, 4, 12], fov: 45, near: 0.1, far: 500 }}
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.1,
          }}
          dpr={[1, 2]}
        >
          <RocketScene
            isLaunching={isLaunching}
            launched={launched}
            launchProgress={launchProgress}
            wireframe={wireframe}
          />
        </Canvas>
      </div>

      {/* HUD Controls Overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pb-6 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
          {/* Telemetry readout */}
          <div
            className="font-mono text-xs uppercase tracking-widest text-center transition-all duration-500"
            style={{
              color:
                isLaunching || launched
                  ? 'rgba(180,255,180,0.85)'
                  : 'rgba(180,210,255,0.0)',
            }}
          >
            T+00:{String(telemetry.sec).padStart(2, '0')} &nbsp;|&nbsp;
            ALT: {telemetry.alt}m &nbsp;|&nbsp;{' '}
            {launched ? 'MECO — MISSION COMPLETE' : 'NOMINAL'}
          </div>

          {/* Launch / Reset button */}
          {!isLaunching && (
            <button
              id="rocket-launch-btn"
              onClick={launched ? resetScene : startLaunch}
              className="hud-focus px-8 py-2.5 border border-orange/60 text-orange/90 font-mono text-xs uppercase tracking-[0.15em] cursor-pointer transition-all duration-300 hover:bg-orange/10 hover:border-orange backdrop-blur-sm bg-deep-space/40"
            >
              {launched ? 'Reset Scene  [R]' : 'Initiate Launch  [L]'}
            </button>
          )}

          {/* HUD hint bar */}
          <div className="font-mono text-[10px] tracking-widest uppercase text-center"
            style={{ color: 'rgba(180,210,255,0.45)' }}
          >
            Drag to Orbit &nbsp;|&nbsp; Scroll to Zoom &nbsp;|&nbsp;
            Right-Drag to Pan &nbsp;|&nbsp; [W] Wireframe
          </div>
        </div>
      </div>

      {/* Side Labels */}
      <div
        className="absolute top-8 right-6 lg:right-12 z-20 font-mono text-[10px] tracking-[0.15em] uppercase text-right hidden md:block"
        style={{ color: 'rgba(200,220,255,0.4)' }}
      >
        Atlas-VII / Launch Vehicle / Scale Model
      </div>

      {/* Wireframe indicator */}
      {wireframe && (
        <div className="absolute top-8 right-6 lg:right-12 z-20 mt-5">
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] uppercase"
            style={{ color: 'rgba(120,220,180,0.9)' }}
          >
            <Eye className="w-3 h-3" />
            Wireframe Mode
          </div>
        </div>
      )}

      {/* Decorative frame corners */}
      <div className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-cyan/20 z-10 pointer-events-none" />
      <div className="absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-cyan/20 z-10 pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-6 h-6 border-b-2 border-l-2 border-cyan/20 z-10 pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-cyan/20 z-10 pointer-events-none" />
    </section>
  );
}
