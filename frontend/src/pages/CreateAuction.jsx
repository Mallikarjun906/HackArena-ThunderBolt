import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Wheat, 
  IndianRupee, 
  Scale, 
  Calendar, 
  PlusCircle, 
  CheckCircle2, 
  AlertCircle,
  ArrowLeft,
  ChevronRight,
  Info
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateAuction = () => {
  const navigate = useNavigate();
  const [cropName, setCropName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kg");
  const [basePrice, setBasePrice] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");

      await axios.post(
        "http://localhost:5001/api/auction/create",
        {
          cropName,
          quantity: `${quantity} ${unit}`,
          basePrice,
          description,
          farmerName: userData.name || "Anonymous Farmer",
          farmerPhone: userData.phone || "N/A",
          status: "active",
          createdAt: new Date().toISOString()
        }
      );

      setStatus("success");
      setTimeout(() => {
        navigate("/farmer");
      }, 2000);
    } catch (err) {
      console.error("Error creating auction:", err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-void text-gray-200 font-sans selection:bg-green-glow/30 p-4 md:p-8">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-green-glow/5 blur-[120px] rounded-full text-green-glow" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-green-glow/5 blur-[100px] rounded-full text-green-glow" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Navigation */}
        <button 
          onClick={() => navigate("/farmer")}
          className="flex items-center gap-2 text-gray-400 hover:text-green-glow transition-colors mb-8 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Dashboard</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Header Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-8"
            >
              <h1 className="text-4xl font-extrabold text-white tracking-tight mb-4">
                List Your <span className="text-green-glow">Bounty</span>
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                Start a live auction for your harvest. Connect with verified buyers across the region.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: <CheckCircle2 className="text-green-glow" size={20} />, text: "Real-time bidding" },
                  { icon: <CheckCircle2 className="text-green-glow" size={20} />, text: "Verified regional buyers" },
                  { icon: <CheckCircle2 className="text-green-glow" size={20} />, text: "Secure payment processing" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl group hover:border-green-glow/30 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-green-glow/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Form Section */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-bg-card border border-white/5 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden"
            >
              {/* Card Decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-glow/5 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2" />

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="space-y-4">
                  {/* Crop Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Crop Name</label>
                    <div className="relative group">
                      <Wheat className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-green-glow transition-colors" size={18} />
                      <input
                        required
                        type="text"
                        placeholder="e.g. Premium Basmati Rice"
                        value={cropName}
                        onChange={(e) => setCropName(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-green-glow/50 focus:ring-1 focus:ring-green-glow/50 transition-all placeholder:text-gray-600"
                      />
                    </div>
                  </div>

                  {/* Quantity & Unit */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 text-white">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Quantity</label>
                      <div className="relative group">
                        <Scale className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-green-glow transition-colors" size={18} />
                        <input
                          required
                          type="number"
                          placeholder="500"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-green-glow/50 focus:ring-1 focus:ring-green-glow/50 transition-all placeholder:text-gray-600"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Unit</label>
                      <select 
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-4 text-white outline-none focus:border-green-glow/50 transition-all appearance-none cursor-pointer"
                      >
                        <option value="kg" className="bg-bg-card text-white">Kilograms (kg)</option>
                        <option value="quintal" className="bg-bg-card text-white">Quintals (q)</option>
                        <option value="ton" className="bg-bg-card text-white">Tons (t)</option>
                      </select>
                    </div>
                  </div>

                  {/* Base Price */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Starting Price (Base Price)</label>
                    <div className="relative group">
                      <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-green-glow transition-colors" size={18} />
                      <input
                        required
                        type="number"
                        placeholder="2450.00"
                        value={basePrice}
                        onChange={(e) => setBasePrice(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-green-glow/50 focus:ring-1 focus:ring-green-glow/50 transition-all placeholder:text-gray-600"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Crop Description & Quality Notes</label>
                    <textarea
                      placeholder="e.g. Grade A harvest, Pesticide free, Moister level: 14%..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-green-glow/50 focus:ring-1 focus:ring-green-glow/50 transition-all placeholder:text-gray-600 resize-none"
                    />
                  </div>
                </div>

                {/* Status Messages */}
                <AnimatePresence mode="wait">
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl flex items-center gap-3 overflow-hidden"
                    >
                      <CheckCircle2 size={18} />
                      <span className="text-sm font-semibold text-white">Harvest listed successfully! Redirecting...</span>
                    </motion.div>
                  )}
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3 overflow-hidden"
                    >
                      <AlertCircle size={18} />
                      <span className="text-sm font-semibold text-white">Failed to create auction. Please try again.</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full group relative overflow-hidden flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 ${
                    loading 
                      ? "bg-gray-700 cursor-not-allowed text-gray-400" 
                      : "bg-green-glow text-bg-void hover:shadow-[0_0_20px_rgba(0,255,136,0.4)]"
                  }`}
                >
                  <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-20deg] -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-bg-void/30 border-t-bg-void rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Launch Auction</span>
                      <ChevronRight size={20} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Hint Box */}
            <div className="mt-6 flex gap-3 text-gray-500 bg-white/[0.01] p-4 rounded-2xl border border-white/5 italic text-sm">
              <Info size={16} className="shrink-0 mt-0.5 text-blue-400" />
              <p>Your auction will stay active for 24 hours by default. You can track bids in your farmer dashboard under "Active Bids".</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAuction;