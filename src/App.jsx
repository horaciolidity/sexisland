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
  ChevronRight
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
    { name: 'Modelos', href: '#modelos' },
    { name: 'Vuelo VIP', href: '#vuelo' },
    { name: 'Galería', href: '#galeria' },
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
            SANTUARIO <span className="text-[10px] font-bold text-white/20 not-italic ml-2 tracking-[0.4em]">PRIVATE RESERVE</span>
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
                <div className="w-[1px] h-6 bg-white/10 mx-1"></div>
                <button onClick={(e) => { e.stopPropagation(); handleLogout(); }} className="text-white/20 hover:text-red-500 transition">
                  <LogOutIcon size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="text-[10px] font-black tracking-[0.4em] uppercase text-white/60 hover:text-white transition"
              >
                INGRESAR AL SANTUARIO
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

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed inset-0 z-[149] glass-morphism flex flex-col items-center justify-center gap-10 pt-20 bg-black/95 backdrop-blur-2xl"
          >
            {navigationLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-3xl font-black uppercase tracking-[0.2em] text-white/50 hover:text-primary transition-all"
              >
                {link.name}
              </a>
            ))}
            {user && (
              <button
                onClick={() => { setShowUserPanel(true); setMobileMenuOpen(false); }}
                className="text-xl font-black tracking-widest text-primary border border-primary/20 px-10 py-4 rounded-2xl"
              >
                MI PANEL VIP
              </button>
            )}
            <button
              className="btn-primary mt-6 min-w-[280px] py-6"
              onClick={() => { setShowChat(true); setMobileMenuOpen(false); }}
            >
              ACCESO CHAT GRUPAL
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-8">
        <div className="absolute inset-0 z-0">
          <img
            src="/model_vip.png"
            className="w-full h-full object-cover opacity-60 mix-blend-screen transition-all duration-[2s] hover:scale-110"
            alt="Elite Experience"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] via-[#05070A]/80 to-transparent"></div>
          <div className="absolute inset-x-0 h-96 top-0 bg-gradient-to-b from-[#05070A] to-transparent"></div>
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-[1px] w-20 bg-primary/40"></div>
              <span className="section-tag mb-0">Donde los sueños cobran vida</span>
              <div className="h-[1px] w-20 bg-primary/40"></div>
            </div>

            <h1 className="text-7xl md:text-9xl font-black mb-10 leading-[0.85] tracking-tighter">
              EL REINO DEL <br />
              <span className="gold-text italic-luxury font-serif">PLACER</span>
            </h1>

            <p className="text-xl md:text-3xl text-white/70 max-w-4xl mx-auto mb-16 leading-relaxed font-light font-serif">
              "6 días y 7 noches donde 60 mujeres internacionales de élite se rinden ante 30 invitados exclusivos. Una isla privada, un destino legendario."
            </p>

            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <button
                className="group px-12 py-7 rounded-2xl bg-primary text-black font-black text-xs tracking-[0.4em] uppercase hover:scale-[1.03] transition-all shadow-[0_25px_60px_-10px_rgba(212,175,55,0.4)] relative overflow-hidden"
                onClick={() => user ? setShowUserPanel(true) : setShowLogin(true)}
              >
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                {user ? 'ACCEDER A MI PANEL' : 'SOLICITAR INVITACIÓN'}
                <ArrowRight size={20} className="inline ml-3 group-hover:translate-x-2 transition-transform" />
              </button>
              <button className="btn-secondary min-w-[280px] py-6 text-base" onClick={() => window.location.href = '#experiencia'}>
                EXPLORAR LA VIDA VIP
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <div className="w-[1px] h-20 bg-gradient-to-b from-primary to-transparent"></div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-24 border-y border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 px-8">
          {[
            { n: "60", t: "DIOSAS ÉLITE", d: "Selección Internacional" },
            { n: "30", t: "INVITADOS", d: "Máxima Exclusividad" },
            { n: "5★", t: "RESORT PRIVADO", d: "Lujo Arquitectónico" },
            { n: "24/7", t: "FIESTA TOTAL", d: "Sin Límites" }
          ].map((s, i) => (
            <div key={i} className="text-center group">
              <div className="text-6xl font-black text-primary mb-2 group-hover:scale-110 transition-transform duration-500 italic font-serif">{s.n}</div>
              <div className="text-[10px] font-black text-white mb-1 tracking-[0.3em]">{s.t}</div>
              <div className="text-[8px] font-bold text-white/20 uppercase tracking-widest">{s.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* NEW: Explicit Models Section to provide more photos and "sensuality" */}
      <section id="modelos" className="py-40 bg-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] -z-10"></div>
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-24">
            <span className="section-tag">Casting de Élite</span>
            <h2 className="text-6xl md:text-8xl font-black mb-8 gold-text italic-luxury font-serif">NUESTRAS DIOSAS</h2>
            <p className="text-white/40 text-2xl font-light max-w-3xl mx-auto border-l-2 border-primary pl-8 text-left py-4 italic">
              "Belleza sin compromisos. Sesenta mujeres seleccionadas por su elegancia, carisma y deseo de hacer su estancia inolvidable."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-8">
              <div className="relative group rounded-[40px] overflow-hidden aspect-[4/6] border border-white/10">
                <img src="/model_vip.png" className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110" alt="Model" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
                <div className="absolute bottom-10 left-10">
                  <div className="text-xs font-black text-primary uppercase tracking-widest mb-1">LATIN SELECTION</div>
                  <h3 className="text-2xl font-black uppercase">Isabella</h3>
                </div>
              </div>
              <div className="relative group rounded-[40px] overflow-hidden aspect-[1/1] border border-white/10">
                <img src="/vip_service.png" className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110" alt="Model" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
                <div className="absolute bottom-6 left-8">
                  <h3 className="text-xl font-black uppercase">Elena</h3>
                </div>
              </div>
            </div>
            <div className="space-y-8 pt-12">
              <div className="relative group rounded-[40px] overflow-hidden aspect-[1/1] border border-white/10">
                <img src="/dining.png" className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110" alt="Model" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
                <div className="absolute bottom-6 left-8">
                  <h3 className="text-xl font-black uppercase">Sasha</h3>
                </div>
              </div>
              <div className="relative group rounded-[40px] overflow-hidden aspect-[4/6] border border-white/10">
                <img src="/villa.png" className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110" alt="Model" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
                <div className="absolute bottom-10 left-10">
                  <div className="text-xs font-black text-primary uppercase tracking-widest mb-1">EUROPEAN PRESTIGE</div>
                  <h3 className="text-2xl font-black uppercase">Victoria</h3>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="relative group rounded-[40px] overflow-hidden aspect-[4/6] border border-white/10">
                <img src="/luxury_casino_night_dj.png" className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110" alt="Model" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
                <div className="absolute bottom-10 left-10">
                  <div className="text-xs font-black text-primary uppercase tracking-widest mb-1">ASIAN ELITE</div>
                  <h3 className="text-2xl font-black uppercase">Naomi</h3>
                </div>
              </div>
              <div className="relative group rounded-[40px] overflow-hidden aspect-[1/1] border border-white/10">
                <img src="/hero-bg.png" className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110" alt="Model" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
                <div className="absolute bottom-6 left-8">
                  <h3 className="text-xl font-black uppercase">Gabriela</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 text-center">
            <button className="px-12 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-xs tracking-[0.5em] uppercase hover:bg-primary hover:text-black transition-all group">
              VER CASTING COMPLETO (60+) <Flame size={18} className="inline ml-3 animate-pulse text-primary group-hover:text-black" />
            </button>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experiencia" className="py-40 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-24 items-center">
          <div className="w-full lg:w-1/2">
            <span className="section-tag">Poder & Privacidad</span>
            <h2 className="text-6xl md:text-8xl font-black mb-10 leading-[0.9] uppercase tracking-tighter">EL TRONO <br /><span className="gold-text">DEL REY</span></h2>
            <p className="text-white/40 text-2xl font-light mb-12 leading-relaxed font-serif italic border-l-2 border-primary pl-8">
              Usted ha pasado su vida construyendo un imperio. Ahora es momento de vivir la recompensa. Una semana donde cada uno de sus instintos es celebrado y complacido por las mujeres más hermosas del mundo.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className="p-8 glass-morphism rounded-3xl border-primary/10">
                <Crown size={24} className="text-primary mb-4" />
                <h4 className="font-black text-xs uppercase tracking-widest mb-2">Soberanía Total</h4>
                <p className="text-[10px] text-white/40 uppercase font-black">Usted manda, nosotros ejecutamos.</p>
              </div>
              <div className="p-8 glass-morphism rounded-3xl border-primary/10">
                <Zap size={24} className="text-primary mb-4" />
                <h4 className="font-black text-xs uppercase tracking-widest mb-2">Placer 24/7</h4>
                <p className="text-[10px] text-white/40 uppercase font-black">Sin horarios, sin límites.</p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative group">
            <div className="aspect-[4/5] rounded-[60px] overflow-hidden border border-primary/20 shadow-glow relative transform group-hover:rotate-1 transition-transform duration-700">
              <img src="/model_vip.png" className="w-full h-full object-cover transition-all duration-1000" alt="Resort" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10 p-10 glass-morphism rounded-[40px] border-primary/30">
                <div className="text-[10px] font-black text-primary uppercase tracking-[0.5em] mb-4">Ubicación Secreta</div>
                <p className="text-xl font-bold italic font-serif leading-tight">"Un atolón privado inaccesible para el mundo exterior. Su anonimato es nuestra ley."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="galeria" className="py-40 bg-black/40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-32">
            <span className="section-tag">Inspiración Visual</span>
            <h2 className="text-6xl md:text-8xl font-black mb-8 gold-text italic-luxury font-serif">LA GALERÍA</h2>
            <p className="text-white/30 text-xl font-light max-w-2xl mx-auto">Instantáneas de la gloria que le espera.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <GalleryCard img="/luxury_casino_night_dj.png" title="Casino High-Stakes" tag="NOCHE" />
            <GalleryCard img="/luxury_private_island_cruise.png" title="Fiestas en Alta Mar" tag="ACCIÓN" />
            <GalleryCard img="/dining.png" title="Cenas Sensoriales" tag="GOURMET" />
            <GalleryCard img="/villa.png" title="Villas de Éxtasis" tag="RELAX" />
            <GalleryCard img="/jet_interior.png" title="El Comienzo" tag="VUELO" />
            <GalleryCard img="/vip_service.png" title="Cuidado Personal" tag="VIP" />
          </div>
        </div>
      </section>

      {/* Vuelo Manifest Section */}
      <section id="vuelo" className="py-40 px-8 bg-black">
        <div className="max-w-5xl mx-auto text-center mb-24">
          <span className="section-tag">Transporte Imperial</span>
          <h2 className="text-6xl md:text-9xl font-black mb-10 gold-text italic tracking-tighter italic-luxury font-serif leading-none">EL VUELO DEL REY</h2>
          <p className="text-white/40 text-xl font-light max-w-2xl mx-auto italic font-serif py-4">
            "Treinta asientos. Treinta leyendas. Su viaje comienza a 40,000 pies de altura."
          </p>
        </div>
        <PlaneVisual />
      </section>

      {/* Pricing Section */}
      <section id="planes" className="py-40 px-8 bg-[#020305]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12 pt-10">
          <PlanCard
            name="Platinum Member"
            price="$5,200"
            features={["Vuelo Charter VVIP", "Suite Mar Deluxe", "Acceso Total Fiestas", "60 Diosas Confirmadas", "Crédito Casino $500"]}
            onSelect={() => user ? setShowUserPanel(true) : setShowLogin(true)}
          />
          <PlanCard
            name="Diamond Imperial"
            price="$7,500"
            features={["Jet Privado Global First", "Villa Piscina Infinita", "Concierge Privado 24/7", "Casino Unlimited Pass", "Stage VIP con DJs", "Priority Selection"]}
            highlight
            onSelect={() => user ? setShowUserPanel(true) : setShowLogin(true)}
          />
          <PlanCard
            name="Sovereign Group"
            price="Custom"
            features={["Mansión Privada", "Seguridad Particular", "Menú Signature Chef", "Fiesta Privada Isla", "Logística VIP Ilimitada"]}
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
          <MessageSquare color="black" size={32} className="group-hover:rotate-12 transition-all duration-500" />
        </button>
      )}

      {/* Footer */}
      <footer className="pt-40 pb-20 px-8 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-24">
          <div>
            <div className="text-4xl font-black gold-text mb-10 italic-luxury font-serif">SANTUARIO</div>
            <p className="text-white/20 text-2xl max-w-md font-light italic leading-snug">"Un refugio privado para el hombre moderno que no se conforma con menos de lo extraordinario."</p>
          </div>
          <div className="flex flex-wrap gap-24">
            <div>
              <h4 className="font-black text-[10px] text-primary uppercase tracking-[0.4em] mb-10">Membresía</h4>
              <ul className="space-y-6 text-xs font-black text-white/30 uppercase tracking-[0.2em]">
                <li><a href="#experiencia" className="hover:text-white transition">Filosofía</a></li>
                <li><a href="#galeria" className="hover:text-white transition">Galería</a></li>
                <li><a href="#planes" className="hover:text-white transition">Reservas</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-20 border-t border-white/5 mt-20 flex justify-between text-[10px] font-black text-white/10 uppercase tracking-[0.5em]">
          <span>© 2026 THE SANTUARIO GROUP | GLOBAL ELITE</span>
          <span>Anonymity Guaranteed</span>
        </div>
      </footer>
    </div>
  );
}

