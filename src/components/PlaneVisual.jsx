import React from 'react';
import { motion } from 'framer-motion';
import { User, CheckCircle2 } from 'lucide-react';

const PlaneVisual = () => {
    // 30 seats total
    const seats = Array.from({ length: 30 });

    // Confirmed passengers indices
    const confirmedIndices = [0, 4, 12];

    const confirmedData = [
        { name: "M. Rossi", country: "Italy", type: "Diamond" },
        { name: "J. Smith", country: "USA", type: "Gold" },
        { name: "A. Al-Fayed", country: "UAE", type: "Diamond" }
    ];

    return (
        <div className="mt-12 relative w-full max-w-3xl mx-auto">
            <div className="flex justify-between items-end mb-6">
                <div className="text-left">
                    <h4 className="text-primary font-black text-xs tracking-[0.2em] uppercase">Private Flight Status</h4>
                    <div className="text-3xl font-bold flex items-center gap-2">
                        3 <span className="text-dim text-lg font-light">/ 30 Seats Confirmed</span>
                    </div>
                </div>
                <div className="text-right hidden md:block">
                    <div className="text-[10px] text-dim uppercase tracking-widest">Flight Code</div>
                    <div className="text-sm font-mono text-white">SX-ISLAND-2026</div>
                </div>
            </div>

            <div className="glass-morphism overflow-hidden relative border-primary/20 p-8 pt-12">
                {/* Plane Background decoration */}
                <div className="absolute top-0 right-0 w-64 h-full bg-jet-interior bg-cover opacity-10 pointer-events-none"></div>
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

                <div className="relative z-10 grid grid-cols-10 gap-3 md:gap-4">
                    {seats.map((_, i) => {
                        const isConfirmed = confirmedIndices.includes(i);
                        const data = isConfirmed ? confirmedData[confirmedIndices.indexOf(i)] : null;

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.02 }}
                                className="group relative"
                            >
                                <div className={`
                  aspect-square rounded-lg flex items-center justify-center transition-all duration-300
                  ${isConfirmed ? 'bg-primary shadow-[0_0_15px_rgba(212,175,55,0.4)] border-primary' : 'bg-white/5 border border-white/10 hover:border-white/30'}
                `}>
                                    {isConfirmed ? (
                                        <User size={18} className="text-black" />
                                    ) : (
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white/50 transition-colors" />
                                    )}
                                </div>

                                {isConfirmed && (
                                    <div className="absolute -top-1 -right-1">
                                        <CheckCircle2 size={12} className="text-white fill-green-500 rounded-full" />
                                    </div>
                                )}

                                {/* Tooltip for confirmed */}
                                {isConfirmed && (
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 glass-morphism text-[9px] w-24 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                                        <div className="text-primary font-bold">{data.name}</div>
                                        <div className="text-white/60">{data.country}</div>
                                        <div className="text-[7px] text-white bg-primary/20 px-1 mt-1 inline-block rounded">{data.type}</div>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Legend */}
                <div className="mt-8 pt-6 border-t border-white/5 flex gap-6 text-[10px] uppercase tracking-widest text-dim font-bold">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_5px_rgba(212,175,55,0.8)]"></div>
                        <span>Confirmed</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-white/10"></div>
                        <span>Available</span>
                    </div>
                </div>
            </div>

            <div className="absolute top-4 right-8 flex gap-1 items-center">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-[10px] text-primary/80 font-mono">LIVE UPDATING</span>
            </div>
        </div>
    );
};

export default PlaneVisual;
