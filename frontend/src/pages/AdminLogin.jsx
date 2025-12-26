import { useState, useEffect } from "react";
import { Shield, Lock, User, AlertCircle, Eye, EyeOff, KeyRound, Sparkles } from "lucide-react";
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
    // Auto-focus username field
    document.getElementById("username-input")?.focus();
  }, []);

  const handleKeyDown = (e) => {
    setCapsLockOn(e.getModifierState("CapsLock"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!credentials.username || !credentials.password) {
      setError("Please enter both username and password");
      return;
    }

    setLoading(true);

    try {
      const response = await adminLogin(credentials.username, credentials.password);

      // Store token in localStorage
      localStorage.setItem("adminToken", response.token);
      localStorage.setItem("adminUsername", response.username);

      // Call success callback
      onLoginSuccess();
    } catch (err) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8 animate-fadeInDown">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-xl">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Admin <span className="text-gradient">Portal</span>
          </h1>
          <p className="text-gray-600 flex items-center justify-center gap-2">
            <KeyRound className="w-4 h-4" />
            Secure Access Required
          </p>
        </div>

        {/* Login Card */}
        <div className="card p-8 shadow-2xl animate-scaleIn">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to access the dashboard</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3 animate-fadeIn">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-800 font-medium text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="username-input"
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter your username"
                  className="input pl-12 pr-4 py-3 text-base"
                  disabled={loading}
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter your password"
                  className="input pl-12 pr-12 py-3 text-base"
                  disabled={loading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Caps Lock Warning */}
              {capsLockOn && (
                <div className="mt-2 flex items-center gap-2 text-sm text-yellow-700 bg-yellow-50 px-3 py-2 rounded-lg animate-fadeIn">
                  <AlertCircle className="w-4 h-4" />
                  <span>Caps Lock is on</span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 px-6 rounded-xl font-semibold text-white text-base transition-all shadow-lg ${loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl hover:-translate-y-0.5"
                }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Shield className="w-5 h-5" />
                  Sign In
                </span>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Shield className="w-4 h-4" />
              <span>Protected by enterprise-grade security</span>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center animate-fadeInUp">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-700">
              Authorized personnel only
            </span>
          </div>
        </div>

        {/* Keyboard Shortcuts Hint */}
        <div className="mt-4 text-center text-xs text-gray-500 animate-fadeIn">
          <p>Press <kbd className="px-2 py-1 bg-gray-200 rounded text-gray-700 font-mono">Enter</kbd> to sign in</p>
        </div>
      </div>
    </div>
  );
}