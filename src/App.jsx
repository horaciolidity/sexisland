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
  Star
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

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-8">
        <div className="absolute inset-0 z-0">
          <img
            src="/model_vip.png"
            className="w-full h-full object-cover opacity-60 scale-105 hover:scale-100 transition-all duration-[3s]"
            alt="Elite Experience"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] via-[#05070A]/80 to-transparent"></div>
          <div className="absolute inset-x-0 h-96 top-0 bg-gradient-to-b from-[#05070A] to-transparent"></div>
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <div className="flex items-center justify-center gap-6 mb-8 uppercase tracking-[0.6em] text-[10px] text-primary/60 font-black">
              <div className="w-12 h-[1px] bg-primary/30"></div>
              Elite Men Only Private Experience
              <div className="w-12 h-[1px] bg-primary/30"></div>
            </div>

            <h1 className="text-8xl md:text-[11rem] font-black mb-12 leading-[0.8] tracking-tighter">
              BEYOND <br />
              <span className="gold-text italic-luxury font-serif">DESIRE</span>
            </h1>

            <p className="text-xl md:text-3xl text-white/50 max-w-4xl mx-auto mb-20 leading-relaxed font-light font-serif">
              "Donde 60 diosas internacionales te esperan en una isla privada. <br />
              Sin cámaras. Sin reglas. Solo el máximo placer que un hombre puede pagar."
            </p>

            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <button
                className="group px-12 py-7 rounded-2xl bg-primary text-black font-black text-xs tracking-[0.4em] uppercase hover:scale-[1.03] transition-all shadow-[0_25px_60px_-10px_rgba(212,175,55,0.4)] relative overflow-hidden"
                onClick={() => user ? setShowUserPanel(true) : setShowLogin(true)}
              >
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-[1.5s]"></div>
                SOLICITAR INVITACIÓN <ArrowRight size={18} className="inline ml-3" />
              </button>
              <button className="px-12 py-7 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-xs tracking-[0.3em] uppercase hover:bg-white/10 transition-all">
                EXPLORAR EL PARAÍSO
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Stats / Numbers */}
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

      {/* Main Experience Section */}
      <section id="experiencia" className="py-40 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-24 items-center mb-40">
          <div className="w-full lg:w-1/2">
            <span className="section-tag">El Concepto</span>
            <h2 className="text-6xl md:text-8xl font-black mb-10 leading-[0.9] uppercase tracking-tighter">EL TRONO <br /><span className="gold-text">DEL REY</span></h2>
            <p className="text-white/40 text-2xl font-light mb-12 leading-relaxed font-serif italic">
              Usted ha pasado su vida construyendo un imperio. Ahora es momento de vivir la recompensa. Una semana donde cada uno de sus instintos es celebrado y complacido por las mujeres más hermosas del mundo.
            </p>
            <ul className="space-y-6">
              <li className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 text-primary group-hover:bg-primary group-hover:text-black transition-all">
                  <Heart size={20} fill="currentColor" />
                </div>
                <div>
                  <h4 className="font-black text-xs uppercase tracking-widest mb-1">Deseo Absoluto</h4>
                  <p className="text-[11px] text-white/30 uppercase font-bold">Sin juicios, solo éxtasis puro</p>
                </div>
              </li>
              <li className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 text-primary group-hover:bg-primary group-hover:text-black transition-all">
                  <Crown size={20} fill="currentColor" />
                </div>
                <div>
                  <h4 className="font-black text-xs uppercase tracking-widest mb-1">Tratamiento Real</h4>
                  <p className="text-[11px] text-white/30 uppercase font-bold">Usted es la única prioridad</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="w-full lg:w-1/2 relative">
            <div className="aspect-[4/5] rounded-[60px] overflow-hidden border border-primary/20 shadow-glow relative">
              <img src="/luxury_model_resort_1_1772985155614.png" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="Santuario Model" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10 p-8 glass-morphism rounded-3xl border-primary/30">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[9px] font-black text-primary uppercase tracking-[0.4em]">Casting Director</span>
                  <Sparkles size={16} className="text-primary" />
                </div>
                <p className="text-sm font-bold italic font-serif">"Elegimos solo a las mujeres más impactantes de cada continente para nuestro Santuario."</p>
              </div>
            </div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary/5 blur-[50px] -z-10 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* NEW GALLERY SECTION TO FILL THE SPACE */}
      <section id="galeria" className="py-40 bg-black/60 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-32">
            <span className="section-tag">Inspiración Visual</span>
            <h2 className="text-7xl font-black mb-8 gold-text italic-luxury font-serif">LA GALERÍA</h2>
            <p className="text-white/30 text-xl font-light max-w-2xl mx-auto">Una pequeña muestra de lo que le espera tras la invitación.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <GalleryCard img="/luxury_casino_night_dj_1772928825372.png" title="Casino High-Stakes" tag="NOCHE" />
            <GalleryCard img="/luxury_private_island_cruise_1772928762935.png" title="Fiestas en Alta Mar" tag="ACCIÓN" />
            <GalleryCard img="/gourmet_dining_sunset_1772982868374.png" title="Cenas Sensoriales" tag="GOURMET" />
            <GalleryCard img="/luxury_villa_private_pool_1772982827561.png" title="Villas de Éxtasis" tag="RELAX" />
            <GalleryCard img="/private_jet_interior_luxury_1772982911924.png" title="El Comienzo" tag="VUELO" />
            <GalleryCard img="/vip_service_concierge_1772982849168.png" title="Cuidado Personal" tag="VIP" />
          </div>
        </div>
      </section>

      {/* Vuelo VIP Manifest */}
      <section id="vuelo" className="py-40 px-8 bg-[#020305]">
        <div className="max-w-5xl mx-auto text-center mb-24">
          <span className="section-tag">Logística Imperial</span>
          <h2 className="text-6xl md:text-9xl font-black mb-10 gold-text italic tracking-tighter italic-luxury font-serif">EL MANIFIESTO</h2>
          <p className="text-white/40 text-xl font-light border-l border-primary/30 pl-10 text-left max-w-2xl mx-auto py-4">
            "Treinta asientos. Treinta leyendas. Su viaje comienza a 40,000 pies de altura con una tripulación dedicada a complacerlo."
          </p>
        </div>
        <PlaneVisual />
      </section>

      {/* Pricing / Tiers */}
      <section id="planes" className="py-40 px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12 pt-10">
          <PlanCard
            name="Platinum Member"
            price="$5,200"
            features={[
              "Vuelo Charter VVIP",
              "Suite Mar Deluxe",
              "Acceso Total Fiestas",
              "60 Diosas Confirmadas",
              "Crédito Casino $500"
            ]}
            onSelect={() => user ? setShowUserPanel(true) : setShowLogin(true)}
          />
          <PlanCard
            name="Diamond Imperial"
            price="$7,500"
            features={[
              "Jet Privado Global First",
              "Villa Piscina Infinita",
              "Concierge Privado 24/7",
              "Casino Unlimited Pass",
              "Stage VIP con DJs",
              "Prioridad de Selección"
            ]}
            highlight
            onSelect={() => user ? setShowUserPanel(true) : setShowLogin(true)}
          />
          <PlanCard
            name="Sovereign Group"
            price="Custom"
            features={[
              "Mansión Privada",
              "Seguridad Particular",
              "Menú Signature Chef",
              "Fiesta Privada Isla",
              "Logística VIP Ilimitada"
            ]}
            onSelect={() => user ? setShowUserPanel(true) : setShowLogin(true)}
          />
        </div>
      </section>

      {/* Overlays */}
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} onLogin={handleLogin} />
      <UserPanel isOpen={showUserPanel} onClose={() => setShowUserPanel(false)} user={user} onLogout={handleLogout} />

      <AnimatePresence>
        {showChat && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed inset-y-0 right-0 w-full md:w-[480px] z-[250]">
            <GroupChat onClose={() => setShowChat(false)} user={user} />
          </motion.div>
        )}
      </AnimatePresence>

      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-12 right-12 w-20 h-20 rounded-[30px] bg-primary flex items-center justify-center shadow-glow z-[100] group pulse-gold"
        >
          <MessageSquare color="black" size={32} className="group-hover:rotate-12 transition-all" />
        </button>
      )}

      {/* Footer */}
      <footer className="pt-40 pb-20 px-8 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-20">
          <div className="max-w-md">
            <div className="text-4xl font-black gold-text mb-10 italic font-serif">SANTUARIO</div>
            <p className="text-white/20 text-xl font-light italic leading-snug">"Un refugio privado para el hombre moderno que no se conforma con menos de lo extraordinario."</p>
          </div>
          <div className="flex flex-wrap gap-20">
            <div>
              <h4 className="font-black text-[10px] text-primary uppercase tracking-[0.4em] mb-8">Navegación</h4>
              <ul className="space-y-4 text-xs font-bold text-white/30 uppercase tracking-[0.2em]">
                <li><a href="#experiencia" className="hover:text-white transition">El Tour</a></li>
                <li><a href="#galeria" className="hover:text-white transition">Galería</a></li>
                <li><a href="#planes" className="hover:text-white transition">Reservas</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-[10px] text-primary uppercase tracking-[0.4em] mb-8">Privacidad</h4>
              <ul className="space-y-4 text-xs font-bold text-white/30 uppercase tracking-[0.2em]">
                <li>Crypto Only</li>
                <li>Non-Disclosure</li>
                <li>Global Elite</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-20 border-t border-white/5 mt-20 flex justify-between text-[10px] font-black text-white/10 uppercase tracking-[0.5em]">
          <span>© 2026 THE SANTUARIO GROUP</span>
          <span>Anonymity Guaranteed</span>
        </div>
      </footer>
    </div>
  );
}

