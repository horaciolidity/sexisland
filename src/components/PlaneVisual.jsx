import React from 'react';
import { motion } from 'framer-motion';
import { User, CheckCircle2 } from 'lucide-react';

const PlaneVisual = () => {
    // 30 seats total arranged in a cabin layout
    // Layout: Rows of 2-2 (4 seats per row) for a luxury charter feel
    // 7 rows of 4 = 28 + 2 seats at the very end = 30
    const seats = Array.from({ length: 30 });

    // Confirmed passengers:
    // 1. Group of 5 friends (occupying two rows together near the front)
    const groupIndices = [4, 5, 8, 9, 10]; // Grouped in rows 2 and 3
    // 2. One lone passenger at the very back
    const soloIndex = 29;

    const confirmedIndices = [...groupIndices, soloIndex];

    const getPassengerData = (index) => {
        if (groupIndices.includes(index)) {
            return { name: `Grupo Elite #${groupIndices.indexOf(index) + 1}`, country: "Miami, USA", type: "Diamond Group" };
        }
        if (index === soloIndex) {
            return { name: "A. Müller", country: "Germany", type: "Platinum Solo" };
        }
        return null;
    };

    return (
        <div className="mt-12 relative w-full max-w-xl mx-auto py-20 px-4">
            <div className="text-center mb-8">
                <h4 className="text-primary font-black text-xs tracking-[0.3em] uppercase mb-2">Cabin Manifest</h4>
                <div className="text-2xl font-bold flex items-center justify-center gap-3">
                    <span className="text-primary">6</span>
                    <span className="text-dim text-sm font-light uppercase tracking-widest">/ 30 Seats Reserved</span>
                </div>
            </div>

            {/* Plane Container */}
            <div className="relative mx-auto w-64 md:w-72">
                {/* Plane Nose */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-40 h-24 bg-white/5 border border-white/10 rounded-t-full flex items-center justify-center">
                    <div className="w-24 h-1 bg-primary/20 rounded-full blur-sm"></div>
                    <div className="absolute top-4 w-12 h-6 bg-cyan-500/10 rounded-t-xl border-t border-cyan-500/20"></div> {/* Cockpit window */}
                </div>

                {/* Fuselage / Main Cabin */}
                <div className="relative z-10 glass-morphism border-white/10 p-6 flex flex-col gap-4 rounded-b-3xl">
                    {/* Wings (Visual only) */}
                    <div className="absolute -left-20 top-1/4 w-20 h-40 bg-gradient-to-r from-transparent to-white/5 border-r border-white/10 skew-y-[45deg] -z-10"></div>
                    <div className="absolute -right-20 top-1/4 w-20 h-40 bg-gradient-to-l from-transparent to-white/5 border-l border-white/10 -skew-y-[45deg] -z-10"></div>

                    {/* Seating Layout: 2 - space - 2 */}
                    <div className="grid grid-cols-5 gap-2 md:gap-3">
                        {seats.map((_, i) => {
                            const isAisle = (i + 1) % 5 === 3; // Theoretical aisle but we have 30 seats, let's just do a 2-2 grid logic
                            // Better logic for 30 seats: 7 rows of 4 (28) plus 2 at the back
                            // Let's use a simple grid and skip the middle column for an aisle

                            // Map index to a 5-column grid where middle is aisle
                            // Row 0: 0, 1, (aisle), 2, 3
                            // Row 1: 4, 5, (aisle), 6, 7
                            // ...
                            const rowIndex = Math.floor(i / 4);
                            const seatPosInRow = i % 4;
                            const actualGridIndex = rowIndex * 5 + (seatPosInRow >= 2 ? seatPosInRow + 1 : seatPosInRow);

                            if (i >= 30) return null;

                            return null; // Initialized mapping below
                        })}

                        {/* Manual grid for better control of the "Plane" feel */}
                        {Array.from({ length: 8 }).map((_, r) => (
                            <React.Fragment key={r}>
                                {/* Left side */}
                                {[0, 1].map(c => {
                                    const seatIdx = r * 4 + c;
                                    if (seatIdx >= 30) return <div key={`empty-${c}`} />;
                                    return <Seat key={seatIdx} index={seatIdx} isConfirmed={confirmedIndices.includes(seatIdx)} data={getPassengerData(seatIdx)} />;
                                })}
                                {/* Aisle */}
                                <div className="w-4 h-8 flex justify-center">
                                    <div className="w-[1px] h-full bg-white/5"></div>
                                </div>
                                {/* Right side */}
                                {[2, 3].map(c => {
                                    const seatIdx = r * 4 + c;
                                    if (seatIdx >= 30) return <div key={`empty-${c}`} />;
                                    return <Seat key={seatIdx} index={seatIdx} isConfirmed={confirmedIndices.includes(seatIdx)} data={getPassengerData(seatIdx)} />;
                                })}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Tail Section Visual */}
                    <div className="mt-8 pt-8 border-t border-white/5 flex flex-col items-center">
                        <div className="w-16 h-12 bg-white/5 border-x border-b border-white/10 rounded-b-xl relative">
                            <div className="absolute -left-10 bottom-0 w-10 h-6 bg-white/5 border-l border-b border-white/10 -skew-x-[45deg]"></div>
                            <div className="absolute -right-10 bottom-0 w-10 h-6 bg-white/5 border-r border-b border-white/10 skew-x-[45deg]"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12 flex justify-center gap-8 text-[10px] uppercase tracking-widest text-dim font-bold">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-primary shadow-[0_0_8px_rgba(212,175,55,0.6)]"></div>
                    <span>OCUPADO</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-white/5 border border-white/10"></div>
                    <span>DISPONIBLE</span>
                </div>
            </div>
        </div>
    );
};

const Seat = ({ index, isConfirmed, data }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.01 }}
        className="group relative"
    >
        <div className={`
      aspect-square rounded-md flex items-center justify-center transition-all duration-300
      ${isConfirmed ? 'bg-primary shadow-[0_0_12px_rgba(212,175,55,0.5)] border-primary' : 'bg-white/5 border border-white/10 hover:border-white/30'}
    `}>
            {isConfirmed ? (
                <User size={14} className="text-black" />
            ) : (
                <span className="text-[8px] text-white/10 font-mono group-hover:text-white/40 transition-colors">{index + 1}</span>
            )}
        </div>

        {isConfirmed && (
            <div className="absolute -top-1 -right-1">
                <CheckCircle2 size={10} className="text-white fill-green-500 rounded-full" />
            </div>
        )}

        {isConfirmed && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 glass-morphism text-[9px] w-28 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-2xl">
                <div className="text-primary font-bold border-b border-white/10 pb-1 mb-1">{data.name}</div>
                <div className="flex justify-between items-center text-white/60">
                    <span>{data.country}</span>
                    <span className="text-primary/80 font-mono">OK</span>
                </div>
            </div>
        )}
    </motion.div>
);

export default PlaneVisual;
