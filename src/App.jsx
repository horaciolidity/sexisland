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
  Crown
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
        className={`fixed top-0 w-full z-[150] transition-all duration-500 px-8 ${scrolled
            ? 'py-4 glass-morphism border-0 border-b border-white/5 rounded-none'
            : 'py-8 bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-black gold-text tracking-tighter">
            SEX ISLAND <span className="text-xs font-light text-white ml-2 tracking-[0.2em] opacity-40">PRIVATE RESERVE</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex gap-10 items-center">
            {navigationLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/60 hover:text-primary transition-all underline decoration-transparent hover:decoration-primary decoration-4 underline-offset-8"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex gap-6 items-center">
            {user ? (
              <div
                className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-full border border-white/5 cursor-pointer hover:bg-white/10 transition group"
                onClick={() => setShowUserPanel(true)}
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                  <UserIcon size={14} className="text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-primary tracking-widest leading-none">VIP MEMBER</span>
                  <span className="text-[10px] font-bold text-white leading-tight uppercase">{user.name}</span>
                </div>
                <div className="w-[1px] h-6 bg-white/10 mx-2"></div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleLogout(); }}
                  className="text-white/40 hover:text-white transition group-hover:text-red-500"
                >
                  <LogOutIcon size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/60 hover:text-white transition border-b border-transparent hover:border-primary pb-1"
              >
                ACCESO VIP
              </button>
            )}
            <button
              className="btn-primary flex items-center gap-3"
              onClick={() => setShowChat(true)}
            >
              CHAT MIEMBROS <Zap size={14} fill="currentColor" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
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
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-36 pb-32 px-8">
        <div className="absolute inset-0 z-0">
          <img
            src="/model_vip.png"
            alt="Paradise Island Luxury"
            className="w-full h-full object-cover opacity-60 mix-blend-screen transition-all duration-[2s] hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] via-[#05070A]/80 to-transparent"></div>
          <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#05070A] to-transparent"></div>
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto">
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
              <span className="gold-text">PLACER</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto mb-16 leading-relaxed font-light italic">
              "6 días y 7 noches donde 60 mujeres internacionales de élite se rinden ante 30 invitados exclusivos. Una isla privada, un destino legendario."
            </p>

            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <button
                className="group btn-primary min-w-[280px] py-6 text-base tracking-[0.2em] relative overflow-hidden"
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

      {/* Features Showcase */}
      <section className="py-24 px-8 max-w-7xl mx-auto" id="experiencia">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-32 gap-16">
          <div className="max-w-3xl text-left">
            <span className="section-tag">Infraestructura del deseo</span>
            <h2 className="text-5xl md:text-8xl font-black mb-10 leading-[0.9]">PLACER <br /><span className="gold-text">SENSORIAL</span></h2>
            <p className="text-dim text-2xl font-light leading-relaxed mb-6">
              Hemos construido un ecosistema donde la única prioridad es su gratificación. Sin reglas, sin cámaras, sin límites.
            </p>
            <div className="flex items-center gap-6 text-primary font-black uppercase tracking-[0.3em] text-xs">
              <span className="flex items-center gap-2"><Crown size={18} /> 60 Modelos Élite</span>
              <div className="w-1.5 h-1.5 bg-white/20 rounded-full"></div>
              <span className="flex items-center gap-2"><Zap size={18} /> Fiesta 24/7</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:pt-16">
            <div className="p-10 glass-morphism border-primary/20 text-center min-w-[180px] relative group overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 -translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <div className="text-5xl font-black text-primary mb-3">60</div>
              <div className="text-[11px] uppercase font-bold text-white/50 tracking-[0.4em]">International <br /> Models</div>
            </div>
            <div className="p-10 glass-morphism border-primary/20 text-center min-w-[180px] relative group overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 -translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <div className="text-5xl font-black text-primary mb-3">30</div>
              <div className="text-[11px] uppercase font-bold text-white/50 tracking-[0.4em]">Elite <br /> Guests</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            title="Diosas del Santuario"
            desc="60 bellezas internacionales seleccionadas para complacer su estancia. Belleza que corta el aliento."
            icon={<Sparkles size={28} className="text-primary" />}
            img="/model_vip.png"
            tag="Acompañamiento"
          />
          <FeatureCard
            title="Elite Casino Party"
            desc="Noches de alta apuesta en nuestro casino privado. Donde el riesgo y la sensualidad se funden."
            icon={<Dices size={28} className="text-primary" />}
            img="/luxury_casino_night_dj.png"
            tag="Casino VIP"
          />
          <FeatureCard
            title="Cenas de Éxtasis"
            desc="Gastronomía molecular y maridaje premium rodeado de compañía que eleva la experiencia."
            icon={<UtensilsCrossed size={28} className="text-primary" />}
            img="/gourmet_dining_sunset.png"
            tag="Gastronomía"
          />
          <FeatureCard
            title="El Muelle Secreto"
            desc="Nuestro Mega Yate listo para fiestas privadas en alta mar. Música, alcohol y libertad."
            icon={<Music size={28} className="text-primary" />}
            img="/luxury_villa_private_pool.png"
            tag="Mega Party"
          />
        </div>
      </section>

      {/* Vuelo Manifest Section */}
      <section className="py-32 px-8 bg-black border-y border-white/10" id="vuelo">
        <div className="max-w-5xl mx-auto text-center mb-20">
          <span className="section-tag">Transporte Imperial</span>
          <h2 className="text-5xl md:text-8xl font-black mb-10 gold-text italic tracking-tighter">EL VUELO DEL REY</h2>
          <p className="text-white/40 text-xl font-light max-w-2xl mx-auto border-l-2 border-primary pl-8 text-left py-4">
            "Su asiento en la historia está esperando. Un jet privado acondicionado para comenzar la fiesta antes de tocar tierra."
          </p>
        </div>

        <PlaneVisual />

        <div className="mt-20 flex justify-center">
          <div className="inline-flex flex-col md:flex-row items-center gap-6 glass-morphism border-primary/20 px-12 py-6 rounded-3xl relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-black text-[9px] font-black px-4 py-1 rounded-full uppercase tracking-widest">Alerta de Seguridad</div>
            <ShieldAlert size={28} className="text-primary animate-pulse" />
            <div className="text-center md:text-left">
              <span className="text-[10px] font-black tracking-[0.4em] text-white/30 uppercase block mb-1">Últimos Cupos</span>
              <span className="text-lg font-black text-primary uppercase">Solo 4 asientos Diamond quedan en cabina.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Itinerary Section */}
      <section className="py-32 px-8 relative overflow-hidden" id="itinerario">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -z-10"></div>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-24">
            <span className="section-tag">Siete Días Inolvidables</span>
            <h2 className="text-6xl md:text-9xl font-black mb-6 uppercase leading-none tracking-tighter">EL MAPA <br /><span className="gold-text">DEL ÉXODO</span></h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto items-center">
            <div className="space-y-10 order-2 lg:order-1">
              {[
                { day: "DÍA 1", title: "THE TOUCHDOWN", icon: <Ship />, desc: "Arribo imperial. Las 60 modelos lo esperan en la pista de aterrizaje privada. Traslado directo al Santuario." },
                { day: "DÍA 2-3", title: "ISLAND VIRGIN PARTY", icon: <Mic2 />, desc: "Fiestas salvajes en playas inexploradas. Barra libre de champagne y sesiones de música inmersiva." },
                { day: "DÍA 4-5", title: "ROYAL CASINO GALA", icon: <Dices />, desc: "La noche más importante. Torneos de apuestas altas en el casino del crucero rodeado de bellezas." },
                { day: "DÍA 6-7", title: "THE FINAL RITUAL", icon: <Gem />, desc: "Cierre legendario en alta mar. Brindis final con lo mejor del mundo antes del vuelo de retorno." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: -50 }}
                  className="group flex gap-8 items-start relative p-8 hover:bg-white/5 rounded-[40px] transition-all duration-500 border border-transparent hover:border-white/5"
                >
                  <div className="flex-shrink-0 w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-transparent border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-all font-black text-3xl italic">
                    {item.day.split(' ')[1]}
                  </div>
                  <div>
                    <span className="text-primary font-black text-[10px] tracking-[0.5em] uppercase mb-4 block opacity-60">{item.day}</span>
                    <h3 className="text-2xl font-black mb-4 tracking-tighter uppercase group-hover:gold-text transition-all">{item.title}</h3>
                    <p className="text-dim text-lg font-light leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="order-1 lg:order-2 h-[600px] rounded-[60px] overflow-hidden sticky top-32 glass-morphism p-4 border-primary/10">
              <img
                src="/vip_service_concierge.png"
                className="w-full h-full object-cover rounded-[45px] opacity-70 group-hover:opacity-100 transition-opacity"
                alt="Luxury Service"
              />
              <div className="absolute inset-x-8 bottom-12 p-8 glass-morphism border-primary/30 rounded-[30px] flex justify-between items-center">
                <div>
                  <h4 className="text-xl font-black mb-1">DETALLE VIP</h4>
                  <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest">Servicio Personalizado 24h</p>
                </div>
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
                  <Zap color="black" fill="currentColor" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tiers / Plans */}
      <section className="py-32 px-8 bg-[#020305]" id="planes">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32">
            <span className="section-tag">Reserve su destino</span>
            <h2 className="text-6xl md:text-9xl font-black mb-10 uppercase tracking-tighter">PLANES <span className="gold-text">VIP</span></h2>
            <p className="text-white/40 text-xl max-w-3xl mx-auto font-light leading-relaxed">
              Invierta en el recuerdo más intenso de su vida. Selecciones limitadas.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 items-stretch pt-2">
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
                "Priority Selection"
              ]}
              highlight
              onSelect={() => user ? setShowUserPanel(true) : setShowLogin(true)}
            />
            <PlanCard
              name="Sovereign Group"
              price="Custom"
              features={[
                "Mansión Privada",
                "Cuerpo de Seguridad propio",
                "Menú Signature Chef",
                "Fiesta Privada Isla",
                "Logística VIP ilimitada"
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
            className="fixed inset-y-0 right-0 w-full md:w-[480px] z-[250] shadow-[-20px_0_50px_rgba(0,0,0,0.8)]"
          >
            <GroupChat onClose={() => setShowChat(false)} user={user} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Button */}
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-12 right-12 w-20 h-20 rounded-[30px] bg-primary flex items-center justify-center shadow-[0_15px_40px_rgba(212,175,55,0.4)] z-[100] hover:scale-110 active:scale-95 transition-all group pulse-gold"
        >
          <div className="relative">
            <MessageSquare color="black" size={32} className="group-hover:rotate-12 transition-all duration-500" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-primary animate-pulse"></div>
          </div>
        </button>
      )}

      {/* Footer */}
      <footer className="pt-40 pb-20 px-8 border-t border-white/5 bg-black relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-20"></div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-20 mb-32">
          <div className="md:col-span-2">
            <div className="text-4xl font-black gold-text mb-10 uppercase tracking-tighter">SANTUARIO</div>
            <p className="text-white/30 text-2xl max-w-lg mb-16 font-light italic leading-snug">
              "Para el hombre que cree que ya lo ha tenido todo, y se atreve a desear más."
            </p>
            <div className="flex gap-8">
              <SocialIcon name="Instagram" />
              <SocialIcon name="Telegram" />
              <SocialIcon name="X (Twitter)" />
            </div>
          </div>
          <div>
            <h4 className="font-bold text-[11px] uppercase tracking-[0.4em] text-primary mb-10">Membresía</h4>
            <ul className="space-y-6 text-sm font-black text-white/40 uppercase tracking-widest">
              <li><a href="#experiencia" className="hover:text-primary transition duration-500">Filosofía</a></li>
              <li><a href="#planes" className="hover:text-primary transition duration-500">Adquisición</a></li>
              <li><a href="#itinerario" className="hover:text-primary transition duration-500">Agenda Privada</a></li>
              <li><a href="#" className="hover:text-primary transition duration-500">Concierge Login</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[11px] uppercase tracking-[0.4em] text-primary mb-10">Contacto Seguro</h4>
            <ul className="space-y-6 text-sm font-black text-white/40 uppercase tracking-widest leading-relaxed">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                Live Now: +1 (800) SEC-VIP
              </li>
              <li className="hover:text-white transition cursor-pointer">Encryption: @SecretIslandHQ</li>
              <li className="hover:text-white transition cursor-pointer">members@santuario.luxury</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 pt-10 border-t border-white/5 text-[10px] text-white/10 uppercase tracking-[0.5em] font-black">
          <div>© 2026 THE SANTUARIO GROUP | GLOBAL ELITE OPERATIONS</div>
          <div className="flex gap-12">
            <span className="hover:text-primary cursor-pointer transition">PRIVACY & ANONYMITY</span>
            <span className="hover:text-primary cursor-pointer transition">ADULT RESERVE POLICY</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ title, desc, icon, img, tag }) {
  return (
    <div className="relative group overflow-hidden rounded-[40px] aspect-[4/5] glass-morphism border-white/5 hover:border-primary/50 transition-all duration-1000">
      <img src={img} className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-[1.5s] group-hover:grayscale-0 group-hover:scale-110 opacity-30 group-hover:opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] via-transparent to-transparent opacity-90"></div>

      <div className="absolute inset-0 p-12 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
        <div className="mb-8 flex justify-between items-center opacity-60 group-hover:opacity-100 transition-opacity">
          <div className="w-16 h-16 rounded-[24px] bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-700 shadow-2xl">
            {icon}
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 px-5 py-2 rounded-full border border-primary/20 bg-primary/5">{tag}</span>
        </div>
        <h3 className="text-3xl font-black mb-6 group-hover:text-white transition-colors leading-[0.9] text-white/90 uppercase">{title}</h3>
        <p className="text-white/40 group-hover:text-white/80 text-base font-light leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-all duration-1000 delay-100">
          {desc}
        </p>
        <div className="w-12 h-1 bg-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
      </div>
    </div>
  );
}

function PlanCard({ name, price, features, highlight, onSelect }) {
  return (
    <motion.div
      whileHover={{ y: -20, scale: 1.02 }}
      className={`relative p-14 rounded-[60px] flex flex-col overflow-hidden transition-all duration-700 ${highlight
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
        <h3 className={`text-sm font-black uppercase tracking-[0.5em] mb-10 ${highlight ? 'text-primary' : 'text-white/40'}`}>{name}</h3>
        <div className="flex items-baseline gap-4">
          <span className="text-7xl font-black tracking-tighter italic">{price}</span>
          <span className="text-white/40 text-sm font-black">USD</span>
        </div>
      </div>

      <ul className="flex-1 space-y-8 mb-16">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-6 text-base font-medium text-white/60 group cursor-default">
            <div className={`w-2 h-2 rounded-full ${highlight ? 'bg-primary shadow-[0_0_10px_rgba(212,175,55,0.8)]' : 'bg-white/20'} group-hover:scale-150 transition-transform`} />
            {f}
          </li>
        ))}
      </ul>

      <button
        onClick={onSelect}
        className={`w-full py-7 rounded-[30px] font-black text-sm uppercase tracking-[0.4em] transition-all duration-700 relative overflow-hidden group/btn ${highlight
            ? 'bg-primary text-black hover:scale-[1.03] shadow-[0_20px_40px_rgba(212,175,55,0.3)]'
            : 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white'
          }`}
      >
        <span className="relative z-10">RESERVAR ACCESO</span>
        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-700"></div>
      </button>
    </motion.div>
  );
}

function SocialIcon({ name }) {
  return (
    <div className="w-16 h-16 rounded-[24px] border border-white/10 flex items-center justify-center hover:border-primary transition duration-500 text-white/20 hover:text-primary group relative text-center bg-black/50">
      <span className="text-lg font-black font-mono tracking-tighter mx-auto block">{name.charAt(0)}</span>
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/80 px-3 py-1 rounded-lg border border-white/10">
        {name}
      </div>
    </div>
  );
}

export default App;
