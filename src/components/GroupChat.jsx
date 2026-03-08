import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, X, Shield, Lock, Check, CheckCheck } from 'lucide-react';

const GroupChat = ({ onClose, user }) => {
    const [messages, setMessages] = useState([
        { id: 1, user: 'Admin General', text: '🔥 Señores, estamos a solo 45 días del despegue. Prepárense para la mejor semana de sus vidas.', type: 'staff', time: '09:00' },
        { id: 2, user: 'Marco V.', text: 'Pregunta seria: ¿Hay código de vestimenta para el casino o podemos ir de shorts?', type: 'user', time: '10:15' },
        { id: 3, user: 'Staff Carlos', text: 'Marco, en el Casino VIP pedimos elegancia tropical. Camisa de lino y pantalón. Pero no te preocupes, ¡lo que pase después no necesita mucha ropa! 😂', type: 'staff', time: '10:18' },
        { id: 4, user: 'Robert Dubai', text: 'Jajaja Carlos tiene razón. Yo ya compré 3 relojes nuevos para lucir con las chicas. ¿Alguien sabe si Nicole vuelve este año? La de las fotos es increíble.', type: 'user', time: '11:05' },
        { id: 5, user: 'Staff Carlos', text: 'Robert, Nicole está confirmada y viene con 3 amigas nuevas que te van a dejar sin aliento. El casting de este año es nivel Victoria Secret.', type: 'staff', time: '11:10' },
        { id: 6, user: 'M. Rossi', text: '¿Cuántas Diamond Villas quedan? Somos un grupo de 5 y queremos estar todos juntos cerca del muelle.', type: 'user', time: '12:30' },
        { id: 7, user: 'Admin General', text: 'M. Rossi, solo quedan 2 villas Diamond. Si son 5, les recomiendo reservar hoy mismo para asegurar el bloque privado.', type: 'staff', time: '12:35' },
        { id: 8, user: 'Javier L.', text: 'Acabo de ver el video del crucero... Dios mío, ¿el DJ realmente es quien creo que es? Si es él, este viaje se paga solo.', type: 'user', time: '13:45' },
        { id: 9, user: 'Staff Carlos', text: '🤐 El contrato nos impide decir el nombre hasta la próxima semana, pero sí Javier... prepárate para un set legendario.', type: 'staff', time: '13:50' },
        { id: 10, user: 'M. Rossi', text: '¡LISTO! Villa reservada. Nos vemos en el paraíso señores. Yo pongo el primer brindis en el Jet.', type: 'user', time: '14:20' },
        { id: 11, user: 'Robert Dubai', text: 'Ese es el espíritu Rossi. ¡Salud! 🥂', type: 'user', time: '14:25' },
        { id: 12, user: 'Admin General', text: 'Aviso: La sesión de fotos en la playa secreta será el Día 3. Traigan bloqueador, porque el sol no será lo único que queme ese día. 🔥💦', type: 'staff', time: '15:00' },
    ]);
    const [input, setInput] = useState('');
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        const now = new Date();
        const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
        setMessages([...messages, {
            id: Date.now(),
            user: user?.name || 'Invitado VIP',
            text: input,
            type: 'me',
            time
        }]);
        setInput('');
    };

    return (
        <div className="h-full flex flex-col bg-[#0A0E14] border-l border-white/10 shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-white/10 bg-gradient-to-r from-black/40 to-transparent flex justify-between items-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary/50 to-transparent"></div>
                <div className="relative z-10">
                    <h3 className="font-black text-sm tracking-[0.2em] flex items-center gap-2 uppercase">
                        Santuario Privado <Shield size={14} className="text-primary" />
                    </h3>
                    <p className="text-[10px] text-primary/80 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                        30 MIEMBROS ONLINE
                    </p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition text-white/40 hover:text-white">
                    <X size={20} />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {messages.map((msg, i) => {
                    const isStaff = msg.type === 'staff';
                    const isMe = msg.type === 'me';

                    return (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, x: isMe ? 20 : -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                        >
                            <div className="flex items-center gap-2 mb-1 px-1">
                                <span className={`text-[10px] font-black uppercase tracking-widest ${isStaff ? 'text-primary' : isMe ? 'text-white' : 'text-white/40'}`}>
                                    {msg.user}
                                </span>
                                {isStaff && <CheckCheck size={10} className="text-primary" />}
                                <span className="text-[9px] text-white/20 font-mono">{msg.time}</span>
                            </div>

                            <div className={`
                max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed relative group
                ${isMe
                                    ? 'bg-primary text-black font-semibold rounded-tr-none'
                                    : isStaff
                                        ? 'bg-primary/5 border border-primary/20 text-white rounded-tl-none shadow-[0_0_15px_rgba(212,175,55,0.05)]'
                                        : 'bg-white/5 border border-white/5 text-white/90 rounded-tl-none'
                                }
              `}>
                                {msg.text}

                                {/* Decorative corner for messages */}
                                <div className={`absolute top-0 w-2 h-2 ${isMe ? 'right-[-2px] bg-primary' : 'left-[-2px] bg-inherit'} rotate-45 -z-10`}></div>
                            </div>
                        </motion.div>
                    );
                })}
                <div ref={chatEndRef} />
            </div>

            {/* Info Bar */}
            <div className="px-6 py-2 bg-primary/10 flex items-center justify-center gap-2 text-[9px] text-primary font-black uppercase tracking-tighter">
                <Lock size={10} /> Canal encriptado militar de extremo a extremo
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-6 border-t border-white/10 bg-black/40">
                <div className="flex gap-3 relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Mensaje privado..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-primary/50 transition-all font-light pr-14"
                    />
                    <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-all shadow-lg"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default GroupChat;
