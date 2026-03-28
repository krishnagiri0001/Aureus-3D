import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

/* --- Beautiful Math-Driven SVGs for the 5 Characterization Techniques --- */

const UVVisGraph = () => (
  <svg viewBox="0 0 800 450" className="w-full h-full drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]">
    <line x1="50" y1="350" x2="750" y2="350" stroke="#4B5563" strokeWidth="2" />
    <line x1="50" y1="50" x2="50" y2="350" stroke="#4B5563" strokeWidth="2" />
    <text x="400" y="420" fill="#9CA3AF" textAnchor="middle" className="text-sm font-mono tracking-widest">WAVELENGTH (nm)</text>
    <text x="20" y="200" fill="#9CA3AF" textAnchor="middle" className="text-sm font-mono tracking-widest" transform="rotate(-90 20,200)">ABSORBANCE (a.u.)</text>
    <motion.path
      d="M50,340 C300,340 350,80 400,80 C450,80 500,340 750,340"
      fill="none"
      stroke="#ec4899"
      strokeWidth="6"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    />
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}>
      <line x1="400" y1="80" x2="400" y2="350" stroke="#ec4899" strokeWidth="1" strokeDasharray="5,5" />
      <text x="400" y="55" fill="#ec4899" textAnchor="middle" className="font-bold font-mono">520 nm SPR Peak</text>
    </motion.g>
  </svg>
);

const TEMHistogram = () => {
  const bars = [5, 12, 28, 65, 95, 110, 90, 55, 20, 8, 2];
  return (
    <svg viewBox="0 0 800 450" className="w-full h-full drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]">
      {/* Grid Lines/Axes */}
      <line x1="60" y1="350" x2="740" y2="350" stroke="#4B5563" strokeWidth="2" />
      <text x="400" y="420" fill="#9CA3AF" textAnchor="middle" className="text-sm font-mono tracking-widest">DIAMETER (nm)</text>
      <text x="20" y="200" fill="#9CA3AF" textAnchor="middle" className="text-sm font-mono tracking-widest" transform="rotate(-90 20,200)">FREQUENCY</text>
      
      {/* Bars flipped perfectly upward to prevent any animation undershoot overlapping the text axes. */}
      <g transform="translate(0, 350) scale(1, -1)">
        {bars.map((height, i) => (
          <motion.rect
            key={i}
            x={110 + i * 50}
            y={0}
            width="35"
            fill="#06b6d4"
            initial={{ height: 0 }}
            animate={{ height: height * 2.5 }}
            transition={{ duration: 1.5, delay: i * 0.1, ease: "easeOut" }}
          />
        ))}
      </g>

      {/* X-axis tick marks safely below the y=350 axis line */}
      <text x="127.5" y="380" fill="#6B7280" textAnchor="middle" className="text-xs font-mono">10nm</text>
      <text x="377.5" y="380" fill="#06b6d4" textAnchor="middle" className="text-xs font-mono font-bold">15nm</text>
      <text x="627.5" y="380" fill="#6B7280" textAnchor="middle" className="text-xs font-mono">20nm</text>

      <motion.text 
        x="400" y="50" fill="#06b6d4" textAnchor="middle" className="font-bold font-mono text-xl"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
      >
        Mean Size: 14.8 ± 1.2 nm
      </motion.text>
    </svg>
  );
};

const EDSGraph = () => (
  <svg viewBox="0 0 800 450" className="w-full h-full drop-shadow-[0_0_15px_rgba(16,185,129,0.8)]">
    <line x1="50" y1="350" x2="750" y2="350" stroke="#4B5563" strokeWidth="2" />
    <text x="400" y="420" fill="#9CA3AF" textAnchor="middle" className="text-sm font-mono tracking-widest">ENERGY (keV)</text>
    <text x="20" y="200" fill="#9CA3AF" textAnchor="middle" className="text-sm font-mono tracking-widest" transform="rotate(-90 20,200)">INTENSITY</text>
    <motion.path
      d="M50,340 L150,340 L160,80 L170,340 L250,340 L260,150 L270,340 L750,340"
      fill="none"
      stroke="#10b981"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
    />
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 1 }}>
      <text x="160" y="60" fill="#10b981" textAnchor="middle" className="font-bold font-mono">Au Mα (2.12 keV)</text>
      <text x="260" y="130" fill="#10b981" textAnchor="middle" className="font-bold font-mono">Au Lα</text>
    </motion.g>
  </svg>
);

