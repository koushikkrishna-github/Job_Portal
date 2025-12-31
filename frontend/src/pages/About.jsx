import { Building, Target, Award, Users, CheckCircle, Globe, TrendingUp, Shield, ArrowRight, Sparkles } from 'lucide-react';

export default function About() {
    return (
        <div className="flex flex-col bg-white font-['Plus_Jakarta_Sans'] overflow-hidden">
            {/* Expanded Immersive Hero */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-[#0f172a] text-white overflow-hidden text-center">
                {/* Strategic Mesh Decoration */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-indigo-600 rounded-full blur-[150px]" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-emerald-600 rounded-full blur-[150px]" />
                </div>

                <div className="max-w-[1440px] mx-auto px-6 relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 text-indigo-400 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase border border-indigo-500/20 mb-6 backdrop-blur-xl animate-fadeIn">
                        Corporate Intelligence
                    </div>
                    <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tight leading-[1.0] mb-8 animate-fadeInDown">
                        Orchestrating <br className="hidden lg:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Human Capital.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-indigo-100/70 max-w-3xl mx-auto leading-relaxed font-medium animate-fadeInUp">
                        Southern India's premier gateway for technology leaders. We don't just fill roles; we catalyze the growth of innovative ecosystems.
                    </p>
                </div>
            </section>

            {/* Expansive Excellence Section */}
            <section className="py-20 md:py-32 relative border-b border-gray-50">
                <div className="max-w-[1440px] mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-indigo-500/5 rounded-[2rem] blur-2xl transition-all group-hover:bg-indigo-500/10" />
                            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                                    alt="Nexus Strategy Lab"
                                    className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 to-transparent opacity-60" />
                            </div>

                            {/* Floating Achievement Badge */}
                            <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hidden md:block animate-bounce-subtle">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                                        <Award className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Industry Standard</p>
                                        <p className="text-base font-bold text-gray-900 tracking-tight">ISO-9001 Certified</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-[1.1]">
                                    The Nexus <span className="text-indigo-600">Protocol.</span>
                                </h2>
                                <p className="text-lg text-gray-500 leading-relaxed font-medium">
                                    Founded in 2020 by a consortium of engineering visionaries, Nexus was architected to bridge the profound gap between high-velocity technical demand and strategic talent acquisition.
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                                <div className="space-y-2">
                                    <p className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">500+</p>
                                    <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em]">Strategic Partners</p>
                                    <p className="text-xs text-gray-400 leading-relaxed">Top-tier tech giants to agile unicorn startups.</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">1.8k+</p>
                                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.2em]">High-Impact Hires</p>
                                    <p className="text-xs text-gray-400 leading-relaxed">Orchestrating careers that define markets.</p>
                                </div>
                            </div>

                            <button className="flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-indigo-600 transition-all shadow-lg hover:-translate-y-1">
                                Our Methodology <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Strategic Pillars Section */}
            <section className="py-20 md:py-32 bg-gray-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 opacity-[0.03] select-none pointer-events-none">
                    <Target className="w-[400px] h-[400px]" />
                </div>

                <div className="max-w-[1440px] mx-auto px-6 relative z-10">
                    <div className="max-w-3xl mb-16 md:mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6">Strategic <span className="text-indigo-600">Pillars.</span></h2>
                        <p className="text-lg text-gray-500 leading-relaxed font-medium">How we maintain the Nexus standard across India's most complex technical terrains.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 md:gap-10">
                        {[
                            {
                                title: "Candidate-Centricity",
                                icon: Users,
                                color: "text-indigo-600",
                                desc: "We prioritize your professional trajectory and long-term equity, not just immediate placement metrics."
                            },
                            {
                                title: "Technical Integrity",
                                icon: Shield,
                                color: "text-emerald-600",
                                desc: "No jargon, no fluff. Our engineers vet your vision before we connect you to decision makers."
                            },
                            {
                                title: "Regional Sovereignty",
                                icon: Globe,
                                color: "text-blue-600",
                                desc: "Deep-seated influence across Hyderabad, Bangalore, and Chennai technology hubs."
                            }
                        ].map((item, i) => (
                            <div key={i} className="group relative bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className={`w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <item.icon className={`w-6 h-6 ${item.color}`} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">{item.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed mb-6">{item.desc}</p>
                                <div className="w-8 h-1 bg-gray-100 rounded-full group-hover:w-full group-hover:bg-indigo-600 transition-all duration-500" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
