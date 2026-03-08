import React from 'react';
import { motion } from 'framer-motion';
import { User, CheckCircle2, Star } from 'lucide-react';

const PlaneVisual = () => {
    // 30 seats total (8 columns of 4 seats = 32 capacity, we use 30)
    const totalSeats = 30;

    // Confirmed passengers: 7 total, distributed on both sides
    // Let's place 4 on the left side and 3 on the right side
    const confirmedIndices = [0, 1, 5, 9, 2, 7, 11];

    const getPassengerData = (index) => {
        const names = [
            "M. Rossi", "J. Smith", "A. Al-Fayed", "K. Tanaka",
            "L. Dubois", "R. Garcia", "O. Nielsen"
        ];
        if (confirmedIndices.includes(index)) {
            const idx = confirmedIndices.indexOf(index);
            return {
                name: names[idx] || `Guest #${idx + 1}`,
                country: ["Italy", "USA", "UAE", "Japan", "France", "Spain", "Denmark"][idx % 7],
                type: index < 8 ? "VIP Diamond" : "VIP Gold"
            };
        }
        return null;
    };

    return (
        <div className="mt-12 relative w-full max-w-6xl mx-auto py-12 px-4">
            <div className="text-center mb-10">
                <h4 className="text-primary font-black text-[10px] tracking-[0.5em] uppercase mb-2">Cabin Manifest: Edición Limitada</h4>
                <div className="text-3xl font-bold flex items-center justify-center gap-4">
                    <span className="text-primary">7</span>
                    <span className="text-dim text-xs font-light uppercase tracking-[0.2em]">/ 30 Seats Confirmed</span>
                </div>
            </div>

            {/* Horizontal Plane Container with Scroll for Mobile */}
            <div className="overflow-x-auto pb-12 mask-fade-edges custom-scrollbar">
                <div className="relative flex items-center justify-center min-w-[900px] mx-auto py-10">

                    {/* Plane Nose (Left) */}
                    <div className="relative w-32 h-56 bg-white/5 border border-white/10 rounded-l-full flex items-center justify-center overflow-hidden flex-shrink-0 shadow-[inset_10px_0_20px_rgba(255,255,255,0.02)]">
                        <div className="absolute left-6 w-16 h-28 bg-cyan-500/5 rounded-l-full border-l border-cyan-500/20 blur-[1px]"></div>
                        <div className="absolute right-0 w-[1px] h-full bg-primary/30"></div>
                        <div className="absolute top-1/2 left-2 -translate-y-1/2 text-[8px] text-primary/40 rotate-90 font-black tracking-widest">COCKPIT</div>
                    </div>

                    {/* Fuselage / Main Cabin (Middle) */}
                    <div className="relative z-10 glass-morphism border-white/10 p-8 px-12 flex gap-8 flex-1 min-w-[700px] shadow-2xl">

                        {/* VIP Label Separator */}
                        <div className="absolute left-40 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-primary/40 to-transparent z-20">
                            <div className="absolute top-[-25px] left-1/2 -translate-x-1/2 text-[9px] font-black text-primary tracking-widest bg-[#05070A] px-2 whitespace-nowrap border border-primary/20 rounded">CABINA DIAMOND</div>
                        </div>

                        {/* Wings Decoration */}
                        <div className="absolute left-1/3 -top-32 w-64 h-32 bg-gradient-to-b from-transparent to-white/5 border-b border-white/10 -skew-x-[45deg] -z-10 opacity-50"></div>
                        <div className="absolute left-1/3 -bottom-32 w-64 h-32 bg-gradient-to-t from-transparent to-white/5 border-t border-white/10 skew-x-[45deg] -z-10 opacity-50"></div>

                        <div className="grid grid-flow-col grid-rows-5 gap-4 md:gap-5 flex-1 items-center">
                            {Array.from({ length: 8 }).map((_, col) => (
                                <React.Fragment key={col}>
                                    {/* Top Seats */}
                                    <SeatWrapper
                                        index={col * 4 + 0}
                                        isConfirmed={confirmedIndices.includes(col * 4 + 0)}
                                        data={getPassengerData(col * 4 + 0)}
                                        isVIP={col < 2}
                                    />
                                    <SeatWrapper
                                        index={col * 4 + 1}
                                        isConfirmed={confirmedIndices.includes(col * 4 + 1)}
                                        data={getPassengerData(col * 4 + 1)}
                                        isVIP={col < 2}
                                    />

                                    {/* Aisle */}
                                    <div className="flex items-center justify-center">
                                        <div className="w-full h-[1px] bg-white/10 aisle-line relative">
                                            {col === 0 && <div className="absolute left-0 -top-1 font-mono text-[7px] text-white/20">GALLEY</div>}
                                        </div>
                                    </div>

                                    {/* Bottom Seats */}
                                    <SeatWrapper
                                        index={col * 4 + 2}
                                        isConfirmed={confirmedIndices.includes(col * 4 + 2)}
                                        data={getPassengerData(col * 4 + 2)}
                                        isVIP={col < 2}
                                    />

                                    {col * 4 + 3 < totalSeats ? (
                                        <SeatWrapper
                                            index={col * 4 + 3}
                                            isConfirmed={confirmedIndices.includes(col * 4 + 3)}
                                            data={getPassengerData(col * 4 + 3)}
                                            isVIP={col < 2}
                                        />
                                    ) : (
                                        <div className="w-10 h-10 md:w-12 md:h-12 opacity-0" />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Tail Section (Right) */}
                    <div className="relative w-32 h-56 flex items-center flex-shrink-0">
                        <div className="absolute left-0 w-24 h-48 bg-white/5 border-y border-r border-white/10 rounded-r-3xl flex items-center justify-end pr-4">
                            <div className="text-[10px] font-black text-white/10 rotate-90 tracking-[0.5em]">CARGO</div>
                            {/* Tail Fins */}
                            <div className="absolute -top-16 right-0 w-16 h-16 bg-white/5 border-t border-r border-white/10 -skew-y-[45deg] shadow-lg"></div>
                            <div className="absolute -bottom-16 right-0 w-16 h-16 bg-white/5 border-b border-r border-white/10 skew-y-[45deg] shadow-lg"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-center gap-12 text-[10px] uppercase tracking-[0.3em] text-dim font-bold">
                <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded bg-primary shadow-[0_0_15px_rgba(212,175,55,0.7)] seat-confirmed"></div>
                    <span>Reservado</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-md border-2 border-primary/40 bg-primary/5">
                        <Star size={10} className="mx-auto mt-0.5 text-primary opacity-50" />
                    </div>
                    <span>Cabina Diamond</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded bg-white/5 border border-white/10"></div>
                    <span>Disponible</span>
                </div>
            </div>
        </div>
    );
};

const SeatWrapper = ({ index, isConfirmed, data, isVIP }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.01 }}
            className="group relative"
        >
            <div className={`
        w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-500 cursor-default
        ${isConfirmed
                    ? 'bg-primary shadow-[0_0_20px_rgba(212,175,55,0.5)] border-primary seat-confirmed'
                    : `bg-white/5 border ${isVIP ? 'border-primary/30' : 'border-white/10'} hover:border-primary/50`
                }
      `}>
                {isConfirmed ? (
                    <User size={20} className="text-black" />
                ) : (
                    isVIP ? (
                        <Star size={12} className="text-primary/30 group-hover:text-primary transition-colors" />
                    ) : (
                        <span className="text-[9px] text-white/5 font-mono group-hover:text-white/40 transition-colors">{index + 1}</span>
                    )
                )}
            </div>

            {isConfirmed && (
                <div className="absolute -top-1 -right-1 z-30">
                    <CheckCircle2 size={14} className="text-white fill-green-500 rounded-full" />
                </div>
            )}

            {isConfirmed && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 p-4 glass-morphism text-[11px] w-40 opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50 shadow-[0_25px_50px_rgba(0,0,0,0.8)] border-primary/30">
                    <div className="text-primary font-black uppercase tracking-widest border-b border-white/10 pb-2 mb-2 flex justify-between items-center">
                        {data.name}
                        <Star size={10} className="fill-primary text-primary" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                            <span className="text-white/50 text-[9px] uppercase">Procedencia</span>
                            <span className="text-white font-bold">{data.country}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-white/50 text-[9px] uppercase">Estatus</span>
                            <span className="text-primary/80 font-black">{data.type}</span>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
}

export default PlaneVisual;
