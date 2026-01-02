import { Mail, Phone, MapPin, Send, MessageSquare, Globe, ArrowRight, ShieldCheck, Zap, Building2, TrendingUp, Sparkles, Clock, RefreshCw } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', subject: 'Strategic Recruitment Query', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSubmitted(true);
        setLoading(false);
    };

    return (
        <div className="flex flex-col bg-white font-['Plus_Jakarta_Sans'] overflow-hidden">
            {/* Expanded Strategic Hero */}
            <section className="relative pt-48 pb-40 md:pt-64 md:pb-56 bg-[#0f172a] text-white overflow-hidden text-center">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-indigo-600 rounded-full blur-[150px]" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-emerald-600 rounded-full blur-[150px]" />
                </div>

                <div className="max-w-[1440px] mx-auto px-8 relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-bold tracking-[0.3em] uppercase border border-indigo-500/20 mb-10 backdrop-blur-xl animate-fadeIn">
                        Strategic Connection
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.95] mb-12 animate-fadeInDown">
                        Initiate <br className="hidden lg:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Collaboration.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-indigo-100/60 max-w-3xl mx-auto leading-relaxed font-medium animate-fadeInUp">
                        Ready to transcend ordinary talent acquisition? Connect with our executive consultants to architect your next technological milestone.
                    </p>
                </div>
            </section>

            {/* Expansive Contact Ecosystem */}
            <section className="py-20 md:py-32 relative -mt-20 md:-mt-32 z-20">
                <div className="max-w-[1440px] mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
                        {/* Details Column */}
                        <div className="lg:col-span-5 space-y-8">
                            <div className="bg-[#0f172a] rounded-[2rem] p-8 md:p-10 text-white shadow-xl relative overflow-hidden group border border-white/5">
                                <div className="absolute inset-0 opacity-10 pointer-events-none">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full blur-3xl animate-pulse" />
                                </div>

                                <h2 className="text-2xl md:text-4xl font-black tracking-tighter mb-6 leading-tight">Nexus <span className="text-indigo-400">Hubs.</span></h2>
                                <p className="text-lg text-indigo-100/50 leading-relaxed font-medium mb-10">Our strategic command centers are positioned at the heart of India's technical innovation.</p>

                                <div className="space-y-6">
                                    {[
                                        { title: "Strategic HQ", val: "Madhapur, Hyderabad, TS 500081", icon: MapPin },
                                        { title: "Direct Inquiry", val: "support@nexusstaffing.com", icon: Mail },
                                        { title: "Executive Line", val: "+91 40 8822 9900", icon: Phone },
                                        { title: "Strategic Growth", val: "partners@nexusstaffing.com", icon: Globe }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4 group/item cursor-pointer">
                                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover/item:bg-indigo-600 group-hover/item:border-indigo-400 transition-all duration-300 shadow-lg">
                                                <item.icon className="w-5 h-5 text-indigo-400 group-hover/item:text-white" />
                                            </div>
                                            <div className="space-y-0.5">
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">{item.title}</p>
                                                <p className="text-base font-bold text-white tracking-tight group-hover/item:text-indigo-200 transition-colors uppercase">{item.val}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100 shadow-sm group hover:shadow-lg transition-all duration-300">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg border border-gray-50 group-hover:bg-indigo-600 transition-all duration-300">
                                        <Clock className="w-6 h-6 text-indigo-600 group-hover:text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-0.5">Operational Pulse</p>
                                        <p className="text-xl font-black text-gray-900 tracking-tight">Active Hours</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-base">
                                        <span className="text-gray-500 font-medium">Mon - Fri</span>
                                        <span className="text-gray-900 font-black">09:00 - 18:00 IST</span>
                                    </div>
                                    <div className="flex justify-between items-center text-base">
                                        <span className="text-gray-500 font-medium">Saturday</span>
                                        <span className="text-emerald-600 font-black italic">By Appointment Only</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Column */}
                        <div className="lg:col-span-7">
                            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_12px_48px_-12px_rgba(0,0,0,0.1)] border border-gray-100 relative overflow-hidden group h-full">
                                {submitted ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-fadeIn">
                                        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                                            <ShieldCheck className="w-10 h-10 text-emerald-500" />
                                        </div>
                                        <h3 className="text-3xl font-black text-gray-900 uppercase">Signal Received.</h3>
                                        <p className="text-lg text-gray-500 max-w-md">Our consultants have acknowledged your inquiry. Expect a strategic response shortly.</p>
                                        <button
                                            onClick={() => setSubmitted(false)}
                                            className="text-indigo-600 font-bold uppercase tracking-widest text-[10px] hover:underline decoration-2 underline-offset-8"
                                        >
                                            Transmit New Signal
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="max-w-2xl mb-10">
                                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-4">
                                                Contact <span className="text-indigo-600">HexaJobs.</span>
                                            </h1>
                                            <p className="text-lg text-gray-500 font-medium">
                                                Have questions about our verification protocol or enterprise partnerships? Our success team is ready to assist.
                                            </p>                </div>

                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.3em] ml-1">Identity</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={form.name}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="Your full name"
                                                        className="w-full px-5 py-4 rounded-xl bg-gray-50 border-2 border-gray-100 text-gray-900 outline-none focus:bg-white focus:border-indigo-600 transition-all font-bold text-base placeholder:text-gray-300 placeholder:font-medium shadow-sm"
                                                    />
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.3em] ml-1">Communication Link</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={form.email}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="work@company.com"
                                                        className="w-full px-5 py-4 rounded-xl bg-gray-50 border-2 border-gray-100 text-gray-900 outline-none focus:bg-white focus:border-indigo-600 transition-all font-bold text-base placeholder:text-gray-300 placeholder:font-medium shadow-sm"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <label className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.3em] ml-1">Subject Vertical</label>
                                                <select
                                                    name="subject"
                                                    value={form.subject}
                                                    onChange={handleChange}
                                                    className="w-full px-5 py-4 rounded-xl bg-gray-50 border-2 border-gray-100 text-gray-900 outline-none focus:bg-white focus:border-indigo-600 transition-all font-bold text-base cursor-pointer shadow-sm"
                                                >
                                                    <option>Strategic Recruitment Query</option>
                                                    <option>Enterprise Technical Solution</option>
                                                    <option>Corporate Partnership</option>
                                                    <option>Other Strategic Inquiry</option>
                                                </select>
                                            </div>

                                            <div className="space-y-3">
                                                <label className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.3em] ml-1">Message Payload</label>
                                                <textarea
                                                    name="message"
                                                    value={form.message}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Describe your objectives and success metrics..."
                                                    rows="4"
                                                    className="w-full px-5 py-4 rounded-xl bg-gray-50 border-2 border-gray-100 text-gray-900 outline-none focus:bg-white focus:border-indigo-600 transition-all font-bold text-base resize-none placeholder:text-gray-300 placeholder:font-medium shadow-sm"
                                                ></textarea>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full py-5 bg-[#0f172a] hover:bg-indigo-600 text-white rounded-xl font-black uppercase tracking-[0.3em] text-[10px] shadow-lg transition-all duration-300 flex items-center justify-center gap-4 group/btn disabled:opacity-50"
                                            >
                                                {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : (
                                                    <>
                                                        Transmit Pulse
                                                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
