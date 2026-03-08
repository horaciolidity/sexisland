import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Ship,
  Dices,
  ShieldCheck,
  MessageSquare,
  Hotel,
  UtensilsCrossed,
  Mic2,
  Gem,
  ArrowRight,
  ShieldAlert,
  CalendarDays,
  User as UserIcon,
  LogIn as LogInIcon,
  LogOut as LogOutIcon,
  Menu,
  X as XIcon,
  CreditCard,
  Wallet,
  Sparkles,
  Zap,
  Music,
  Crown,
  Heart,
  Camera,
  Star,
  Flame,
  ChevronLeft,
  ChevronRight,
  Tv,
  Bed,
  Eye
} from 'lucide-react';
import GroupChat from './components/GroupChat';
import PlaneVisual from './components/PlaneVisual';
import LoginModal from './components/LoginModal';
import UserPanel from './components/UserPanel';
import './App.css';

function App() {
  const [showChat, setShowChat] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showUserPanel, setShowUserPanel] = useState(false);
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setShowLogin(false);
    setShowUserPanel(true);
  };

  const handleLogout = () => {
    setUser(null);
    setShowUserPanel(false);
  };

  const navigationLinks = [
    { name: 'Santuario', href: '#experiencia' },
    { name: 'Stars VIP', href: '#modelos' },
    { name: 'Suites VIP', href: '#suites' },
    { name: 'Reservar', href: '#planes' },
  ];

  return (
    <div className="min-h-screen bg-[#05070A] text-white selection:bg-primary/30">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-[150] transition-all duration-700 px-8 ${scrolled
            ? 'py-4 glass-morphism border-0 border-b border-white/5 rounded-none'
            : 'py-8 bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-3xl font-black gold-text tracking-tighter italic font-serif">
            SANTUARIO <span className="text-[10px] font-bold text-white/20 not-italic ml-2 tracking-[0.4em]">ADULT RESERVE</span>
          </div>

          <div className="hidden lg:flex gap-12 items-center">
            {navigationLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[10px] font-black tracking-[0.4em] uppercase text-white/50 hover:text-primary transition-all relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-500"></span>
              </a>
            ))}
          </div>

          <div className="hidden lg:flex gap-8 items-center">
            {user ? (
              <div
                className="flex items-center gap-4 bg-white/5 px-5 py-2.5 rounded-2xl border border-white/10 cursor-pointer hover:bg-white/15 transition group"
                onClick={() => setShowUserPanel(true)}
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shadow-glow">
                  <UserIcon size={14} className="text-primary" />
                </div>
                <span className="text-[11px] font-black text-white leading-tight uppercase tracking-widest">{user.name}</span>
                <button onClick={(e) => { e.stopPropagation(); handleLogout(); }} className="text-white/20 hover:text-red-500 transition">
                  <LogOutIcon size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="text-[10px] font-black tracking-[0.4em] uppercase text-white/60 hover:text-white transition"
              >
                ACCESO VIP
              </button>
            )}
            <button
              className="px-8 py-3 rounded-xl bg-primary text-black font-black text-[10px] tracking-[0.2em] uppercase hover:scale-105 transition-all shadow-glow"
              onClick={() => setShowChat(true)}
            >
              CHAT SECRETO
            </button>
          </div>

          <button className="lg:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <XIcon size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-8">
        <div className="absolute inset-0 z-0">
          <img
            src="/sasha.png"
            className="w-full h-full object-cover opacity-70 mix-blend-screen grayscale hover:grayscale-0 transition-all duration-[3s] scale-105 hover:scale-100"
            alt="Elite Adult Sovereign Experience"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] via-[#05070A]/85 to-transparent"></div>
          <div className="absolute inset-x-0 h-96 top-0 bg-gradient-to-b from-[#05070A] to-transparent"></div>
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <div className="flex items-center justify-center gap-6 mb-8 uppercase tracking-[0.6em] text-[10px] text-primary font-black">
              <div className="w-12 h-[1px] bg-primary/30"></div>
              Sovereign Adult Experience
              <div className="w-12 h-[1px] bg-primary/30"></div>
            </div>

            <h1 className="text-7xl md:text-[11rem] font-black mb-12 leading-[0.8] tracking-tighter italic-luxury italic font-serif">
              BEYOND <br />
              <span className="gold-text font-serif">REALITY</span>
            </h1>

            <p className="text-xl md:text-3xl text-white/50 max-w-5xl mx-auto mb-20 leading-relaxed font-light font-serif">
              "Treinta leyendas, sesenta diosas. <br />
              Las estrellas del cine adulto más famosas del mundo se rinden ante usted."
            </p>

            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <button
                className="group px-12 py-7 rounded-2xl bg-primary text-black font-black text-xs tracking-[0.4em] uppercase hover:scale-[1.03] transition-all shadow-glow relative overflow-hidden"
                onClick={() => user ? setShowUserPanel(true) : setShowLogin(true)}
              >
                SOLICITAR INVITACIÓN <ArrowRight size={18} className="inline ml-3" />
              </button>
              <button className="px-12 py-7 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-xs tracking-[0.3em] uppercase hover:bg-white/10 transition-all">
                EXPLORAR EL PARAÍSO
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* STARS SECTION */}
      <section id="modelos" className="py-24 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-24">
            <span className="section-tag">ELENCO ESTELAR</span>
            <h2 className="text-6xl md:text-8xl font-black mb-8 gold-text italic-luxury font-serif">LAS STARS VIP</h2>
            <p className="text-white/40 text-2xl font-light max-w-3xl mx-auto italic font-serif py-4">
              "Usted las ha visto en pantalla. Aquí, usted es el protagonista."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <StarCard name="Sasha Grey" img="/sasha.png" vibe="THE LEGEND" desc="Un icono del cine adulto que redefine la elegancia y la audacia." />
            <StarCard name="Angela White" img="/angela.png" vibe="THE QUEEN" desc="Elegancia suprema y un magnetismo que domina el Santuario." />
            <StarCard name="Riley Reid" img="/riley.png" vibe="VIBRANT" desc="Energía pura e inagotable. La estrella de nuestras fiestas en alta mar." />
            <StarCard name="Lana Rhoades" img="/lana.png" vibe="ELITE" desc="Belleza cinematográfica seleccionada para los gustos más exigentes." />
            <StarCard name="Adriana Chechik" img="/adriana.png" vibe="WILD SOUL" desc="Adrenalina y audacia total para una experiencia sin límites." />
            <StarCard name="Abella Danger" img="/abella.png" vibe="POWERFUL" desc="Una presencia imponente que cautiva a todos los invitados." />
          </div>

          <div className="mt-20 text-center">
            <button className="px-12 py-6 rounded-2xl bg-primary/10 border border-primary/20 text-primary font-black text-xs tracking-[0.5em] uppercase hover:bg-primary hover:text-black transition-all group scale-110 shadow-glow">
              VER CATÁLOGO DE 60 ESTRELLAS <Flame size={18} className="inline ml-3 animate-pulse" />
            </button>
          </div>
        </div>
      </section>

      {/* SUITES VIP SECTION */}
      <section id="suites" className="py-40 bg-[#05070A] relative overflow-hidden border-y border-white/5">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col lg:flex-row gap-24 items-center">
            <div className="w-full lg:w-1/2 group">
              <div className="relative aspect-[4/5] rounded-[60px] overflow-hidden border border-primary/20 shadow-glow">
                <img src="/villa_suite.png" className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" alt="Luxury Suite" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-10 left-10 p-10 glass-morphism rounded-[40px] border-primary/20">
                  <Bed size={32} className="text-primary mb-4" />
                  <h3 className="text-2xl font-black uppercase mb-2">Suites de Éxtasis</h3>
                  <p className="text-sm text-white/40 italic font-serif">"Lencería de seda y camas King-Size diseñadas para la máxima expresión del deseo."</p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <span className="section-tag">Logística de Placer</span>
              <h2 className="text-6xl md:text-8xl font-black mb-10 leading-[0.9] uppercase tracking-tighter">EL DESCANSO <br /><span className="gold-text">DEL REY</span></h2>
              <p className="text-white/40 text-2xl font-light mb-12 leading-relaxed font-serif italic border-l-2 border-primary pl-8">
                Nuestras habitaciones han sido diseñadas para que la línea entre el sueño y la realidad desaparezca. Equipadas con lo mejor del diseño erótico mundial.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-8 glass-morphism rounded-3xl border-primary/10 group hover:border-primary transition-all duration-500">
                  <Heart size={24} className="text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="text-[10px] font-black uppercase tracking-widest mb-1">Camas Imperial</h4>
                  <p className="text-[8px] text-white/30 uppercase font-black">Confort sin precedentes.</p>
                </div>
                <div className="p-8 glass-morphism rounded-3xl border-primary/10 group hover:border-primary transition-all duration-500">
                  <Sparkles size={24} className="text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="text-[10px] font-black uppercase tracking-widest mb-1">Silk & Lace</h4>
                  <p className="text-[8px] text-white/30 uppercase font-black">Texturas que seducen.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLY SECTION */}
      <section id="vuelo" className="py-40 bg-black">
        <div className="max-w-5xl mx-auto text-center mb-24">
          <h2 className="text-6xl md:text-9xl font-black mb-10 gold-text italic tracking-tighter italic-luxury font-serif leading-none uppercase">Private Jet</h2>
        </div>
        <PlaneVisual />
      </section>

      {/* PRICING SECTION */}
      <section id="planes" className="py-40 px-8 bg-[#020305]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12 pt-10">
          <PlanCard
            name="Platinum Star"
            price="$5,200"
            features={["Vuelo Charter VVIP", "Suite Mar Deluxe", "Acceso Total Fiestas", "60 Estrellas Adultas", "Crédito Casino $500"]}
            onSelect={() => user ? setShowUserPanel(true) : setShowLogin(true)}
          />
          <PlanCard
            name="Diamond Imperial"
            price="$7,500"
            features={["Jet Privado Global First", "Villa Piscina Infinita", "Concierge Personalizado", "Casino Unlimited Pass", "Stage VIP con Estrellas", "Reserva Prioritaria"]}
            highlight
            onSelect={() => user ? setShowUserPanel(true) : setShowLogin(true)}
          />
          <PlanCard
            name="Sovereign Group"
            price="Custom"
            features={["Mansión Privada", "Seguridad Particular", "Chef de Élite", "Fiesta Privada Isla", "Logística Estelar Ilimitada"]}
            onSelect={() => user ? setShowUserPanel(true) : setShowLogin(true)}
          />
        </div>
      </section>

      {/* Overlays */}
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} onLogin={handleLogin} />
      <UserPanel isOpen={showUserPanel} onClose={() => setShowUserPanel(false)} user={user} onLogout={handleLogout} />

      <AnimatePresence>
        {showChat && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed inset-y-0 right-0 w-full md:w-[480px] z-[250] shadow-2xl">
            <GroupChat onClose={() => setShowChat(false)} user={user} />
          </motion.div>
        )}
      </AnimatePresence>

      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-12 right-12 w-20 h-20 rounded-[30px] bg-primary flex items-center justify-center shadow-glow z-[100] group pulse-gold"
        >
          <MessageSquare color="black" size={32} />
        </button>
      )}

      {/* Footer */}
      <footer className="pt-20 pb-10 border-t border-white/5 bg-black text-center">
        <div className="text-4xl font-black gold-text mb-4 italic-luxury font-serif">SANTUARIO</div>
        <p className="text-white/10 text-[10px] uppercase tracking-[0.6em]">ADULT RESERVE | PRIVATE GLOBAL ELITE © 2026</p>
      </footer>
    </div>
  );
}

