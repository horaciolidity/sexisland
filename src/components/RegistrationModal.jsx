import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    ShieldCheck,
    FileText,
    Stethoscope,
    AlertCircle,
    ChevronRight,
    ChevronLeft,
    Camera,
    Upload,
    CheckSquare,
    Lock,
    Scale
} from 'lucide-react';

const RegistrationModal = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        birthDate: '',
        passportNumber: '',
        chronicConditions: '',
        medications: '',
        allergies: '',
        emergencyContact: '',
        termsAccepted: false,
        ageVerified: false,
        healthDisclaimer: false
    });

    const steps = [
        { id: 1, title: 'Validación Legal', icon: <Scale size={20} /> },
        { id: 2, title: 'Perfil Médico', icon: <Stethoscope size={20} /> },
        { id: 3, title: 'Documentación', icon: <Camera size={20} /> },
        { id: 4, title: 'Protocolo Final', icon: <ShieldCheck size={20} /> }
    ];

    const handleNext = () => setStep(prev => Math.min(prev + 1, 4));
    const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

    const isStepValid = () => {
        if (step === 1) return formData.fullName && formData.birthDate && formData.ageVerified;
        if (step === 2) return true; // Health info can be optional or validated
        if (step === 3) return formData.passportNumber;
        if (step === 4) return formData.termsAccepted && formData.healthDisclaimer;
        return false;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="w-full max-w-2xl bg-[#0A0E14] border border-primary/20 rounded-[40px] overflow-hidden flex flex-col max-h-[90vh] shadow-[0_0_100px_rgba(212,175,55,0.15)]"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-white/5 bg-black/40 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20">
                                    <FileText className="text-primary" size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black tracking-tighter text-white uppercase italic-luxury">Expediente de Admisión</h2>
                                    <p className="text-[9px] text-primary/60 font-black tracking-[0.3em] uppercase">Protocolo de Selección Sovereign</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 text-white/20 hover:text-white transition bg-white/5 rounded-full">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Progress Bar */}
                        <div className="flex px-10 py-6 bg-black/20 gap-4">
                            {steps.map((s) => (
                                <div key={s.id} className="flex-1 flex flex-col gap-2">
                                    <div className="h-1 rounded-full overflow-hidden bg-white/5">
                                        <motion.div
                                            className="h-full bg-primary"
                                            initial={{ width: 0 }}
                                            animate={{ width: step >= s.id ? '100%' : '0%' }}
                                        />
                                    </div>
                                    <div className={`flex items-center gap-2 ${step >= s.id ? 'text-primary' : 'text-white/20'}`}>
                                        {s.icon}
                                        <span className="text-[8px] font-black uppercase tracking-widest hidden sm:block">{s.title}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Form Content */}
                        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar space-y-8">
                            {step === 1 && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 text-left">
                                    <div className="p-6 bg-primary/5 border border-primary/10 rounded-3xl mb-8">
                                        <div className="flex items-start gap-4">
                                            <AlertCircle className="text-primary shrink-0" size={20} />
                                            <p className="text-[11px] text-white/60 leading-relaxed font-medium italic">
                                                REQUISITO MANDATORIO: El acceso al Santuario está estrictamente limitado a individuos mayores de 18 años. La falsificación de datos personales resultará en la revocación inmediata sin derecho a reembolso.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black text-white/40 uppercase tracking-widest pl-1">Nombre Completo (según Pasaporte)</label>
                                            <input
                                                type="text"
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:border-primary/50 outline-none transition-all"
                                                placeholder="John Doe"
                                                value={formData.fullName}
                                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black text-white/40 uppercase tracking-widest pl-1">Fecha de Nacimiento</label>
                                            <input
                                                type="date"
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:border-primary/50 outline-none transition-all"
                                                value={formData.birthDate}
                                                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                                            />
                                        </div>
                                        <label className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 cursor-pointer group hover:bg-white/10 transition-all">
                                            <input
                                                type="checkbox"
                                                className="w-5 h-5 rounded border-white/10 bg-black text-primary"
                                                checked={formData.ageVerified}
                                                onChange={(e) => setFormData({ ...formData, ageVerified: e.target.checked })}
                                            />
                                            <span className="text-[10px] font-black uppercase text-white/40 group-hover:text-white transition-all">Confirmo bajo fe de juramento que tengo más de 18 años</span>
                                        </label>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 text-left">
                                    <div className="flex flex-col gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">Enfermedades Crónicas / Condiciones Relevantes</label>
                                            <textarea
                                                className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 text-sm min-h-[120px] focus:border-primary/50 outline-none transition-all font-light"
                                                placeholder="Describa cualquier condición médica que debamos conocer para su seguridad..."
                                                value={formData.chronicConditions}
                                                onChange={(e) => setFormData({ ...formData, chronicConditions: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">Medicación de Uso Crónico</label>
                                            <textarea
                                                className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 text-sm min-h-[120px] focus:border-primary/50 outline-none transition-all font-light"
                                                placeholder="Liste los medicamentos y dosis que toma regularmente..."
                                                value={formData.medications}
                                                onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">Alergias Conocidas</label>
                                            <input
                                                type="text"
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:border-primary/50 outline-none transition-all"
                                                placeholder="Alimentos, materiales, medicamentos..."
                                                value={formData.allergies}
                                                onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8 text-left text-center">
                                    <div className="p-8 border-2 border-dashed border-white/10 rounded-[40px] bg-white/[0.02] flex flex-col items-center gap-6 group hover:border-primary/30 transition-all cursor-pointer">
                                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-white/20 group-hover:text-primary group-hover:bg-primary/10 transition-all">
                                            <Upload size={32} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black uppercase tracking-widest mb-2 font-serif italic text-white/80">Cargar Copia de Pasaporte</h4>
                                            <p className="text-[9px] text-white/20 uppercase font-black tracking-widest">Formatos permitidos: JPG, PNG, PDF (Máx. 5MB)</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4 max-w-sm mx-auto">
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black text-white/40 uppercase tracking-widest pl-1">Número de Pasaporte</label>
                                            <input
                                                type="text"
                                                className="w-full bg-black border border-white/10 rounded-2xl p-4 text-sm focus:border-primary/50 outline-none transition-all text-center tracking-[0.3em] font-mono"
                                                placeholder="XXXXXXXXX"
                                                value={formData.passportNumber}
                                                onChange={(e) => setFormData({ ...formData, passportNumber: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 4 && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 text-left">
                                    <div className="p-8 glass-morphism rounded-[40px] border-primary/20 space-y-6 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-6 opacity-5"><Lock size={80} /></div>
                                        <div className="flex items-center gap-4 text-primary mb-4">
                                            <ShieldCheck size={24} />
                                            <h3 className="text-lg font-black italic uppercase italic-luxury">DECLARACIÓN DE SOBERANÍA</h3>
                                        </div>
                                        <div className="space-y-4 max-h-[200px] overflow-y-auto pr-4 text-[10px] text-white/40 leading-relaxed font-light font-serif">
                                            <p>1. RECONOCIMIENTO DE RIESGO: El solicitante reconoce que los eventos en el Santuario pueden implicar actividades físicas y sensoriales intensas.</p>
                                            <p>2. CONFIDENCIALIDAD: Protocolo de No-Divulgación estricto. Cualquier filtración de ubicación o identidades será perseguida legalmente.</p>
                                            <p>3. EXENCIÓN MÉDICA: El Santuario cuenta con equipo médico de respuesta rápida, pero cada miembro es responsable de su historial de salud declarado.</p>
                                            <p>4. PROTOCOLO BIO-VIGILANCIA: Acepto los controles de temperatura y salud aleatorios durante la estancia.</p>
                                        </div>

                                        <div className="space-y-4 pt-6 border-t border-white/5">
                                            <label className="flex items-start gap-4 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    className="mt-1 w-5 h-5 rounded border-white/10 bg-black text-primary"
                                                    checked={formData.termsAccepted}
                                                    onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                                                />
                                                <span className="text-[10px] font-black uppercase text-white/20 group-hover:text-white transition-all leading-tight">
                                                    He leído y acepto los protocolos de seguridad y confidencialidad absoluta del Santuario.
                                                </span>
                                            </label>
                                            <label className="flex items-start gap-4 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    className="mt-1 w-5 h-5 rounded border-white/10 bg-black text-primary"
                                                    checked={formData.healthDisclaimer}
                                                    onChange={(e) => setFormData({ ...formData, healthDisclaimer: e.target.checked })}
                                                />
                                                <span className="text-[10px] font-black uppercase text-white/20 group-hover:text-white transition-all leading-tight">
                                                    Declaro que mi historial médico es verídico y el Santuario queda exento de cualquier complicación derivada de omisiones.
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Footer / Navigation */}
                        <div className="p-8 border-t border-white/5 bg-black/40 flex justify-between items-center">
                            <button
                                onClick={handlePrev}
                                disabled={step === 1}
                                className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${step === 1 ? 'opacity-0' : 'text-white/40 hover:text-white'}`}
                            >
                                <ChevronLeft size={16} /> Atrás
                            </button>

                            {step < 4 ? (
                                <button
                                    onClick={handleNext}
                                    disabled={!isStepValid()}
                                    className={`btn-primary px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 ${!isStepValid() ? 'opacity-30 cursor-not-allowed' : ''}`}
                                >
                                    Siguiente <ChevronRight size={16} />
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        alert("Expediente Enviado. Nuestro equipo de logística procesará su acreditación en las próximas 24 horas.");
                                        onClose();
                                    }}
                                    disabled={!isStepValid()}
                                    className={`btn-primary bg-green-500 hover:bg-green-600 px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 shadow-[0_0_30px_rgba(34,197,94,0.3)] ${!isStepValid() ? 'opacity-30 cursor-not-allowed' : ''}`}
                                >
                                    FINALIZAR REGISTRO <ShieldCheck size={16} />
                                </button>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default RegistrationModal;
