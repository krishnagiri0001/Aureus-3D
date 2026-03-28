import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Stage, MeshDistortMaterial } from '@react-three/drei';
import { motion as motion3d } from 'framer-motion-3d';
import { motion as motion2d } from 'framer-motion';
import * as THREE from 'three';
import { Link } from 'react-router-dom';
import './GoldScene.css'; 

// --- Central Nucleus Component ---
const Nucleus = ({ isNano }) => {
  const distortRef = useRef();
  
  // Smoothly interpolate material properties based on state
  useFrame((state, delta) => {
    if (distortRef.current) {
      // Normal speed: 2, Nano speed: 8
      const targetSpeed = isNano ? 8 : 2;
      // Normal distort: 0.4, Nano distort: 0.8
      const targetDistort = isNano ? 0.8 : 0.4;
      
      distortRef.current.speed = THREE.MathUtils.lerp(distortRef.current.speed, targetSpeed, delta * 3);
      distortRef.current.distort = THREE.MathUtils.lerp(distortRef.current.distort, targetDistort, delta * 3);
    }
  });

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 30; i++) {
      const radius = 0.5;
      const x = (Math.random() - 0.5) * radius;
      const y = (Math.random() - 0.5) * radius;
      const z = (Math.random() - 0.5) * radius;
      temp.push([x, y, z]);
    }
    return temp;
  }, []);

  return (
    <motion3d.group
      initial={false}
      animate={{ 
        scale: isNano ? 2.5 : 1,
      }}
      transition={{ type: "spring", bounce: 0.2, duration: 2 }}
    >
      {particles.map((pos, i) => (
        <motion3d.mesh 
          key={i} 
          position={pos}
          animate={{
            scale: isNano ? Math.random() * 2 + 1 : 1,
          }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <sphereGeometry args={[0.15, 32, 32]} />
          <motion3d.meshPhysicalMaterial 
            animate={{ color: isNano ? "#cc0052" : "#FFD700" }}
            transition={{ duration: 1.5 }}
            metalness={1} 
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </motion3d.mesh>
      ))}
      <mesh>
        <sphereGeometry args={[0.6, 64, 64]} />
        <MeshDistortMaterial
          ref={distortRef}
          color={isNano ? "#e6005c" : "#FFC000"}
          envMapIntensity={2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.9}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </motion3d.group>
  );
};

// --- Single Orbital Path with Electrons ---
const Orbital = ({ radius, speed, electrons, rotationAxis, isNano }) => {
  const orbitalRef = useRef();
  
  useFrame(({ clock }) => {
    if (orbitalRef.current) {
      // In nano state, they spin wildly outward
      const currentSpeed = isNano ? speed * 8 : speed;
      orbitalRef.current.rotation.y = clock.getElapsedTime() * currentSpeed;
    }
  });

  return (
    <motion3d.group 
      rotation={rotationAxis}
      animate={{ 
        scale: isNano ? 5 : 1, // Explode outward
      }}
      transition={{ duration: 2, ease: "easeInOut" }}
    >
      {/* The Orbital Ring */}
      <motion3d.mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.015, 16, 100]} />
        <motion3d.meshBasicMaterial 
          animate={{ 
            color: isNano ? "#ff0066" : "#ffd700",
            opacity: isNano ? 0 : 0.3
          }}
          transparent
          transition={{ duration: 1 }}
        />
      </motion3d.mesh>
      
      {/* The Revolving Electrons */}
      <group ref={orbitalRef}>
        {Array.from({ length: electrons }).map((_, i) => {
          const angle = (i / electrons) * Math.PI * 2;
          return (
            <motion3d.mesh 
              key={i} 
              position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}
              animate={{ 
                scale: isNano ? 0 : 1 // Electrons vanish in plasmon cloud
              }}
              transition={{ duration: 1.5 }}
            >
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial 
                color="#FFFFFF" 
                emissive="#FFD700" 
                emissiveIntensity={2} 
                toneMapped={false}
              />
            </motion3d.mesh>
          );
        })}
      </group>
    </motion3d.group>
  );
};

// --- Gold Atom Compiling Nucleus and Orbitals ---
const GoldAtom = ({ isNano }) => {
  return (
    <Float speed={isNano ? 10 : 2} rotationIntensity={isNano ? 3 : 0.5} floatIntensity={isNano ? 3 : 1.5}>
      <Nucleus isNano={isNano} />
      {/* 6 distinct orbitals for Gold (rough Bohr model representation) */}
      <Orbital isNano={isNano} radius={1.5} speed={0.8} electrons={2} rotationAxis={[0.2, 0, 0.4]} />
      <Orbital isNano={isNano} radius={2.2} speed={0.6} electrons={8} rotationAxis={[-0.3, 0.1, 0.2]} />
      <Orbital isNano={isNano} radius={3.0} speed={0.5} electrons={18} rotationAxis={[0.5, 0.2, -0.1]} />
      <Orbital isNano={isNano} radius={4.0} speed={0.4} electrons={32} rotationAxis={[-0.4, -0.1, 0.5]} />
      <Orbital isNano={isNano} radius={5.0} speed={0.3} electrons={18} rotationAxis={[0.1, 0.5, 0.2]} />
      <Orbital isNano={isNano} radius={6.0} speed={0.2} electrons={1} rotationAxis={[0, 0.3, -0.4]} />
    </Float>
  );
};

