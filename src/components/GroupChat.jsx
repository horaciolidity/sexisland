import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, X, Shield, Lock } from 'lucide-react';

const GroupChat = ({ onClose }) => {
    const [messages, setMessages] = useState([
        { id: 1, user: 'Admin', text: '¡Bienvenidos al grupo oficial de Sex Island 2026!', type: 'system' },
        { id: 2, user: 'Juan M.', text: '¿Cuántos DJs vienen al final?', type: 'user' },
        { id: 3, user: 'Staff Carlos', text: 'Tenemos 5 DJs confirmados, incluyendo una sorpresa VIP.', type: 'staff' },
        { id: 4, user: 'Roberto G.', text: 'Increíble, ¡ya tengo mi maleta lista!', type: 'user' },
        { id: 5, user: 'Marcos T.', text: '¿El casino es barra libre?', type: 'user' },
        { id: 6, user: 'Staff Carlos', text: 'Por supuesto, Marcos. Todo incluido significa TODO.', type: 'staff' },
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
        setMessages([...messages, { id: Date.now(), user: 'Tú', text: input, type: 'me' }]);
        setInput('');
    };

    return (
        <div className="h-full flex flex-col bg-[#0A0E14] border-l border-white/10 shadow-2xl">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20">
                <div>
                    <h3 className="font-bold flex items-center gap-2">
                        GRUPO VIP 2026 <Shield size={14} className="text-primary" />
                    </h3>
                    <p className="text-[10px] text-green-500">30 Miembros Online</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition">
                    <X size={20} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex flex-col ${msg.type === 'me' ? 'items-end' : 'items-start'}`}>
                        <span className="text-[10px] text-dim mb-1 px-1">
                            {msg.user} {msg.type === 'staff' && '✓'}
                        </span>
                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.type === 'system' ? 'bg-white/5 text-dim border border-white/5' :
                                msg.type === 'me' ? 'bg-primary text-black font-medium' :
                                    msg.type === 'staff' ? 'bg-blue-900/30 text-blue-100 border border-blue-500/30' :
                                        'bg-white/10 text-white'
                            }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>

            <div className="p-2 bg-black/40 flex items-center justify-center gap-2 text-[10px] text-dim">
                <Lock size={10} /> Canal encriptado de extremo a extremo
            </div>

            <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-black/20">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Escribe un mensaje..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary/50 transition"
                    />
                    <button type="submit" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-black hover:scale-105 transition">
                        <Send size={18} />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default GroupChat;
