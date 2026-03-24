import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  TrendingUp, TrendingDown, Search, ArrowUpRight,
  RefreshCw, MapPin, Calendar, Info, Wheat,
  Bean, Coffee, Apple, ArrowRight
} from "lucide-react"

const mockData = [
  { id: 1, name: "Premium Wheat", price: 2450, unit: "Quintal", trend: "+4.2%", up: true, category: "Grains" },
  { id: 2, name: "Basmati Rice", price: 6800, unit: "Quintal", trend: "-2.1%", up: false, category: "Grains" },
  { id: 3, name: "Red Onions", price: 1800, unit: "Quintal", trend: "+12.5%", up: true, category: "Vegetables" },
  { id: 4, name: "Golden Potatoes", price: 1200, unit: "Quintal", trend: "-1.4%", up: false, category: "Vegetables" },
  { id: 5, name: "Cotton (Long)", price: 7200, unit: "Quintal", trend: "+3.8%", up: true, category: "Cash Crops" },
  { id: 6, name: "Soybean", price: 4600, unit: "Quintal", trend: "+0.5%", up: true, category: "Oilseeds" },
]

export default function MarketPrice() {
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState("All")
  const [search, setSearch] = useState("")

  const categories = ["All", "Grains", "Vegetables", "Cash Crops", "Oilseeds"]

  const filteredPrices = mockData.filter(p => 
    (filter === "All" || p.category === filter) &&
    (p.name.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-bg-void text-gray-200 p-8 pb-20 font-sans relative overflow-hidden">
      {/* Animated Background Artifacts */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(0,255,136,0.05),transparent_60%)]" />
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-green-glow/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.header 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-green-glow/10 text-green-glow px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.1em] border border-green-glow/20">
              Live Mandi Updates
            </span>
            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <Calendar size={14} /> Last Scan: Today, 11:45 AM
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter mb-4 max-w-3xl leading-none">
            Mandi Price <span className="text-green-glow animate-pulse">Intelligence</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-xl">
            Hyper-local APMC data powered by real-time mandi feeds across 28 states.
          </p>
        </motion.header>

        {/* Filters/Search Row */}
        <div className="flex flex-col lg:flex-row gap-6 items-center mb-12 bg-white/[0.02] border border-white/5 p-4 rounded-[2rem] backdrop-blur-3xl">
          <div className="relative flex-1 w-full">
            <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              placeholder="Search by commodity name..." 
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-sm font-medium focus:border-green-glow/50 transition-all outline-none text-white shadow-inner"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            {categories.map(c => (
              <button 
                key={c} 
                onClick={() => setFilter(c)}
                className={`px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                  filter === c 
                    ? "bg-green-glow text-bg-void border-green-glow shadow-lg shadow-green-glow/20 scale-105" 
                    : "bg-white/[0.03] text-gray-400 border-white/10 hover:bg-white/5 hover:text-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredPrices.map((p, i) => (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="bg-bg-card border border-white/5 rounded-[2.5rem] p-8 hover:border-green-glow/30 transition-all duration-500 group relative overflow-hidden cursor-pointer"
              >
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                   <ArrowUpRight className="text-green-glow" size={24} />
                </div>
                
                <div className="flex justify-between items-start mb-8">
                   <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:bg-green-glow/10 group-hover:border-green-glow/20 transition-all duration-500 shadow-xl">
                      <Wheat className="text-green-glow group-hover:scale-110 transition-transform" />
                   </div>
                   <div className={`px-3 py-1.5 rounded-xl font-bold text-[10px] uppercase tracking-widest flex items-center gap-1.5 ${
                     p.up ? "text-green-400 bg-green-500/10" : "text-red-400 bg-red-500/10"
                   }`}>
                     {p.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                     {p.trend}
                   </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-green-glow transition-colors">{p.name}</h3>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-8">{p.category} • Avg Mandi Price</p>

                <div className="flex items-baseline gap-2 mb-10">
                   <span className="text-5xl font-extrabold text-white tracking-tighter group-hover:scale-105 transition-transform inline-block">₹{p.price}</span>
                   <span className="text-gray-500 font-bold text-sm uppercase tracking-widest">/ {p.unit}</span>
                </div>

                <div className="pt-6 border-t border-white/[0.05] flex justify-between items-center text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                  <div className="flex items-center gap-2 font-semibold">
                    <MapPin size={14} className="text-gray-600" /> Regional Hub: Indore
                  </div>
                  <div className="flex items-center gap-1 font-bold group-hover:text-green-glow">
                    Analytics <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
