import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogIn, Mail, Lock, ShieldCheck, RefreshCw, AlertCircle } from 'lucide-react';

const LoginModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Por favor complete todos los campos');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;
            onClose();
        } catch (err) {
            setError(err.message || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-4 bg-black/90 backdrop-blur-xl">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="w-full h-full md:h-auto md:max-w-md glass-morphism p-8 md:p-10 border-white/10 md:border-primary/30 relative overflow-hidden flex flex-col justify-center md:rounded-3xl"
                    >
                        {/* Background Glow */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-[80px] rounded-full"></div>
                        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/5 blur-[80px] rounded-full"></div>

                        <div className="flex justify-between items-center mb-10 relative z-10 md:mt-0 mt-[-40px]">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/20 rounded-2xl border border-primary/30 shadow-glow">
                                    <ShieldCheck className="text-primary" size={28} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black tracking-tighter text-white uppercase italic-luxury">VIP ACCESS</h2>
                                    <p className="text-[10px] text-primary font-black tracking-[0.3em] uppercase">Membresía Exclusiva</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 text-white/40 hover:text-white transition bg-white/5 rounded-full">
                                <X size={24} />
                            </button>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-xs font-black uppercase tracking-wider relative z-10"
                            >
                                <AlertCircle size={18} />
                                {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] pl-1">Email de Invitación</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="vip@santuario.com"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-4 text-base focus:outline-none focus:border-primary/50 transition-all font-light"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] pl-1">Código de Seguridad</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-4 text-base focus:outline-none focus:border-primary/50 transition-all font-light"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full py-5 text-[11px] tracking-[0.4em] font-black uppercase mt-6 shadow-[0_20px_50px_rgba(212,175,55,0.2)] flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                {loading ? (
                                    <RefreshCw className="animate-spin" size={18} />
                                ) : (
                                    <>INGRESAR AL PARAÍSO <ShieldCheck size={18} /></>
                                )}
                            </button>

                            <div className="text-center pt-4">
                                <button
                                    type="button"
                                    className="text-[9px] text-white/20 hover:text-primary transition uppercase font-black tracking-[0.5em]"
                                >
                                    ¿SOLICITAR NUEVA INVITACIÓN?
                                </button>
                            </div>
                        </form>


                        <div className="mt-12 text-center relative z-10">
                            <p className="text-[8px] text-white/10 uppercase tracking-[0.6em]">SECURE ACCESS BY SANTUARIO OS</p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default LoginModal;
