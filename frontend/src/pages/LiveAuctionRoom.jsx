import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Gavel, Users, Clock, TrendingUp, Shield,
  ArrowUp, Zap, Info, MapPin, Trophy, MessageSquare
} from "lucide-react"

export default function LiveAuctionRoom() {
  const [bids, setBids] = useState([
    { id: 1, user: "Ravi S.", amount: 26500, time: "2 mins ago" },
    { id: 2, user: "Komal P.", amount: 26200, time: "5 mins ago" },
    { id: 3, user: "Amit V.", amount: 25800, time: "8 mins ago" },
  ])
  const [currentBid, setCurrentBid] = useState(26500)
  const [bidAmount, setBidAmount] = useState(currentBid + 500)

  const placeBid = () => {
    if (bidAmount <= currentBid) return
    setCurrentBid(bidAmount)
    setBids([{ id: Date.now(), user: "You", amount: bidAmount, time: "Just now" }, ...bids])
    setBidAmount(bidAmount + 500)
  }

  return (
    <div className="min-h-screen bg-[#020603] text-gray-200 p-6 md:p-10 font-sans selection:bg-green-glow/30 overflow-hidden relative">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-green-glow/[0.03] blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] bg-blue-500/[0.02] blur-[120px] rounded-full" />
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10 flex flex-col h-full">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-glow to-green-600 flex items-center justify-center shadow-2xl shadow-green-glow/20">
              <Gavel size={26} className="text-bg-void" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tighter leading-none mb-2">
                Live Auction: <span className="text-green-glow">Basmati Gold Batch #29</span>
              </h1>
              <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-500">
                <span className="flex items-center gap-1.5 px-3 py-1 bg-red-500/10 text-red-500 border border-red-500/20 rounded-full leading-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> Live
                </span>
                <span className="flex items-center gap-1.5">
                  <Users size={14} className="text-gray-600" /> 18 Active Bidders
                </span>
                <span>• Mandi: Punjab West</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8 bg-white/[0.03] border border-white/10 px-8 py-4 rounded-[2rem] backdrop-blur-3xl shadow-2xl">
            <div className="text-center">
              <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-1">Time Left</p>
              <p className="text-2xl font-black text-amber-500 tabular-nums">14:52:08</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <button className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-all">
              Cancel & Exit
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 flex-1 min-h-0">
          {/* Main Display */}
          <div className="flex flex-col gap-8 min-h-0">
            {/* Hero Visualization Area */}
            <div className="bg-bg-card rounded-[3rem] border border-white/5 p-10 relative overflow-hidden flex-1 flex flex-col justify-center min-h-[400px]">
               <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
               <div className="relative z-10 grid md:grid-cols-[1fr_auto_1fr] items-center gap-12">
                  <div className="space-y-8">
                     <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-3 text-center md:text-left">Official Lot Grade</p>
                        <div className="flex items-center justify-center md:justify-start gap-4">
                           <div className="w-16 h-16 rounded-3xl bg-green-glow/5 border border-green-glow/20 flex items-center justify-center text-green-glow shadow-inner">
                              <Shield size={32} />
                           </div>
                           <div>
                              <p className="text-3xl font-black text-white">Class A+</p>
                              <p className="text-sm font-bold text-green-glow italic tracking-wide">Purity Verified</p>
                           </div>
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                           <p className="text-[10px] uppercase font-bold text-gray-600 mb-1">Weight</p>
                           <p className="text-lg font-black text-gray-200 leading-none">450 Qtl</p>
                        </div>
                        <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                           <p className="text-[10px] uppercase font-bold text-gray-600 mb-1">Moisture</p>
                           <p className="text-lg font-black text-gray-200 leading-none">12.5%</p>
                        </div>
                     </div>
                  </div>

                  <div className="hidden md:block w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />

                  <div className="text-center space-y-4">
                     <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.3em] mb-4">Current Valuation</p>
                     <motion.h2 
                        key={currentBid}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-7xl font-black text-white tabular-nums tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                     >
                        ₹{currentBid.toLocaleString()}
                     </motion.h2>
                     <p className="text-sm font-black text-gray-600 uppercase tracking-widest">+ ₹500 Min Increment</p>
                     <div className="pt-8">
                        <div className="inline-flex items-center gap-3 px-6 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 font-black text-xs uppercase tracking-tighter">
                           <Info size={14} /> Global Market Avg: ₹25,800
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Bottom Panels */}
            <div className="grid md:grid-cols-2 gap-6 pb-12">
               <div className="bg-bg-card rounded-[2.5rem] p-8 border border-white/5 flex items-center justify-between group cursor-help">
                  <div>
                    <h4 className="text-sm font-black text-white mb-1 tracking-tight">Price Protection</h4>
                    <p className="text-xs text-gray-500 font-medium">Escrow services enabled for this lot</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-blue-400 transition-colors">
                    <Shield size={20} />
                  </div>
               </div>
               <div className="bg-bg-card rounded-[2.5rem] p-8 border border-white/5 flex items-center justify-between group cursor-pointer hover:border-amber-500/30 transition-all">
                  <div>
                    <h4 className="text-sm font-black text-white mb-1 tracking-tight">Auto-Bid Engine</h4>
                    <p className="text-xs text-gray-500 font-medium">Click to configure automated bidding</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-amber-500 transition-colors">
                    <Zap size={20} />
                  </div>
               </div>
            </div>
          </div>

          {/* Right Column: Bidding Console */}
          <div className="flex flex-col gap-8">
            <div className="bg-bg-card border-2 border-green-glow rounded-[3rem] p-8 flex flex-col shadow-[0_0_60px_rgba(0,255,136,0.1)] relative">
               <div className="absolute top-0 right-10 -translate-y-1/2 px-4 py-1.5 bg-green-glow rounded-full text-[10px] font-black uppercase text-bg-void shadow-lg animate-pulse">
                High Stakes
               </div>

               <div className="mb-10 text-center">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">Your Position</p>
                  <div className="text-gray-400 font-bold text-sm bg-white/5 rounded-2xl py-3 px-6 mb-8 inline-block border border-white/5">
                    Logged in as <span className="text-white">Dealer #829</span>
                  </div>
                  
                  <div className="flex items-center justify-center gap-6 mb-8 group">
                    <button onClick={() => setBidAmount(bidAmount - 500)} className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white hover:bg-white/10 active:scale-95 transition-all text-2xl font-black">
                      -
                    </button>
                    <div className="text-4xl font-black text-white px-2 tabular-nums tracking-tighter group-hover:scale-110 transition-transform">
                      ₹{bidAmount.toLocaleString()}
                    </div>
                    <button onClick={() => setBidAmount(bidAmount + 500)} className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white hover:bg-white/10 active:scale-95 transition-all text-2xl font-black">
                      +
                    </button>
                  </div>

                  <button 
                    onClick={placeBid}
                    className="w-full bg-gradient-to-r from-green-glow to-green-500 py-6 rounded-[1.5rem] shadow-xl shadow-green-glow/20 text-bg-void font-black text-lg tracking-tight hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                  >
                    <ArrowUp size={20} /> Place High Bid
                  </button>
               </div>

               <div className="flex-1 min-h-0 flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-black text-sm uppercase tracking-widest text-white">Live Activity</h3>
                    <div className="w-2 h-2 rounded-full bg-green-glow animate-ping" />
                  </div>
                  <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar">
                     <AnimatePresence>
                        {bids.map((bid, i) => (
                          <motion.div 
                            key={bid.id}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
                              i === 0 ? "bg-green-glow/10 border-green-glow/30" : "bg-white/[0.02] border-white/5"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                               <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${
                                 i === 0 ? "bg-green-glow text-bg-void shadow-lg shadow-green-glow/30" : "bg-white/5 text-gray-400"
                               }`}>
                                 {bid.user[0]}
                               </div>
                               <div>
                                  <p className="text-xs font-bold text-white leading-none mb-1">{bid.user}</p>
                                  <p className="text-[10px] font-bold text-gray-500 uppercase">{bid.time}</p>
                               </div>
                            </div>
                            <div className={`font-black text-sm tabular-nums ${i === 0 ? "text-green-glow" : "text-white"}`}>
                               ₹{bid.amount.toLocaleString()}
                            </div>
                          </motion.div>
                        ))}
                     </AnimatePresence>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
      `}</style>
    </div>
  )
}
