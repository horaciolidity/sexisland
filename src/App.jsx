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
  Tv
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
    { name: 'Stars', href: '#modelos' },
    { name: 'Logística', href: '#vuelo' },
    { name: 'Galería', href: '#galeria' },
    { name: 'Precios', href: '#planes' },
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
                ACCESO MIEMBROS
              </button>
            )}
            <button
              className="px-8 py-3 rounded-xl bg-primary text-black font-black text-[10px] tracking-[0.2em] uppercase hover:scale-105 transition-all shadow-glow"
              onClick={() => setShowChat(true)}
            >
              CHAT HOT
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
            className="w-full h-full object-cover opacity-70 mix-blend-screen grayscale hover:grayscale-0 transition-all duration-[3s] scale-110 hover:scale-100"
            alt="Elite Movie Star Reserve"
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

            <h1 className="text-7xl md:text-[11rem] font-black mb-12 leading-[0.8] tracking-tighter">
              BEYOND <br />
              <span className="gold-text italic-luxury font-serif">ADULT</span>
            </h1>

            <p className="text-xl md:text-3xl text-white/50 max-w-5xl mx-auto mb-20 leading-relaxed font-light font-serif">
              "Treinta leyendas, sesenta diosas. <br />
              Las estrellas del cine para adultos más famosas del mundo se rinden ante usted en el Santuario."
            </p>

            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <button
                className="group px-12 py-7 rounded-2xl bg-primary text-black font-black text-xs tracking-[0.4em] uppercase hover:scale-[1.03] transition-all shadow-glow relative overflow-hidden"
                onClick={() => user ? setShowUserPanel(true) : setShowLogin(true)}
              >
                RECLAMAR MI INVITACIÓN <ArrowRight size={18} className="inline ml-3" />
              </button>
              <button className="px-12 py-7 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-xs tracking-[0.3em] uppercase hover:bg-white/10 transition-all">
                EXPLORAR EL ELENCO
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* NEW: THE STARS SECTION - Explicitly requested with names */}
      <section id="modelos" className="py-40 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-24">
            <span className="section-tag">Casting Sovereign</span>
            <h2 className="text-6xl md:text-8xl font-black mb-8 gold-text italic-luxury font-serif">LAS ESTRELLAS</h2>
            <p className="text-white/40 text-2xl font-light max-w-3xl mx-auto border-l-2 border-primary pl-8 text-left py-4 italic">
              "Directamente desde la industria del cine para adultos. Sesenta estrellas consagradas para una experiencia de inmersión total."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <StarCard
              name="Sasha Grey"
              img="/model_vip.png"
              vibe="ADULT LEGEND"
              desc="La leyenda absoluta. Carisma, inteligencia y audacia desbordante."
            />
            <StarCard
              name="Angela White"
              img="/vip_service.png"
              vibe="THE QUEEN"
              desc="Elegancia y poder en cada movimiento. Una presencia que domina el Santuario."
            />
            <StarCard
              name="Riley Reid"
              img="/luxury_casino_night_dj.png"
              vibe="VIBRANT STAR"
              desc="Energía pura e inagotable. La chispa que enciende las fiestas del Yate."
            />
            <StarCard
              name="Lana Rhoades"
              img="/dining.png"
              vibe="ELITE CLASS"
              desc="Belleza icónica seleccionada para los momentos más sofisticados."
            />
            <StarCard
              name="Adriana Chechik"
              img="/villa.png"
              vibe="WILD SOUL"
              desc="Audacia sin límites para quienes buscan el éxtasis extremo."
            />
            <StarCard
              name="Abella Danger"
              img="/hero-bg.png"
              vibe="POWERFUL"
              desc="Carisma magnético. Una estrella que nunca deja de sorprender."
            />
          </div>

          <div className="mt-20 text-center">
            <button className="px-12 py-6 rounded-2xl bg-primary/10 border border-primary/20 text-primary font-black text-xs tracking-[0.5em] uppercase hover:bg-primary hover:text-black transition-all group scale-110 shadow-glow">
              VER ELENCO COMPLETO (60 ESTRELLAS) <Tv size={18} className="inline ml-3 animate-pulse" />
            </button>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experiencia" className="py-40 px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-24 items-center">
          <div className="w-full lg:w-1/2">
            <span className="section-tag">Indulgencia Suprema</span>
            <h2 className="text-6xl md:text-8xl font-black mb-10 leading-[0.9] uppercase tracking-tighter">EL TRONO <br /><span className="gold-text">DEL PLACER</span></h2>
            <p className="text-white/40 text-2xl font-light mb-12 leading-relaxed font-serif italic">
              Usted ha visto sus películas. Ahora lo verán a usted. Una semana donde el cine se vuelve realidad y usted es el único protagonista.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className="p-8 glass-morphism rounded-3xl border-primary/10 hover:border-primary transition-all duration-500 group">
                <Crown size={24} className="text-primary mb-4 group-hover:scale-125 transition-transform" />
                <h4 className="font-black text-xs uppercase tracking-widest mb-2">Director's Cut</h4>
                <p className="text-[10px] text-white/40 uppercase font-black">Cada escena es suya.</p>
              </div>
              <div className="p-8 glass-morphism rounded-3xl border-primary/10 hover:border-primary transition-all duration-500 group">
                <Zap size={24} className="text-primary mb-4 group-hover:scale-125 transition-transform" />
                <h4 className="font-black text-xs uppercase tracking-widest mb-2">Non-Stop action</h4>
                <p className="text-[10px] text-white/40 uppercase font-black">24 horas de adrenalina.</p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute -inset-4 bg-primary/10 blur-[100px] rounded-full"></div>
            <div className="relative z-10 aspect-[4/5] rounded-[60px] overflow-hidden border border-white/10 shadow-glow">
              <img src="/model_vip.png" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="Santuario Reserve" />
              <div className="absolute inset-x-8 bottom-8 p-10 glass-morphism rounded-[40px] border-primary/20">
                <p className="text-xl font-bold italic font-serif leading-tight">"En el cine hay cortes. En el Santuario, el placer nunca se detiene."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="galeria" className="py-40 bg-black/40">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-32">
            <span className="section-tag">Visual Assets</span>
            <h2 className="text-6xl md:text-8xl font-black mb-8 gold-text italic-luxury font-serif leading-none uppercase">LA ESCENA</h2>
            <p className="text-white/30 text-xl font-light max-w-2xl mx-auto italic font-serif">"Fotogramas de una vida que ha decidido vivir hoy."</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <GalleryCard img="/luxury_casino_night_dj.png" title="Casino High-Stakes" tag="NOCHE" />
            <GalleryCard img="/luxury_private_island_cruise.png" title="Yate de las Estrellas" tag="ACCIÓN" />
            <GalleryCard img="/dining.png" title="Banquetes Michelin" tag="GOURMET" />
            <GalleryCard img="/villa.png" title="Santuarios Privados" tag="RELAX" />
            <GalleryCard img="/jet_interior.png" title="Logística Imperial" tag="VUELO" />
            <GalleryCard img="/vip_service.png" title="Tratamiento VIP" tag="EXCLUSIVO" />
          </div>
        </div>
      </section>

      {/* Plane Visual */}
      <section id="vuelo" className="py-40 bg-black">
        <div className="max-w-5xl mx-auto text-center mb-24">
          <span className="section-tag">Privacidad Total</span>
          <h2 className="text-6xl md:text-9xl font-black mb-10 gold-text italic tracking-tighter italic-luxury font-serif leading-none">VUELO SOBERANO</h2>
          <p className="text-white/40 text-xl font-light italic font-serif max-w-2xl mx-auto border-l border-primary/30 pl-10 py-4 text-left">
            "Treinta leyendas cruzan el cielo. Su identidad está protegida por protocolos militares desde el despegue."
          </p>
        </div>
        <PlaneVisual />
      </section>

      {/* Plans Section */}
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
            features={["Jet Privado Global First", "Villa Piscina Infinita", "Concierge Estrellas 24/7", "Casino Unlimited Pass", "Mesa Stage con Estrellas", "Priority Casting Selection"]}
            highlight
            onSelect={() => user ? setShowUserPanel(true) : setShowLogin(true)}
          />
          <PlanCard
            name="Sovereign Party"
            price="Custom"
            features={["Residencia Privada", "Cuerpo de Seguridad Anónimo", "Chef & Mixólogo Privado", "Fiesta Privada Isla", "Logística Estelar Ilimitada"]}
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
            <p className="text-white/20 text-2xl max-w-md font-light italic leading-snug">"Donde las fantasías digitales se vuelven realidad palpable."</p>
          </div>
          <div className="flex flex-wrap gap-24">
            <div>
              <h4 className="font-black text-[10px] text-primary uppercase tracking-[0.4em] mb-10">Membresía</h4>
              <ul className="space-y-6 text-xs font-black text-white/30 uppercase tracking-[0.2em]">
                <li><a href="#experiencia" className="hover:text-white transition">Filosofía</a></li>
                <li><a href="#galeria" className="hover:text-white transition">Cine</a></li>
                <li><a href="#planes" className="hover:text-white transition">Reservas</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-20 border-t border-white/5 mt-20 flex justify-between text-[10px] font-black text-white/10 uppercase tracking-[0.5em]">
          <span>© 2026 THE SANTUARIO GROUP | ADULT RESERVE DEPT.</span>
          <span>IDENTITY PROTECTED</span>
        </div>
      </footer>
    </div>
  );
}

