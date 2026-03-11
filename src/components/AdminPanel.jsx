import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShieldAlert, Users, CheckCircle, XCircle, Search,
    FileText, Stethoscope, Mail, Phone, Calendar,
    MapPin, Globe, CreditCard, ChevronRight, X,
    RefreshCw, Filter, Zap
} from 'lucide-react';

const AdminPanel = ({ isOpen, onClose }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('pending'); // all, pending, approved, rejected
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [medicalData, setMedicalData] = useState(null);
    const [updatingStatus, setUpdatingStatus] = useState(false);

    useEffect(() => {
        if (isOpen) {
            fetchUsers();
        }
    }, [isOpen, filter]);

    const fetchUsers = async () => {
        setLoading(true);
        let query = supabase.from('profiles').select('*');

        if (filter !== 'all') {
            query = query.eq('status', filter);
        }

        const { data, error } = await query.order('updated_at', { ascending: false });
        if (data) setUsers(data);
        setLoading(false);
    };

    const handleSelectUser = async (user) => {
        setSelectedUser(user);
        setMedicalData(null);

        // Fetch medical profile
        const { data, error } = await supabase
            .from('medical_profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        if (data) setMedicalData(data);
    };

    const handleUpdateStatus = async (userId, newStatus) => {
        setUpdatingStatus(true);
        const { error } = await supabase
            .from('profiles')
            .update({ status: newStatus })
            .eq('id', userId);

        if (!error) {
            setUsers(users.map(u => u.id === userId ? { ...u, status: newStatus } : u));
            if (selectedUser?.id === userId) {
                setSelectedUser({ ...selectedUser, status: newStatus });
            }
        }
        setUpdatingStatus(false);
    };

    const filteredUsers = users.filter(u =>
        u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.phone?.includes(searchTerm)
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[400] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-0 md:p-6 overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full h-full max-w-7xl bg-[#07090D] border border-primary/20 rounded-none md:rounded-[40px] shadow-[0_0_120px_rgba(212,175,55,0.15)] flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 md:p-10 border-b border-white/5 bg-black/40 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div className="flex items-center gap-6">
                                <div className="p-4 bg-primary/20 rounded-2xl border border-primary/30 shadow-glow">
                                    <ShieldAlert className="text-primary" size={28} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black italic-luxury italic uppercase gold-text">COMITÉ DE ADMISIÓN</h2>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[10px] text-white/40 font-black tracking-[0.3em] uppercase">Santuario OS — Admin Node</span>
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className="relative flex-1 md:w-64">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Buscar por nombre o ID..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-xs focus:border-primary/50 transition-all outline-none"
                                    />
                                </div>
                                <button onClick={onClose} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/10">
                                    <X size={20} className="text-white/40" />
                                </button>
                            </div>
                        </div>

                        {/* Main Body */}
                        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                            {/* User List Sidebar */}
                            <div className="w-full md:w-96 border-r border-white/5 flex flex-col bg-black/20">
                                {/* Filters */}
                                <div className="p-6 flex gap-2 overflow-x-auto no-scrollbar border-b border-white/5">
                                    {['all', 'pending', 'approved', 'rejected'].map(f => (
                                        <button
                                            key={f}
                                            onClick={() => setFilter(f)}
                                            className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${filter === f ? 'bg-primary text-black shadow-glow' : 'bg-white/5 text-white/40 hover:text-white'
                                                }`}
                                        >
                                            {f === 'all' ? 'Todos' : f === 'pending' ? 'Pendientes' : f === 'approved' ? 'Aprobados' : 'Rechazados'}
                                        </button>
                                    ))}
                                </div>

                                {/* List */}
                                <div className="flex-1 overflow-y-auto custom-scrollbar">
                                    {loading ? (
                                        <div className="h-full flex items-center justify-center p-10 opacity-20">
                                            <RefreshCw className="animate-spin" size={32} />
                                        </div>
                                    ) : filteredUsers.length === 0 ? (
                                        <div className="p-10 text-center opacity-20 text-xs font-black uppercase">No hay usuarios</div>
                                    ) : (
                                        filteredUsers.map(u => (
                                            <div
                                                key={u.id}
                                                onClick={() => handleSelectUser(u)}
                                                className={`p-6 border-b border-white/5 cursor-pointer transition-all hover:bg-white/5 ${selectedUser?.id === u.id ? 'bg-primary/10 border-r-2 border-r-primary' : ''
                                                    }`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center bg-black overflow-hidden bg-cover bg-center" style={{ backgroundImage: u.avatar_url ? `url(${u.avatar_url})` : 'none' }}>
                                                        {!u.avatar_url && <Users size={16} className="text-white/20" />}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="text-xs font-black uppercase text-white truncate max-w-[180px]">{u.full_name || 'Sin Nombre'}</h4>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className={`text-[8px] font-black uppercase tracking-tighter ${u.status === 'approved' ? 'text-green-500' : u.status === 'rejected' ? 'text-red-500' : 'text-yellow-500'
                                                                }`}>
                                                                {u.status}
                                                            </span>
                                                            <span className="text-[7px] text-white/20 font-mono">SX-{u.id.slice(0, 8)}</span>
                                                        </div>
                                                    </div>
                                                    <ChevronRight size={14} className="text-white/10" />
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Detail View */}
                            <div className="flex-1 overflow-y-auto bg-black p-6 md:p-12 custom-scrollbar">
                                <AnimatePresence mode="wait">
                                    {selectedUser ? (
                                        <motion.div
                                            key={selectedUser.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-12 max-w-4xl"
                                        >
                                            {/* Profile Top */}
                                            <div className="flex flex-col md:flex-row gap-10 items-start">
                                                <div className="w-32 h-32 md:w-48 md:h-48 rounded-[40px] border border-primary/30 bg-black shadow-glow overflow-hidden">
                                                    {selectedUser.avatar_url ? (
                                                        <img src={selectedUser.avatar_url} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="h-full w-full flex items-center justify-center opacity-10"><Users size={64} /></div>
                                                    )}
                                                </div>
                                                <div className="flex-1 pt-4">
                                                    <div className="flex flex-wrap items-center gap-4 mb-4">
                                                        <h3 className="text-3xl md:text-5xl font-black italic-luxury uppercase italic gold-text">{selectedUser.full_name}</h3>
                                                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${selectedUser.status === 'approved' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                                                                selectedUser.status === 'rejected' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                                                                    'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 animate-pulse'
                                                            }`}>
                                                            {selectedUser.status}
                                                        </span>
                                                    </div>

                                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                                        <InfoBox icon={<Mail size={12} />} label="Email" value={selectedUser.id} smallValue />
                                                        <InfoBox icon={<Phone size={12} />} label="Phone" value={selectedUser.phone} />
                                                        <InfoBox icon={<Globe size={12} />} label="Origin" value={selectedUser.nationality} />
                                                        <InfoBox icon={<Zap size={12} />} label="Plan" value={selectedUser.preferred_plan} />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action Bar */}
                                            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 flex flex-wrap gap-4 items-center justify-between">
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-black uppercase text-white/40">Modificar Estatus del Miembro</p>
                                                    <p className="text-[9px] text-white/20 italic font-serif">Aprobar habilitará el acceso al panel VIP y procesamiento de pagos USDC</p>
                                                </div>
                                                <div className="flex gap-4">
                                                    <button
                                                        onClick={() => handleUpdateStatus(selectedUser.id, 'rejected')}
                                                        disabled={updatingStatus}
                                                        className="px-8 py-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase transition-all hover:bg-red-500 hover:text-white"
                                                    >
                                                        RECHAZAR
                                                    </button>
                                                    <button
                                                        onClick={() => handleUpdateStatus(selectedUser.id, 'approved')}
                                                        disabled={updatingStatus}
                                                        className="px-8 py-4 rounded-xl bg-green-500 border border-green-400 text-black text-[10px] font-black uppercase shadow-glow transition-all hover:scale-105"
                                                    >
                                                        {updatingStatus ? <RefreshCw className="animate-spin" size={12} /> : 'APROBAR SOCIO'}
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Tabs / Expansion Areas */}
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                                {/* Registration Data */}
                                                <div className="space-y-6">
                                                    <h5 className="text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-3 text-primary">
                                                        <FileText size={16} /> Expediente Civil
                                                    </h5>
                                                    <div className="bg-white/5 rounded-3xl p-8 space-y-4 border border-white/5">
                                                        <DetailRow label="Nacionalidad" value={selectedUser.nationality} />
                                                        <DetailRow label="Residencia" value={selectedUser.locality} />
                                                        <DetailRow label="Nacimiento" value={selectedUser.birth_date} />
                                                        <DetailRow label="Rol Sistema" value={selectedUser.role} />
                                                        <DetailRow label="Último Update" value={new Date(selectedUser.updated_at).toLocaleString()} />
                                                    </div>
                                                </div>

                                                {/* Medical Data */}
                                                <div className="space-y-6">
                                                    <h5 className="text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-3 text-primary">
                                                        <Stethoscope size={16} /> Perfil Médico (NDA)
                                                    </h5>
                                                    {medicalData ? (
                                                        <div className="bg-red-500/5 rounded-3xl p-8 space-y-4 border border-red-500/10">
                                                            <DetailRow label="Grupo Sanguíneo" value={medicalData.blood_type} highlight />
                                                            <DetailRow label="Condiciones" value={medicalData.chronic_conditions} />
                                                            <DetailRow label="Medicaciones" value={medicalData.medications} />
                                                            <DetailRow label="Alergias" value={medicalData.allergies} />
                                                            <DetailRow label="Salud Mental" value={medicalData.mental_health} />
                                                        </div>
                                                    ) : (
                                                        <div className="p-10 border-2 border-dashed border-white/5 rounded-3xl text-center opacity-20 text-[10px] uppercase font-black">
                                                            Sin perfil médico declarado
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <div className="h-full flex flex-col items-center justify-center opacity-10 space-y-8">
                                            <ShieldAlert size={120} />
                                            <div className="text-center">
                                                <h3 className="text-2xl font-black uppercase tracking-[0.4em]">Panel de Control</h3>
                                                <p className="text-sm font-black uppercase tracking-widest mt-2">Seleccione un usuario para auditar</p>
                                            </div>
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Footer Status */}
                        <div className="p-8 border-t border-white/5 bg-black text-center">
                            <p className="text-[8px] text-white/10 uppercase tracking-[0.6em]">ADMISSION GATE SECURITY LAYER — GLOBAL ACCESS CONTROL</p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

const InfoBox = ({ icon, label, value, smallValue }) => (
    <div className="p-5 bg-white/5 border border-white/5 rounded-2xl">
        <div className="flex items-center gap-2 mb-2 text-primary/60">
            {icon}
            <span className="text-[8px] font-black uppercase tracking-widest">{label}</span>
        </div>
        <div className={`text-white font-bold leading-tight ${smallValue ? 'text-[9px] break-all font-mono' : 'text-xs uppercase'}`}>
            {value || 'N/A'}
        </div>
    </div>
);

const DetailRow = ({ label, value, highlight }) => (
    <div className="flex justify-between items-center py-1 border-b border-white/5 last:border-0 pb-3">
        <span className="text-[10px] font-black uppercase text-white/20 tracking-wider">{label}</span>
        <span className={`text-[10px] font-bold ${highlight ? 'text-primary' : 'text-white/80'}`}>{value || '—'}</span>
    </div>
);

export default AdminPanel;
