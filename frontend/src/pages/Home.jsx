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
                            The Premier Ecosystem for <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Verified Talent & Opportunity.</span>
                        </h1>

                        <p className="text-lg md:text-xl text-indigo-100/70 max-w-3xl leading-relaxed font-medium animate-fadeInUp">
                            Eliminate uncertainty. Connect with vetted enterprises and pre-screened professionals in South India's only assured recruitment network.
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
                                { label: "Verified Partners", val: "500+" },
                                { label: "Active Roles", val: "12k+" },
                                { label: "Placement Success", val: "98%" },
                                { label: "Secure Placements", val: "25k+" }
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

            {/* The Trust Standard */}
            <section className="py-24 bg-gray-50 border-b border-gray-100">
                <div className="max-w-[1440px] mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100/50 rounded-full mb-4">
                            <Shield className="w-3 h-3 text-emerald-600" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">The HexaCode Protocol</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter mb-6">Built on <span className="text-indigo-600">Uncompromising Trust.</span></h2>
                        <p className="text-gray-500 font-medium leading-relaxed">
                            We don't just list jobs. We architect a secure ecosystem where every participant is verified, ensuring zero fraud and maximum relevance.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 relative z-10">
                        {[
                            { title: "Verified Enterprises", desc: "Every company is subjected to a rigorous 14-point corporate audit before accessing our talent pool.", icon: Building2 },
                            { title: "Vetted Professionals", desc: "Candidates undergo algorithmic and manual screening to validate skills and experience authenticity.", icon: Briefcase },
                            { title: "Assured Recruitment", desc: "Our 'Placement Guarantee' ensures all offers made through HexaJobs are legally binding and secure.", icon: Shield },
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
                                    <item.icon className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed font-medium">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Connected Ecosystem */}
            <section className="py-20 bg-white overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent" />
                <div className="max-w-[1440px] mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="max-w-xl space-y-6">
                            <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">The Unified <span className="text-indigo-600">Grid.</span></h2>
                            <p className="text-lg text-gray-500 font-medium leading-relaxed">
                                HexaJobs isn't just a portal; it's a synchronized grid connecting the four pillars of recruitment.
                            </p>
                            <ul className="space-y-4 pt-4">
                                {[
                                    "Enterprise Architects (Recruiters)",
                                    "Talent Operations (HR)",
                                    "Visionary Founders (Companies)",
                                    "Elite Engineers (Candidates)"
                                ].map((role, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                                            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                                        </div>
                                        <span className="text-sm font-bold text-gray-700 uppercase tracking-widest">{role}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Abstract Connectivity Visual */}
                        <div className="relative flex-1 w-full max-w-lg aspect-square flex items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-50 to-emerald-50 rounded-full blur-3xl opacity-50" />
                            <div className="relative z-10 grid grid-cols-2 gap-4">
                                {[Building2, Briefcase, Zap, Globe].map((Icon, i) => (
                                    <div key={i} className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-float" style={{ animationDelay: `${i * 0.2}s` }}>
                                        <Icon className="w-8 h-8 text-indigo-600" />
                                    </div>
                                ))}
                            </div>
                            {/* Connecting Lines (CSS only representation) */}
                            <div className="absolute inset-0 border-2 border-dashed border-indigo-100 rounded-full animate-spin-slow pointer-events-none" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Strategic Verticals */}
            <section className="py-24 md:py-32 bg-gray-50/50">
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
                                    Start Verification
                                </Link>
                                <Link
                                    to="/contact"
                                    className="w-full md:w-auto px-10 py-5 bg-white/5 border border-white/10 text-white rounded-xl font-black uppercase tracking-[0.1em] text-[10px] backdrop-blur-md hover:bg-white/10 transition-all hover:-translate-y-1"
                                >
                                    Partner With Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