function StarCard({ name, img, vibe, desc }) {
  return (
    <motion.div whileHover={{ y: -10 }} className="group relative rounded-[50px] overflow-hidden border border-white/10 hover:border-primary/40 transition-all duration-700 bg-black shadow-2xl">
      <div className="aspect-[4/6] overflow-hidden relative">
        <img src={img} className="w-full h-full object-cover transition-all duration-[2s] group-hover:scale-110" alt={name} />
        <div className="absolute inset-x-6 top-6 flex justify-between">
          <span className="px-4 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-black text-primary tracking-widest">{vibe}</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 group-hover:opacity-40 transition-opacity"></div>
      </div>
      <div className="p-10 relative -mt-32 z-10">
        <h3 className="text-4xl font-black text-white mb-4 italic font-serif leading-none tracking-tighter uppercase gold-text">{name}</h3>
        <p className="text-white/40 text-sm font-light leading-relaxed group-hover:text-white transition-colors duration-500">{desc}</p>
      </div>
    </motion.div>
  );
}

function PlanCard({ name, price, features, highlight, onSelect }) {
  return (
    <motion.div
      whileHover={{ y: -20, scale: 1.02 }}
      className={`relative p-12 rounded-[60px] flex flex-col transition-all duration-700 ${highlight
          ? 'bg-gradient-to-b from-[#0A0E14] to-black border-primary/30 shadow-2xl ring-1 ring-primary/20'
          : 'bg-black border-white/5 hover:border-white/20'
        } border`}
    >
      <div className="mb-14">
        <h3 className={`text-[10px] font-black uppercase tracking-[0.5em] mb-8 ${highlight ? 'text-primary' : 'text-white/40'}`}>{name}</h3>
        <div className="flex items-baseline gap-4">
          <span className="text-7xl font-black italic-luxury font-serif">{price}</span>
        </div>
      </div>
      <ul className="flex-1 space-y-7 mb-16">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-6 text-sm font-medium text-white/50">
            <div className={`w-1.5 h-1.5 rounded-full ${highlight ? 'bg-primary shadow-glow' : 'bg-white/20'}`} />
            {f}
          </li>
        ))}
      </ul>
      <button onClick={onSelect} className={`w-full py-6 rounded-3xl font-black text-xs uppercase tracking-[0.4em] transition-all relative overflow-hidden ${highlight ? 'bg-primary text-black' : 'bg-white/5 border border-white/10 text-white'}`}>
        RESERVAR ACCESO
      </button>
    </motion.div>
  );
}

export default App;
