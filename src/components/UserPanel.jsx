import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    Settings,
    CreditCard,
    Plane,
    Shield,
    Wallet,
    Clock,
    Camera,
    User as UserIcon,
    Copy,
    CheckCircle2,
    AlertTriangle,
    QrCode,
    Link2,
    Cpu,
    RefreshCw,
    LogOut,
    Zap,
    Globe
} from 'lucide-react';

const UserPanel = ({ isOpen, onClose, user, onLogout }) => {
    const [activeTab, setActiveTab] = useState('summary');
    const [copied, setCopied] = useState(false);
    const [connecting, setConnecting] = useState(false);
    const [connectedWallet, setConnectedWallet] = useState(null);

    const walletAddress = "0xBAeaDE80A2A1064E4F8f372cd2ADA9a00daB4BBE";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(walletAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const connectMultiWallet = () => {
        setConnecting(true);
        // Simulation
        setTimeout(() => {
            setConnecting(false);
            setConnectedWallet("0x742...f44e");
        }, 2000);
    };

    const tabs = [
        { id: 'summary', name: 'Resumen', icon: <UserIcon size={16} /> },
        { id: 'travel', name: 'Viaje', icon: <Plane size={16} /> },
        { id: 'payments', name: 'Web3 Pay', icon: <Zap size={16} /> },
        { id: 'settings', name: 'Cuenta', icon: <Settings size={16} /> },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-end p-0 md:p-4 bg-black/90 backdrop-blur-xl">
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="w-full md:w-[600px] h-full md:h-[95vh] bg-[#0A0E14] border-l border-white/10 flex flex-col relative overflow-hidden md:rounded-3xl shadow-[0_0_100px_rgba(212,175,55,0.1)]"
                    >
                        {/* Background Decor */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] -z-10"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 blur-[100px] -z-10"></div>

                        {/* Header */}
                        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-black/20">
                            <div className="flex items-center gap-4">
                                <div className="relative group cursor-pointer" onClick={() => setActiveTab('settings')}>
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent border border-primary/30 flex items-center justify-center transition-all group-hover:border-primary">
                                        <UserIcon size={32} className="text-primary" />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-[#0A0E14] flex items-center justify-center shadow-lg">
                                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-xl font-black tracking-tighter text-white">VIP: {user?.name?.toUpperCase() || 'MIEMBRO'}</h2>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] text-primary font-black tracking-[0.3em] uppercase">Membresía Platinum</span>
                                        <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                                        <span className="text-[9px] text-white/40 font-bold uppercase">ID: SX-2026-X8B9</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-all text-white/40 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        {/* New Navigation Design */}
                        <div className="flex px-6 pt-4 border-b border-white/5 gap-4 overflow-x-auto no-scrollbar bg-black/10">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex flex-col items-center gap-2 px-4 pb-4 transition-all relative group ${activeTab === tab.id ? 'text-primary opacity-100' : 'text-white/30 hover:text-white/60 opacity-60 hover:opacity-100'
                                        }`}
                                >
                                    <div className={`p-2 rounded-xl transition-all ${activeTab === tab.id ? 'bg-primary/20 scale-110 shadow-lg' : 'group-hover:bg-white/5'}`}>
                                        {tab.icon}
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-tighter">{tab.name}</span>
                                    {activeTab === tab.id && (
                                        <motion.div layoutId="nav-glow" className="absolute -bottom-1 left-0 right-0 h-1 bg-primary blur-[2px] rounded-full" />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                            {activeTab === 'summary' && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                                    {/* Status Cards */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-6 glass-morphism border-primary/10 rounded-3xl relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 p-2 opacity-5"><Wallet size={40} /></div>
                                            <div className="text-[9px] text-primary font-black uppercase mb-2 tracking-widest">Balance Pases</div>
                                            <div className="text-2xl font-black">0.00 USDC</div>
                                            <div className="text-[8px] text-white/20 font-bold mt-2 uppercase">Historial Vacío</div>
                                        </div>
                                        <div className="p-6 glass-morphism border-primary/10 rounded-3xl relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 p-2 opacity-5"><Clock size={40} /></div>
                                            <div className="text-[9px] text-primary font-black uppercase mb-2 tracking-widest">Días Restantes</div>
                                            <div className="text-2xl font-black">45 Días</div>
                                            <div className="text-[8px] text-white/20 font-bold mt-2 uppercase">Salida: Mayo 2026</div>
                                        </div>
                                    </div>

                                    {/* VIP Passport Card - Ultra Black Design */}
                                    <div className="relative p-10 rounded-[40px] bg-black border border-white/5 overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
                                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary opacity-10 blur-[100px] rounded-full"></div>
                                        <div className="absolute top-10 right-10 rotate-12 opacity-5">
                                            <Globe size={150} />
                                        </div>
                                        <div className="relative z-10">
                                            <div className="flex justify-between items-start mb-16">
                                                <div>
                                                    <div className="text-2xl font-black italic gold-text tracking-tighter mb-1">VIP PASSPORT</div>
                                                    <div className="text-[7px] text-white/30 uppercase tracking-[0.5em] font-black">Santuario Privado Group</div>
                                                </div>
                                                <div className="px-4 py-1.5 bg-primary/20 border border-primary/40 text-primary text-[10px] font-black rounded-lg uppercase tracking-widest">
                                                    PLATINUM
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-y-8">
                                                <div>
                                                    <div className="text-[8px] text-white/20 uppercase font-black tracking-widest mb-2">Member Name</div>
                                                    <div className="text-sm font-black text-white">{user?.name?.toUpperCase() || 'EXCLUSIVE GUEST'}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-[8px] text-white/20 uppercase font-black tracking-widest mb-2">Class Access</div>
                                                    <div className="text-sm font-black text-primary">FIRST CLASS LUXURY</div>
                                                </div>
                                                <div>
                                                    <div className="text-[8px] text-white/20 uppercase font-black tracking-widest mb-2">Issue Date</div>
                                                    <div className="text-[11px] font-mono text-white/60 uppercase">MARCH 2026</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-[8px] text-white/20 uppercase font-black tracking-widest mb-2">Verification</div>
                                                    <div className="flex items-center justify-end gap-2 text-[11px] font-black text-green-500">
                                                        <Shield size={10} /> SECURE
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'travel' && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                                    <div className="p-8 glass-morphism border-white/5 rounded-3xl group">
                                        <h3 className="text-sm font-black text-primary mb-8 flex items-center justify-between">
                                            <span className="flex items-center gap-3"><Plane size={20} /> MANIFIESTO DE VIAJE</span>
                                            <span className="text-[9px] px-3 py-1 bg-white/5 rounded-full text-white/40 uppercase">Vuelo SX-700</span>
                                        </h3>

                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between border-b border-white/5 pb-6">
                                                <div>
                                                    <div className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">Carnet / Pasaporte</div>
                                                    <div className="text-sm font-black text-red-500 flex items-center gap-2">
                                                        <AlertTriangle size={14} /> PENDIENTE COMPLETAR
                                                    </div>
                                                </div>
                                                <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-white/60 transition-all">
                                                    <Camera size={16} />
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-between border-b border-white/5 pb-6">
                                                <div>
                                                    <div className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">Detalles de Vuelo</div>
                                                    <div className="text-sm font-black italic text-white/30">Auto-completando por disponibilidad...</div>
                                                </div>
                                                <RefreshCw size={16} className="text-primary animate-spin-slow opacity-20" />
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <div className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-2 text-center">Itinerario de Salida</div>
                                                    <div className="flex items-center justify-center gap-6">
                                                        <div className="text-center">
                                                            <div className="text-xl font-black">MAY 15</div>
                                                            <div className="text-[8px] text-white/40">2026</div>
                                                        </div>
                                                        <div className="h-[1px] w-12 bg-primary/20 relative">
                                                            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2"><Plane size={12} className="text-primary" /></div>
                                                        </div>
                                                        <div className="text-center opacity-40">
                                                            <div className="text-xl font-black italic">-- --</div>
                                                            <div className="text-[8px] text-white/40 uppercase">Santuario</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'payments' && (
                                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
                                    <div className="text-center p-10 glass-morphism border-primary/20 rounded-[40px] relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-5"><Link2 size={60} className="rotate-45" /></div>

                                        <p className="text-[10px] text-primary font-black uppercase tracking-[0.4em] mb-4">Secure Web3 Gateway</p>
                                        <h3 className="text-2xl font-black text-white mb-2 italic tracking-tighter uppercase font-mono">Multi-Wallet Connect</h3>
                                        <p className="text-[11px] text-white/40 max-w-xs mx-auto mb-10">Pague su membresía en USDC a través de nuestra pasarela multi-cadena segura.</p>

                                        {connectedWallet ? (
                                            <div className="space-y-4 mb-8">
                                                <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-2xl flex items-center justify-center gap-3">
                                                    <CheckCircle2 size={20} className="text-green-500" />
                                                    <div className="text-left">
                                                        <div className="text-[8px] font-black text-green-500 uppercase tracking-widest">Conectado</div>
                                                        <div className="text-xs font-mono font-bold text-white">{connectedWallet}</div>
                                                    </div>
                                                </div>
                                                <button className="text-[9px] text-white/20 hover:text-white uppercase font-black tracking-widest transition">Desconectar</button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={connectMultiWallet}
                                                disabled={connecting}
                                                className="w-full btn-primary py-5 rounded-2xl mb-8 flex items-center justify-center gap-3 text-[10px] shadow-[0_15px_30px_rgba(212,175,55,0.2)]"
                                            >
                                                {connecting ? (
                                                    <>
                                                        <RefreshCw size={18} className="animate-spin" /> PROCESANDO ENLACE...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Cpu size={18} /> CONECTAR WALLET (ALL NETS)
                                                    </>
                                                )}
                                            </button>
                                        )}

                                        <div className="relative group p-6 bg-white/5 border border-white/5 rounded-3xl text-left">
                                            <div className="text-[8px] text-primary font-black uppercase tracking-[0.3em] mb-3">Dirección de Depósito (USDC Only)</div>
                                            <div className="flex items-center justify-between gap-4">
                                                <span className="text-[11px] font-mono text-white/60 truncate selection:bg-primary/40">{walletAddress}</span>
                                                <button
                                                    onClick={copyToClipboard}
                                                    className="p-3 bg-primary text-black rounded-xl hover:scale-110 active:scale-95 transition-all shadow-lg"
                                                >
                                                    {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                                                </button>
                                            </div>
                                            {copied && (
                                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[8px] font-black text-primary uppercase">
                                                    Dirección Copiada
                                                </motion.div>
                                            )}
                                        </div>

                                        <div className="mt-8 flex justify-center items-center gap-6 grayscale opacity-30">
                                            <div className="flex flex-col items-center">
                                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-black">M</div>
                                                <span className="text-[6px] mt-1 uppercase font-bold">Metamask</span>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-black italic">CP</div>
                                                <span className="text-[6px] mt-1 uppercase font-bold">Coinbase</span>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-black">WC</div>
                                                <span className="text-[6px] mt-1 uppercase font-bold">Connect</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-8 border border-white/5 rounded-[32px] bg-white/[0.02]">
                                        <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                                            <Shield size={14} /> SEGURIDAD CRYPTO
                                        </h4>
                                        <ul className="space-y-4">
                                            <li className="flex gap-4 text-xs font-light text-white/60 leading-relaxed">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                                Aceptamos USDC en Ethereum (ERC20), Polygon, BSC y Solana.
                                            </li>
                                            <li className="flex gap-4 text-xs font-light text-white/60 leading-relaxed">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                                Los pases se acreditan automáticamente tras la detección en cadena.
                                            </li>
                                            <li className="flex gap-4 text-xs font-light text-white/60 leading-relaxed">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                                Servicio de escrow privado para grupos (Mínimo $20,000).
                                            </li>
                                        </ul>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'settings' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                    <div className="p-6 glass-morphism border-white/5 rounded-3xl space-y-4">
                                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                                            <span className="text-xs text-white/40">Notificaciones PUSH</span>
                                            <div className="w-8 h-4 bg-primary rounded-full relative"><div className="absolute right-0.5 top-0.5 w-3 h-3 bg-black rounded-full"></div></div>
                                        </div>
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-xs text-white/40">Autenticación 2FA</span>
                                            <span className="text-[9px] text-green-500 font-black">ACTIVA</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={onLogout}
                                        className="w-full p-5 bg-red-500/5 border border-red-500/20 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-red-500/10 transition-all flex items-center justify-center gap-3 mt-12"
                                    >
                                        <LogOut size={16} /> CERRAR SESIÓN DE SEGURIDAD
                                    </button>

                                    <p className="text-[8px] text-white/20 text-center font-bold items-center gap-1 flex justify-center">
                                        <Lock size={10} /> PROTEGIDO POR SANTUARIO CRYPTO-TRUST™
                                    </p>
                                </motion.div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-8 border-t border-white/5 bg-black/60">
                            <div className="flex justify-between items-center text-[9px] text-white/20 font-black uppercase tracking-[0.4em]">
                                <span>Member Status: ALPHA</span>
                                <span className="flex items-center gap-2 text-primary/30"><Cpu size={12} className="animate-pulse" /> V-1.0.8</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default UserPanel;
