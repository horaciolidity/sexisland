import React from 'react';
import { motion } from 'framer-motion';
import { User, CheckCircle2 } from 'lucide-react';

const PlaneVisual = () => {
    // 30 seats total arranged in a horizontal cabin layout
    const seats = Array.from({ length: 30 });

    // Confirmed passengers indices (0-29)
    const groupIndices = [0, 1, 4, 5, 8];
    const soloIndex = 29;
    const confirmedIndices = [...groupIndices, soloIndex];

    const getPassengerData = (index) => {
        if (groupIndices.includes(index)) {
            return { name: `Elite Traveler #${groupIndices.indexOf(index) + 1}`, country: "Miami, USA", type: "Diamond Group" };
        }
        if (index === soloIndex) {
            return { name: "A. Müller", country: "Germany", type: "Platinum Solo" };
        }
        return null;
    };

    return (
        <div className="mt-12 relative w-full max-w-5xl mx-auto py-12 px-4">
            <div className="text-center mb-10">
                <h4 className="text-primary font-black text-[10px] tracking-[0.4em] uppercase mb-2">Exclusive Cabin Manifest</h4>
                <div className="text-3xl font-bold flex items-center justify-center gap-4">
                    <span className="text-primary">6</span>
                    <span className="text-dim text-xs font-light uppercase tracking-[0.2em]">/ 30 Seats Confirmed</span>
                </div>
            </div>

            {/* Horizontal Plane Container with Scroll for Mobile */}
            <div className="overflow-x-auto pb-8 mask-fade-edges">
                <div className="relative flex items-center justify-center min-w-[700px] md:min-w-fit mx-auto">

                    {/* Plane Nose (Left) */}
                    <div className="relative w-24 h-48 bg-white/5 border border-white/10 rounded-l-full flex items-center justify-center overflow-hidden flex-shrink-0">
                        <div className="absolute left-4 w-12 h-24 bg-cyan-500/5 rounded-l-full border-l border-cyan-500/20"></div>
                        <div className="absolute right-0 w-[1px] h-full bg-primary/20"></div>
                    </div>

                    {/* Fuselage / Main Cabin (Middle) */}
                    <div className="relative z-10 glass-morphism border-white/10 p-6 px-10 flex gap-4 min-w-[300px] md:min-w-[500px]">
                        {/* Wings */}
                        <div className="absolute left-1/4 -top-24 w-40 h-24 bg-gradient-to-b from-transparent to-white/5 border-b border-white/10 -skew-x-[45deg] -z-10"></div>
                        <div className="absolute left-1/4 -bottom-24 w-40 h-24 bg-gradient-to-t from-transparent to-white/5 border-t border-white/10 skew-x-[45deg] -z-10"></div>

                        <div className="grid grid-flow-col grid-rows-5 gap-3 md:gap-4 flex-1">
                            {Array.from({ length: 8 }).map((_, col) => (
                                <React.Fragment key={col}>
                                    <SeatWrapper index={col * 4 + 0} isConfirmed={confirmedIndices.includes(col * 4 + 0)} data={getPassengerData(col * 4 + 0)} />
                                    <SeatWrapper index={col * 4 + 1} isConfirmed={confirmedIndices.includes(col * 4 + 1)} data={getPassengerData(col * 4 + 1)} />
                                    <div className="flex items-center justify-center"><div className="w-full h-[1px] bg-white/5 aisle-line"></div></div>
                                    <SeatWrapper index={col * 4 + 2} isConfirmed={confirmedIndices.includes(col * 4 + 2)} data={getPassengerData(col * 4 + 2)} />
                                    <SeatWrapper index={col * 4 + 3} isConfirmed={confirmedIndices.includes(col * 4 + 3)} data={getPassengerData(col * 4 + 3)} />
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Tail Section (Right) */}
                    <div className="relative w-24 h-48 flex items-center flex-shrink-0">
                        <div className="absolute left-0 w-16 h-40 bg-white/5 border-y border-r border-white/10 rounded-r-2xl">
                            <div className="absolute -top-12 right-0 w-12 h-12 bg-white/5 border-t border-r border-white/10 -skew-y-[45deg]"></div>
                            <div className="absolute -bottom-12 right-0 w-12 h-12 bg-white/5 border-b border-r border-white/10 skew-y-[45deg]"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-center gap-12 text-[10px] uppercase tracking-[0.3em] text-dim font-bold">
                <div className="flex items-center gap-3"><div className="w-4 h-4 rounded bg-primary shadow-[0_0_12px_rgba(212,175,55,0.6)] seat-confirmed"></div><span>Reserved</span></div>
                <div className="flex items-center gap-3"><div className="w-4 h-4 rounded bg-white/5 border border-white/10"></div><span>Available</span></div>
            </div>
        </div>
    );
};

const SeatWrapper = ({ index, isConfirmed, data }) => {
    if (index >= 30) return <div className="opacity-0 w-8 md:w-10" />;

    return (
        <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.01 }} className="group relative">
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${isConfirmed ? 'bg-primary shadow-[0_0_15px_rgba(212,175,55,0.4)] border-primary seat-confirmed' : 'bg-white/5 border border-white/10 hover:border-white/30'}`}>
                {isConfirmed ? <User size={16} className="text-black" /> : <span className="text-[8px] text-white/5 font-mono group-hover:text-white/30 transition-colors">{index + 1}</span>}
            </div>
            {isConfirmed && <div className="absolute -top-1 -right-1"><CheckCircle2 size={12} className="text-white fill-green-500 rounded-full" /></div>}
            {isConfirmed && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 p-3 glass-morphism text-[10px] w-32 opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50 shadow-2xl border-primary/20">
                    <div className="text-primary font-black uppercase tracking-tighter border-b border-white/10 pb-1 mb-2">{data.name}</div>
                    <div className="flex justify-between items-center text-white/70"><span>{data.country}</span><span className="bg-primary/20 text-primary px-1 rounded text-[8px]">{data.type.split(' ')[0]}</span></div>
                </div>
            )}
        </motion.div>
    );
}

export default PlaneVisual;
