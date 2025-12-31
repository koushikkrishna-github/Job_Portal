import { Link } from 'react-router-dom';
import { Code2, Globe, Database, Shield, Cpu, Layout, ArrowRight, Zap, Target, Sparkles } from 'lucide-react';

export default function Services() {
    return (
        <div className="flex flex-col bg-white font-['Plus_Jakarta_Sans'] overflow-hidden">
            {/* Strategic Hero */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-[#0f172a] text-white overflow-hidden text-center">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-[-20%] right-[10%] w-[60%] h-[60%] bg-blue-600 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-600 rounded-full blur-[120px]" />
                </div>

                <div className="max-w-[1440px] mx-auto px-6 relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 text-indigo-400 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase border border-indigo-500/20 mb-6 backdrop-blur-xl animate-fadeIn">
                        <Sparkles className="w-3.5 h-3.5" />
                        Deployment Verticals
                    </div>
                    <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tight leading-[1.0] mb-8 animate-fadeInDown">
                        Precision-Engineered <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Capabilities.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-indigo-100/70 max-w-3xl mx-auto leading-relaxed font-medium animate-fadeInUp">
                        We don't just recruit; we architect workforce solutions for the most demanding technical environments in South India.
                    </p>
                </div>
            </section>

            {/* Expansive Service Grid */}
            <section className="py-20 md:py-32 bg-white">
                <div className="max-w-[1440px] mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: "Full-Stack Architecture", icon: Layout, desc: "End-to-end development of scalable React/Node.js ecosystems.", impact: "Full-Cycle" },
                            { title: "Cloud Infrastructure", icon: Globe, desc: "AWS/Azure solutions for high-availability enterprise environments.", impact: "High-Availability" },
                            { title: "Data Engineering", icon: Database, desc: "Building pipelines that transform raw data into decision intelligence.", impact: "Strategic Analytics" },
                            { title: "Cybersecurity Ops", icon: Shield, desc: "Zero-trust protocols and real-time threat mitigation strategies.", impact: "Zero-Trust" },
                            { title: "AI & Machine Learning", icon: Cpu, desc: "Integrating predictive models into core business logic.", impact: "Cognitive Automation" },
                            { title: "System Integration", icon: Code2, desc: "Seamless unification of legacy and modern microservices.", impact: "Unified Systems" },
                        ].map((service, i) => (
                            <div key={i} className="group p-10 rounded-[2rem] border border-gray-100 bg-white hover:border-indigo-600 hover:shadow-xl transition-all duration-300">
                                <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
                                    <service.icon className="w-7 h-7 text-gray-900 group-hover:text-white transition-colors" />
                                </div>
                                <div className="space-y-4 mb-6">
                                    <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.3em]">{service.impact}</p>
                                    <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{service.title}</h3>
                                </div>
                                <p className="text-sm text-gray-500 leading-relaxed mb-8">{service.desc}</p>
                                <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest group-hover:translate-x-1 transition-transform cursor-pointer">
                                    Deployment Specs <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Engagement Protocol */}
            <section className="py-20 md:py-32 bg-[#0f172a] text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 p-24 opacity-[0.05] pointer-events-none">
                    <Zap className="w-[300px] h-[300px]" />
                </div>

                <div className="max-w-[1440px] mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 md:gap-20 items-center">
                        <div className="space-y-8">
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.0]">Blueprinted for <br /><span className="text-indigo-400">Velocity.</span></h2>
                            <p className="text-lg text-indigo-100/60 leading-relaxed max-w-xl">
                                Our recruitment lifecycle is a closed-loop system designed to eliminate variance and maximize role-fit.
                            </p>
                            <div className="space-y-6 pt-6">
                                {[
                                    { step: "01", title: "Diagnostic Calibration", desc: "Deep-dive analysis of technical requirements and cultural fit." },
                                    { step: "02", title: "Strategic Sourcing", desc: "Accessing latent talent pools via our proprietary network." },
                                    { step: "03", title: "Technical Vetting", desc: "Code-level interviews conducted by senior domain experts." },
                                ].map((phase, i) => (
                                    <div key={i} className="flex gap-6 group">
                                        <span className="text-2xl font-black text-indigo-500/30 group-hover:text-indigo-400 transition-colors">{phase.step}</span>
                                        <div>
                                            <h4 className="text-lg font-bold text-white mb-2">{phase.title}</h4>
                                            <p className="text-sm text-indigo-200/50 leading-relaxed">{phase.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl group text-center lg:text-left">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 mix-blend-overlay" />
                            <div className="bg-[#1e293b] p-12 md:p-16">
                                <Target className="w-12 h-12 text-emerald-400 mb-8 mx-auto lg:mx-0" />
                                <h3 className="text-3xl font-bold mb-6 tracking-tight">Ready to Deploy?</h3>
                                <p className="text-indigo-100/60 mb-10 text-lg">Initiate a consultation to align our vectors with your roadmap.</p>
                                <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold uppercase tracking-[0.2em] text-[10px] shadow-lg transition-all">
                                    Schedule Briefing
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Strategic CTA */}
            <section className="bg-[#0f172a] py-20 md:py-32 relative overflow-hidden border-t border-white/5">
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10 text-white">
                    <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter">Scale Your <span className="text-emerald-400">Vision.</span></h2>
                    <p className="text-lg md:text-xl text-indigo-100/60 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                        Ready to transcend ordinary standards? Connect with our strategic consultants to architect your next technological milestone.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            to="/contact"
                            className="w-full sm:w-auto px-10 py-5 bg-white text-indigo-600 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-xl hover:bg-indigo-50 transition-all flex items-center justify-center gap-3 hover:-translate-y-1"
                        >
                            Initiate Inquiry
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            to="/find-jobs"
                            className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] backdrop-blur-md hover:bg-white/10 transition-all hover:-translate-y-1"
                        >
                            Explore Ecosystem
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