function StarCard({ name, img, vibe, desc }) {
  return (
    <motion.div whileHover={{ y: -10 }} className="group relative rounded-[50px] overflow-hidden border border-white/10 hover:border-primary/40 transition-all duration-700 bg-black shadow-2xl">
      <div className="aspect-[4/6] overflow-hidden relative">
        <img src={img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s]" alt={name} />
        <div className="absolute inset-x-6 top-6 flex justify-between">
          <span className="px-4 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-black text-primary tracking-widest">{vibe}</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 group-hover:opacity-60 transition-opacity"></div>
      </div>
      <div className="p-10 relative -mt-32 z-10">
        <h3 className="text-4xl font-black text-white mb-4 italic font-serif leading-none tracking-tighter uppercase gold-text">{name}</h3>
        <p className="text-white/40 text-sm font-light leading-relaxed group-hover:text-white transition-colors duration-500">{desc}</p>
      </div>
    </motion.div>
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
      {highlight && <div className="absolute top-0 right-0 py-3 px-10 bg-primary text-black font-black text-[10px] tracking-[0.3em] uppercase rounded-bl-[30px] flex items-center gap-2">PLATINUM CHOICE</div>}
      <div className="mb-14">
        <h3 className={`text-[10px] font-black uppercase tracking-[0.5em] mb-8 ${highlight ? 'text-primary' : 'text-white/40'}`}>{name}</h3>
        <div className="flex items-baseline gap-4">
          <span className="text-7xl font-black italic-luxury font-serif">{price}</span>
          <span className="text-white/30 text-xs font-black">USD</span>
        </div>
      </div>
      <ul className="flex-1 space-y-7 mb-16">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-6 text-sm font-medium text-white/50 group">
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
