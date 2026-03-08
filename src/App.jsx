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
    { name: 'Explorar', href: '#galeria' },
    { name: 'Suites', href: '#suites' },
    { name: 'Reserva', href: '#planes' },
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
              CHAT EXCLUSIVO
            </button>
          </div>

          <button className="lg:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <XIcon size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Hero Section - Using a different image (Jet Interior) to avoid repetition */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-8">
        <div className="absolute inset-0 z-0">
          <img
            src="/jet_interior.png"
            className="w-full h-full object-cover opacity-60 mix-blend-screen grayscale transition-all duration-[3s] scale-105 hover:scale-100"
            alt="Luxury Experience"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] via-[#05070A]/85 to-transparent"></div>
          <div className="absolute inset-x-0 h-96 top-0 bg-gradient-to-b from-[#05070A] to-transparent"></div>
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <div className="flex items-center justify-center gap-6 mb-8 uppercase tracking-[0.6em] text-[10px] text-primary font-black">
              <div className="w-12 h-[1px] bg-primary/30"></div>
              Elite Adult Sovereign Experience
              <div className="w-12 h-[1px] bg-primary/30"></div>
            </div>

            <h1 className="text-7xl md:text-[11rem] font-black mb-12 leading-[0.8] tracking-tighter italic-luxury">
              BEYOND <br />
              <span className="gold-text font-serif">LIMITS</span>
            </h1>

            <p className="text-xl md:text-3xl text-white/50 max-w-5xl mx-auto mb-20 leading-relaxed font-light font-serif italic">
              "Treinta leyendas, sesenta diosas. <br />
              Las estrellas del cine adulto más deseadas del mundo esperan su llegada."
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

      {/* STARS SECTION - Unique images for each star using CSS transforms/crops to avoid repetition feeling */}
      <section id="modelos" className="py-40 bg-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] -z-10"></div>
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-24">
            <span className="section-tag">Directamente de la Pantalla</span>
            <h2 className="text-6xl md:text-8xl font-black mb-8 gold-text italic-luxury font-serif">LAS STARS</h2>
            <p className="text-white/40 text-2xl font-light max-w-3xl mx-auto border-l-2 border-primary pl-8 text-left py-4 italic">
              "Usted ha visto sus películas. Ahora ellas serán sus anfitrionas en el Santuario."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <StarCard
              name="Sasha Grey"
              img="/star_1.png"
              vibe="ICON"
              desc="La estrella que redefinió el género. Elegancia y audacia absoluta."
              position="top"
            />
            <StarCard
              name="Angela White"
              img="/star_2.png"
              vibe="THE QUEEN"
              desc="Elegancia, poder y una presencia que domina la isla."
              position="center"
            />
            <StarCard
              name="Riley Reid"
              img="/star_3.png"
              vibe="LEGEND"
              desc="Energía pura e inagotable. La chispa del Santuario."
              position="bottom"
            />
            <StarCard
              name="Lana Rhoades"
              img="/star_4.png"
              vibe="PREMIUM"
              desc="Belleza icónica seleccionada para los momentos más sofisticados."
              position="top"
              filter="hue-rotate(15deg) contrast(1.1)"
            />
            <StarCard
              name="Adriana Chechik"
              img="/star_6.png"
              vibe="WILD"
              desc="Audacia sin límites para quienes buscan el éxtasis extremo."
              position="center"
              filter="brightness(0.9) contrast(1.2)"
            />
            <StarCard
              name="Abella Danger"
              img="/hero-bg.png"
              vibe="ELITE"
              desc="Carisma magnético. Una estrella que nunca deja de sorprender."
              position="bottom"
              filter="sepia(0.2) contrast(1.1)"
            />
          </div>
        </div>
      </section>

      {/* SUITES & BEDS SECTION */}
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
                  <p className="text-sm text-white/40 italic font-serif">"Lencería de seda 1000 hilos y camas King-Size diseñadas para el placer total."</p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <span className="section-tag">Alojamiento Imperial</span>
              <h2 className="text-6xl md:text-8xl font-black mb-10 leading-[0.9] uppercase tracking-tighter">EL DESCANSO <br /><span className="gold-text">DEL REY</span></h2>
              <p className="text-white/40 text-2xl font-light mb-12 leading-relaxed font-serif italic border-l-2 border-primary pl-8">
                Nuestras villas privadas cuentan con el mobiliario más erótico y lujoso del mundo. Cada cama es un altar dedicado a su gratificación absoluta.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-8 glass-morphism rounded-3xl border-white/5">
                  <Sparkles size={24} className="text-primary mb-4" />
                  <h4 className="text-[10px] font-black uppercase tracking-widest mb-2">Seda Pura</h4>
                  <p className="text-[8px] text-white/40 uppercase">Tacto inigualable.</p>
                </div>
                <div className="p-8 glass-morphism rounded-3xl border-white/5">
                  <ShieldCheck size={24} className="text-primary mb-4" />
                  <h4 className="text-[10px] font-black uppercase tracking-widest mb-2">Privacidad</h4>
                  <p className="text-[8px] text-white/40 uppercase">Aislado del mundo.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY / TOUR SECTION */}
      <section id="galeria" className="py-40 bg-black/60 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 text-center mb-32">
          <span className="section-tag">Inspiración Visual</span>
          <h2 className="text-7xl font-black mb-8 gold-text italic-luxury font-serif">LA EXPERIENCIA</h2>
          <p className="text-white/30 text-xl font-light">"Fotogramas reales de la semana más intensa de su vida."</p>
        </div>
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <GalleryCard img="/star_1.png" title="Morning Selection" tag="FILTRADO" />
          <GalleryCard img="/star_2.png" title="Casino Night" tag="VIP" />
          <GalleryCard img="/star_3.png" title="Sunset Party" tag="ELITE" />
          <GalleryCard img="/star_4.png" title="Royal Dinner" tag="MICHELIN" />
          <GalleryCard img="/star_6.png" title="Villa Party" tag="PRIVATE" />
          <GalleryCard img="/jet_interior.png" title="Private Flight" tag="JET" />
        </div>
      </section>

      {/* FLY SECTION */}
      <section id="vuelo" className="py-40 bg-black border-y border-white/5">
        <div className="max-w-5xl mx-auto text-center mb-24">
          <h2 className="text-6xl md:text-9xl font-black mb-10 gold-text italic tracking-tighter italic-luxury font-serif leading-none">THE FLIGHT</h2>
        </div>
        <PlaneVisual />
      </section>

      {/* PRICING SECTION */}
      <section id="planes" className="py-40 px-8 bg-[#05070A]">
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
            features={["Jet Privado Global First", "Villa Piscina Infinita", "Concierge Estrellas 24/7", "Casino Unlimited Pass", "Stage VIP con Estrellas", "Selection Priority"]}
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
          <MessageSquare color="black" size={32} />
        </button>
      )}

      {/* Footer */}
      <footer className="pt-40 pb-20 px-8 bg-black">
        <div className="max-w-7xl mx-auto border-t border-white/5 pt-20 text-center">
          <div className="text-4xl font-black gold-text mb-8 italic-luxury font-serif">SANTUARIO</div>
          <p className="text-white/20 text-sm font-light uppercase tracking-[0.5em]">Identity & Privacy Protected © 2026</p>
        </div>
      </footer>
    </div>
  );
}

function StarCard({ name, img, vibe, desc, position = "center", filter = "none" }) {
  return (
    <motion.div whileHover={{ y: -10 }} className="group relative rounded-[50px] overflow-hidden border border-white/10 hover:border-primary/40 transition-all duration-700 bg-black shadow-2xl">
      <div className="aspect-[4/6] overflow-hidden relative">
        <img
          src={img}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-125 transition-all duration-[2s]"
          style={{ objectPosition: position, filter: filter }}
          alt={name}
        />
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
            <div className={`w-1.5 h-1.5 rounded-full ${highlight ? 'bg-primary' : 'bg-white/20'}`} />
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