// --- Main Layout Component ---
export default function GoldScene() {
  const [isNano, setIsNano] = useState(false);

  return (
    <div className="relative w-full min-h-screen bg-black overflow-x-hidden font-sans text-white scroll-smooth">
      
      {/* 3D Hero Section */}
      <div className="relative w-full h-[100vh]">
        {/* We constrain the 3D canvas to the upper 80% wrapper so the 3D model physically pivots higher on the screen, completely avoiding lower UI overlap! */}
        <motion2d.div 
          className="absolute inset-x-0 top-0 h-[82vh] z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }} shadows>
            <color attach="background" args={['#050505']} />
            <Stage environment="city" intensity={1} adjustCamera={0.85}>
              <GoldAtom isNano={isNano} />
            </Stage>
            <pointLight position={[10, 10, 10]} intensity={1.5} color={isNano ? "#cc0052" : "#FFD700"} />
            <ambientLight intensity={0.2} />
            <OrbitControls 
              enablePan={false}
              enableZoom={true}
              autoRotate 
              autoRotateSpeed={isNano ? 5.0 : 0.5}
              enableDamping 
              dampingFactor={0.05}
              maxDistance={25}
              minDistance={4}
            />
          </Canvas>
        </motion2d.div>

        {/* Floating Nano Transformation UI */}
        <div className="absolute bottom-16 left-0 right-0 z-20 flex flex-col items-center gap-6 pointer-events-none">
          <button
            onClick={() => setIsNano(!isNano)}
            className={`
              pointer-events-auto px-10 py-5 rounded-full font-black text-xl tracking-widest uppercase
              transition-all duration-700 transform hover:scale-105 hover:-translate-y-2
              ${isNano 
                ? 'bg-gradient-to-r from-pink-600 to-red-800 text-white shadow-[0_0_40px_rgba(204,0,82,0.8)] border border-pink-400' 
                : 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black shadow-[0_0_30px_rgba(255,215,0,0.5)] border border-yellow-300'}
            `}
          >
            {isNano ? "Revert to Single Atom" : "Transmute to Nanoparticle"}
          </button>
          
          <motion2d.button 
            onClick={() => document.getElementById('intro-content')?.scrollIntoView({ behavior: 'smooth' })}
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mt-6 flex flex-col items-center gap-2 text-gray-500 hover:text-white cursor-pointer pointer-events-auto transition-colors"
          >
            <span className="text-sm font-bold tracking-[0.3em] uppercase">Click to Discover</span>
            <span className="text-xl">↓</span>
          </motion2d.button>
        </div>
      </div>

      {/* --- Intro Text Section --- */}
      <div id="intro-content" className="relative z-10 w-full min-h-screen bg-[#050505] py-32 px-6 border-t border-gray-800">
        
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-gradient-to-b from-yellow-900/10 to-transparent blur-[100px] pointer-events-none rounded-full" />

        <div className="max-w-5xl mx-auto relative z-10">
          
          <motion2d.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-24 text-center"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600 tracking-tighter drop-shadow-lg">
              What is a Nanoparticle?
            </h2>
            <p className="text-xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
              When an inert block of bulk yellow gold is fractured scientifically until it is <span className="text-yellow-500 font-bold">a million times smaller</span> than a grain of sand, the fundamental laws of physics shatter.
            </p>
          </motion2d.div>

          <div className="grid md:grid-cols-2 gap-10 mb-24">
            {/* Box 1 */}
            <motion2d.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-black/80 backdrop-blur-md p-10 rounded-3xl border border-gray-800 hover:border-pink-500/50 shadow-2xl transition-colors group"
            >
              <div className="w-16 h-16 bg-pink-500/10 rounded-2xl flex items-center justify-center mb-8 border border-pink-500/30 group-hover:bg-pink-500/20 transition-all">
                <span className="text-pink-500 text-3xl font-black">?</span>
              </div>
              <h3 className="text-3xl font-black text-white mb-6">The Physical Scale</h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                A nanoparticle officially exists on a scale strictly between <strong className="text-pink-400 tracking-wide">1 and 100 nanometers</strong>. 
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                To put this profound scale into perspective: A single nanometer is roughly the width of a strand of human DNA. A gold nanoparticle is so incomprehensibly tiny that you could fit <strong className="text-white">100,000</strong> of them comfortably alongside the cross-section of a single human hair.
              </p>
            </motion2d.div>

            {/* Box 2 */}
            <motion2d.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-black/80 backdrop-blur-md p-10 rounded-3xl border border-gray-800 hover:border-cyan-500/50 shadow-2xl transition-colors group"
            >
              <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-8 border border-cyan-500/30 group-hover:bg-cyan-500/20 transition-all">
                <span className="text-cyan-500 text-3xl font-black">!</span>
              </div>
              <h3 className="text-3xl font-black text-white mb-6">The Paradigm Shift</h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                At this extreme 15nm level, gold entirely stops behaving like standard gold. Because of the massive <strong className="text-cyan-400 tracking-wide">Surface-to-Volume Ratio</strong> exposing nearly all atoms to the outside environment, it turns deeply ruby-red and becomes intensely reactive.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                It morphs from an inert jewelry metal into a hyper-powerful scientific tool used actively in targeted cancer delivery systems, viral biosensors, and advanced catalysis.
              </p>
            </motion2d.div>
          </div>

          <motion2d.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-center text-center max-w-3xl mx-auto"
          >
            <h3 className="text-4xl font-black text-white mb-10 tracking-tight">Ready to understand the Chemistry?</h3>
            <Link 
              to="/learn"
              className="px-12 py-6 rounded-full font-black text-xl tracking-widest uppercase transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-white/20 text-gray-100 bg-white/10 backdrop-blur-md hover:bg-white hover:text-black hover:border-white shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)]"
            >
              Enter the Data Laboratory
            </Link>
          </motion2d.div>

        </div>
      </div>

    </div>
  );
}
