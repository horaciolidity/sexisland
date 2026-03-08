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
  Wallet
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
    { name: 'La Experiencia', href: '#experiencia' },
    { name: 'El Vuelo', href: '#vuelo' },
    { name: 'Itinerario', href: '#itinerario' },
    { name: 'Planes VIP', href: '#planes' },
  ];

  return (
    <div className="min-h-screen bg-[#05070A] text-white selection:bg-primary/30">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-100 transition-all duration-500 px-8 ${scrolled
            ? 'py-4 glass-morphism border-0 border-b border-white/5 rounded-none'
            : 'py-8 bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-black gold-text tracking-tighter">
            SEX ISLAND <span className="text-xs font-light text-white ml-2 tracking-[0.2em] opacity-40">2026</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex gap-10 items-center">
            {navigationLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/60 hover:text-primary transition-all underline decoration-transparent hover:decoration-primary decoration-2 underline-offset-8"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex gap-6 items-center">
            {user ? (
              <div
                className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-full border border-white/5 cursor-pointer hover:bg-white/10 transition"
                onClick={() => setShowUserPanel(true)}
              >
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <UserIcon size={12} className="text-primary" />
                </div>
                <span className="text-[10px] font-bold text-primary tracking-widest">
                  VIP: {user.name.toUpperCase()}
                </span>
                <div className="w-[1px] h-4 bg-white/10 mx-2"></div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleLogout(); }}
                  className="text-white/40 hover:text-white transition"
                >
                  <LogOutIcon size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/60 hover:text-white transition"
              >
                ACCESO VIP
              </button>
            )}
            <button
              className="btn-primary"
              onClick={() => setShowChat(true)}
            >
              CHAT PRIVADO
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <XIcon size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[49] glass-morphism flex flex-col items-center justify-center gap-8 pt-20"
          >
            {navigationLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-bold uppercase tracking-widest text-white/60 hover:text-primary"
              >
                {link.name}
              </a>
            ))}
            {user && (
              <button
                onClick={() => { setShowUserPanel(true); setMobileMenuOpen(false); }}
                className="text-primary font-black tracking-widest"
              >
                PANEL DE USUARIO
              </button>
            )}
            <button
              className="btn-primary mt-4"
              onClick={() => { setShowChat(true); setMobileMenuOpen(false); }}
            >
              CHAT PRIVADO
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-36 pb-20 px-8">
        <div className="absolute inset-0 z-0">
          <img
            src="/model_vip.png"
            alt="Paradise Island Luxury"
            className="w-full h-full object-cover opacity-60 mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] via-[#05070A]/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#05070A]/30 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-tag">Bienvenido al Santuario</span>
            <h1 className="text-6xl md:text-9xl font-black mb-8 leading-none tracking-tighter">
              BEYOND <br />
              <span className="gold-text">LUXURY</span>
            </h1>

            <p className="text-lg md:text-xl text-dim max-w-2xl mx-auto mb-12 leading-relaxed font-light">
              Donde 30 elegidos y 60 modelos desafían los límites del placer en una isla privada inexplorada.
              Más que un tour, es su propia leyenda.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                className="group btn-primary min-w-[240px]"
                onClick={() => user ? setShowUserPanel(true) : setShowLogin(true)}
              >
                {user ? 'VER MI PANEL' : 'SOLICITAR INVITACIÓN'}
                <ArrowRight size={14} className="inline ml-2 group-hover:translate-x-1 transition-all" />
              </button>
              <button className="btn-secondary min-w-[240px]" onClick={() => window.location.href = '#experiencia'}>
                EXPLORAR TOUR
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Features Showcase */}
      <section className="py-32 px-8 max-w-7xl mx-auto" id="experiencia">
        <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-12">
          <div className="max-w-2xl text-left">
            <span className="section-tag">Servicios Exclusivos</span>
            <h2 className="text-4xl md:text-7xl font-black mb-10 leading-none">TODO BAJO <br /><span className="gold-text">CONTROL</span></h2>
            <p className="text-dim text-xl font-light leading-relaxed">
              Curamos cada experiencia para satisfacer su naturaleza más instintiva. No existen las reglas, solo la máxima indulgencia.
            </p>
          </div>
          <div className="flex gap-6 md:mt-auto">
            <div className="p-8 glass-morphism border-primary/20 text-center min-w-[140px]">
              <div className="text-4xl font-black text-primary mb-2">60+</div>
              <div className="text-[10px] uppercase font-bold text-white/40 tracking-[0.3em]">Modelos</div>
            </div>
            <div className="p-8 glass-morphism border-primary/20 text-center min-w-[140px]">
              <div className="text-4xl font-black text-primary mb-2">5★</div>
              <div className="text-[10px] uppercase font-bold text-white/40 tracking-[0.3em]">Resort</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            title="Santuario Privado"
            desc="Un atolón caribeño inaccesible para el mundo exterior. Seguridad militar 24/7."
            icon={<Ship size={24} />}
            img="/model_vip.png"
            tag="Seguridad"
          />
          <FeatureCard
            title="Villas Concept"
            desc="Arquitectura moderna fundida con la selva y el mar. Jacuzzis integrados."
            icon={<Hotel size={24} />}
            img="/villa.png"
            tag="Hospedaje"
          />
          <FeatureCard
            title="Gourmet Extremo"
            desc="Cenas sensoriales a cargo de chefs Michelin en playas vírgenes."
            icon={<UtensilsCrossed size={24} />}
            img="/dining.png"
            tag="Gourmet"
          />
          <FeatureCard
            title="Servicio A-List"
            desc="60 modelos internacionales dedicadas exclusivamente a su felicidad."
            icon={<ShieldCheck size={24} />}
            img="/vip_service.png"
            tag="Acompañamiento"
          />
        </div>
      </section>

      {/* Vuelo Manifest Section */}
      <section className="py-32 px-8 bg-white/5 border-y border-white/5" id="vuelo">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <span className="section-tag">Transporte de Élite</span>
          <h2 className="text-4xl md:text-6xl font-black mb-8 gold-text">MANIFIESTO DE VUELO</h2>
          <p className="text-dim text-lg font-light max-w-3xl mx-auto italic">
            "Su viaje comienza a 40,000 pies de altura. Vuelo privado charter de lujo con barra libre y catering de autor."
          </p>
        </div>

        <PlaneVisual />

        <div className="mt-16 flex justify-center">
          <div className="inline-flex flex-col md:flex-row items-center gap-4 bg-primary/5 border border-primary/20 px-8 py-4 rounded-2xl">
            <ShieldAlert size={20} className="text-primary animate-pulse" />
            <span className="text-sm font-bold tracking-widest text-primary/80 uppercase">
              Alerta: El Manifiesto se cierra en 12 horas. Asientos Platinum disponibles.
            </span>
          </div>
        </div>
      </section>

      {/* Itinerary Section */}
      <section className="py-32 px-8" id="itinerario">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-20">
            <span className="section-tag">Cronograma del Placer</span>
            <h2 className="text-5xl font-black mb-4 uppercase leading-none">7 DÍAS <br /><span className="gold-text">EN EL PARAÍSO</span></h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {[
              { day: "DÍA 1", title: "DESPEGUE & BIENVENIDA", icon: <Ship />, desc: "Arribo en Jet privado. Traslado a villas VIP. Cóctel de bienvenida con las 60 modelos en el muelle privado." },
              { day: "DÍA 2-3", title: "PRIVATE BEACH PARTY", icon: <Mic2 />, desc: "Sesiones de fotos internacionales, sets de DJs sorpresa y cena gourmet descalzos en la arena blanca." },
              { day: "DÍA 4-5", title: "ROYAL CASINO NIGHT", icon: <Dices />, desc: "Noche de gala. Torneo de Poker VIP con las modelos. Barra libre de licores premium y apuestas altas." },
              { day: "DÍA 6-7", title: "THE FINAL ODYSSEY", icon: <Gem />, desc: "Fiesta de despedida en el Mega Crucero. Ceremonia de clausura y vuelo privado de retorno a casa." },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                className="group p-8 glass-morphism border-white/5 hover:border-primary/20 transition-all flex gap-6 items-start"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all font-black text-xl">
                  {item.day.split(' ')[1].charAt(0)}
                </div>
                <div>
                  <span className="text-primary font-bold text-[10px] tracking-[0.3em] uppercase mb-2 block">{item.day}</span>
                  <h3 className="text-xl font-bold mb-3 tracking-tighter">{item.title}</h3>
                  <p className="text-dim text-sm font-light leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers / Plans */}
      <section className="py-32 px-8 bg-black/40 border-t border-white/5" id="planes">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="section-tag">Únase a los elegidos</span>
            <h2 className="text-5xl md:text-7xl font-black mb-8 uppercase">PLAZAS <span className="gold-text">LIMITADAS</span></h2>
            <p className="text-dim text-lg max-w-3xl mx-auto">
              Solo 30 hombres por tour. Seleccione la membresía que define sus ambiciones.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-stretch pt-12">
            <PlanCard
              name="Platinum Member"
              price="$5,200"
              features={[
                "Vuelo Charter VVIP",
                "Suite Mar Deluxe",
                "Acceso Total Fiestas",
                "60 Modelas Confirmadas",
                "Crédito Casino $500"
              ]}
              onSelect={() => user ? setShowUserPanel(true) : setShowLogin(true)}
            />
            <PlanCard
              name="Diamond VIP"
              price="$7,500"
              features={[
                "Jet Privado First Class",
                "Villa Piscina Infinita",
                "Concierge Personal 24/7",
                "Casino Ilimitado VIP",
                "Mesa Stage con DJs",
                "Prioridad con Modelos"
              ]}
              highlight
              onSelect={() => user ? setShowUserPanel(true) : setShowLogin(true)}
            />
            <PlanCard
              name="Private Group"
              price="Custom"
              features={[
                "Villas Privadas Exclusivas",
                "Seguridad Particular",
                "Chef & Menú Propio",
                "Fiesta en Isla Secreta",
                "Logística a medida"
              ]}
              onSelect={() => user ? setShowUserPanel(true) : setShowLogin(true)}
            />
          </div>
        </div>
      </section>

      {/* Overlays */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={handleLogin}
      />

      <UserPanel
        isOpen={showUserPanel}
        onClose={() => setShowUserPanel(false)}
        user={user}
        onLogout={handleLogout}
      />

      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full md:w-[450px] z-200"
          >
            <GroupChat onClose={() => setShowChat(false)} user={user} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Button */}
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-10 right-10 w-16 h-16 rounded-[20px] bg-primary flex items-center justify-center shadow-[0_10px_30px_rgba(212,175,55,0.4)] z-50 hover:scale-110 active:scale-95 transition-all group pulse-gold"
        >
          <MessageSquare color="black" className="group-hover:rotate-12 transition-transform" />
        </button>
      )}

      {/* Footer */}
      <footer className="pt-32 pb-16 px-8 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16 mb-24">
          <div className="md:col-span-2">
            <div className="text-3xl font-black gold-text mb-8 uppercase tracking-tighter">SEX ISLAND</div>
            <p className="text-dim text-lg max-w-sm mb-12 font-light italic">
              "Para el hombre que cree que ya lo ha tenido todo."
            </p>
            <div className="flex gap-6">
              <SocialIcon name="Instagram" />
              <SocialIcon name="Telegram" />
              <SocialIcon name="X" />
            </div>
          </div>
          <div>
            <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] text-primary mb-8">Navegación</h4>
            <ul className="space-y-4 text-sm font-medium text-white/60">
              <li><a href="#experiencia" className="hover:text-primary transition">El Tour</a></li>
              <li><a href="#planes" className="hover:text-primary transition">Reservas</a></li>
              <li><a href="#itinerario" className="hover:text-primary transition">Agenda</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] text-primary mb-8">Contacto Privado</h4>
            <ul className="space-y-4 text-sm font-medium text-white/60">
              <li>WhatsApp: +1 666-VOY-ONLY</li>
              <li>Encrypted: @SexIslandHQ</li>
              <li>members@sexisland.vip</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-white/5 text-[9px] text-white/20 uppercase tracking-[0.4em] font-bold">
          <div>© 2026 LUXURY EXPERIENCE GROUP | ALL RIGHTS RESERVED</div>
          <div className="flex gap-8">
            <span className="hover:text-primary cursor-pointer transition">PRIVACY POLICY</span>
            <span className="hover:text-primary cursor-pointer transition">ADULT CONTENT GUIDELINES</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ title, desc, icon, img, tag }) {
  return (
    <div className="relative group overflow-hidden rounded-[32px] aspect-[4/5] glass-morphism border-white/5 hover:border-primary/40 transition-all duration-700">
      <img src={img} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-20 group-hover:opacity-40 scale-105 group-hover:scale-100" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] via-transparent to-transparent"></div>

      <div className="absolute inset-0 p-10 flex flex-col justify-end">
        <div className="mb-6 flex justify-between items-center">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            {icon}
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest text-primary/80 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5">{tag}</span>
        </div>
        <h3 className="text-2xl font-black mb-4 group-hover:text-primary transition-colors leading-tight">{title}</h3>
        <p className="text-dim text-sm font-light leading-relaxed mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
          {desc}
        </p>
      </div>
    </div>
  );
}

