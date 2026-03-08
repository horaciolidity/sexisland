import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plane, 
  Palmtree, 
  Ship, 
  Dices, 
  Music, 
  Users, 
  MessageSquare, 
  ChevronRight,
  ShieldCheck,
  Star
} from 'lucide-react';
import GroupChat from './components/GroupChat';
import PlaneVisual from './components/PlaneVisual';
import './App.css';

function App() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 p-6 flex justify-between items-center glass-morphism" style={{ borderRadius: 0, borderTop: 0 }}>
        <div className="text-2xl font-black gold-text">SEX ISLAND <span className="text-sm font-light text-white ml-2">EXPERIENCE</span></div>
        <div className="hidden md:flex gap-8 items-center text-sm font-semibold">
          <a href="#about" className="hover:text-gold-400 transition">EL TOUR</a>
          <a href="#itinerary" className="hover:text-gold-400 transition">ITINERARIO</a>
          <a href="#chat" onClick={() => setShowChat(true)} className="hover:text-gold-400 transition">CHAT GRUPAL</a>
          <button className="btn-primary">RESERVAR AHORA</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-bg.png" 
            alt="Paradise Island" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#05070A]"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-black mb-4">
              <span className="block text-white">THE ULTIMATE</span>
              <span className="gold-text">V.I.P. TOUR</span>
            </h1>
            <p className="text-xl md:text-2xl text-dim mb-8">
              60 Mujeres · 30 Hombres · 7 Días de Lujo Absoluto
            </p>
            
            <PlaneVisual />

            <div className="flex flex-wrap justify-center gap-4 mt-12">
              <button className="btn-primary text-lg">RESERVA TU ASIENTO</button>
              <button className="px-8 py-3 rounded-full border border-white/20 hover:bg-white/10 transition backdrop-blur-md">
                VER EL CRUCERO
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#05070A]" id="about">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: <Users className="text-primary" />, label: "Invitados", val: "30" },
            { icon: <Star className="text-primary" />, label: "Chicas", val: "60" },
            { icon: <Palmtree className="text-primary" />, label: "Días", val: "7" },
            { icon: <Ship className="text-primary" />, label: "Hoteles", val: "5★" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              whileInView={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.8 }}
              className="text-center p-6 glass-morphism"
            >
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold">{stat.val}</div>
              <div className="text-xs text-dim uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <h2 className="text-center text-4xl font-black mb-16">TODO <span className="gold-text">INCLUIDO</span></h2>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <FeatureCard 
            title="CRUCERO & ISLA" 
            desc="Navega en un mega crucero privado hacia una isla paradisíaca secreta."
            icon={<Ship size={40} />}
            img="/luxury_private_island_cruise.png"
          />
          <FeatureCard 
            title="CASINO & FIESTAS" 
            desc="DJs internacionales y casinos privados cada noche del tour."
            icon={<Dices size={40} />}
            img="/luxury_casino_night_dj.png"
          />
          <FeatureCard 
            title="SÉ EL REY" 
            desc="Atención personalizada 24/7 y 60 mujeres dedicadas a tu diversión."
            icon={<ShieldCheck size={40} />}
            img="/hero-bg.png"
          />
        </div>
      </section>

      {/* Chat Overlay */}
      <AnimatePresence>
        {showChat && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-y-0 right-0 w-full md:w-96 z-[100]"
          >
            <GroupChat onClose={() => setShowChat(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Button */}
      {!showChat && (
        <button 
          onClick={() => setShowChat(true)}
          className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-2xl z-50 hover:scale-110 transition"
        >
          <MessageSquare color="black" />
        </button>
      )}

      <footer className="py-12 border-t border-white/5 text-center text-dim text-sm">
        <p>© 2026 SEX ISLAND EXPERIENCE - SOLO PARA V.I.P.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ title, desc, icon, img }) {
  return (
    <div className="relative group overflow-hidden rounded-2xl aspect-[4/5] glass-morphism">
      <img src={img} className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-110 opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      <div className="absolute bottom-0 p-8">
        <div className="text-primary mb-4">{icon}</div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-dim text-sm">{desc}</p>
      </div>
    </div>
  );
}

export default App;
