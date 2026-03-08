import React from 'react';
import { motion } from 'framer-motion';
import { Plane, User } from 'lucide-react';

const PlaneVisual = () => {
    // Create 30 passenger slots
    const passengers = Array.from({ length: 30 });

    return (
        <div className="mt-16 relative w-full max-w-2xl mx-auto">
            <div className="text-sm font-bold text-primary mb-4 tracking-tighter uppercase">
                Vuelo Privado: 30 Plazas Confirmadas
            </div>

            <div className="relative glass-morphism p-8 flex items-center gap-8 border-primary/20">
                {/* The Plane Silhouette */}
                <motion.div
                    animate={{ x: [0, 5, 0], y: [0, -2, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -left-12 -top-12 text-primary opacity-20"
                >
                    <Plane size={120} style={{ transform: 'rotate(45deg)' }} />
                </motion.div>

                <div className="grid grid-cols-10 gap-2 relative z-10 w-full">
                    {passengers.map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center border border-white/10"
                            title={`Asiento ${i + 1}`}
                        >
                            <User size={14} className="text-primary" />
                        </motion.div>
                    ))}
                </div>

                <div className="absolute -right-8 top-1/2 -translate-y-1/2 rotate-90 text-[10px] tracking-[5px] text-white/20 whitespace-nowrap">
                    PRIVATE JET SECTION
                </div>
            </div>

            <div className="mt-4 flex justify-between text-[10px] text-dim font-mono">
                <span>GATE: VVIP-01</span>
                <span className="text-primary">30/30 PASSENGERS BOARDED</span>
                <span>STATUS: READY</span>
            </div>
        </div>
    );
};

export default PlaneVisual;
