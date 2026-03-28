import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const FadeInSection = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default function LearnPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans overflow-x-hidden relative selection:bg-pink-500/30">
      
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-gradient-to-b from-yellow-500/10 to-transparent blur-[120px] pointer-events-none rounded-full" />

      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full p-6 z-50 backdrop-blur-md border-b border-gray-800/50 bg-[#050505]/60 flex justify-between items-center">
        <div className="text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600">
          AuNP EXPLORER
        </div>
        <button 
          onClick={() => navigate('/')}
          className="text-sm px-5 py-2 rounded-full border border-gray-600 hover:border-yellow-400 hover:text-yellow-400 transition-colors bg-black/40"
        >
          Return to 3D Visualizer
        </button>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 max-w-5xl mx-auto flex flex-col items-center text-center">
        <motion.h1 
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          Beyond the <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500">Noble Metal</span>
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-400 max-w-2xl leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Gold (Au, Atomic Number 79) behaves predictably at the macro scale. But when stripped down to dimensions of 1 to 100 nanometers, the laws of classical physics yield to quantum mechanics.
        </motion.p>
      </section>

      <div className="space-y-32 pb-32 px-6 max-w-5xl mx-auto">
        
        {/* Section 1: The Nano Shift */}
        <FadeInSection>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">The Nano Shift</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-pink-500 rounded" />
              <p className="text-gray-400 leading-relaxed text-lg">
                Why does shrinking matter? The answer lies in the <strong className="text-gray-200">Surface-Area-to-Volume Ratio</strong>. As a particle gets smaller, the percentage of atoms situated on its surface exponentially increases. 
              </p>
              <p className="text-gray-400 leading-relaxed text-lg">
                Because surface atoms have fewer rigid bonds, they vibrate intensely and become highly chemically reactive, transforming inert yellow gold into an unstable, fiercely reactive nanocluster.
              </p>
            </div>
            {/* Visual Callout Box */}
            <div className="bg-gray-900/40 p-10 rounded-3xl border border-gray-800 shadow-2xl relative overflow-hidden group hover:border-pink-500/50 transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-pink-500/5" />
              <h3 className="text-6xl font-black text-white/10 absolute -right-4 -bottom-4 group-hover:text-white/20 transition-colors font-mono">10⁻⁹</h3>
              <ul className="relative z-10 space-y-4 text-gray-300">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-yellow-400" /> Lower Melting Point
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-pink-400" /> Massive Catalytic Activity
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-purple-400" /> Quantum Size Effects
                </li>
              </ul>
            </div>
          </div>
        </FadeInSection>

        {/* Section 2: SPR */}
        <FadeInSection>
          <div className="glass-card !bg-black/40 !border-pink-500/30 p-10 md:p-14 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-pink-600/10 rounded-full blur-[80px]" />
            <div className="relative z-10 w-full md:w-2/3 space-y-6">
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-400">
                Surface Plasmon Resonance (SPR)
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                When electromagnetic radiation (light) strikes a gold nanoparticle, the free conduction electrons on the particle's surface form an electron cloud, known as a <em>plasmon</em>.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                This plasmon begins oscillating synchronously in resonance with the incoming light frequency. In 10-20nm gold particles, this resonance powerfully absorbs visible blue-green light (~520nm), causing the particles to scatter a distinctive, brilliant <strong className="text-pink-400">Ruby Red</strong> or deep purple color.
              </p>
            </div>
          </div>
        </FadeInSection>

        {/* Section 3: Applications Engineeering */}
        <FadeInSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Engineering Chemistry Applications</h2>
            <p className="text-gray-400">How we utilize AuNPs across scientific disciplines.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Nanomedicine", desc: "Gold core stability combined with easy surface functionalization allows them to carry targeted drug molecules directly to tumor cells for photothermal therapy.", color: "from-red-500/20 to-pink-500/5", border: "border-pink-500/20" },
              { title: "Catalysis", desc: "AuNPs deposited on oxide supports (like TiO2) demonstrate phenomenal catalytic activity for low-temperature CO oxidation and pollution control.", color: "from-yellow-500/20 to-orange-500/5", border: "border-yellow-500/20" },
              { title: "Characterization", desc: "Analyzed primarily via UV-Vis Spectroscopy (using the SPR curve peak), XRD (for crystal lattice structure), and TEM (for morphological sizing).", color: "from-blue-500/20 to-cyan-500/5", border: "border-cyan-500/20" },
            ].map((card, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className={`p-8 rounded-2xl bg-gradient-to-b ${card.color} border ${card.border} backdrop-blur-sm`}
              >
                <h3 className="text-xl font-bold mb-3 text-white">{card.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </FadeInSection>

        {/* Final CTA */}
        <FadeInSection delay={0.2}>
          <div className="text-center mt-20 flex flex-col md:flex-row justify-center items-center gap-6">
            <button 
              onClick={() => navigate('/characterization')}
              className="px-10 py-5 rounded-full font-bold text-lg tracking-wider text-black bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_40px_rgba(34,211,238,0.3)] hover:scale-105 transition-transform"
            >
              CONTINUE TO CHARACTERIZATION
            </button>
            <button 
              onClick={() => navigate('/')}
              className="px-10 py-5 rounded-full font-bold text-lg tracking-wider text-black bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-[0_0_40px_rgba(255,215,0,0.3)] hover:scale-105 transition-transform"
            >
              RETURN TO 3D SIMULATION
            </button>
          </div>
        </FadeInSection>
        
      </div>
    </div>
  );
}