function GalleryCard({ img, title, tag }) {
  return (
    <div className="group relative aspect-[4/5] rounded-[40px] overflow-hidden border border-white/5 hover:border-primary/40 transition-all duration-1000">
      <img src={img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" alt={title} />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
      <div className="absolute inset-0 p-10 flex flex-col justify-end transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700">
        <span className="text-[9px] font-black text-primary uppercase tracking-[0.4em] mb-4 bg-primary/10 px-4 py-1.5 rounded-full w-fit border border-primary/20 backdrop-blur-md">{tag}</span>
        <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-tight">{title}</h3>
        <div className="w-12 h-[2px] bg-primary mt-6 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"></div>
      </div>
    </div>
  );
}

function FeatureCard({ title, desc, icon, img, tag }) {
  return (
    <div className="group relative aspect-[4/5] rounded-[40px] overflow-hidden border border-white/5">
      <img src={img} className="w-full h-full object-cover grayscale opacity-30" alt={title} />
    </div>
  );
}

function PlanCard({ name, price, features, highlight, onSelect }) {
  return (
    <motion.div
      whileHover={{ y: -20 }}
      className={`relative p-12 rounded-[60px] flex flex-col transition-all duration-700 ${highlight
          ? 'bg-gradient-to-b from-[#0A0E14] to-black border-primary/30 shadow-[0_40px_80px_-20px_rgba(212,175,55,0.15)] ring-1 ring-primary/20'
          : 'bg-black border-white/5 hover:border-white/20'
        } border`}
    >
      {highlight && (
        <div className="absolute top-0 right-0 py-3 px-10 bg-primary text-black font-black text-[10px] tracking-[0.3em] uppercase rounded-bl-[30px] flex items-center gap-2">
          <Crown size={12} fill="currentColor" /> IMPERIAL CHOICE
        </div>
      )}
      <div className="mb-14">
        <h3 className={`text-sm font-black uppercase tracking-[0.5em] mb-8 ${highlight ? 'text-primary' : 'text-white/40'}`}>{name}</h3>
        <div className="flex items-baseline gap-4">
          <span className="text-6xl font-black italic-luxury font-serif">{price}</span>
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
        className={`w-full py-6 rounded-3xl font-black text-xs uppercase tracking-[0.4em] transition-all duration-700 relative overflow-hidden group/btn ${highlight
            ? 'bg-primary text-black shadow-glow hover:scale-105'
            : 'bg-white/5 border border-white/10 hover:border-white/30'
          }`}
      >
        <span className="relative z-10">RESERVAR ACCESO</span>
      </button>
    </motion.div>
  );
}

function SocialIcon({ name }) {
  return (
    <div className="w-16 h-16 rounded-[24px] border border-white/10 flex items-center justify-center hover:border-primary transition duration-500 text-white/10 hover:text-primary bg-black/50 text-xl font-black italic font-serif">
      {name.charAt(0)}
    </div>
  );
}

export default App;
