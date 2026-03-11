import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Shield, Lock, Check, CheckCheck } from 'lucide-react';

const GroupChat = ({ onClose, user }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const chatEndRef = useRef(null);

    useEffect(() => {
        fetchMessages();

        const channel = supabase
            .channel('global_messages')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'global_messages' }, payload => {
                setMessages(prev => [...prev, transformMessage(payload.new)]);
            })
            .subscribe();

        return () => supabase.removeChannel(channel);
    }, []);

    const fetchMessages = async () => {
        const { data } = await supabase
            .from('global_messages')
            .select('*')
            .order('created_at', { ascending: true })
            .limit(50);

        if (data) {
            setMessages(data.map(transformMessage));
        }
    };

    const transformMessage = (msg) => {
        const date = new Date(msg.created_at);
        const time = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
        return {
            id: msg.id,
            user: msg.user_name || 'Invitado VIP',
            text: msg.content,
            type: msg.user_id === user?.id ? 'me' : 'user',
            time
        };
    };

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || !user) return;

        const content = input;
        setInput('');

        const { error } = await supabase.from('global_messages').insert({
            user_id: user.id,
            user_name: user.user_metadata?.full_name || 'Invitado VIP',
            content: content
        });

        if (error) console.error("Error sending message:", error);
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