function GalleryCard({ img, title, tag }) {
  return (
    <div className="group relative aspect-[4/5] rounded-[40px] overflow-hidden border border-white/10 hover:border-primary/40 transition-all duration-1000">
      <img src={img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" alt={title} />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
      <div className="absolute inset-0 p-10 flex flex-col justify-end transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700">
        <span className="text-[9px] font-black text-primary uppercase tracking-[0.4em] mb-4 bg-primary/10 px-4 py-1.5 rounded-full w-fit border border-primary/20">{tag}</span>
        <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-tight">{title}</h3>
      </div>
    </div>
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
      {highlight && (
        <div className="absolute top-0 right-0 py-3 px-10 bg-primary text-black font-black text-[10px] tracking-[0.3em] uppercase rounded-bl-[30px] flex items-center gap-2">
          <Crown size={12} fill="currentColor" /> IMPERIAL CHOICE
        </div>
      )}
      <div className="mb-14">
        <h3 className={`text-[10px] font-black uppercase tracking-[0.5em] mb-10 ${highlight ? 'text-primary' : 'text-white/40'}`}>{name}</h3>
        <div className="flex items-baseline gap-4">
          <span className="text-7xl font-black italic-luxury font-serif">{price}</span>
          <span className="text-white/30 text-xs font-black">USD</span>
        </div>
      </div>
      <ul className="flex-1 space-y-8 mb-16">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-6 text-sm font-medium text-white/50 group">
            <div className={`w-1.5 h-1.5 rounded-full ${highlight ? 'bg-primary shadow-glow' : 'bg-white/20'}`} />
            {f}
          </li>
        ))}
      </ul>
      <button
        onClick={onSelect}
        className={`w-full py-6 rounded-3xl font-black text-xs uppercase tracking-[0.4em] transition-all duration-700 relative overflow-hidden ${highlight
            ? 'bg-primary text-black shadow-glow'
            : 'bg-white/5 border border-white/10 hover:border-white/30 text-white'
          }`}
      >
        RESERVAR ACCESO
      </button>
    </motion.div>
  );
}

export default App;
