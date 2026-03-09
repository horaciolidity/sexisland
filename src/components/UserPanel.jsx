import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    Settings,
    CreditCard,
    Plane,
    Shield,
    ShieldCheck,
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
    Globe,
    Lock,
    UtensilsCrossed,
    Ship
} from 'lucide-react';

const UserPanel = ({ isOpen, onClose, user, onLogout }) => {
    const [activeTab, setActiveTab] = useState('summary');
    const [copied, setCopied] = useState(false);
    const [connecting, setConnecting] = useState(false);
    const [connectedWallet, setConnectedWallet] = useState(null);
    const [paying, setPaying] = useState(false);
    const [payStatus, setPayStatus] = useState(null); // 'success', 'error'

    const walletAddress = "0xBAeaDE80A2A1064E4F8f372cd2ADA9a00daB4BBE";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(walletAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const connectWallet = async () => {
        if (window.ethereum) {
            setConnecting(true);
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setConnectedWallet(accounts[0]);
                setConnecting(false);
            } catch (error) {
                console.error("User denied account access", error);
                setConnecting(false);
            }
        } else {
            alert("Por favor instale MetaMask u otra wallet compatible.");
        }
    };

    const handleAutomaticPayment = async (amount) => {
        if (!connectedWallet) {
            await connectWallet();
            return;
        }

        setPaying(true);
        setPayStatus(null);

        try {
            // Basic ETH/Native transfer since USDC contract interactions vary by chain
            // Converting amount to Hex for raw eth_sendTransaction
            // 5200 USD placeholder in Native for demo purposes if not on a specific network
            // Value in Wei (approximate for demo)
            const transactionParameters = {
                to: walletAddress,
                from: connectedWallet,
                value: '0x38D7EA4C68000', // Small amount for demo safety (0.001 ETH)
            };

            const txHash = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });

            console.log("Transaction Hash:", txHash);
            setPayStatus('success');
            setPaying(false);
        } catch (error) {
            console.error("Payment failed", error);
            setPayStatus('error');
            setPaying(false);
        }
    };

    const tabs = [
        { id: 'summary', name: 'Resumen', icon: <UserIcon size={16} /> },
        { id: 'travel', name: 'Viaje', icon: <Plane size={16} /> },
        { id: 'payments', name: 'Pago Auto', icon: <Zap size={16} /> },
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
                        {/* Header */}
                        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-black/20">
                            <div className="flex items-center gap-4">
                                <div className="relative group">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent border border-primary/30 flex items-center justify-center">
                                        <UserIcon size={32} className="text-primary" />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-[#0A0E14] flex items-center justify-center shadow-lg">
                                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-xl font-black tracking-tighter text-white uppercase italic-luxury">{user?.name || 'GUEST'}</h2>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] text-primary font-black tracking-[0.3em] uppercase">Platinum Reserve</span>
                                        <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                                        <span className="text-[9px] text-white/40 font-bold uppercase">Pass Verified</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-all text-white/40 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Navigation */}
                        <div className="flex px-6 pt-4 border-b border-white/5 gap-4 overflow-x-auto no-scrollbar bg-black/10">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex flex-col items-center gap-2 px-4 pb-4 transition-all relative group ${activeTab === tab.id ? 'text-primary' : 'text-white/30 hover:text-white/60'
                                        }`}
                                >
                                    <div className={`p-2 rounded-xl transition-all ${activeTab === tab.id ? 'bg-primary/20 scale-110 shadow-lg' : ''}`}>
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
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-6 glass-morphism border-primary/10 rounded-3xl">
                                            <div className="text-[9px] text-primary font-black uppercase mb-2 tracking-widest opacity-60">Pass Tokens</div>
                                            <div className="text-2xl font-black">{payStatus === 'success' ? '1.0' : '0.0'}</div>
                                            <div className="text-[8px] text-white/20 font-bold mt-2 uppercase">Credencial SX-26</div>
                                        </div>
                                        <div className="p-6 glass-morphism border-primary/10 rounded-3xl">
                                            <div className="text-[9px] text-primary font-black uppercase mb-2 tracking-widest opacity-60">Logística</div>
                                            <div className="text-2xl font-black">70%</div>
                                            <div className="text-[8px] text-white/20 font-bold mt-2 uppercase flex items-center gap-1"><RefreshCw size={8} /> Sincronizando</div>
                                        </div>
                                    </div>

                                    <div className="relative p-10 rounded-[40px] bg-black border border-white/5 overflow-hidden shadow-2xl">
                                        <div className="absolute top-10 right-10 rotate-12 opacity-5 scale-150">
                                            <Globe size={150} />
                                        </div>
                                        <div className="relative z-10">
                                            <div className="flex justify-between items-start mb-16">
                                                <div>
                                                    <div className="text-2xl font-black italic gold-text tracking-tighter mb-1 font-serif">SANTUARIO VIP</div>
                                                    <div className="text-[7px] text-white/30 uppercase tracking-[0.5em] font-black">Membership Card</div>
                                                </div>
                                                <div className="px-4 py-1.5 bg-primary/20 border border-primary/40 text-primary text-[10px] font-black rounded-lg uppercase">
                                                    PLATINUM
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-y-8">
                                                <div>
                                                    <div className="text-[8px] text-white/20 uppercase font-black tracking-widest mb-2">Member</div>
                                                    <div className="text-sm font-black text-white">{user?.name?.toUpperCase() || 'MIEMBRO VIP'}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-[8px] text-white/20 uppercase font-black tracking-widest mb-2">Access Level</div>
                                                    <div className="text-sm font-black text-primary">FULL UNRESTRICTED</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Timeline Reciente</h4>
                                        <div className="space-y-3">
                                            <ActivityItem icon={<Lock size={12} />} text="Autenticación Biométrica Exitosa" time="Justo ahora" />
                                            <ActivityItem icon={<Zap size={12} />} text="Conexión Web3 Gate detectada" time="Hace 2 min" />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'payments' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">

                                    {/* Status Banner */}
                                    <div className="p-5 bg-yellow-500/5 border border-yellow-500/20 rounded-3xl flex items-start gap-4">
                                        <AlertTriangle size={18} className="text-yellow-500 shrink-0 mt-0.5" />
                                        <div>
                                            <div className="text-[10px] font-black text-yellow-500 uppercase tracking-widest mb-1">Expediente Pendiente de Aprobación</div>
                                            <p className="text-[9px] text-white/30 leading-relaxed">El pago solo es posible una vez que su expediente haya sido aprobado por el comité. Recibirá una confirmación por email y WhatsApp. Abajo encontrará los datos para cuando llegue ese momento.</p>
                                        </div>
                                    </div>

                                    {/* Plan Summary */}
                                    <div className="p-6 md:p-8 glass-morphism rounded-[32px] border-primary/20">
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <div className="text-[9px] text-primary font-black uppercase tracking-[0.3em] mb-1">Plan Seleccionado</div>
                                                <h3 className="text-2xl font-black italic-luxury italic gold-text uppercase">Diamond Imperial</h3>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-3xl font-black text-white font-mono">$7,500</div>
                                                <div className="text-[8px] text-white/20 uppercase font-black tracking-widest">USDC</div>
                                            </div>
                                        </div>
                                        <div className="space-y-2 pt-4 border-t border-white/5">
                                            {['Jet Privado Global First Class', 'Villa Piscina Infinita Premium', 'Concierge Personalizado 24/7', 'Casino Unlimited Pass', 'Stage VIP con Estrellas'].map(f => (
                                                <div key={f} className="flex items-center gap-3 text-[10px] text-white/40">
                                                    <div className="w-1 h-1 rounded-full bg-primary shadow-glow shrink-0" /> {f}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Payment Instructions */}
                                    <div className="p-6 md:p-8 bg-black border border-white/5 rounded-[32px] space-y-6">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Instrucciones de Pago — USDC</h4>

                                        <div className="space-y-3">
                                            <div className="text-[9px] font-black text-white/20 uppercase tracking-widest">1. Red de Transferencia</div>
                                            <div className="flex gap-3">
                                                {['Ethereum (ERC-20)', 'Polygon', 'BNB Chain'].map((n, i) => (
                                                    <div key={n} className={`px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-wider ${i === 0 ? 'bg-primary/10 border border-primary/30 text-primary' : 'bg-white/5 border border-white/5 text-white/20'}`}>{n}</div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="text-[9px] font-black text-white/20 uppercase tracking-widest">2. Dirección USDC de Destino</div>
                                            <div className="bg-black/80 border border-white/10 p-4 rounded-2xl flex items-center justify-between gap-3">
                                                <span className="text-[9px] md:text-[10px] font-mono text-white/60 break-all">{walletAddress}</span>
                                                <button onClick={copyToClipboard} className={`p-2.5 rounded-xl transition-all shrink-0 ${copied ? 'bg-green-500/20 text-green-400' : 'bg-primary/10 hover:bg-primary/20 text-primary'}`}>
                                                    {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                                                </button>
                                            </div>
                                            {copied && <div className="text-[9px] text-green-400 font-black uppercase tracking-widest text-center animate-pulse">✓ Dirección copiada al portapapeles</div>}
                                        </div>

                                        <div className="space-y-2">
                                            <div className="text-[9px] font-black text-white/20 uppercase tracking-widest">3. Monto Exacto a Enviar</div>
                                            <div className="bg-primary/5 border border-primary/20 p-5 rounded-2xl flex items-center justify-between">
                                                <div>
                                                    <div className="text-3xl font-black font-mono text-white">7,500.00</div>
                                                    <div className="text-[9px] text-primary font-black uppercase tracking-wider">USDC — Token Oficial: 0xA0b...</div>
                                                </div>
                                                <div className="text-right text-white/20 text-[8px] uppercase font-black">
                                                    <div>≈ $7,500 USD</div>
                                                    <div className="text-[7px] mt-1">Tipo de cambio estable</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-2xl">
                                            <p className="text-[9px] text-red-400/60 font-bold uppercase leading-relaxed">
                                                ⚠ Envíe SOLO USDC a esta dirección. Enviar otro token resultará en pérdida permanente e irrecuperable de sus fondos. Verifique la red antes de confirmar.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Hash Confirmation */}
                                    <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[32px] space-y-4">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Una vez realizado el pago — Enviar Comprobante</h4>
                                        <input
                                            type="text"
                                            placeholder="Hash de la transacción (0x...)"
                                            className="w-full bg-black border border-white/10 rounded-2xl p-4 text-xs font-mono focus:border-primary/50 outline-none transition-all text-white/60 placeholder:text-white/10"
                                        />
                                        <button className="w-full py-5 rounded-2xl bg-primary/10 border border-primary/20 text-primary font-black text-[10px] uppercase tracking-[0.3em] hover:bg-primary/20 transition-all flex items-center justify-center gap-3">
                                            <Zap size={16} /> ENVIAR COMPROBANTE AL EQUIPO
                                        </button>
                                        <p className="text-[8px] text-white/10 text-center uppercase tracking-wider font-black">Verificación manual en 1–6 horas posteriores al pago</p>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'travel' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                    <div className="p-8 glass-morphism border-white/5 rounded-[40px]">
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="p-3 bg-primary/20 rounded-2xl text-primary"><Plane size={24} /></div>
                                            <h3 className="text-xl font-black italic-luxury italic uppercase">Logística de Vuelo</h3>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="p-5 bg-white/5 rounded-2xl border border-white/5 flex justify-between items-center group hover:border-primary/20 transition-all">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center font-black text-primary border border-primary/20">01</div>
                                                    <div className="text-left">
                                                        <div className="text-[10px] font-black uppercase text-white">Vuelo Charter SX-700</div>
                                                        <div className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Global First Class</div>
                                                    </div>
                                                </div>
                                                <span className="text-[8px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full uppercase">Reservado</span>
                                            </div>

                                            <div className="p-5 bg-white/5 rounded-2xl border border-white/5 flex justify-between items-center opacity-40">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center font-black text-white/20 border border-white/10">02</div>
                                                    <div className="text-left">
                                                        <div className="text-[10px] font-black uppercase text-white/40">Helicóptero de Traslado</div>
                                                        <div className="text-[8px] font-bold text-white/10 uppercase tracking-widest">Santuario Heliport</div>
                                                    </div>
                                                </div>
                                                <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Pendiente</span>
                                            </div>
                                        </div>

                                        <button className="w-full mt-8 py-5 border-2 border-primary/20 rounded-2xl text-[9px] font-black uppercase tracking-[0.3em] hover:bg-primary/10 transition-all flex items-center justify-center gap-3">
                                            <Camera size={14} /> SUBIR PASAPORTE PARA VERIFICACIÓN
                                        </button>
                                    </div>

                                    <div className="p-8 bg-black/40 rounded-[40px] border border-white/5">
                                        <h4 className="text-[10px] font-black text-white/20 mb-4 uppercase tracking-[0.2em]">Servicios de Concierge</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-4 bg-white/5 rounded-2xl text-center cursor-pointer hover:bg-primary/5 transition-all">
                                                <UtensilsCrossed size={16} className="mx-auto mb-2 text-primary/40" />
                                                <div className="text-[8px] font-black uppercase">Menú VIP</div>
                                            </div>
                                            <div className="p-4 bg-white/5 rounded-2xl text-center cursor-pointer hover:bg-primary/5 transition-all">
                                                <Ship size={16} className="mx-auto mb-2 text-primary/40" />
                                                <div className="text-[8px] font-black uppercase">Yate Privado</div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'settings' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                    <div className="glass-morphism p-8 rounded-[40px] border-white/5">
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="p-3 bg-primary/20 rounded-2xl text-primary"><Shield size={24} /></div>
                                            <h3 className="text-xl font-black italic-luxury italic uppercase">Seguridad del Nodo</h3>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                                                <div>
                                                    <div className="text-[10px] font-black uppercase text-white">Autenticación 2FA</div>
                                                    <div className="text-[8px] font-bold text-green-500 uppercase tracking-widest">ACTIVA</div>
                                                </div>
                                                <div className="w-10 h-6 bg-primary/20 rounded-full p-1 cursor-pointer">
                                                    <div className="w-4 h-4 bg-primary rounded-full ml-auto shadow-glow"></div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                                                <div>
                                                    <div className="text-[10px] font-black uppercase text-white">FaceID / BioLog</div>
                                                    <div className="text-[8px] font-bold text-white/20 uppercase tracking-widest">REQUERIDO</div>
                                                </div>
                                                <div className="w-10 h-6 bg-white/10 rounded-full p-1 cursor-not-allowed">
                                                    <div className="w-4 h-4 bg-white/20 rounded-full"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-red-500/5 border border-red-500/10 rounded-3xl">
                                        <p className="text-[9px] text-red-500/60 font-medium mb-4 italic leading-relaxed uppercase tracking-tighter text-center">
                                            AL CERRAR SESIÓN, TODOS LOS DATOS TEMPORALES DEL NODO SE ELIMINARÁN PERMANENTEMENTE PARA SU SEGURIDAD.
                                        </p>
                                        <button onClick={onLogout} className="w-full btn-secondary text-red-500 border-red-500/20 hover:bg-red-500/10 py-5 rounded-2xl flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest">
                                            <LogOut size={16} /> DESTRUIR SESIÓN ACTUAL
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        <div className="p-8 border-t border-white/5 bg-black/80">
                            <div className="flex justify-between items-center text-[9px] text-white/10 font-black tracking-[0.5em]">
                                <span>SANTUARIO OS V-1.2</span>
                                <span>SECURE NODE ACTIVE</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

const ActivityItem = ({ icon, text, time }) => (
    <div className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-primary/20 transition-all">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">{icon}</div>
        <div className="flex-1">
            <div className="text-[10px] font-black text-white/80 group-hover:text-white transition-all uppercase tracking-tighter">{text}</div>
            <div className="text-[8px] text-white/20 font-bold uppercase">{time}</div>
        </div>
    </div>
);

export default UserPanel;
