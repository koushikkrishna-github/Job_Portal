import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Search, Building2, Globe, TrendingUp, Sparkles, Zap, Shield, Briefcase, Rocket } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/careers?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className="flex flex-col bg-white font-['Plus_Jakarta_Sans'] overflow-hidden">
            {/* Elegant Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-[#0f172a] text-white overflow-hidden">
                {/* Immersive Mesh Backdrop */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-indigo-600 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-20%] right-[-20%] w-[70%] h-[70%] bg-emerald-600 rounded-full blur-[120px]" />
                </div>

                <div className="max-w-[1440px] mx-auto px-6 relative z-10">
                    <div className="flex flex-col items-center text-center space-y-8 animate-fadeIn">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400">Strategic Talent Acquisition</span>
                        </div>

                        <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-[1.0] animate-fadeInDown">
                            The Nexus of <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Innovation.</span>
                        </h1>

                        <p className="text-lg md:text-xl text-indigo-100/70 max-w-3xl leading-relaxed font-medium animate-fadeInUp">
                            Connecting elite engineering talent with the architectural visionaries of South India's premier technical ecosystems.
                        </p>

                        <div className="max-w-2xl w-full mt-10 group">
                            <form onSubmit={handleSearch} className="relative">
                                <div className="absolute inset-0 bg-indigo-500/20 blur-2xl group-focus-within:bg-indigo-500/30 transition-all opacity-0 group-focus-within:opacity-100" />
                                <div className="relative flex items-center bg-white rounded-[1.5rem] p-2 shadow-2xl">
                                    <div className="flex-grow flex items-center px-6 border-r-2 border-gray-100">
                                        <Search className="w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Explore technical roles..."
                                            className="w-full px-4 py-4 text-lg text-gray-900 placeholder:text-gray-300 focus:outline-none font-bold"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="hidden md:flex items-center gap-3 px-8 py-4 bg-[#0f172a] text-white rounded-2xl font-black uppercase tracking-[0.1em] text-[10px] hover:bg-indigo-600 transition-all shadow-lg"
                                    >
                                        Initiate Discovery
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="pt-16 grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">
                            {[
                                { label: "Technical Domains", val: "15+" },
                                { label: "Strategic Partners", val: "120+" },
                                { label: "Placement Velocity", val: "94%" },
                                { label: "Talent Pool", val: "15k+" }
                            ].map((stat, i) => (
                                <div key={i} className="text-center group">
                                    <p className="text-3xl font-black text-white mb-1 group-hover:text-indigo-400 transition-colors">{stat.val}</p>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Strategic Verticals */}
            <section className="py-24 md:py-32 bg-white">
                <div className="max-w-[1440px] mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
                        <div className="max-w-2xl space-y-4">
                            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase">Market <span className="text-indigo-600">Verticals.</span></h2>
                            <p className="text-gray-500 leading-relaxed font-medium">Focused orchestration across the core pillars of technical innovation.</p>
                        </div>
                        <Link to="/find-jobs" className="px-8 py-4 bg-gray-50 text-indigo-600 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-600 hover:text-white transition-all shadow-sm flex items-center gap-3 group">
                            Marketplace <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Software Systems", desc: "Backend, Architectures, and Full-Cycle development for global tech giants.", icon: Zap, color: "bg-indigo-50 text-indigo-600" },
                            { title: "Infrastructure & Ops", desc: "Elastic Cloud solutions and Zero-Trust security for high-availability ecosystems.", icon: Shield, color: "bg-emerald-50 text-emerald-600" },
                            { title: "Cognitive AI", desc: "Neural networks, Predictive analytics, and Data Engineering for the next economy.", icon: Sparkles, color: "bg-blue-50 text-blue-600" },
                        ].map((specialty, i) => (
                            <div key={i} className="group flex flex-col p-10 rounded-[2rem] border border-gray-100 bg-white hover:border-indigo-600 hover:shadow-xl transition-all duration-300">
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-8 ${specialty.color} group-hover:scale-110 transition-transform shadow-sm`}>
                                    <specialty.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight">{specialty.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed mb-8">{specialty.desc}</p>
                                <div className="mt-auto h-1 w-10 bg-gray-100 rounded-full group-hover:w-full group-hover:bg-indigo-600 transition-all duration-500" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Expansive CTA */}
            <section className="py-20 md:py-28 px-6">
                <div className="max-w-[1440px] mx-auto">
                    <div className="bg-[#0f172a] rounded-[2.5rem] p-12 md:p-24 text-center relative overflow-hidden text-white shadow-2xl">
                        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[100px]" />
                        <div className="relative z-10 max-w-3xl mx-auto space-y-10">
                            <Rocket className="w-12 h-12 text-indigo-400 mx-auto animate-pulse" />
                            <h2 className="text-3xl md:text-6xl font-black tracking-tighter leading-[1.0] uppercase">Architect Your <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Future Here.</span></h2>
                            <p className="text-lg text-indigo-100/60 leading-relaxed font-medium max-w-2xl mx-auto">
                                Join the elite talent pool receiving exclusive access to South India's most strategic roles.
                            </p>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                                <Link
                                    to="/find-jobs"
                                    className="w-full md:w-auto px-10 py-5 bg-white text-[#0f172a] rounded-xl font-black uppercase tracking-[0.1em] text-[10px] shadow-xl hover:bg-indigo-50 transition-all hover:-translate-y-1"
                                >
                                    Explore Protocol
                                </Link>
                                <Link
                                    to="/contact"
                                    className="w-full md:w-auto px-10 py-5 bg-white/5 border border-white/10 text-white rounded-xl font-black uppercase tracking-[0.1em] text-[10px] backdrop-blur-md hover:bg-white/10 transition-all hover:-translate-y-1"
                                >
                                    Strategic Inquiry
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
