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
    QrCode
} from 'lucide-react';

const UserPanel = ({ isOpen, onClose, user, onLogout }) => {
    const [activeTab, setActiveTab] = useState('summary');
    const [copied, setCopied] = useState(false);

    const walletAddress = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"; // Mock address

    const copyToClipboard = () => {
        navigator.clipboard.writeText(walletAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const tabs = [
        { id: 'summary', name: 'Resumen', icon: <UserIcon size={16} /> },
        { id: 'travel', name: 'Viaje', icon: <Plane size={16} /> },
        { id: 'payments', name: 'Depósitos', icon: <Wallet size={16} /> },
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
                        className="w-full md:w-[600px] h-full md:h-[95vh] bg-[#0A0E14] border-l border-white/10 flex flex-col relative overflow-hidden md:rounded-3xl"
                    >
                        {/* Background Glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] -z-10"></div>

                        {/* Header */}
                        <div className="p-8 border-b border-white/5 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center relative group">
                                    <UserIcon size={32} className="text-primary" />
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-[#0A0E14] flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-xl font-black tracking-tighter text-white">VIP: {user?.name?.toUpperCase() || 'USER'}</h2>
                                    <p className="text-[10px] text-primary font-black tracking-[0.3em] uppercase">Membresía Platinum</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition text-white/40">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Navigation Tabs */}
                        <div className="flex px-4 border-b border-white/5 gap-2 overflow-x-auto no-scrollbar">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-6 py-4 text-[10px] font-black uppercase tracking-widest transition-all relative ${activeTab === tab.id ? 'text-primary' : 'text-white/40 hover:text-white'
                                        }`}
                                >
                                    {tab.icon} {tab.name}
                                    {activeTab === tab.id && (
                                        <motion.div layoutId="tab-active" className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                            {activeTab === 'summary' && (
                                <div className="space-y-8">
                                    {/* Status Cards */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-6 glass-morphism border-primary/10 rounded-2xl">
                                            <div className="text-[9px] text-primary font-black uppercase mb-2 tracking-widest">Balance Pases</div>
                                            <div className="text-2xl font-black">0.00 USDC</div>
                                        </div>
                                        <div className="p-6 glass-morphism border-primary/10 rounded-2xl">
                                            <div className="text-[9px] text-primary font-black uppercase mb-2 tracking-widest">Días Restantes</div>
                                            <div className="text-2xl font-black">45 Días</div>
                                        </div>
                                    </div>

                                    {/* VIP Passport Card */}
                                    <div className="relative p-8 rounded-3xl bg-gradient-to-br from-primary/20 to-transparent border border-primary/30 overflow-hidden shadow-2xl">
                                        <div className="absolute top-4 right-8 opacity-10">
                                            <Shield size={120} />
                                        </div>
                                        <div className="relative z-10">
                                            <div className="flex justify-between items-start mb-12">
                                                <div className="text-2xl font-black italic gold-text tracking-tighter">VIP PASS 2026</div>
                                                <div className="px-3 py-1 bg-primary text-black text-[9px] font-black rounded-full uppercase">Platinum</div>
                                            </div>
                                            <div className="space-y-6">
                                                <div>
                                                    <div className="text-[8px] text-white/40 uppercase font-bold tracking-widest mb-1">Pass ID</div>
                                                    <div className="text-sm font-mono tracking-widest text-primary">SX-P2026-X8B9</div>
                                                </div>
                                                <div className="flex gap-12">
                                                    <div>
                                                        <div className="text-[8px] text-white/40 uppercase font-bold tracking-widest mb-1">Acceso</div>
                                                        <div className="text-sm font-black">FULL ACCESS</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-[8px] text-white/40 uppercase font-bold tracking-widest mb-1">Status</div>
                                                        <div className="text-sm font-black text-green-500">ACTIVO</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'travel' && (
                                <div className="space-y-6">
                                    <div className="p-6 glass-morphism border-white/5 rounded-2xl">
                                        <h3 className="text-sm font-black text-primary mb-6 flex items-center gap-2">
                                            <Plane size={16} /> LOGÍSTICA DE VUELO
                                        </h3>

                                        <div className="space-y-6">
                                            <div className="flex border-b border-white/5 pb-4">
                                                <div className="w-1/3 text-[10px] font-bold text-white/40 uppercase">Vuelo ID</div>
                                                <div className="w-2/3 text-sm font-bold">JET-30SC-SANTUARIO</div>
                                            </div>
                                            <div className="flex border-b border-white/5 pb-4">
                                                <div className="w-1/3 text-[10px] font-bold text-white/40 uppercase">Origen</div>
                                                <div className="w-2/3 text-sm font-bold">VIP TERMINAL - PRIVATE SECTOR</div>
                                            </div>
                                            <div className="flex border-b border-white/5 pb-4">
                                                <div className="w-1/3 text-[10px] font-bold text-white/40 uppercase">Doc. Identidad</div>
                                                <div className="w-2/3">
                                                    <span className="text-xs bg-red-500/10 text-red-500 px-3 py-1 rounded-full font-bold flex items-center gap-2 w-fit">
                                                        <AlertTriangle size={12} /> PENDIENTE COMPLETAR CARNET
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex border-b border-white/5 pb-4">
                                                <div className="w-1/3 text-[10px] font-bold text-white/40 uppercase">Fechas</div>
                                                <div className="w-2/3">
                                                    <span className="text-xs text-white/30 italic">A definir tras confirmación de visa VIP</span>
                                                </div>
                                            </div>
                                        </div>

                                        <button className="w-full btn-secondary mt-8 text-[10px] py-4">COMPLETAR DOCUMENTACIÓN <Camera size={14} className="inline ml-2" /></button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'payments' && (
                                <div className="space-y-8">
                                    <div className="text-center p-8 bg-primary/5 border border-primary/20 rounded-3xl">
                                        <p className="text-xs text-white/60 mb-2">Compra de Pases VIP</p>
                                        <h3 className="text-2xl font-black text-white mb-6">DEPÓSITO USDC</h3>

                                        <div className="bg-white p-4 rounded-2xl w-48 h-48 mx-auto mb-6 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                                            {/* Placeholder for QR */}
                                            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-black">
                                                <QrCode size={120} />
                                            </div>
                                        </div>

                                        <p className="text-[10px] text-primary font-bold uppercase tracking-[0.2em] mb-4">Redes Soportadas: Todas las redes (EVM, Solana, TRON)</p>

                                        <div className="relative group">
                                            <div className="bg-black/50 border border-white/10 p-4 rounded-xl flex items-center justify-between gap-4">
                                                <span className="text-[10px] font-mono text-white/60 truncate">{walletAddress}</span>
                                                <button
                                                    onClick={copyToClipboard}
                                                    className="p-2 hover:bg-white/5 rounded-lg transition text-primary flex items-center gap-2"
                                                >
                                                    {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                                                </button>
                                            </div>
                                            {copied && (
                                                <motion.span
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-black text-[9px] font-black px-4 py-2 rounded-full"
                                                >
                                                    COPIADO AL PORTAPAPELES
                                                </motion.span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="p-6 border border-white/5 rounded-2xl">
                                        <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-4">Instrucciones de Pago</h4>
                                        <ul className="space-y-4 text-xs text-white/50">
                                            <li className="flex gap-3"><Clock size={14} className="text-primary shrink-0" /> Deposite USDC para cargar su balance de pases.</li>
                                            <li className="flex gap-3"><Shield size={14} className="text-primary shrink-0" /> Los pases se acreditan automáticamente tras 3 confirmaciones de red.</li>
                                            <li className="flex gap-3"><AlertTriangle size={14} className="text-primary shrink-0" /> Asegúrese de usar únicamente la red Ethereum, Polygon o BSC.</li>
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'settings' && (
                                <div className="space-y-4">
                                    <button onClick={onLogout} className="w-full p-4 border border-red-500/20 text-red-500 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-500/10 transition">
                                        CERRAR SESIÓN DE SEGURIDAD
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-8 border-t border-white/5 bg-black/40">
                            <div className="flex justify-between items-center text-[10px] text-white/20 font-bold uppercase tracking-widest">
                                <span>Sesión Encriptada</span>
                                <span className="flex items-center gap-2 text-primary/40"><Shield size={12} /> Protected by SSL V3</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default UserPanel;