const FESEMGraph = () => (
  <svg viewBox="0 0 800 450" className="w-full h-full drop-shadow-[0_0_15px_rgba(245,158,11,0.8)]">
    <line x1="50" y1="350" x2="750" y2="350" stroke="#4B5563" strokeWidth="2" />
    <text x="400" y="420" fill="#9CA3AF" textAnchor="middle" className="text-sm font-mono tracking-widest">SCAN DISTANCE (nm)</text>
    <text x="20" y="200" fill="#9CA3AF" textAnchor="middle" className="text-sm font-mono tracking-widest" transform="rotate(-90 20,200)">TOPOGRAPHY HEIGHT (nm)</text>
    <motion.path
      d="M50,340 L250,340 A 50 120 0 0 1 350 340 A 65 160 0 0 1 480 340 A 45 90 0 0 1 570 340 L750,340"
      fill="none"
      stroke="#f59e0b"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 3, ease: "easeInOut" }}
    />
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 1 }} className="font-mono text-sm font-bold" fill="#f59e0b">
      <text x="300" y="120" textAnchor="middle">13nm Core</text>
      <text x="415" y="60" textAnchor="middle">16nm Core</text>
      <text x="525" y="150" textAnchor="middle">12nm Core</text>
    </motion.g>
  </svg>
);

const XRDGraph = () => (
  <svg viewBox="0 0 800 450" className="w-full h-full drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]">
    <line x1="50" y1="350" x2="750" y2="350" stroke="#4B5563" strokeWidth="2" />
    <text x="400" y="420" fill="#9CA3AF" textAnchor="middle" className="text-sm font-mono tracking-widest">2-THETA (Degrees)</text>
    <motion.path
      d="M50,340 L250,320 L260,60 L270,320 L350,330 L360,180 L370,330 L550,340 L560,250 L570,340 L650,340 L660,280 L670,340 L750,340"
      fill="none"
      stroke="#facc15"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2.5, ease: "easeOut" }}
    />
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 1 }} className="font-mono text-sm" fill="#facc15">
      <text x="260" y="45" textAnchor="middle">(111)</text>
      <text x="360" y="165" textAnchor="middle">(200)</text>
      <text x="560" y="235" textAnchor="middle">(220)</text>
      <text x="660" y="265" textAnchor="middle">(311)</text>
    </motion.g>
  </svg>
);

const DLSGraph = () => (
  <svg viewBox="0 0 800 450" className="w-full h-full drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">
    <line x1="50" y1="350" x2="750" y2="350" stroke="#4B5563" strokeWidth="2" />
    <text x="400" y="420" fill="#9CA3AF" textAnchor="middle" className="text-sm font-mono tracking-widest">HYDRODYNAMIC SIZE (d.nm)</text>
    <motion.path
      d="M50,340 C300,340 320,80 400,80 C480,80 500,340 750,340"
      fill="none"
      stroke="#a855f7"
      strokeWidth="6"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    />
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}>
      <line x1="400" y1="80" x2="400" y2="350" stroke="#a855f7" strokeWidth="1" strokeDasharray="5,5" />
      <text x="400" y="60" fill="#a855f7" textAnchor="middle" className="font-bold font-mono text-lg">Z-Average: 18.2 nm</text>
    </motion.g>
  </svg>
);

/* -------------------------------------------------------------------------- */

