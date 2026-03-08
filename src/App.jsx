import React, { useState } from 'react';
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
  LogOut as LogOutIcon
} from 'lucide-react';
import GroupChat from './components/GroupChat';
import PlaneVisual from './components/PlaneVisual';
import LoginModal from './components/LoginModal';
import './App.css';

function App() {
  const [showChat, setShowChat] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-[#05070A] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 p-6 flex justify-between items-center glass-morphism border-0 border-b border-white/5 rounded-none">
        <div className="text-2xl font-black gold-text tracking-tighter">SEX ISLAND <span className="text-xs font-light text-white ml-2 tracking-widest opacity-60">EXPERIENCE</span></div>
        <div className="hidden lg:flex gap-10 items-center text-[11px] font-bold tracking-[0.2em] uppercase">
          <a href="#experiencia" className="hover:text-primary transition">La Experiencia</a>
          <a href="#itinerario" className="hover:text-primary transition">Itinerario</a>
          <a href="#planes" className="hover:text-primary transition">Planes VIP</a>

          {user ? (
            <div className="flex items-center gap-4 border-l border-white/10 pl-6">
              <span className="text-primary tracking-widest flex items-center gap-2">
                <UserIcon size={14} /> VIP: {user.name.toUpperCase()}
              </span>
              <button onClick={handleLogout} className="text-white/40 hover:text-white transition">
                <LogOutIcon size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="flex items-center gap-2 hover:text-primary transition border-l border-white/10 pl-6"
            >
              <LogInIcon size={16} /> ACCESO VIP
            </button>
          )}

          <button className="btn-primary" onClick={() => setShowChat(true)}>Chat Privado</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0 scale-105">
          <img
            src="/model_vip.png"
            alt="Paradise Island Luxury"
            className="w-full h-full object-cover opacity-50 blur-[1px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] via-[#05070A]/80 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="mb-6 flex items-center justify-center gap-3">
              <div className="h-[1px] w-12 bg-primary"></div>
              <span className="text-primary text-xs font-black tracking-[0.4em] uppercase">Edición 2026</span>
              <div className="h-[1px] w-12 bg-primary"></div>
            </div>

            <h1 className="text-5xl md:text-8xl font-black mb-6 leading-tight">
              REDEFINE EL <span className="gold-text">LUJO</span><br />
              DEFINA EL <span className="gold-text">PLACER</span>
            </h1>

            <p className="text-lg md:text-xl text-dim max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Un santuario privado donde 30 hombres y 60 mujeres se reúnen para 7 días de indulgencia total en el paraíso.
            </p>

            <PlaneVisual />

            <div className="mt-16 flex flex-col md:flex-row gap-6 justify-center items-center">
              <button className="group btn-primary px-12 py-4 text-sm tracking-widest flex items-center gap-3">
                SOLICITAR INVITACIÓN <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex items-center gap-2 text-[10px] text-white/40 font-bold uppercase tracking-widest">
                <ShieldAlert size={14} className="text-primary" />
                Quedan 23 plazas para hombres
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Features Showcase */}
      <section className="py-24 px-6 max-w-7xl mx-auto" id="experiencia">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl text-left">
            <h2 className="text-4xl md:text-6xl font-black mb-6">SERVICIOS <br /><span className="gold-text">SIN LÍMITES</span></h2>
            <p className="text-dim text-lg font-light leading-relaxed">
              Cada detalle ha sido curado para superar las expectativas de los más exigentes. Desde transporte privado hasta atención personalizada 24/7.
            </p>
          </div>
          <div className="text-right flex gap-4">
            <div className="p-4 glass-morphism border-primary/20">
              <div className="text-3xl font-black text-primary">60+</div>
              <div className="text-[10px] uppercase font-bold text-white/60 tracking-widest">Modelos VIP</div>
            </div>
            <div className="p-4 glass-morphism border-primary/20">
              <div className="text-3xl font-black text-primary">5★</div>
              <div className="text-[10px] uppercase font-bold text-white/60 tracking-widest">Servicio</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            title="Isla Privada"
            desc="Acceso exclusivo a un atolón privado con seguridad 24h y libertad absoluta."
            icon={<Ship className="text-primary" />}
            img="/model_vip.png"
            tag="Exclusividad"
          />
          <FeatureCard
            title="Villas de Lujo"
            desc="Residencias ultra modernas donde las 60 modelos atenderán cada deseo."
            icon={<Hotel className="text-primary" />}
            img="/villa.png"
            tag="Alojamiento"
          />
          <FeatureCard
            title="Gastronomía & Placer"
            desc="Menú gourmet de mariscos y compañía de élite en cada cena."
            icon={<UtensilsCrossed className="text-primary" />}
            img="/dining.png"
            tag="Gourmet"
          />
          <FeatureCard
            title="Atención de Reinas"
            desc="60 modelos internacionales seleccionadas para su entretenimiento personal."
            icon={<ShieldCheck className="text-primary" />}
            img="/vip_service.png"
            tag="Servicio VIP"
          />
        </div>
      </section>

      {/* Itinerary Section */}
      <section className="py-24 bg-white/5" id="itinerario">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black gold-text mb-4">EL ITINERARIO</h2>
            <p className="text-dim uppercase tracking-[0.3em] text-[10px]">Una semana de libertad absoluta</p>
          </div>

          <div className="space-y-12">
            {[
              { day: "DÍA 1", title: "LLEGADA & BIENVENIDA VIP", icon: <Ship />, desc: "Recepción en jet privado, traslado a villas y fiesta de bienvenida en el crucero." },
              { day: "DÍA 2-3", title: "EXPLORACIÓN & ISLA", icon: <Mic2 />, desc: "Sesiones de fotos, beach party con DJs internacionales y cena bajo las estrellas." },
              { day: "DÍA 4-5", title: "CASINO & NOCHE DE REYES", icon: <Dices />, desc: "Noches temáticas de casino privado, torneos de poker y espectáculos VIP." },
              { day: "DÍA 6-7", title: "DESPEDIDA ÉPICA", icon: <Gem />, desc: "La fiesta final en alta mar, ceremonia de clausura y transporte de regreso." },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -20 }}
                className="flex gap-8 group"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border border-primary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                    {item.day.split(' ')[1] || '•'}
                  </div>
                  <div className="flex-1 w-[1px] bg-white/10 mt-4 h-full"></div>
                </div>
                <div className="pb-8">
                  <span className="text-primary font-bold text-xs tracking-widest uppercase mb-2 block">{item.day}</span>
                  <h3 className="text-2xl font-black mb-4 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-dim max-w-xl font-light">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers / Plans */}
      <section className="py-24 px-6" id="planes">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-16">SELECCIONA TU <span className="gold-text">NIVEL</span></h2>
          <div className="grid md:grid-cols-3 gap-8">
            <PlanCard
              name="Diamond VIP"
              price="$15,000"
              features={[
                "Traslado en Jet Privado (First Class)",
                "Villa privada con piscina infinita",
                "Asistente personal 24/7",
                "Acceso Ilimitado al Casino VIP",
                "Mesa reservada en el escenario con DJs",
                "Tratamiento Real con las 60 modelos"
              ]}
              highlight
            />
            <PlanCard
              name="Platinum Member"
              price="$10,000"
              features={[
                "Vuelo Charter VVIP",
                "Suite de Lujo frente al mar",
                "Barra libre y menú gourmet",
                "Acceso a todas las fiestas con 60 modelos",
                "Crédito en el Casino de $1,000"
              ]}
            />
            <PlanCard
              name="Private Group"
              price="Custom"
              features={[
                "Villas Privadas Exclusivas",
                "Seguridad propia de alto nivel",
                "Menú y Chef especializado",
                "Fiesta Privada en Playa Secreta",
                "Logística personalizada para su grupo"
              ]}
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

      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full md:w-[450px] z-[100]"
          >
            <GroupChat onClose={() => setShowChat(false)} user={user} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Button */}
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] z-50 hover:scale-110 transition group"
        >
          <MessageSquare color="black" className="group-hover:rotate-12 transition-transform" />
        </button>
      )}

      <footer className="py-20 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="text-2xl font-black gold-text mb-6 uppercase tracking-tighter">SEX ISLAND</div>
            <p className="text-dim text-sm max-w-sm mb-8 leading-relaxed">
              La experiencia más exclusiva del mundo diseñada para aquellos hombres que no se conforman con lo ordinario.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-primary transition cursor-pointer text-dim hover:text-primary underline">TW</div>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-primary transition cursor-pointer text-dim hover:text-primary underline">IG</div>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-primary transition cursor-pointer text-dim hover:text-primary underline">TG</div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-primary mb-6">Información</h4>
            <ul className="space-y-4 text-sm text-dim">
              <li className="hover:text-white cursor-pointer transition">Privacidad</li>
              <li className="hover:text-white cursor-pointer transition">Seguridad</li>
              <li className="hover:text-white cursor-pointer transition">Condiciones</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-primary mb-6">Contacto</h4>
            <ul className="space-y-4 text-sm text-dim">
              <li className="flex items-center gap-2">WhatsApp: +1 (234) VIP-ONLY</li>
              <li className="flex items-center gap-2">Email: members@sexisland.vip</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-[10px] text-white/20 mt-20 uppercase tracking-[5px]">
          © 2026 LUXURY EXPERIENCE GROUP
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ title, desc, icon, img, tag }) {
  return (
    <div className="relative group overflow-hidden rounded-3xl aspect-[4/5] glass-morphism flex flex-col justify-end p-8 border-white/5 hover:border-primary/30 transition-all">
      <img src={img} className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110 opacity-30 group-hover:opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] via-[#05070A]/30 to-transparent"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-primary/20 rounded-2xl text-primary">{icon}</div>
          <span className="text-[10px] font-black uppercase tracking-widest text-primary/80 bg-primary/10 px-3 py-1 rounded-full">{tag}</span>
        </div>
        <h3 className="text-2xl font-black mb-3 text-white">{title}</h3>
        <p className="text-dim text-sm font-light leading-snug">{desc}</p>
      </div>
    </div>
  );
}

function PlanCard({ name, price, features, highlight }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className={`p-10 rounded-[32px] text-center border transition-all ${highlight ? 'bg-primary text-black border-primary font-bold shadow-2xl shadow-primary/20' : 'bg-white/5 border-white/10 hover:border-primary/40'}`}
    >
      <h3 className={`text-sm font-black uppercase tracking-[0.3em] mb-4 ${highlight ? 'text-black/60' : 'text-primary'}`}>{name}</h3>
      <div className="text-4xl font-black mb-10">{price}</div>
      <ul className="space-y-4 mb-10 text-sm opacity-80">
        {features.map((f, i) => (
          <li key={i} className="flex items-center justify-center gap-2">
            <CheckCircleIcon className={highlight ? 'text-black/40' : 'text-primary'} /> {f}
          </li>
        ))}
      </ul>
      <button className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${highlight ? 'bg-black text-white hover:scale-105 shadow-xl' : 'bg-white/10 hover:bg-primary hover:text-black'}`}>
        Seleccionar Plan
      </button>
    </motion.div>
  );
}

const CheckCircleIcon = (props) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default App;
