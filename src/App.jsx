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
      {/* Desktop Navigation */}
      <nav
        className={`fixed top-0 w-full z-[150] transition-all duration-700 px-4 md:px-8 hidden lg:block ${scrolled
          ? 'py-4 glass-morphism border-0 border-b border-white/5 rounded-none'
          : 'py-8 bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl md:text-3xl font-black gold-text tracking-tighter italic font-serif">
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
        </div>
      </nav>

      {/* Mobile Top Header */}
      <nav className={`lg:hidden fixed top-0 w-full z-[150] transition-all duration-500 px-6 ${scrolled ? 'py-4 glass-morphism' : 'py-6'}`}>
        <div className="flex justify-between items-center">
          <div className="text-xl font-black gold-text tracking-tighter italic font-serif">
            SANTUARIO
          </div>
          <div className="flex gap-4 items-center">
            {user ? (
              <div
                className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shadow-glow"
                onClick={() => setShowUserPanel(true)}
              >
                <UserIcon size={18} className="text-primary" />
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="text-[9px] font-black tracking-widest uppercase text-white/60 bg-white/5 px-4 py-2 rounded-lg border border-white/10"
              >
                ACCESO VIP
              </button>
            )}
            <button className="p-2 text-white/80" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <XIcon size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[140] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center lg:hidden"
          >
            <div className="flex flex-col gap-8 text-center">
              {navigationLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-black tracking-[0.3em] uppercase text-white/40 hover:text-primary transition-all"
                >
                  {link.name}
                </a>
              ))}
              <div className="h-[1px] w-40 bg-white/10 mx-auto my-4"></div>
              <button
                className="px-10 py-5 rounded-2xl bg-primary text-black font-black text-xs tracking-[0.2em] uppercase"
                onClick={() => { setShowChat(true); setMobileMenuOpen(false); }}
              >
                CHAT SECRETO
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation (Mobile App Feel) */}
      <div className="lg:hidden fixed bottom-12 left-0 right-0 z-[150] px-6 pointer-events-none">
        <div className="glass-morphism rounded-3xl border-white/10 flex justify-around items-center h-16 pointer-events-auto bg-black/40 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <BottomNavItem icon={<Ship size={20} />} label="Inicio" href="#" />
          <BottomNavItem icon={<Star size={20} />} label="Stars" href="#modelos" />
          <BottomNavItem icon={<CreditCard size={20} />} label="Planes" href="#planes" />
          <BottomNavItem icon={<MessageSquare size={20} />} label="Chat" onClick={() => setShowChat(true)} />
          <BottomNavItem icon={<UserIcon size={20} />} label="YO" onClick={() => user ? setShowUserPanel(true) : setShowLogin(true)} />
        </div>
      </div>

      {/* Hero Section */}
      <header className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-20 px-6 md:px-8">
        <div className="absolute inset-0 z-0">
          <img
            src="/sasha.png"
            className="w-full h-full object-cover opacity-60 md:opacity-70 mix-blend-screen grayscale hover:grayscale-0 transition-all duration-[3s] scale-110 md:scale-105"
            alt="Elite Adult Sovereign Experience"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] via-[#05070A]/85 to-transparent"></div>
          <div className="absolute inset-x-0 h-48 md:h-96 top-0 bg-gradient-to-b from-[#05070A] to-transparent"></div>
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <div className="flex items-center justify-center gap-4 md:gap-6 mb-6 md:mb-8 uppercase tracking-[0.4em] md:tracking-[0.6em] text-[8px] md:text-[10px] text-primary font-black">
              <div className="w-8 md:w-12 h-[1px] bg-primary/30"></div>
              Sovereign Adult Experience
              <div className="w-8 md:w-12 h-[1px] bg-primary/30"></div>
            </div>

            <h1 className="text-5xl md:text-8xl lg:text-[11rem] font-black mb-6 md:mb-12 leading-[1] md:leading-[0.8] tracking-tighter italic-luxury italic font-serif">
              BEYOND <br />
              <span className="gold-text font-serif">REALITY</span>
            </h1>

            <p className="text-lg md:text-2xl lg:text-3xl text-white/50 max-w-5xl mx-auto mb-12 md:mb-20 leading-relaxed font-light font-serif px-4">
              "Treinta leyendas, sesenta diosas. <br className="hidden md:block" />
              Las estrellas del cine adulto más famosas del mundo se rinden ante usted."
            </p>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-8 justify-center items-center px-4">
              <button
                className="w-full sm:w-auto group px-8 md:px-12 py-5 md:py-7 rounded-2xl bg-primary text-black font-black text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase hover:scale-[1.03] transition-all shadow-glow relative overflow-hidden"
                onClick={() => user ? setShowUserPanel(true) : setShowLogin(true)}
              >
                SOLICITAR INVITACIÓN <ArrowRight size={18} className="inline ml-2 md:ml-3" />
              </button>
              <button className="w-full sm:w-auto px-8 md:px-12 py-5 md:py-7 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase hover:bg-white/10 transition-all">
                EXPLORAR EL PARAÍSO
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* STARS SECTION */}
      <section id="modelos" className="py-16 md:py-24 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16 md:mb-24">
            <span className="section-tag">ELENCO ESTELAR</span>
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-black mb-6 md:mb-8 gold-text italic-luxury font-serif">LAS STARS VIP</h2>
            <p className="text-white/40 text-lg md:text-2xl font-light max-w-3xl mx-auto italic font-serif py-2 md:py-4 px-4">
              "Usted las ha visto en pantalla. Aquí, usted es el protagonista."
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            <StarCard name="Sasha Grey" img="/sasha.png" vibe="THE LEGEND" desc="Un icono del cine adulto que redefine la elegancia y la audacia." />
            <StarCard name="Angela White" img="/angela.png" vibe="THE QUEEN" desc="Elegancia suprema y un magnetismo que domina el Santuario." />
            <StarCard name="Riley Reid" img="/riley.png" vibe="VIBRANT" desc="Energía pura e inagotable. La estrella de nuestras fiestas en alta mar." />
            <StarCard name="Lana Rhoades" img="/lana.png" vibe="ELITE" desc="Belleza cinematográfica seleccionada para los gustos más exigentes." />
            <StarCard name="Adriana Chechik" img="/adriana.png" vibe="WILD SOUL" desc="Adrenalina y audacia total para una experiencia sin límites." />
            <StarCard name="Abella Danger" img="/abella.png" vibe="POWERFUL" desc="Una presencia imponente que cautiva a todos los invitados." />
          </div>

          <div className="mt-12 md:mt-20 text-center px-4">
            <button className="w-full sm:w-auto px-8 md:px-12 py-5 md:py-6 rounded-2xl bg-primary/10 border border-primary/20 text-primary font-black text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] uppercase hover:bg-primary hover:text-black transition-all group md:scale-110 shadow-glow">
              VER CATÁLOGO DE 60 ESTRELLAS <Flame size={18} className="inline ml-2 md:ml-3 animate-pulse" />
            </button>
          </div>
        </div>
      </section>

      {/* SUITES VIP SECTION */}
      <section id="suites" className="py-24 md:py-40 bg-[#05070A] relative overflow-hidden border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col lg:flex-row gap-16 md:gap-24 items-center">
            <div className="w-full lg:w-1/2 group order-2 lg:order-1">
              <div className="relative aspect-[4/5] md:aspect-[4/5] rounded-[40px] md:rounded-[60px] overflow-hidden border border-primary/20 shadow-glow">
                <img src="/villa_suite.png" className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" alt="Luxury Suite" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:p-10 p-6 glass-morphism rounded-[30px] md:rounded-[40px] border-primary/20">
                  <Bed size={24} className="text-primary mb-3 md:mb-4 md:w-8 md:h-8" />
                  <h3 className="text-xl md:text-2xl font-black uppercase mb-1 md:mb-2 italic font-serif">Suites de Éxtasis</h3>
                  <p className="text-[10px] md:text-sm text-white/40 italic font-serif leading-tight md:leading-normal">"Lencería de seda y camas King-Size diseñadas para la máxima expresión del deseo."</p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <span className="section-tag">Logística de Placer</span>
              <h2 className="text-4xl md:text-6xl lg:text-8xl font-black mb-6 md:mb-10 leading-[0.9] uppercase tracking-tighter">EL DESCANSO <br /><span className="gold-text">DEL REY</span></h2>
              <p className="text-white/40 text-lg md:text-2xl font-light mb-8 md:mb-12 leading-relaxed font-serif italic border-l-2 border-primary pl-6 md:pl-8">
                Nuestras habitaciones han sido diseñadas para que la línea entre el sueño y la realidad desaparezca. Equipadas con lo mejor del diseño erótico mundial.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div className="p-6 md:p-8 glass-morphism rounded-3xl border-primary/10 group hover:border-primary transition-all duration-500">
                  <Heart size={20} className="text-primary mb-3 md:mb-4 group-hover:scale-110 transition-transform md:w-6 md:h-6" />
                  <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-1">Camas Imperial</h4>
                  <p className="text-[7px] md:text-[8px] text-white/30 uppercase font-black">Confort sin precedentes.</p>
                </div>
                <div className="p-6 md:p-8 glass-morphism rounded-3xl border-primary/10 group hover:border-primary transition-all duration-500">
                  <Sparkles size={20} className="text-primary mb-3 md:mb-4 group-hover:scale-110 transition-transform md:w-6 md:h-6" />
                  <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-1">Silk & Lace</h4>
                  <p className="text-[7px] md:text-[8px] text-white/30 uppercase font-black">Texturas que seducen.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLY SECTION */}
      <section id="vuelo" className="py-24 md:py-40 bg-black">
        <div className="max-w-5xl mx-auto text-center mb-16 md:mb-24 px-6">
          <h2 className="text-5xl md:text-7xl lg:text-9xl font-black mb-6 md:mb-10 gold-text italic tracking-tighter italic-luxury font-serif leading-none uppercase">Private Jet</h2>
        </div>
        <PlaneVisual />
      </section>

      {/* PRICING SECTION */}
      <section id="planes" className="py-24 md:py-40 px-6 md:px-8 bg-[#020305] pb-32 md:pb-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 pt-0 md:pt-10">
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

      <div className="hidden lg:block">
        {!showChat && (
          <button
            onClick={() => setShowChat(true)}
            className="fixed bottom-12 right-12 w-20 h-20 rounded-[30px] bg-primary flex items-center justify-center shadow-glow z-[100] group pulse-gold"
          >
            <MessageSquare color="black" size={32} />
          </button>
        )}
      </div>

      {/* Footer */}
      <footer className="pt-20 pb-16 md:pb-10 border-t border-white/5 bg-black text-center px-6">
        <div className="text-3xl md:text-4xl font-black gold-text mb-4 italic-luxury font-serif">SANTUARIO</div>
        <p className="text-white/10 text-[8px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.6em] leading-relaxed">ADULT RESERVE | PRIVATE GLOBAL ELITE © 2026</p>
      </footer>
    </div>
  );
}

function BottomNavItem({ icon, label, href, onClick }) {
  const content = (
    <div className="flex flex-col items-center gap-1">
      <div className="text-white/40 group-hover:text-primary transition-colors">
        {icon}
      </div>
      <span className="text-[8px] font-black uppercase tracking-tighter text-white/20 group-hover:text-primary transition-colors leading-none">
        {label}
      </span>
    </div>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className="flex-1 h-full flex items-center justify-center group">
        {content}
      </button>
    );
  }

  return (
    <a href={href} className="flex-1 h-full flex items-center justify-center group">
      {content}
    </a>
  );
}

function StarCard({ name, img, vibe, desc }) {
  return (
    <motion.div whileHover={{ y: -10 }} className="group relative rounded-[40px] md:rounded-[50px] overflow-hidden border border-white/10 hover:border-primary/40 transition-all duration-700 bg-black shadow-2xl">
      <div className="aspect-[4/6] overflow-hidden relative">
        <img src={img} className="w-full h-full object-cover transition-all duration-[2s] group-hover:scale-110" alt={name} />
        <div className="absolute inset-x-4 md:inset-x-6 top-4 md:top-6 flex justify-between">
          <span className="px-3 md:px-4 py-1 md:py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[8px] md:text-[9px] font-black text-primary tracking-widest">{vibe}</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 group-hover:opacity-40 transition-opacity"></div>
      </div>
      <div className="p-6 md:p-10 relative -mt-24 md:-mt-32 z-10">
        <h3 className="text-2xl md:text-4xl font-black text-white mb-2 md:mb-4 italic font-serif leading-none tracking-tighter uppercase gold-text">{name}</h3>
        <p className="text-white/40 text-xs md:text-sm font-light leading-relaxed group-hover:text-white transition-colors duration-500">{desc}</p>
      </div>
    </motion.div>
  );
}

function PlanCard({ name, price, features, highlight, onSelect }) {
  return (
    <motion.div
      whileHover={{ y: -20, scale: 1.02 }}
      className={`relative p-8 md:p-12 rounded-[40px] md:rounded-[60px] flex flex-col transition-all duration-700 ${highlight
        ? 'bg-gradient-to-b from-[#0A0E14] to-black border-primary/30 shadow-2xl ring-1 ring-primary/20'
        : 'bg-black border-white/5 hover:border-white/20'
        } border`}
    >
      <div className="mb-10 md:mb-14">
        <h3 className={`text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] mb-4 md:mb-8 ${highlight ? 'text-primary' : 'text-white/40'}`}>{name}</h3>
        <div className="flex items-baseline gap-2 md:gap-4">
          <span className="text-5xl md:text-7xl font-black italic-luxury font-serif">{price}</span>
        </div>
      </div>
      <ul className="flex-1 space-y-4 md:space-y-7 mb-10 md:mb-16">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-4 md:gap-6 text-xs md:text-sm font-medium text-white/50">
            <div className={`w-1 md:w-1.5 h-1 md:h-1.5 rounded-full ${highlight ? 'bg-primary shadow-glow' : 'bg-white/20'}`} />
            {f}
          </li>
        ))}
      </ul>
      <button onClick={onSelect} className={`w-full py-5 md:py-6 rounded-2xl md:rounded-3xl font-black text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] transition-all relative overflow-hidden ${highlight ? 'bg-primary text-black' : 'bg-white/5 border border-white/10 text-white'}`}>
        RESERVAR ACCESO
      </button>
    </motion.div>
  );
}

export default App;