export default function CharacterizationPage() {
  const navigate = useNavigate();
  const [activeTech, setActiveTech] = useState(null);

  const techniques = [
    {
      acronym: "UV-Vis",
      title: "Ultraviolet-Visible Spectroscopy",
      color: "from-pink-500 to-rose-500",
      graphColor: "border-pink-500/30",
      description: "Think of it like a color-checker. When light hits gold nanoparticles, they absorb specific colors (like blue-green) and reflect others (ruby-red) because of Surface Plasmon Resonance (SPR). We use this graph to confirm their existence instantly in the lab.",
      techDetails: "A sharp peak exactly at 520 nm proves we successfully synthesized ~15nm red gold nanoparticles.",
      GraphComponent: UVVisGraph
    },
    {
      acronym: "TEM",
      title: "Transmission Electron Microscopy",
      color: "from-cyan-400 to-blue-500",
      graphColor: "border-cyan-500/30",
      description: "Imagine taking an X-ray of the nanoparticles to see their skeleton. We shoot a powerful electron beam directly straight through the sample. Since electrons are incredibly tiny, we get a super zoomed-in picture showing the exact 2D shape of the solid gold core.",
      techDetails: "Tells us the exact physical 'dry' diameter (around 15nm) and proves the particles are uniform spheres instead of random clumps.",
      GraphComponent: TEMHistogram
    },
    {
      acronym: "SEM",
      title: "Scanning Electron Microscopy",
      color: "from-green-400 to-emerald-600",
      graphColor: "border-emerald-500/30",
      buttonStyle: "bg-emerald-500 hover:bg-emerald-400",
      description: "Like shining a flashlight in a dark room to see the surface texture. The electron beam bounces off the surface, creating a 3D topographical map. The EDS attachment acts like a barcode scanner, identifying the exact chemical elements present.",
      techDetails: "Confirms the 3D surface shape, checks if the particles are clumping (agglomeration), and proves 100% pure elementary Gold via the Mα spike.",
      GraphComponent: EDSGraph
    },
    {
      acronym: "FESEM",
      title: "Field Emission SEM",
      color: "from-amber-400 to-orange-500",
      graphColor: "border-amber-500/30",
      buttonStyle: "bg-amber-500 hover:bg-amber-400",
      description: "If regular SEM is a flashlight, FESEM is a pinpoint laser pointer. It uses a cold-cathode 'field emission gun' firing an ultra-focused electron beam, eliminating severe charging artifacts and granting vastly superior spatial resolution without relying on conductive coatings.",
      techDetails: "Visually maps individual nanometer-scale spheres on a substrate in spectacular ultra-high definition, resolving particles that standard SEM would blur together into a single lump.",
      GraphComponent: FESEMGraph
    },
    {
      acronym: "XRD",
      title: "X-Ray Diffraction",
      color: "from-yellow-400 to-orange-500",
      graphColor: "border-yellow-500/30",
      description: "Every crystal has a unique molecular fingerprint. By firing X-rays at the dried gold powder, the rays scatter at specific angles (Bragg's Law). The pattern of these scattered rays tells us exactly how the gold atoms are stacked together.",
      techDetails: "The specific (111) and (200) peaks clearly prove these are Face-Centered Cubic (FCC) crystals, literally confirming 'This structure is gold'.",
      GraphComponent: XRDGraph
    },
    {
      acronym: "DLS",
      title: "Dynamic Light Scattering",
      color: "from-purple-400 to-indigo-500",
      graphColor: "border-purple-500/30",
      description: "When nanoparticles float in a liquid, they jitter around randomly (Brownian motion). We bounce a laser off them to measure how fast they jitter. Smaller particles move faster. This calculates the size of the whole particle including any liquid clinging to it.",
      techDetails: "Measures the Hydrodynamic Radius (the core + liquid coating). This number is inherently always slightly bigger than the TEM 'dry' size.",
      GraphComponent: DLSGraph
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans overflow-x-hidden relative selection:bg-cyan-500/30">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-gradient-to-b from-cyan-900/10 to-transparent blur-[120px] pointer-events-none rounded-full" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full p-6 z-50 backdrop-blur-md border-b border-gray-800/50 bg-[#050505]/60 flex flex-wrap gap-4 justify-between items-center">
        <div className="text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500">
          AuNP LABORATORY
        </div>
        <div className="flex gap-4">
          <button onClick={() => navigate('/learn')} className="text-sm px-5 py-2 rounded-full border border-gray-600 hover:border-pink-400 hover:text-pink-400 transition-colors bg-black/40">
            Back to Theory
          </button>
          <button onClick={() => navigate('/')} className="text-sm px-5 py-2 rounded-full border border-gray-600 hover:border-yellow-400 hover:text-yellow-400 transition-colors bg-black/40">
            Return to 3D Viewer
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="pt-32 pb-40 px-6 max-w-7xl mx-auto">
        
        <AnimatePresence mode="wait">
          {!activeTech ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-16">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 text-white">
                  Analytical <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Dashboard</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Click on an instrument below to enter the detailed data view and observe the real-time graphing simulation.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {techniques.map((tech, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -10, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTech(tech)}
                    className={`cursor-pointer group relative overflow-hidden rounded-2xl border ${tech.graphColor} bg-black/40 p-8 shadow-2xl transition-all duration-300`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    <h3 className="text-4xl font-black text-white mb-2">{tech.acronym}</h3>
                    <h4 className={`text-lg font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r ${tech.color}`}>
                      {tech.title}
                    </h4>
                    <p className="text-sm text-gray-400 line-clamp-3">{tech.description}</p>
                    <div className="mt-6 flex justify-end">
                      <span className={`text-xs uppercase tracking-widest font-bold px-4 py-2 rounded-full border border-white/20 group-hover:bg-white/10 transition-colors`}>
                        Analyze Data
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          ) : (

            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col lg:flex-row gap-12 items-stretch"
            >
              {/* Text/Info Panel */}
              <div className="w-full lg:w-1/3 flex flex-col pt-10">
                <button
                  onClick={() => setActiveTech(null)}
                  className="self-start mb-10 text-gray-400 hover:text-white flex items-center gap-2 group transition-colors"
                >
                  <span className="text-2xl group-hover:-translate-x-2 transition-transform">&larr;</span> 
                  <span className="font-bold tracking-widest uppercase text-sm">Return to Instruments</span>
                </button>

                <h2 className="text-6xl font-black text-white mb-2 tracking-tighter">{activeTech.acronym}</h2>
                <h3 className={`text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r ${activeTech.color}`}>
                  {activeTech.title}
                </h3>
                
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  {activeTech.description}
                </p>

                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mt-auto">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Key B.Tech Observation</h4>
                  <p className="text-gray-200 font-medium">
                    {activeTech.techDetails}
                  </p>
                </div>
              </div>

              {/* Animated Graph Panel */}
              <div className={`w-full lg:w-2/3 glass-card rounded-3xl border ${activeTech.graphColor} bg-black/60 shadow-2xl overflow-hidden flex flex-col`}>
                <div className={`w-full py-4 bg-gradient-to-r ${activeTech.color} px-8 opacity-90`}>
                  <h4 className="text-white font-mono font-bold tracking-widest text-sm uppercase">Real-time Spectral Output</h4>
                </div>
                
                <div className="flex-grow p-8 flex items-center justify-center relative bg-[#0a0a0a]">
                  <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-[0.03] pointer-events-none">
                     {Array.from({ length: 24 }).map((_, i) => <div key={i} className="border border-white" />)}
                  </div>
                  
                  <div className="w-full relative z-10 aspect-video md:aspect-[2/1]">
                    <activeTech.GraphComponent />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
      </div>
    </div>
  );
}
