import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, ShieldCheck, FileText, Stethoscope, AlertCircle,
    ChevronRight, ChevronLeft, Camera, Upload, Lock,
    Scale, Phone, MapPin, User, Mail, CheckCircle2
} from 'lucide-react';

const inputClass = "w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:border-primary/50 outline-none transition-all font-light placeholder:text-white/20";
const labelClass = "text-[9px] font-black text-white/40 uppercase tracking-widest pl-1 block mb-2";

const RegistrationModal = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        // Step 1 - Personal
        fullName: '', birthDate: '', nationality: '', phone: '', locality: '', email: '',
        ageVerified: false,
        // Step 2 - Medical
        chronicConditions: '', medications: '', allergies: '', bloodType: '', surgeries: '', mentalHealth: '',
        // Step 3 - Documentation
        passportNumber: '', passportExpiry: '', emergencyContact: '', emergencyPhone: '',
        // Step 4 - Contact & Origin
        referralCode: '', howDidYouHear: '', preferredPlan: '',
        // Step 5 - Legal
        termsAccepted: false, healthDisclaimer: false, ndaAccepted: false, bioCheckAccepted: false
    });

    const steps = [
        { id: 1, title: 'Datos Personales', icon: <User size={16} /> },
        { id: 2, title: 'Perfil Médico', icon: <Stethoscope size={16} /> },
        { id: 3, title: 'Documentación', icon: <Camera size={16} /> },
        { id: 4, title: 'Contacto & Origen', icon: <MapPin size={16} /> },
        { id: 5, title: 'Protocolo Legal', icon: <ShieldCheck size={16} /> }
    ];

    const update = (field, val) => setFormData(prev => ({ ...prev, [field]: val }));

    const isStepValid = () => {
        if (step === 1) return formData.fullName && formData.birthDate && formData.phone && formData.locality && formData.email && formData.ageVerified;
        if (step === 2) return true;
        if (step === 3) return formData.passportNumber && formData.passportExpiry;
        if (step === 4) return true;
        if (step === 5) return formData.termsAccepted && formData.healthDisclaimer && formData.ndaAccepted && formData.bioCheckAccepted;
        return false;
    };

    const handleFinish = () => {
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setStep(1);
            onClose();
        }, 4000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[300] flex items-center justify-center p-2 md:p-6 bg-black/95 backdrop-blur-2xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="w-full max-w-2xl bg-[#07090D] border border-primary/20 rounded-[32px] overflow-hidden flex flex-col max-h-[95vh] shadow-[0_0_120px_rgba(212,175,55,0.12)]"
                    >
                        {/* Header */}
                        <div className="p-6 md:p-8 border-b border-white/5 bg-black/60 flex justify-between items-center shrink-0">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20 shadow-glow">
                                    <FileText className="text-primary" size={22} />
                                </div>
                                <div>
                                    <h2 className="text-lg md:text-xl font-black tracking-tighter text-white uppercase italic-luxury">Expediente de Admisión</h2>
                                    <p className="text-[9px] text-primary/60 font-black tracking-[0.3em] uppercase">Protocolo Sovereign — Ref. SX-{Date.now().toString().slice(-6)}</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 text-white/20 hover:text-white transition bg-white/5 rounded-full">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Progress Bar */}
                        <div className="flex px-6 md:px-10 py-4 bg-black/30 gap-2 md:gap-3 shrink-0">
                            {steps.map((s) => (
                                <div key={s.id} className="flex-1 flex flex-col gap-2">
                                    <div className="h-1 rounded-full overflow-hidden bg-white/5">
                                        <motion.div className="h-full bg-primary" initial={{ width: 0 }} animate={{ width: step >= s.id ? '100%' : '0%' }} transition={{ duration: 0.4 }} />
                                    </div>
                                    <div className={`flex items-center gap-1.5 ${step >= s.id ? 'text-primary' : 'text-white/20'} transition-colors`}>
                                        {s.icon}
                                        <span className="text-[7px] md:text-[8px] font-black uppercase tracking-widest hidden md:block">{s.title}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Form Content */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
                            {/* STEP 1 — Personal Data */}
                            {step === 1 && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5 text-left">
                                    <div className="p-5 bg-primary/5 border border-primary/10 rounded-3xl">
                                        <div className="flex items-start gap-3">
                                            <AlertCircle className="text-primary shrink-0 mt-0.5" size={18} />
                                            <p className="text-[10px] text-white/50 leading-relaxed font-medium italic">
                                                REQUISITO MANDATORIO: El acceso al Santuario Adult Reserve está estrictamente limitado a personas mayores de 18 años. Toda información proporcionada es verificada contra bases internacionales. La falsificación de datos conlleva acción legal inmediata.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className={labelClass}>Nombre Completo (según Pasaporte)</label>
                                            <input type="text" className={inputClass} placeholder="John M. Doe" value={formData.fullName} onChange={e => update('fullName', e.target.value)} />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Fecha de Nacimiento</label>
                                            <input type="date" className={inputClass} value={formData.birthDate} onChange={e => update('birthDate', e.target.value)} />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Nacionalidad</label>
                                            <input type="text" className={inputClass} placeholder="Argentina / España / USA..." value={formData.nationality} onChange={e => update('nationality', e.target.value)} />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Email de Contacto</label>
                                            <input type="email" className={inputClass} placeholder="vip@correo.com" value={formData.email} onChange={e => update('email', e.target.value)} />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Teléfono / WhatsApp (con código país)</label>
                                            <input type="tel" className={inputClass} placeholder="+54 9 11 0000-0000" value={formData.phone} onChange={e => update('phone', e.target.value)} />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Localidad / Ciudad de Residencia</label>
                                            <input type="text" className={inputClass} placeholder="Buenos Aires, AR" value={formData.locality} onChange={e => update('locality', e.target.value)} />
                                        </div>
                                    </div>

                                    <label className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 cursor-pointer group hover:bg-white/10 transition-all">
                                        <input type="checkbox" className="mt-1 w-5 h-5 rounded accent-yellow-500" checked={formData.ageVerified} onChange={e => update('ageVerified', e.target.checked)} />
                                        <span className="text-[10px] font-black uppercase text-white/40 group-hover:text-white/80 transition-all leading-relaxed">
                                            Confirmo bajo fe de juramento que soy mayor de 18 años y que los datos proporcionados son verídicos, aceptando que cualquier falsedad resulta en exclusión permanente y posible acción legal.
                                        </span>
                                    </label>
                                </motion.div>
                            )}

                            {/* STEP 2 — Medical Profile */}
                            {step === 2 && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5 text-left">
                                    <div className="p-5 bg-white/[0.03] border border-white/5 rounded-3xl">
                                        <p className="text-[10px] text-white/30 leading-relaxed italic">
                                            Esta información es estrictamente confidencial y utilizada únicamente por nuestro equipo médico de guardia. Su omisión puede poner en riesgo su integridad durante la estadía.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className={labelClass}>Grupo Sanguíneo</label>
                                            <select className={inputClass + " bg-[#07090D]"} value={formData.bloodType} onChange={e => update('bloodType', e.target.value)}>
                                                <option value="" className="bg-black">Seleccionar...</option>
                                                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(t => <option key={t} value={t} className="bg-black">{t}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className={labelClass}>¿Toma alguna medicación crónica?</label>
                                            <input type="text" className={inputClass} placeholder="Nombre / dosis / frecuencia" value={formData.medications} onChange={e => update('medications', e.target.value)} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className={labelClass}>Enfermedades / Condiciones Médicas Crónicas</label>
                                        <textarea className={inputClass + " min-h-[90px]"} placeholder="Hipertensión, diabetes, cardiopatías, etc. Si no tiene, escriba 'Ninguna'" value={formData.chronicConditions} onChange={e => update('chronicConditions', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Cirugías o Procedimientos Recientes (últimos 2 años)</label>
                                        <textarea className={inputClass + " min-h-[70px]"} placeholder="Tipo de cirugía y fecha aproximada. Si no aplica, escriba 'Ninguna'" value={formData.surgeries} onChange={e => update('surgeries', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Alergias Conocidas</label>
                                        <input type="text" className={inputClass} placeholder="Latex, penicilina, mariscos, etc." value={formData.allergies} onChange={e => update('allergies', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Nota de Salud Mental (opcional)</label>
                                        <input type="text" className={inputClass} placeholder="Ansiedad, fobias relevantes, etc." value={formData.mentalHealth} onChange={e => update('mentalHealth', e.target.value)} />
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 3 — Documentation */}
                            {step === 3 && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 text-left">
                                    <div className="p-6 border-2 border-dashed border-white/10 rounded-3xl bg-white/[0.02] flex flex-col items-center gap-4 hover:border-primary/30 transition-all cursor-pointer">
                                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/20 hover:text-primary hover:bg-primary/10 transition-all">
                                            <Upload size={28} />
                                        </div>
                                        <div className="text-center">
                                            <h4 className="text-sm font-black uppercase tracking-wider mb-1 font-serif italic text-white/80">Cargar Copia de Pasaporte</h4>
                                            <p className="text-[9px] text-white/20 uppercase font-black tracking-wider">JPG, PNG o PDF — Máx. 5MB — Ambas caras</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className={labelClass}>Número de Pasaporte</label>
                                            <input type="text" className={inputClass + " tracking-widest font-mono"} placeholder="AA000000" value={formData.passportNumber} onChange={e => update('passportNumber', e.target.value.toUpperCase())} />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Vencimiento del Pasaporte</label>
                                            <input type="date" className={inputClass} value={formData.passportExpiry} onChange={e => update('passportExpiry', e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className={labelClass}>Contacto de Emergencia (nombre completo)</label>
                                            <input type="text" className={inputClass} placeholder="Jane Doe" value={formData.emergencyContact} onChange={e => update('emergencyContact', e.target.value)} />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Teléfono de Emergencia</label>
                                            <input type="tel" className={inputClass} placeholder="+1 555 000 0000" value={formData.emergencyPhone} onChange={e => update('emergencyPhone', e.target.value)} />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 4 — Contact & Origin */}
                            {step === 4 && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5 text-left">
                                    <div className="p-5 bg-white/[0.03] border border-white/5 rounded-3xl">
                                        <p className="text-[10px] text-white/30 leading-relaxed italic">
                                            Esta información nos permite personalizar su experiencia y asegurar la logística de ingreso al Santuario.
                                        </p>
                                    </div>
                                    <div>
                                        <label className={labelClass}>Código de Referido / Invitación (si posee)</label>
                                        <input type="text" className={inputClass + " tracking-widest font-mono"} placeholder="SX-XXXXX-XXXX" value={formData.referralCode} onChange={e => update('referralCode', e.target.value.toUpperCase())} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>¿Cómo conoció el Santuario?</label>
                                        <select className={inputClass + " bg-[#07090D]"} value={formData.howDidYouHear} onChange={e => update('howDidYouHear', e.target.value)}>
                                            <option value="" className="bg-black">Seleccionar...</option>
                                            {['Referido por un miembro', 'Red privada de inversores', 'Canal Telegram encriptado', 'Agencia de viajes de lujo', 'Redes oscuras / Dark net', 'Otro'].map(o => <option key={o} value={o} className="bg-black">{o}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelClass}>Plan de Interés</label>
                                        <select className={inputClass + " bg-[#07090D]"} value={formData.preferredPlan} onChange={e => update('preferredPlan', e.target.value)}>
                                            <option value="" className="bg-black">Seleccionar...</option>
                                            <option value="platinum" className="bg-black">Platinum Star — $5,200</option>
                                            <option value="diamond" className="bg-black">Diamond Imperial — $7,500</option>
                                            <option value="sovereign" className="bg-black">Sovereign Group — Custom</option>
                                        </select>
                                    </div>
                                    <div className="p-5 bg-primary/5 border border-primary/10 rounded-3xl flex items-start gap-3">
                                        <AlertCircle className="text-primary shrink-0 mt-0.5" size={16} />
                                        <p className="text-[9px] text-white/40 leading-relaxed italic">
                                            Tras la aprobación de su expediente, recibirá un código de acceso en el teléfono y email declarados. Solo entonces se habilitará el proceso de pago y se revelará la ubicación exacta del destino.
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 5 — Legal Protocol */}
                            {step === 5 && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 text-left">
                                    <div className="p-6 md:p-8 glass-morphism rounded-[32px] border-primary/20 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-6 opacity-5"><Lock size={80} /></div>
                                        <div className="flex items-center gap-3 text-primary mb-5">
                                            <ShieldCheck size={20} />
                                            <h3 className="text-base font-black italic uppercase italic-luxury">Declaración de Soberanía Personal</h3>
                                        </div>

                                        <div className="space-y-3 max-h-[260px] overflow-y-auto pr-3 text-[10px] text-white/40 leading-loose font-light font-serif custom-scrollbar">
                                            <p className="text-white/60 font-bold not-italic">TÉRMINOS Y CONDICIONES — SANTUARIO ADULT RESERVE LLC</p>
                                            <p><span className="text-primary font-bold">ART. 1 — CONSENTIMIENTO INFORMADO:</span> El solicitante, en pleno uso de sus facultades mentales y físicas, manifiesta su voluntad libre y espontánea de participar en los eventos del Santuario, exentos de toda presión externa. Reconoce haber recibido información suficiente sobre la naturaleza de los mismos.</p>
                                            <p><span className="text-primary font-bold">ART. 2 — MAYORÍA DE EDAD Y CAPACIDAD LEGAL:</span> El solicitante certifica ser mayor de 18 años y poseer plena capacidad legal en su jurisdicción de origen para celebrar este contrato y participar en actividades para adultos de carácter privado.</p>
                                            <p><span className="text-primary font-bold">ART. 3 — PROTOCOLO DE CONFIDENCIALIDAD ABSOLUTA (NDA):</span> Queda estrictamente prohibida la divulgación de: (a) ubicación geográfica del evento; (b) identidad de otros participantes o del personal; (c) contenido de las actividades; (d) cualquier material audiovisual. El incumplimiento activa una penalización contractual de USD $500,000 por instancia, más acciones penales según el Convenio de Berna.</p>
                                            <p><span className="text-primary font-bold">ART. 4 — EXENCIÓN DE RESPONSABILIDAD MÉDICA:</span> El Santuario dispondrá de un equipo médico de guardia las 24hs. No obstante, el participante es el único responsable de las consecuencias derivadas de información médica omitida o falseada en el expediente. La organización queda exenta de toda responsabilidad en tales casos.</p>
                                            <p><span className="text-primary font-bold">ART. 5 — PROTOCOLO BIO-VIGILANCIA Y CONSENTIMIENTO DE SALUD:</span> Durante la estadía, el personal médico podrá realizar controles de temperatura corporal, presión arterial y estado general de manera aleatoria y no intrusiva, en resguardo de la salud colectiva de los participantes.</p>
                                            <p><span className="text-primary font-bold">ART. 6 — NO-REEMBOLSO Y PENALIZACIONES:</span> El depósito de reserva y el pago total del plan seleccionado son no reembolsables bajo ninguna circunstancia una vez aprobado el expediente. La cancelación unilateral por parte del participante no da derecho a restitución.</p>
                                            <p><span className="text-primary font-bold">ART. 7 — DISPOSITIVOS ELECTRÓNICOS:</span> Todos los dispositivos con capacidad de grabación deberán depositarse en las cajas de seguridad provistas por el Santuario al ingreso. El uso no autorizado de cualquier dispositivo será causa de expulsión inmediata sin reembolso y con posible acción judicial.</p>
                                            <p><span className="text-primary font-bold">ART. 8 — LEGISLACIÓN APLICABLE:</span> Este contrato se rige por las leyes del territorio soberano en el cual se desarrolla el evento. Cualquier disputa será sometida a arbitraje privado internacional, renunciando el participante a la jurisdicción de su país de origen.</p>
                                            <p><span className="text-primary font-bold">ART. 9 — DESTINO Y LOGÍSTICA:</span> La ubicación exacta del destino será revelada exclusivamente a los participantes con expediente aprobado y pago completado, con un máximo de 72 horas antes del vuelo. La organización se reserva el derecho a modificar el destino por razones de seguridad.</p>
                                            <p><span className="text-primary font-bold">ART. 10 — DERECHOS DE IMAGEN:</span> Ningún material generado durante el evento podrá ser atribuido al Santuario sin consentimiento escrito expreso. Cualquier material obtenido ilícitamente será perseguido con todo el rigor legal disponible.</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {[
                                            { key: 'termsAccepted', text: 'He leído íntegramente, comprendo y acepto todos los Artículos del contrato de admisión del Santuario Adult Reserve.' },
                                            { key: 'healthDisclaimer', text: 'Declaro que toda la información médica proporcionada es verídica y completa, eximiendo al Santuario de responsabilidad por omisiones.' },
                                            { key: 'ndaAccepted', text: 'Acepto el Protocolo de No-Divulgación (NDA) y entiendo que su violación implica penalizaciones legales y económicas severas.' },
                                            { key: 'bioCheckAccepted', text: 'Consiento los controles de Bio-Vigilancia médica durante mi estadía en el Santuario.' },
                                        ].map(item => (
                                            <label key={item.key} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 cursor-pointer group hover:bg-white/10 hover:border-primary/20 transition-all">
                                                <input type="checkbox" className="mt-1 w-5 h-5 rounded accent-yellow-500 shrink-0" checked={formData[item.key]} onChange={e => update(item.key, e.target.checked)} />
                                                <span className="text-[10px] font-bold uppercase text-white/30 group-hover:text-white/70 transition-all leading-relaxed">{item.text}</span>
                                            </label>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* SUCCESS STATE */}
                            <AnimatePresence>
                                {submitted && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[400] bg-black/95 flex flex-col items-center justify-center gap-8 px-10 text-center">
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}>
                                            <CheckCircle2 size={80} className="text-primary mx-auto mb-4" />
                                        </motion.div>
                                        <h2 className="text-3xl font-black italic-luxury italic uppercase gold-text">Expediente Recibido</h2>
                                        <p className="text-white/40 text-sm max-w-md leading-relaxed italic font-serif">
                                            Su expediente ha sido enviado al comité de admisión del Santuario. Recibirá una respuesta en las próximas <span className="text-primary font-bold">24–48 horas</span> en el contacto declarado. Solo tras la aprobación se habilitará el pago y la revelación del destino.
                                        </p>
                                        <div className="text-[9px] text-white/20 uppercase tracking-[0.4em] font-black">Cerrando automáticamente...</div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Navigation Footer */}
                        <div className="p-6 md:p-8 border-t border-white/5 bg-black/60 flex justify-between items-center shrink-0">
                            <button
                                onClick={() => setStep(p => Math.max(p - 1, 1))}
                                disabled={step === 1}
                                className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-white/40 hover:text-white'}`}
                            >
                                <ChevronLeft size={16} /> Atrás
                            </button>

                            <div className="text-[9px] text-white/20 font-black uppercase tracking-widest">Paso {step} de {steps.length}</div>

                            {step < 5 ? (
                                <button
                                    onClick={() => setStep(p => Math.min(p + 1, 5))}
                                    disabled={!isStepValid()}
                                    className={`btn-primary px-8 md:px-10 py-4 md:py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 ${!isStepValid() ? 'opacity-25 cursor-not-allowed' : ''}`}
                                >
                                    Continuar <ChevronRight size={16} />
                                </button>
                            ) : (
                                <button
                                    onClick={handleFinish}
                                    disabled={!isStepValid()}
                                    className={`bg-green-600 hover:bg-green-500 text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 transition-all shadow-[0_0_30px_rgba(34,197,94,0.3)] ${!isStepValid() ? 'opacity-25 cursor-not-allowed' : ''}`}
                                >
                                    ENVIAR EXPEDIENTE <ShieldCheck size={16} />
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
