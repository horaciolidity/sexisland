import React from 'react';
import { motion } from 'framer-motion';
import { User, CheckCircle2, Star } from 'lucide-react';

const PlaneVisual = () => {
    const totalSeats = 30;

    // Confirmed passengers redistributed to the back (Indices 8 to 29)
    const confirmedIndices = [12, 13, 16, 17, 24, 25, 29];

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
                type: "Platinum Member"
            };
        }
        return null;
    };

    return (
        <div className="relative w-full max-w-6xl mx-auto px-4 overflow-hidden py-10">
            <div className="text-center mb-16 relative z-20">
                <div className="inline-flex items-center gap-6 glass-morphism px-8 py-3 border-primary/20 rounded-2xl">
                    <div className="flex flex-col items-center">
                        <span className="text-[9px] font-black tracking-[0.4em] uppercase text-primary/60 mb-1">Status</span>
                        <span className="text-xl font-black flex items-center gap-2">
                            7 <span className="text-[10px] font-light text-dim uppercase tracking-tighter">Reservados</span>
                        </span>
                    </div>
                    <div className="w-[1px] h-10 bg-white/10"></div>
                    <div className="flex flex-col items-center">
                        <span className="text-[9px] font-black tracking-[0.4em] uppercase text-primary/60 mb-1">Disponibilidad</span>
                        <span className="text-xl font-black flex items-center gap-2 text-primary">
                            23 <span className="text-[10px] font-light text-dim uppercase tracking-tighter">Asientos</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* Horizontal Plane Container with Scroll for Mobile */}
            <div className="overflow-x-auto pb-24 mask-fade-edges custom-scrollbar">
                <div className="relative flex items-center justify-center min-w-[900px] mx-auto py-24 px-12">

                    {/* Plane Nose (Left) */}
                    <div className="relative w-40 h-64 bg-white/5 border border-white/10 rounded-l-full flex items-center justify-center overflow-hidden flex-shrink-0 shadow-[inset_20px_0_40px_rgba(255,255,255,0.02)]">
                        <div className="absolute left-8 w-20 h-36 bg-cyan-500/5 rounded-l-full border-l border-cyan-500/20 blur-[2px]"></div>
                        <div className="absolute right-0 w-[1px] h-full bg-primary/30"></div>
                        <div className="absolute top-1/2 left-4 -translate-y-1/2 text-[10px] text-primary/40 rotate-90 font-black tracking-[0.8em]">COCKPIT</div>

                        {/* Cockpit Glow */}
                        <div className="absolute left-4 w-4 h-4 rounded-full bg-cyan-500/20 blur-xl animate-pulse"></div>
                    </div>

                    {/* Fuselage / Main Cabin (Middle) */}
                    <div className="relative z-10 glass-morphism border-white/10 p-12 px-16 flex gap-12 flex-1 min-w-[750px] shadow-2xl rounded-none">

                        {/* VIP Label Separator */}
                        <div className="absolute left-48 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-primary/30 to-transparent z-20">
                            <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 text-[9px] font-black text-primary/40 tracking-[0.6em] whitespace-nowrap bg-[#05070A] px-4 uppercase">First Class Zone</div>
                        </div>

                        {/* Wings Decoration - More Industrial Luxury */}
                        <div className="absolute left-[20%] -top-40 w-80 h-40 bg-gradient-to-br from-transparent to-white/5 border-b border-r border-white/10 -skew-x-[45deg] -z-10 opacity-30"></div>
                        <div className="absolute left-[20%] -bottom-40 w-80 h-40 bg-gradient-to-tr from-transparent to-white/5 border-t border-r border-white/10 skew-x-[45deg] -z-10 opacity-30"></div>

                        <div className="grid grid-flow-col grid-rows-5 gap-6 md:gap-7 flex-1 items-center relative z-20">
                            {Array.from({ length: 8 }).map((_, col) => (
                                <React.Fragment key={col}>
                                    {/* Top Seats */}
                                    <SeatWrapper
                                        index={col * 4 + 0}
                                        isConfirmed={confirmedIndices.includes(col * 4 + 0)}
                                        data={getPassengerData(col * 4 + 0)}
                                        isVIP={col < 2}
                                        tooltipDir="down"
                                    />
                                    <SeatWrapper
                                        index={col * 4 + 1}
                                        isConfirmed={confirmedIndices.includes(col * 4 + 1)}
                                        data={getPassengerData(col * 4 + 1)}
                                        isVIP={col < 2}
                                        tooltipDir="down"
                                    />

                                    {/* Aisle - More detailed */}
                                    <div className="flex items-center justify-center py-2 h-full">
                                        <div className="w-full h-[2px] bg-gradient-to-r from-white/5 via-white/10 to-white/5 relative flex items-center">
                                            {col === 0 && (
                                                <div className="absolute -top-4 left-0 text-[7px] font-black text-white/20 tracking-widest uppercase">
                                                    Galley / Service
                                                </div>
                                            )}
                                            <div className="w-full h-full opacity-50 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:4px_4px]"></div>
                                        </div>
                                    </div>

                                    {/* Bottom Seats */}
                                    <SeatWrapper
                                        index={col * 4 + 2}
                                        isConfirmed={confirmedIndices.includes(col * 4 + 2)}
                                        data={getPassengerData(col * 4 + 2)}
                                        isVIP={col < 2}
                                        tooltipDir="up"
                                    />

                                    {col * 4 + 3 < totalSeats ? (
                                        <SeatWrapper
                                            index={col * 4 + 3}
                                            isConfirmed={confirmedIndices.includes(col * 4 + 3)}
                                            data={getPassengerData(col * 4 + 3)}
                                            isVIP={col < 2}
                                            tooltipDir="up"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 opacity-0" />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Tail Section (Right) */}
                    <div className="relative w-40 h-64 flex items-center flex-shrink-0">
                        <div className="absolute left-0 w-32 h-56 bg-white/5 border-y border-r border-white/10 rounded-r-3xl flex items-center justify-end pr-8">
                            <div className="text-[12px] font-black text-white/10 rotate-90 tracking-[0.8em] flex flex-col items-center">
                                <span>CARGO</span>
                                <span className="text-[8px] font-light mt-2 tracking-widest">JET-S700</span>
                            </div>
                            {/* Tail Fins */}
                            <div className="absolute -top-24 right-0 w-24 h-24 bg-white/5 border-t border-r border-white/10 -skew-y-[45deg] shadow-2xl"></div>
                            <div className="absolute -bottom-24 right-0 w-24 h-24 bg-white/5 border-b border-r border-white/10 skew-y-[45deg] shadow-2xl"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-12 text-[9px] uppercase tracking-[0.4em] text-dim font-black">
                <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-lg bg-primary shadow-[0_0_20px_rgba(212,175,55,0.6)] flex items-center justify-center">
                        <User size={12} className="text-black" />
                    </div>
                    <span>Miembro Confirmado</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-lg border-2 border-primary/40 bg-primary/10 flex items-center justify-center">
                        <Star size={10} className="text-primary opacity-70" />
                    </div>
                    <span>Cabina Diamond (Libre)</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-lg bg-white/5 border border-white/10"></div>
                    <span>Disponible</span>
                </div>
            </div>
        </div>
    );
};

const SeatWrapper = ({ index, isConfirmed, data, isVIP, tooltipDir = "up" }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.01, duration: 0.5 }}
            className="group relative"
        >
            <div className={`
        w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all duration-700 cursor-pointer relative z-30
        ${isConfirmed
                    ? 'bg-primary shadow-[0_0_30px_rgba(212,175,55,0.4)] border-primary'
                    : `bg-white/5 border ${isVIP ? 'border-primary/40 animate-pulse-slow' : 'border-white/10'} hover:border-primary/60`
                }
      `}>
                {isConfirmed ? (
                    <User size={24} className="text-black" />
                ) : (
                    isVIP ? (
                        <div className="relative group-hover:scale-110 transition-transform">
                            <Star size={16} className="text-primary/50 group-hover:text-primary transition-colors duration-500" />
                            <div className="absolute -inset-2 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        </div>
                    ) : (
                        <span className="text-[10px] text-white/10 font-black group-hover:text-white/60 transition-colors uppercase tracking-widest">{index + 1}</span>
                    )
                )}
            </div>

            {isConfirmed && (
                <div className="absolute -top-1 -right-1 z-40">
                    <CheckCircle2 size={16} className="text-white fill-green-500 rounded-full shadow-lg" />
                </div>
            )}

            {/* Professional Tooltip Info */}
            {isConfirmed && (
                <div className={`
          absolute left-1/2 -translate-x-1/2 p-6 glass-morphism text-[11px] w-52 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-[1000] shadow-[0_30px_60px_-10px_rgba(0,0,0,0.9)] border-primary/40
          ${tooltipDir === 'up' ? 'bottom-full mb-6' : 'top-full mt-6'}
        `}>
                    <div className="absolute inset-0 bg-primary/5 -z-10"></div>
                    <div className="text-primary font-black uppercase tracking-[0.2em] border-b border-primary/20 pb-3 mb-4 flex justify-between items-center text-xs">
                        {data.name}
                        <Star size={12} className="fill-primary text-primary shadow-glow" />
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center bg-white/5 p-2 rounded-lg">
                            <span className="text-white/40 text-[9px] uppercase font-bold tracking-widest">Región</span>
                            <span className="text-white font-black">{data.country}</span>
                        </div>
                        <div className="flex justify-between items-center bg-primary/5 p-2 rounded-lg border border-primary/10">
                            <span className="text-primary/60 text-[9px] uppercase font-bold tracking-widest">Estatus</span>
                            <span className="text-primary font-black uppercase tracking-tighter">{data.type}</span>
                        </div>
                    </div>

                    {/* Tooltip Corner/Pointer */}
                    <div className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-inherit border-inherit rotate-45 -z-10 ${tooltipDir === 'up' ? '-bottom-2 border-b border-r' : '-top-2 border-t border-l'}`}></div>
                </div>
            )}
        </motion.div>
    );
}

export default PlaneVisual;
