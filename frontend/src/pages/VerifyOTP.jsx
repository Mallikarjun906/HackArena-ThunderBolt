import { useState } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import axios from "axios"
import { motion } from "framer-motion"
import { Shield, ArrowRight, ArrowLeft, Smartphone, Mail } from "lucide-react"

export default function VerifyOTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email || "your-email@example.com"

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const finalOtp = otp.join("")
      const res = await axios.post("http://localhost:5001/api/auth/verify-otp", { email, otp: finalOtp })
      alert("Node Verified Successfully")
      const role = res.data.role
      const roleRoutes = { farmer: "/farmer", buyer: "/buyer", dealer: "/dealer", admin: "/admin" }
      navigate(roleRoutes[role] || "/login")
    } catch (err) {
      setError(err.response?.data?.message || "Invalid verification code.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg-void flex items-center justify-center p-6 md:p-12 relative overflow-hidden font-sans selection:bg-green-glow/30">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-glow/5 blur-[120px] rounded-full pointer-events-none" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="mb-10 text-center">
          <div className="w-16 h-16 rounded-[2rem] bg-green-glow/10 border border-green-glow/20 flex items-center justify-center text-green-glow mx-auto mb-8">
            <Shield size={32} />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter mb-2">Node Verification</h1>
          <p className="text-gray-500 font-medium">Enter the 6-digit clearance code sent to:</p>
          <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/5 text-[11px] font-bold text-gray-400">
             <Mail size={12} className="text-green-glow" /> {email}
          </div>
        </div>

        <div className="bg-bg-card border border-white/5 rounded-[3rem] p-10 shadow-2xl shadow-green-glow/5">
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="flex justify-between gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index} id={`otp-${index}`}
                  type="text" maxLength="1" value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  className="w-12 h-14 md:w-14 md:h-16 text-center text-2xl font-black bg-white/[0.03] border border-white/10 rounded-2xl text-white outline-none focus:border-green-glow/40 focus:bg-white/[0.05] transition-all font-mono"
                />
              ))}
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-xs font-bold text-red-400 flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                 {error}
              </div>
            )}

            <div className="space-y-4">
              <button 
                type="submit" disabled={loading}
                className="w-full py-5 bg-green-glow text-bg-void rounded-2xl text-sm font-black uppercase tracking-tighter shadow-xl shadow-green-glow/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? "Verifying..." : (
                  <>Authorize Node <ArrowRight size={18} /></>
                )}
              </button>
              <button type="button" className="w-full text-[10px] font-black uppercase text-gray-600 hover:text-white transition-colors tracking-widest">
                 Resend Clearance Code
              </button>
            </div>
          </form>
        </div>

        <Link to="/login" className="mt-12 flex items-center justify-center gap-2 text-gray-500 hover:text-white font-black text-[10px] uppercase tracking-widest transition-all">
           <ArrowLeft size={14} /> Back to Terminal Login
        </Link>
      </motion.div>

      <style>{`
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,255,136,0.05); border-radius: 10px; }
      `}</style>
    </div>
  )
}