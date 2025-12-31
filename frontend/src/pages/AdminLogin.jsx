import { useState, useEffect } from "react";
import { Shield, Lock, User, AlertCircle, Eye, EyeOff, KeyRound, Sparkles, Building2, Fingerprint, Terminal, RefreshCw } from "lucide-react";
import { adminLogin } from "../api";

export default function AdminLogin({ onLoginSuccess }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);

  useEffect(() => {
    document.getElementById("username-input")?.focus();
  }, []);

  const handleKeyDown = (e) => {
    setCapsLockOn(e.getModifierState("CapsLock"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!credentials.username || !credentials.password) {
      setError("AUTHENTICATION_FAILED: Null credentials detected.");
      return;
    }

    setLoading(true);

    try {
      const response = await adminLogin(credentials.username, credentials.password);
      localStorage.setItem("adminToken", response.token);
      localStorage.setItem("adminUsername", response.username);
      onLoginSuccess();
    } catch (err) {
      setError(err.message || "ACCESS_DENIED: Invalid security clearance.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 relative overflow-hidden font-['Plus_Jakarta_Sans']">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-600 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-lg relative z-10 space-y-12">
        {/* Branding */}
        <div className="flex flex-col items-center text-center animate-fadeInDown">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden mb-6 group">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-emerald-500 opacity-90 transition-transform duration-500 group-hover:scale-110" />
            <Building2 className="w-8 h-8 text-white relative z-10" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-widest leading-none mb-2">NEXUS</h1>
            <p className="text-[10px] text-emerald-400 font-bold tracking-[0.4em] uppercase">Command Center</p>
          </div>
        </div>

        {/* Login Interface */}
        <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl animate-scaleIn">
          <div className="mb-8 flex items-center gap-4">
            <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Access Gateway</h2>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Secure Link Required</p>
            </div>
          </div>

          {error && (
            <div className="mb-8 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-3 animate-fadeIn">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-400 font-bold text-[11px] uppercase tracking-widest leading-relaxed">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-4">Identifier</label>
              <div className="relative group">
                <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  id="username-input"
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  onKeyDown={handleKeyDown}
                  placeholder="AGENT_ID"
                  className="w-full bg-white/10 border-2 border-white/10 rounded-2xl pl-16 pr-6 py-5 text-white font-bold outline-none focus:border-indigo-500 focus:bg-white/20 transition-all placeholder:text-gray-500"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-4">Access Vector</label>
              <div className="relative group">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  onKeyDown={handleKeyDown}
                  placeholder="ENCRYPTION_KEY"
                  className="w-full bg-white/10 border-2 border-white/10 rounded-2xl pl-16 pr-16 py-5 text-white font-bold outline-none focus:border-indigo-500 focus:bg-white/20 transition-all placeholder:text-gray-500"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {capsLockOn && (
                <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-yellow-500 uppercase tracking-widest">
                  <AlertCircle className="w-3 h-3" />
                  <span>Caps Lock Detected</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full group relative flex items-center justify-center p-0.5 rounded-xl bg-gradient-to-tr from-indigo-600 to-emerald-500 overflow-hidden active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg"
            >
              <div className="w-full h-full bg-[#0f172a] rounded-[11px] py-5 transition-all group-hover:bg-transparent flex items-center justify-center gap-3">
                {loading ? (
                  <RefreshCw className="w-5 h-5 animate-spin text-white" />
                ) : (
                  <>
                    <Fingerprint className="w-5 h-5 text-white" />
                    <span className="text-white font-bold uppercase tracking-widest text-xs">Authorize Link</span>
                  </>
                )}
              </div>
            </button>
          </form>
        </div>

        {/* Footer Info */}
        <div className="flex items-center justify-between text-gray-600 px-4 animate-fadeIn">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">v4.0.28-SECURE</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">End-to-End Encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
}