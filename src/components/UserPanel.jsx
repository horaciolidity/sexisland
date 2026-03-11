import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
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

const RECIPIENT = '0xBAeaDE80A2A1064E4F8f372cd2ADA9a00daB4BBE';

// ── USDC contract address per chain (6 decimals in all cases) ──────────────
const USDC_BY_CHAIN = {
    '0x1': { name: 'Ethereum', contract: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', gas: '0x186A0' },
    '0xa': { name: 'Optimism', contract: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85', gas: '0x30D40' },
    '0x89': { name: 'Polygon', contract: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359', gas: '0x30D40' },
    '0xa4b1': { name: 'Arbitrum', contract: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831', gas: '0x30D40' },
    '0x2105': { name: 'Base', contract: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', gas: '0x30D40' },
    '0x38': { name: 'BNB Chain', contract: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', gas: '0x186A0' },
};

const PLANS = [
    {
        id: 'platinum',
        name: 'Platinum Star',
        price: 5200,
        usdcAmt: 5200n * 1_000_000n,
        features: ['Vuelo Charter VVIP', 'Suite Mar Deluxe', 'Acceso Total Fiestas', '60 Estrellas Adultas', 'Crédito Casino $500'],
        color: 'border-primary/20',
        promo: {
            seats: 'Asientos 14 – 15',
            available: 2,
            bonus: 500,
            label: '🎰 Bono Casino de Cortesía',
            expiry: 'Oferta válida solo 48 hs'
        }
    },
    {
        id: 'diamond',
        name: 'Diamond Imperial',
        price: 7500,
        usdcAmt: 7500n * 1_000_000n,
        features: ['Jet Privado Global First', 'Villa Piscina Infinita', 'Concierge 24/7', 'Casino Unlimited', 'Stage VIP + Reserva Prioritaria'],
        color: 'border-primary ring-1 ring-primary/30',
        highlight: true,
        promo: {
            seats: 'Asientos 22 – 23',
            available: 2,
            bonus: 1000,
            label: '🎰 Bono Casino Premium',
            expiry: 'Solo 2 lugares disponibles'
        }
    }
];

// Encode ERC-20 balanceOf(address) call
function encodeBalanceOf(addr) {
    const sig = '70a08231'; // keccak256('balanceOf(address)')
    const pad = addr.replace('0x', '').toLowerCase().padStart(64, '0');
    return '0x' + sig + pad;
}

// Encode ERC-20 transfer(address,uint256)
function encodeTransfer(to, amountBigInt) {
    const sig = 'a9059cbb';
    const addr = to.replace('0x', '').toLowerCase().padStart(64, '0');
    const amount = amountBigInt.toString(16).padStart(64, '0');
    return '0x' + sig + addr + amount;
}

const UserPanel = ({ isOpen, onClose, user, onLogout }) => {
    const [activeTab, setActiveTab] = useState('summary');
    const [copied, setCopied] = useState(false);
    const [connectedWallet, setConnectedWallet] = useState(null);
    const [activeChain, setActiveChain] = useState(null);
    const [usdcBalance, setUsdcBalance] = useState(null);      // BigInt or null
    const [loadingBalance, setLoadingBalance] = useState(false);
    const [paying, setPaying] = useState(false);
    const [payStatus, setPayStatus] = useState(null);
    const [txHash, setTxHash] = useState('');
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [showTermsPopup, setShowTermsPopup] = useState(false);
    const [termsConfirmed, setTermsConfirmed] = useState(false);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (user) {
            fetchProfile();
        }
    }, [user]);

    const fetchProfile = async () => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
        if (data) setProfile(data);
    };

    const handleUploadAvatar = async (e) => {
        try {
            const file = e.target.files[0];
            if (!file) return;

            const fileExt = file.name.split('.').pop();
            const fileName = `${user.id}-${Math.random()}.${fileExt}`;
            const filePath = `avatars/${fileName}`;

            setLoadingBalance(true); // Reusing loading state for feedback

            const { error: uploadError } = await supabase.storage
                .from('user-content')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('user-content')
                .getPublicUrl(filePath);

            const { error: updateError } = await supabase
                .from('profiles')
                .update({ avatar_url: publicUrl })
                .eq('id', user.id);

            if (updateError) throw updateError;

            fetchProfile();
        } catch (err) {
            alert('Error al subir la imagen: ' + err.message);
        } finally {
            setLoadingBalance(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(RECIPIENT);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const chainInfo = activeChain ? USDC_BY_CHAIN[activeChain] : null;

    /* ── Fetch USDC balance via eth_call ──────────── */
    const fetchBalance = async (wallet, chain) => {
        const info = USDC_BY_CHAIN[chain];
        if (!info || !wallet) { setUsdcBalance(null); return; }
        setLoadingBalance(true);
        try {
            const result = await window.ethereum.request({
                method: 'eth_call',
                params: [{ to: info.contract, data: encodeBalanceOf(wallet) }, 'latest'],
            });
            // result is a 32-byte hex string → parse as BigInt
            setUsdcBalance(result && result !== '0x' ? BigInt(result) : 0n);
        } catch {
            setUsdcBalance(null);
        } finally {
            setLoadingBalance(false);
        }
    };

    /* ── Step 1: connect wallet & detect chain ─────── */
    const connectWallet = async () => {
        if (!window.ethereum) {
            alert('Por favor instale MetaMask u otra wallet EVM compatible.');
            return null;
        }
        try {
            const [accounts, chainId] = await Promise.all([
                window.ethereum.request({ method: 'eth_requestAccounts' }),
                window.ethereum.request({ method: 'eth_chainId' }),
            ]);
            const normChain = chainId.toLowerCase();
            setConnectedWallet(accounts[0]);
            setActiveChain(normChain);
            fetchBalance(accounts[0], normChain);
            window.ethereum.on('chainChanged', (newChain) => {
                const nc = newChain.toLowerCase();
                setActiveChain(nc);
                setPayStatus(null);
                setUsdcBalance(null);
                fetchBalance(accounts[0], nc);
            });
            return { wallet: accounts[0], chain: normChain };
        } catch {
            return null;
        }
    };

    /* ── Step 2: open terms popup ──────────────────── */
    const handleSelectAndPay = async (plan) => {
        let wallet = connectedWallet;
        let chain = activeChain;

        if (!wallet) {
            const result = await connectWallet();
            if (!result) return;
            wallet = result.wallet;
            chain = result.chain;
        }

        if (!USDC_BY_CHAIN[chain]) { setPayStatus('wrong_chain'); return; }

        setPayStatus(null);
        setSelectedPlan(plan);
        setTermsConfirmed(false);
        setShowTermsPopup(true);
    };

    /* ── Step 3: execute USDC transfer ────────────── */
    const executePayment = async () => {
        setShowTermsPopup(false);
        setPaying(true);
        setPayStatus(null);

        const info = USDC_BY_CHAIN[activeChain];
        if (!info) { setPaying(false); setPayStatus('wrong_chain'); return; }

        try {
            const data = encodeTransfer(RECIPIENT, selectedPlan.usdcAmt);
            const hash = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [{ from: connectedWallet, to: info.contract, data, gas: info.gas }],
            });
            setTxHash(hash);

            // Record in Supabase
            const { error: dbError } = await supabase.from('payments').insert({
                user_id: user.id,
                plan_id: selectedPlan.id,
                amount_usdc: Number(selectedPlan.price),
                tx_hash: hash,
                chain_id: activeChain,
                status: 'confirmed' // Since we got the hash, in a real app we'd wait for confirmation
            });

            if (dbError) console.error("Database payment error:", dbError);

            setPayStatus('success');
            fetchProfile(); // Refresh profile status if needed
        } catch (err) {
            console.error('Payment failed', err);
            setPayStatus(err.code === 4001 ? 'rejected' : 'error');
        } finally {
            setPaying(false);
        }
    };

    // Helpers
    const usdcBalanceFormatted = usdcBalance !== null
        ? (Number(usdcBalance) / 1_000_000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : null;

    const hasSufficientBalance = (plan) =>
        usdcBalance !== null && usdcBalance >= plan.usdcAmt;

    const tabs = [
        { id: 'summary', name: 'Resumen', icon: <UserIcon size={16} /> },
        { id: 'travel', name: 'Viaje', icon: <Plane size={16} /> },
        { id: 'payments', name: 'Pago USDC', icon: <Zap size={16} /> },
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
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent border border-primary/30 flex items-center justify-center overflow-hidden">
                                        {profile?.avatar_url ? (
                                            <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <UserIcon size={32} className="text-primary" />
                                        )}
                                        <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                            <Camera size={20} className="text-white" />
                                            <input type="file" accept="image/*" className="hidden" onChange={handleUploadAvatar} />
                                        </label>
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-[#0A0E14] flex items-center justify-center shadow-lg">
                                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-xl font-black tracking-tighter text-white uppercase italic-luxury">{profile?.full_name || user?.email?.split('@')[0] || 'GUEST'}</h2>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] text-primary font-black tracking-[0.3em] uppercase">{profile?.status === 'approved' ? 'Sovereign Verified' : 'Platinum Reserve'}</span>
                                        <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                                        <span className="text-[9px] text-white/40 font-bold uppercase">{profile?.status || 'Pending Verification'}</span>
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
                                                    <div className="text-sm font-black text-white">{profile?.full_name?.toUpperCase() || user?.email?.split('@')[0]?.toUpperCase() || 'MIEMBRO VIP'}</div>
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

                                    {/* Terms Popup */}
                                    <AnimatePresence>
                                        {showTermsPopup && selectedPlan && (
                                            <motion.div
                                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                                className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
                                            >
                                                <motion.div
                                                    initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                                                    className="w-full max-w-md bg-[#07090D] border border-primary/30 rounded-[32px] overflow-hidden shadow-[0_0_80px_rgba(212,175,55,0.2)]"
                                                >
                                                    <div className="p-6 bg-black/60 border-b border-white/5 flex items-center gap-4">
                                                        <div className="p-2.5 bg-primary/10 rounded-xl"><ShieldCheck className="text-primary" size={20} /></div>
                                                        <div>
                                                            <h3 className="text-base font-black uppercase italic-luxury italic text-white">Confirmar Pago</h3>
                                                            <p className="text-[9px] text-primary/60 font-black uppercase tracking-widest">Verificación de Términos Requerida</p>
                                                        </div>
                                                    </div>

                                                    <div className="p-6 space-y-4">
                                                        <div className="p-5 bg-primary/5 border border-primary/20 rounded-2xl flex justify-between items-center">
                                                            <div>
                                                                <div className="text-[9px] text-primary/60 font-black uppercase tracking-widest mb-1">Plan</div>
                                                                <div className="text-lg font-black italic-luxury uppercase text-white">{selectedPlan.name}</div>
                                                                {chainInfo && <div className="text-[8px] text-white/30 font-black uppercase mt-1">Red: {chainInfo.name}</div>}
                                                            </div>
                                                            <div className="text-right">
                                                                <div className="text-2xl font-black font-mono text-white">${selectedPlan.price.toLocaleString()}</div>
                                                                <div className="text-[8px] text-primary font-black uppercase">USDC — ERC-20</div>
                                                            </div>
                                                        </div>

                                                        <div className="text-[10px] text-white/30 leading-relaxed font-serif italic p-4 bg-white/[0.02] border border-white/5 rounded-2xl max-h-40 overflow-y-auto custom-scrollbar space-y-2">
                                                            <p>Al confirmar acepta: (1) El pago es no reembolsable bajo ninguna circunstancia. (2) El Protocolo NDA de Confidencialidad Absoluta que impide divulgar ubicación, identidades o actividades del Santuario. (3) La exención médica declarada. (4) La revelación del destino exacto ocurre 72hs antes del vuelo, exclusivamente tras confirmación del pago. (5) La organización se reserva el derecho de expulsión ante incumplimiento de conducta sin reembolso.</p>
                                                        </div>

                                                        <label className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 cursor-pointer group hover:border-primary/20 transition-all">
                                                            <input type="checkbox" className="mt-1 w-5 h-5 rounded accent-yellow-500 shrink-0" checked={termsConfirmed} onChange={e => setTermsConfirmed(e.target.checked)} />
                                                            <span className="text-[10px] font-black uppercase text-white/40 group-hover:text-white/80 transition-all leading-relaxed">
                                                                Confirmo que he leído los términos anteriores y acepto el pago irreversible de <span className="text-primary">${selectedPlan.price.toLocaleString()} USDC</span> vía contrato ERC-20.
                                                            </span>
                                                        </label>
                                                    </div>

                                                    <div className="p-6 border-t border-white/5 flex gap-3">
                                                        <button
                                                            onClick={() => setShowTermsPopup(false)}
                                                            className="flex-1 py-4 rounded-2xl bg-white/5 border border-white/10 text-white/40 font-black text-[10px] uppercase hover:text-white transition-all"
                                                        >
                                                            Cancelar
                                                        </button>
                                                        <button
                                                            onClick={executePayment}
                                                            disabled={!termsConfirmed || (selectedPlan && !hasSufficientBalance(selectedPlan))}
                                                            className={`flex-1 py-4 rounded-2xl btn-primary font-black text-[10px] uppercase tracking-wider flex items-center justify-center gap-2 ${(!termsConfirmed || (selectedPlan && !hasSufficientBalance(selectedPlan))) ? 'opacity-30 cursor-not-allowed' : 'shadow-glow'}`}
                                                        >
                                                            <Zap size={16} /> PAGAR AHORA
                                                        </button>
                                                        {selectedPlan && usdcBalance !== null && !hasSufficientBalance(selectedPlan) && (
                                                            <div className="w-full text-center text-[9px] text-red-400 font-black uppercase tracking-wider">
                                                                ⚠ Saldo insuficiente · Tenés {usdcBalanceFormatted} USDC · Necesitás ${selectedPlan.price.toLocaleString()}
                                                            </div>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Header */}
                                    <div className="text-center">
                                        <h3 className="text-2xl font-black italic-luxury italic uppercase gold-text tracking-tighter">Selecciona tu Plan</h3>
                                        <p className="text-[10px] text-white/30 uppercase tracking-widest font-black mt-2">Pago automático USDC — Multi-red compatible</p>
                                    </div>

                                    {/* Wallet connection */}
                                    {!connectedWallet ? (
                                        <button
                                            onClick={connectWallet}
                                            className="w-full py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest hover:border-primary/30 hover:text-primary transition-all flex items-center justify-center gap-3"
                                        >
                                            <Wallet size={18} /> CONECTAR WALLET
                                        </button>
                                    ) : (
                                        <div className={`flex items-center justify-between px-5 py-4 rounded-2xl border ${chainInfo ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                                            <div className="flex items-center gap-3">
                                                {chainInfo
                                                    ? <CheckCircle2 size={16} className="text-green-400" />
                                                    : <AlertTriangle size={16} className="text-red-400" />
                                                }
                                                <div>
                                                    <div className={`text-[8px] uppercase font-black tracking-widest ${chainInfo ? 'text-green-400/70' : 'text-red-400/70'}`}>
                                                        {chainInfo ? `${chainInfo.name}` : 'Red no soportada'}
                                                    </div>
                                                    <div className="text-[10px] font-mono text-white">{connectedWallet.slice(0, 6)}...{connectedWallet.slice(-4)}</div>
                                                    {chainInfo && (
                                                        <div className="text-[9px] font-black mt-0.5">
                                                            {loadingBalance
                                                                ? <span className="text-white/20 animate-pulse">Cargando saldo...</span>
                                                                : usdcBalance !== null
                                                                    ? <span className={usdcBalance === 0n ? 'text-red-400' : 'text-primary'}>{usdcBalanceFormatted} USDC</span>
                                                                    : <span className="text-white/20">Saldo no disponible</span>
                                                            }
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <button onClick={() => { setConnectedWallet(null); setActiveChain(null); setPayStatus(null); setUsdcBalance(null); }} className="text-[8px] text-white/30 font-black uppercase hover:text-white">Cambiar</button>
                                        </div>
                                    )}

                                    {/* Success State */}
                                    {payStatus === 'success' && (
                                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="p-8 bg-green-500/10 border border-green-500/30 rounded-[28px] text-center space-y-4">
                                            <CheckCircle2 size={56} className="text-green-400 mx-auto" />
                                            <h4 className="text-xl font-black uppercase text-white">¡PAGO ENVIADO!</h4>
                                            <p className="text-[10px] text-green-400/70 uppercase tracking-wider font-black">Membresía en proceso de activación</p>
                                            {txHash && (
                                                <div className="bg-black/40 border border-green-500/20 p-3 rounded-xl">
                                                    <div className="text-[8px] text-white/20 uppercase font-black mb-1">Hash de Transacción</div>
                                                    <div className="text-[8px] font-mono text-green-400 break-all">{txHash}</div>
                                                </div>
                                            )}
                                            <p className="text-[9px] text-white/30 italic font-serif">Recibirá los detalles del destino en su email dentro de las próximas 24–72 horas.</p>
                                        </motion.div>
                                    )}

                                    {/* Error States */}
                                    {payStatus === 'rejected' && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-5 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl flex items-center gap-4">
                                            <AlertTriangle size={20} className="text-yellow-500 shrink-0" />
                                            <p className="text-[10px] text-yellow-400/80 font-black uppercase">Transacción rechazada en wallet. Elija un plan e intente nuevamente.</p>
                                        </motion.div>
                                    )}
                                    {payStatus === 'error' && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-5 bg-red-500/5 border border-red-500/20 rounded-2xl flex items-center gap-4">
                                            <AlertTriangle size={20} className="text-red-500 shrink-0" />
                                            <p className="text-[10px] text-red-400/80 font-black uppercase">Error en la transacción. Verifique fondos USDC y red de pago.</p>
                                        </motion.div>
                                    )}
                                    {payStatus === 'wrong_chain' && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-5 bg-red-500/5 border border-red-500/20 rounded-2xl space-y-3">
                                            <div className="flex items-center gap-3">
                                                <AlertTriangle size={20} className="text-red-500 shrink-0" />
                                                <p className="text-[10px] text-red-400 font-black uppercase leading-normal">Red no soportada — Cambie la red en MetaMask a una de las siguientes:</p>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {Object.values(USDC_BY_CHAIN).map(c => (
                                                    <span key={c.name} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[8px] font-black uppercase text-white/50">{c.name}</span>
                                                ))}
                                            </div>
                                            <p className="text-[8px] text-white/20 uppercase font-black">Tras cambiar la red, haga clic en "Cambiar" arriba para reconectar.</p>
                                        </motion.div>
                                    )}

                                    {/* Plan Cards */}
                                    {payStatus !== 'success' && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            {PLANS.map(plan => (
                                                <div key={plan.id} className={`relative p-6 rounded-[28px] border bg-black flex flex-col gap-5 transition-all duration-500 ${plan.color} ${plan.highlight ? 'shadow-[0_0_40px_rgba(212,175,55,0.15)]' : ''}`}>
                                                    {plan.highlight && (
                                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-black text-[8px] font-black uppercase tracking-widest rounded-full">
                                                            MÁS POPULAR
                                                        </div>
                                                    )}
                                                    <div>
                                                        <div className="text-[8px] text-primary font-black uppercase tracking-[0.3em] mb-1">{plan.name}</div>
                                                        <div className="text-3xl font-black font-mono text-white">${plan.price.toLocaleString()}</div>
                                                        <div className="text-[8px] text-white/20 uppercase font-black tracking-wider">USDC</div>
                                                    </div>
                                                    <ul className="flex-1 space-y-2">
                                                        {plan.features.map(f => (
                                                            <li key={f} className="flex items-center gap-2 text-[9px] text-white/50">
                                                                <div className="w-1 h-1 rounded-full bg-primary shrink-0" />{f}
                                                            </li>
                                                        ))}
                                                    </ul>

                                                    {/* ── Promo Banner ── */}
                                                    <div className="promo-breathe rounded-2xl border border-primary/25 overflow-hidden">
                                                        <div className="promo-shimmer px-4 py-3 flex items-start justify-between gap-3">
                                                            <div className="space-y-1 flex-1">
                                                                <div className="flex items-center gap-2">
                                                                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse shrink-0" />
                                                                    <span className="text-[8px] font-black uppercase tracking-[0.25em] text-primary">{plan.promo.seats} · disponibles</span>
                                                                </div>
                                                                <div className="text-[11px] font-black text-white leading-tight">{plan.promo.label}</div>
                                                                <div className="text-[9px] text-white/50 leading-relaxed">
                                                                    Al confirmar recibís <span className="text-primary font-black">${plan.promo.bonus.toLocaleString()} USD</span> de cortesía para gastar en cualquier mesa o máquina del casino
                                                                </div>
                                                            </div>
                                                            <div className="shrink-0 text-right">
                                                                <div className="text-xl font-black font-mono gold-text">${plan.promo.bonus.toLocaleString()}</div>
                                                                <div className="text-[7px] text-white/25 uppercase font-black tracking-wide">CASINO</div>
                                                            </div>
                                                        </div>
                                                        <div className="px-4 py-1.5 bg-black/50 border-t border-primary/10 flex items-center gap-2">
                                                            <span className="inline-block w-1 h-1 rounded-full bg-yellow-400 animate-pulse" />
                                                            <span className="text-[7px] font-black uppercase tracking-widest text-yellow-400/60">{plan.promo.expiry}</span>
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={() => handleSelectAndPay(plan)}
                                                        disabled={paying}
                                                        className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${plan.highlight ? 'btn-primary shadow-glow' : 'bg-white/5 border border-white/10 hover:border-primary/30 hover:text-primary text-white'} ${paying ? 'opacity-30 cursor-not-allowed' : ''}`}
                                                    >
                                                        {paying && selectedPlan?.id === plan.id
                                                            ? <><RefreshCw size={14} className="animate-spin" /> PROCESANDO...</>
                                                            : <><Zap size={14} /> PAGAR ${plan.price.toLocaleString()} USDC</>
                                                        }
                                                    </button>

                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Network note */}
                                    {payStatus !== 'success' && (
                                        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl text-center">
                                            <p className="text-[8px] text-white/20 uppercase font-black tracking-wider leading-relaxed">
                                                Red requerida: Ethereum Mainnet (ERC-20) · Token: USDC · El pago va directo al contrato titular del Santuario. Asegúrese de tener saldo suficiente en USDC + ETH para gas.
                                            </p>
                                        </div>
                                    )}
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