function PlanCard({ name, price, features, highlight, onSelect }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className={`relative p-12 rounded-[40px] flex flex-col overflow-hidden transition-all duration-500 ${highlight
          ? 'bg-gradient-to-b from-primary/10 to-transparent border-primary/30 shadow-[0_20px_60px_-15px_rgba(212,175,55,0.1)]'
          : 'bg-white/5 border-white/5 hover:border-white/10'
        } border`}
    >
      {highlight && (
        <div className="absolute top-0 right-0 py-2 px-8 bg-primary text-black font-black text-[9px] tracking-[0.2em] uppercase rounded-bl-2xl">
          MOST EXCLUSIVE
        </div>
      )}

      <div className="mb-12">
        <h3 className={`text-xs font-black uppercase tracking-[0.4em] mb-6 ${highlight ? 'text-primary' : 'text-white/60'}`}>{name}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-black">{price}</span>
          <span className="text-dim text-xs font-bold">USD</span>
        </div>
      </div>

      <ul className="flex-1 space-y-6 mb-12">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-4 text-sm font-medium text-white/80 group">
            <div className={`w-1.5 h-1.5 rounded-full ${highlight ? 'bg-primary' : 'bg-white/30'} group-hover:scale-150 transition-transform`} />
            {f}
          </li>
        ))}
      </ul>

      <button
        onClick={onSelect}
        className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all duration-500 ${highlight
            ? 'btn-primary'
            : 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20'
          }`}
      >
        SOLICITAR ACCESO
      </button>
    </motion.div>
  );
}

function SocialIcon({ name }) {
  return (
    <div className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center hover:border-primary transition cursor-pointer text-white/20 hover:text-primary group relative text-center">
      <span className="text-xs font-bold font-mono tracking-tighter mx-auto mt-3.5 block">{name.charAt(0)}</span>
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
        {name}
      </div>
    </div>
  );
}

export default App;
