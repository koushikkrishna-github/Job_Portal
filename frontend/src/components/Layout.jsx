import { Link, useLocation } from 'react-router-dom';
import {
    Building2,
    Menu,
    X,
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
    Mail,
    Phone,
    MapPin,
    Shield,
    Globe,
    ArrowRight,
    Github
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Layout({ children }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact Us', path: '/contact' },
    ];

    const isAdminPage = location.pathname.startsWith('/admin') && location.pathname !== '/admin/login';

    if (isAdminPage) {
        return <div className="min-h-screen bg-white">{children}</div>;
    }

    return (
        <div className="min-h-screen flex flex-col bg-white font-['Plus_Jakarta_Sans']">
            {/* Main Navigation */}
            <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-6 bg-gradient-to-b from-[#0f172a]/50 via-[#0f172a]/20 to-transparent'}`}>
                <nav className="max-w-7xl mx-auto px-4 transition-all duration-500">
                    <div className={`flex justify-between items-center h-16 md:h-20 px-6 md:px-10 rounded-xl md:rounded-2xl transition-all duration-500 ${scrolled
                        ? 'bg-white/95 backdrop-blur-xl border border-gray-100 shadow-xl'
                        : 'bg-[#0f172a]/80 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/40'
                        }`}>
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3 md:gap-4 group relative z-10">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500 relative overflow-hidden">
                                <Building2 className="w-5 h-5 md:w-6 md:h-6 text-white relative z-10" />
                            </div>
                            <div className="flex flex-col">
                                <span className={`text-xl md:text-2xl font-bold leading-none tracking-tight transition-all duration-500 ${scrolled ? 'text-[#0f172a]' : 'text-white'}`} style={!scrolled ? { textShadow: '0 2px 10px rgba(0,0,0,0.3)' } : {}}>NEXUS</span>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-500 ${scrolled ? 'text-indigo-600' : 'text-indigo-400'}`} style={!scrolled ? { textShadow: '0 2px 10px rgba(0,0,0,0.3)' } : {}}>Solutions</span>
                                    <div className="flex items-center gap-1 px-1.5 py-0.5 bg-emerald-500/20 backdrop-blur-md rounded border border-emerald-500/30">
                                        <Shield className="w-2 h-2 text-emerald-400" />
                                        <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-wider">Verified</span>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        {/* Navigation Menu */}
                        <div className={`hidden lg:flex items-center gap-1 rounded-2xl p-1.5 transition-all duration-500 ${scrolled ? 'bg-gray-50 border border-gray-100' : 'bg-white/5 border border-white/5 backdrop-blur-sm'}`}>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`px-8 py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-500 ${location.pathname === link.path
                                        ? (scrolled ? 'bg-[#0f172a] text-white shadow-xl' : 'bg-white text-[#0f172a] shadow-2xl')
                                        : (scrolled ? 'text-gray-500 hover:text-[#0f172a] hover:bg-gray-100' : 'text-white/80 hover:text-indigo-400 hover:bg-white/5')
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="hidden md:flex items-center gap-6">
                            <Link
                                to="/find-jobs"
                                className={`px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all duration-500 ${scrolled
                                    ? 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-500'
                                    : 'bg-white text-indigo-600 shadow-xl hover:bg-indigo-50'
                                    } hover:-translate-y-0.5 active:scale-95`}
                            >
                                Find Jobs
                            </Link>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <div className="flex items-center lg:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className={`p-4 rounded-2xl transition-all duration-500 border ${isMenuOpen
                                    ? 'bg-indigo-600 border-indigo-500 text-white'
                                    : (scrolled ? 'bg-gray-50 border-gray-100 text-gray-900' : 'bg-white/10 border-white/10 text-white backdrop-blur-md')
                                    }`}
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    <div
                        className={`lg:hidden absolute left-4 right-4 mt-4 transition-all duration-500 origin-top transform ${isMenuOpen ? 'scale-y-100 opacity-100 translate-y-0' : 'scale-y-0 opacity-0 -translate-y-10 pointer-events-none'
                            }`}
                    >
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-2xl p-8 space-y-3 overflow-hidden">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`block px-6 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${location.pathname === link.path
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : 'text-gray-500 hover:text-indigo-600 hover:bg-indigo-50/50'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </nav>
            </div>

            {/* Main Content */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-[#0f172a] text-white pt-20 pb-12 overflow-hidden relative">
                {/* Background Decoration */}
                <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
                        {/* Brand Cluster */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white backdrop-blur-xl">
                                    <Building2 className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold tracking-tight">NEXUS</span>
                                    <span className="text-[10px] text-emerald-400 font-bold tracking-[0.3em] uppercase">Staffing Solutions</span>
                                </div>
                            </div>
                            <p className="text-gray-400 font-medium leading-relaxed max-w-sm text-sm">
                                Helping candidates in South India find the best engineering and technology jobs in top companies.
                            </p>
                            <div className="flex gap-4">
                                {[Linkedin, Twitter, Github, Instagram].map((Icon, i) => (
                                    <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-indigo-600 transition-all group">
                                        <Icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Sub-grids */}
                        <div className="lg:col-span-2 lg:ml-auto">
                            <h3 className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.3em] mb-6">Quick Links</h3>
                            <ul className="space-y-4">
                                {navLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link to={link.path} className="text-gray-400 hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest flex items-center gap-3 group">
                                            <div className="w-1 h-1 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-all transform group-hover:scale-125" />
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="lg:col-span-3">
                            <h3 className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.3em] mb-6">Contact Details</h3>
                            <ul className="space-y-6">
                                <li className="flex items-start gap-3 group">
                                    <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-indigo-500/50 transition-all">
                                        <MapPin className="w-3.5 h-3.5 text-gray-400 group-hover:text-indigo-400" />
                                    </div>
                                    <div className="text-[10px] font-medium text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                                        Nexus Tower, 42 Strategic Way<br />Hyderabad, TS 500081
                                    </div>
                                </li>
                                <li className="flex items-center gap-3 group">
                                    <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-indigo-500/50 transition-all">
                                        <Mail className="w-3.5 h-3.5 text-gray-400 group-hover:text-indigo-400" />
                                    </div>
                                    <div className="text-[10px] font-bold text-gray-400 tracking-widest group-hover:text-white transition-colors uppercase">support@nexusstaffing.com</div>
                                </li>
                                <li className="flex items-center gap-3 group">
                                    <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-indigo-500/50 transition-all">
                                        <Phone className="w-3.5 h-3.5 text-gray-400 group-hover:text-indigo-400" />
                                    </div>
                                    <div className="text-[10px] font-bold text-gray-300 tracking-widest group-hover:text-white transition-colors">+91 40 8822 9900</div>
                                </li>
                            </ul>
                        </div>

                        {/* Strategic Newsletter */}
                        <div className="lg:col-span-3">
                            <h3 className="text-[10px] font-bold text-white uppercase tracking-[0.3em] mb-6">Newsletter</h3>
                            <p className="text-gray-400 text-[10px] font-medium mb-6 leading-relaxed">Join 50k+ job seekers receiving our latest job updates.</p>
                            <form className="relative group" onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full pl-5 pr-12 py-4 bg-white/10 border-2 border-white/10 rounded-xl text-white font-bold outline-none focus:border-indigo-600 transition-all text-[10px] placeholder:text-gray-500"
                                />
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-900/40">
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Security & Registry Baseline */}
                    {/* Security & Registry Baseline */}
                    <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex flex-col gap-2">
                            <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">
                                &copy; {new Date().getFullYear()} NEXUS Staffing Solutions.
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5 opacity-50 hover:opacity-100 transition-opacity cursor-help" title="ISO 27001 Certified">
                                    <Shield className="w-3 h-3 text-emerald-500" />
                                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">ISO 27001</span>
                                </div>
                                <div className="w-px h-3 bg-white/10" />
                                <div className="flex items-center gap-1.5 opacity-50 hover:opacity-100 transition-opacity cursor-help" title="GDPR Compliant">
                                    <Building2 className="w-3 h-3 text-emerald-500" />
                                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">GDPR Ready</span>
                                </div>
                                <div className="w-px h-3 bg-white/10" />
                                <div className="flex items-center gap-1.5 opacity-50 hover:opacity-100 transition-opacity cursor-help" title="SSL Encrypted">
                                    <Shield className="w-3 h-3 text-emerald-500" />
                                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">256-Bit SSL</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-8">
                            <Link to="/admin/login" className="flex items-center gap-2 text-gray-600 hover:text-emerald-400 transition-all">
                                <Shield className="w-3.5 h-3.5" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Admin Login</span>
                            </Link>
                            <div className="hidden md:flex gap-6">
                                <a href="#" className="text-gray-600 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors">Privacy Policy</a>
                                <a href="#" className="text-gray-600 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors">Terms of Service</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
