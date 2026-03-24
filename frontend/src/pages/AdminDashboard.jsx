import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard, Users, Gavel, Settings,
  TrendingUp, CheckCircle, Shield, AlertTriangle,
  ArrowUpRight, RefreshCw, Search, Filter,
  MoreVertical, Activity, Database, Bell, Power,
  Wheat, TrendingDown
} from "lucide-react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [loading, setLoading] = useState(false)

  const stats = [
    { label: "Total Users", value: "1,284", icon: <Users className="text-green-glow" />, bg: "bg-green-glow/10", trend: "+12%" },
    { label: "Active Auctions", value: "42", icon: <Gavel className="text-amber-500" />, bg: "bg-amber-500/10", trend: "+5%" },
    { label: "Total Revenue", value: "₹8.4L", icon: <TrendingUp className="text-blue-500" />, bg: "bg-blue-500/10", trend: "+18%" },
    { label: "System Health", value: "99.9%", icon: <Activity className="text-purple-500" />, bg: "bg-purple-500/10", trend: "Stable" },
  ]

  const users = [
    { id: 1, name: "Arjun Kumar", role: "Farmer", status: "active", email: "arjun@example.com", joined: "Mar 12, 2026" },
    { id: 2, name: "Suresh Patil", role: "Buyer", status: "active", email: "suresh@example.com", joined: "Mar 14, 2026" },
    { id: 3, name: "Vikram Singh", role: "Dealer", status: "pending", email: "vikram@example.com", joined: "Mar 20, 2026" },
    { id: 4, name: "Rahul Mehta", role: "Farmer", status: "alert", email: "rahul@example.com", joined: "Mar 21, 2026" },
  ]

  const navItems = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard size={18} /> },
    { id: "users", label: "User Management", icon: <Users size={18} /> },
    { id: "auctions", label: "Auction Control", icon: <Gavel size={18} /> },
    { id: "verification", label: "Verifications", icon: <Shield size={18} /> },
    { id: "reports", label: "System Reports", icon: <Activity size={18} /> },
    { id: "settings", label: "Settings", icon: <Settings size={18} /> },
  ]

  return (
    <div className="flex min-h-screen bg-bg-void text-gray-200 font-sans selection:bg-green-glow/30">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-bg-card border-r border-white/5 flex flex-col p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-3 px-2 mb-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Shield size={22} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white">
            Admin<span className="text-purple-400">Hub</span>
          </span>
        </div>

        <nav className="space-y-1 flex-1">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold px-3 mb-3">Main Console</p>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group ${
                activeTab === item.id
                  ? "bg-purple-500/10 text-purple-400 border-l-4 border-purple-500"
                  : "text-gray-400 hover:bg-white/5 hover:text-white border-l-4 border-transparent"
              }`}
            >
              <span className={`${activeTab === item.id ? "opacity-100" : "opacity-60 group-hover:opacity-100"}`}>
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400">
              <Power size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-white">SysAdmin</p>
              <p className="text-[10px] text-gray-500">Level 1 Access</p>
            </div>
          </div>
          <button className="w-full py-2 text-xs font-bold text-gray-500 hover:text-white transition-colors">
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 relative overflow-y-auto">
        {/* Animated Background Gradients */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
           <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full" />
           <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-500/5 blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "overview" ? (
                <>
                  <header className="flex justify-between items-end mb-10">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-400 mb-1">System Health</p>
                      <h1 className="text-4xl font-extrabold text-white tracking-tight">System Overview</h1>
                    </div>
                    <button
                      onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 1000) }}
                      className="flex items-center gap-2 px-5 py-2.5 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-400 text-sm font-bold hover:bg-purple-500/20 transition-all active:scale-95"
                    >
                      <RefreshCw size={16} className={`${loading ? "animate-spin" : ""}`} />
                      {loading ? "Syncing..." : "Refresh Data"}
                    </button>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {stats.map((s, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-bg-card border border-white/5 p-6 rounded-3xl hover:border-purple-500/30 transition-all duration-300 group relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 p-4">
                           <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.trend.includes("+") ? "bg-green-500/10 text-green-400" : "bg-gray-500/10 text-gray-400"}`}>
                             {s.trend}
                           </div>
                        </div>
                        <div className={`w-12 h-12 rounded-2xl ${s.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                          {s.icon}
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-1 font-mono tracking-tighter">{s.value}</h3>
                        <p className="text-sm font-medium text-gray-500">{s.label}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="bg-bg-card border border-white/5 rounded-[2rem] p-8">
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="text-xl font-bold text-white tracking-tight">Recent User Identity Verification</h2>
                      <div className="flex gap-4">
                        <div className="relative">
                          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                          <input
                            placeholder="Filter by name..."
                            className="pl-11 pr-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-sm outline-none focus:border-purple-500/50 transition-all w-64"
                          />
                        </div>
                        <button className="p-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                          <Filter size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-separate border-spacing-y-2">
                        <thead>
                          <tr className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                            <th className="px-6 pb-4">User</th>
                            <th className="px-6 pb-4">Role</th>
                            <th className="px-6 pb-4">Status</th>
                            <th className="px-6 pb-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((u, i) => (
                            <tr key={u.id} className="group bg-white/[0.01] hover:bg-white/[0.03] transition-colors rounded-2xl">
                              <td className="px-6 py-4 rounded-l-2xl border-y border-l border-white/5">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 font-bold text-sm">
                                    {u.name[0]}
                                  </div>
                                  <div>
                                    <p className="text-sm font-bold text-white">{u.name}</p>
                                    <p className="text-[10px] text-gray-500">{u.email}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 border-y border-white/5">
                                <span className="text-sm font-semibold">{u.role}</span>
                              </td>
                              <td className="px-6 py-4 border-y border-white/5">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                  u.status === "active" ? "bg-green-500/10 text-green-400" :
                                  u.status === "pending" ? "bg-amber-500/10 text-amber-400" :
                                  "bg-red-500/10 text-red-400"
                                }`}>
                                  <span className="w-1 h-1 rounded-full bg-current animate-pulse" />
                                  {u.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 rounded-r-2xl border-y border-r border-white/5 text-right">
                                <button className="p-2 text-gray-500 hover:text-white transition-colors">
                                  <MoreVertical size={18} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                  <div className="w-20 h-20 rounded-3xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-8 animate-bounce">
                    <Settings size={40} />
                  </div>
                  <h2 className="text-4xl font-extrabold text-white tracking-tight mb-4">
                    {navItems.find(n => n.id === activeTab)?.label}
                  </h2>
                  <p className="text-gray-400 max-w-md text-lg leading-relaxed">
                    We're currently refactoring this module. Expect a new real-time interface within the next deployment.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}