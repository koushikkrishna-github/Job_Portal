import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    Search, Briefcase, MapPin, Sparkles, TrendingUp,
    ArrowRight, Code2, Database, Shield, Globe,
    Cpu, Users, Filter, Star, RefreshCw, CheckCircle2,
    GraduationCap, Calendar, Zap, Layout, X,
    Clock, Info, Target, ListChecks, Gem,
    DollarSign, Compass, Rocket, Share2
} from "lucide-react";
import { getJobs } from "../api";
import ApplicationForm from "../components/ApplicationForm";

export default function FindJobs() {
    const navigate = useNavigate();
    const { jobId } = useParams();
    const matchedSectionRef = useRef(null);

    // Core States
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // Wizard States
    const [wizardStep, setWizardStep] = useState(1);
    const [selections, setSelections] = useState({
        background: "",
        batch: "",
        interest: ""
    });
    const [matchedJobs, setMatchedJobs] = useState([]);
    const [showResults, setShowResults] = useState(false);

    // Application Modal state
    const [applyingJob, setApplyingJob] = useState(null);
    const [viewingJob, setViewingJob] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showShareToast, setShowShareToast] = useState(false);

    const handleShare = async (e, path) => {
        try {
            e?.stopPropagation();
            const url = path ? `${window.location.origin}${path}` : window.location.href;
            await navigator.clipboard.writeText(url);
            setShowShareToast(true);
            setTimeout(() => setShowShareToast(false), 3000);
        } catch (err) {
            console.error("Failed to copy link", err);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    // Deep Linking Effect
    useEffect(() => {
        if (jobId && jobs.length > 0) {
            const linkedJob = jobs.find(j => j.id.toString() === jobId);
            if (linkedJob) {
                setViewingJob(linkedJob);
            }
        } else {
            setViewingJob(null);
        }
    }, [jobId, jobs]);

    const fetchJobs = async () => {
        try {
            const data = await getJobs();
            setJobs(data);
        } catch (err) {
            console.error("Failed to load jobs", err);
        } finally {
            setLoading(false);
        }
    };

    const categories = [
        { title: "Software Engineering", icon: Code2, impact: "Full-Cycle Development", color: "bg-indigo-50 text-indigo-600" },
        { title: "Data & AI", icon: Database, impact: "Predictive Intelligence", color: "bg-emerald-50 text-emerald-600" },
        { title: "Cloud & DevOps", icon: Globe, impact: "Scalable Infrastructure", color: "bg-blue-50 text-blue-600" },
        { title: "Cyber Security", icon: Shield, impact: "Digital Defense", color: "bg-purple-50 text-purple-600" },
        { title: "Core Engineering", icon: Cpu, impact: "Hardware Optimization", color: "bg-orange-50 text-orange-600" },
        { title: "Management", icon: Users, impact: "Operational Excellence", color: "bg-rose-50 text-rose-600" },
    ];

    const wizardOptions = {
        backgrounds: [
            { id: "cs_it", label: "CS / IT Engineering", icon: Code2 },
            { id: "electronics", label: "Electronics / ECE", icon: Cpu },
            { id: "core", label: "Mechanical Core", icon: Layout },
            { id: "management", label: "MBA / Management", icon: Users }
        ],
        batches: ["Batch 2025", "Batch 2026", "Batch 2024 & Prior"],
        interests: [
            { id: "sde", label: "Software Systems", category: "Software Engineering" },
            { id: "data", label: "Neural Networks & AI", category: "Data & AI" },
            { id: "core_eng", label: "Precision Systems", category: "Core Engineering" },
            { id: "biz", label: "Strategic Ops", category: "Management" }
        ]
    };

    const handleWizardSelect = (field, value) => {
        const newSelections = { ...selections, [field]: value };
        setSelections(newSelections);

        if (wizardStep < 3) {
            setWizardStep(wizardStep + 1);
        } else {
            processMatches(newSelections);
        }
    };

    const processMatches = (finalSelections) => {
        const filtered = jobs.filter(job => {
            const matchesInterest = job.category === finalSelections.interest ||
                job.title.toLowerCase().includes(finalSelections.interest.toLowerCase());
            return matchesInterest;
        });

        setMatchedJobs(filtered.slice(0, 4));
        setShowResults(true);
        setTimeout(() => {
            matchedSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/careers?search=${encodeURIComponent(searchTerm)}`);
        }
    };

    const resetWizard = () => {
        setWizardStep(1);
        setSelections({ background: "", batch: "", interest: "" });
        setShowResults(false);
    };

    return (
        <div className="flex flex-col bg-white font-['Plus_Jakarta_Sans'] overflow-hidden">
            {/* Success Toast */}
            {showSuccess && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-fadeIn">
                    <div className="bg-[#0f172a] text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-indigo-500/30">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        <span className="font-bold text-sm tracking-tight uppercase">Application Transmitted</span>
                    </div>
                </div>
            )}

            {/* Share Toast */}
            {showShareToast && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-fadeIn">
                    <div className="bg-[#0f172a] text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-indigo-500/30">
                        <Share2 className="w-5 h-5 text-indigo-400" />
                        <span className="font-bold text-sm tracking-tight uppercase">Link Copied to Clipboard</span>
                    </div>
                </div>
            )}

            {/* Immersive Strategic Hero */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-[#0f172a] text-white overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-indigo-600 rounded-full blur-[150px]" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-emerald-600 rounded-full blur-[150px]" />
                </div>

                <div className="max-w-[1440px] mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 text-indigo-400 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase border border-indigo-500/20 mb-2 animate-fadeIn">
                                Career Discovery Protocol
                            </div>
                            <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[1.0] animate-fadeInDown">
                                Your Next <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Great Ascent.</span>
                            </h1>
                            <p className="text-lg md:text-xl text-indigo-100/70 max-w-xl leading-relaxed font-medium animate-fadeInUp">
                                Transcend standard search. Navigate the 2025-2026 technical landscape through our strategic matching engine.
                            </p>
                        </div>

                        {/* Strategic Discovery Wizard */}
                        <div className="bg-white rounded-[2rem] p-8 shadow-[0_32px_128px_-32px_rgba(0,0,0,0.5)] border border-white/10 relative overflow-hidden">
                            <div className="flex gap-4 mb-8">
                                {[1, 2, 3].map(s => (
                                    <div key={s} className={`h-1.5 flex-1 rounded-full transition-all duration-700 ${s <= wizardStep ? 'bg-indigo-600' : 'bg-gray-100'}`} />
                                ))}
                            </div>

                            {wizardStep === 1 && (
                                <div className="space-y-6 animate-fadeIn">
                                    <h3 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">Academic Foundation.</h3>
                                    <div className="grid gap-3">
                                        {wizardOptions.backgrounds.map(opt => (
                                            <button key={opt.id} onClick={() => handleWizardSelect('background', opt.label)} className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-indigo-600 hover:bg-indigo-50/50 transition-all text-left group">
                                                <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-white transition-colors">
                                                    <opt.icon className="w-5 h-5 text-gray-400 group-hover:text-indigo-600" />
                                                </div>
                                                <span className="text-sm font-black text-gray-700 uppercase tracking-tight group-hover:text-indigo-600">{opt.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {wizardStep === 2 && (
                                <div className="space-y-6 animate-fadeIn">
                                    <button onClick={() => setWizardStep(1)} className="text-indigo-600 text-[10px] font-bold uppercase tracking-[0.2em]">← Foundation</button>
                                    <h3 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">Target Batch.</h3>
                                    <div className="grid gap-3">
                                        {wizardOptions.batches.map(batch => (
                                            <button key={batch} onClick={() => handleWizardSelect('batch', batch)} className="flex items-center justify-between p-5 rounded-xl border-2 border-gray-100 hover:border-indigo-600 hover:bg-indigo-50/50 transition-all group">
                                                <span className="text-sm font-black text-gray-700 uppercase tracking-tight">{batch}</span>
                                                <Calendar className="w-5 h-5 text-gray-300 group-hover:text-indigo-600" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {wizardStep === 3 && (
                                <div className="space-y-6 animate-fadeIn">
                                    <button onClick={() => setWizardStep(2)} className="text-indigo-600 text-[10px] font-bold uppercase tracking-[0.2em]">← Timeline</button>
                                    <h3 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">Select Vector.</h3>
                                    <div className="grid gap-3">
                                        {wizardOptions.interests.map(int => (
                                            <button key={int.id} onClick={() => handleWizardSelect('interest', int.category)} className="flex items-center justify-between p-5 rounded-xl border-2 border-gray-100 hover:border-indigo-600 hover:bg-indigo-50/50 transition-all group">
                                                <span className="text-sm font-black text-gray-700 uppercase tracking-tight">{int.label}</span>
                                                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-600" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Matched Protocols */}
            {showResults && (
                <section ref={matchedSectionRef} className="py-20 md:py-32 bg-gray-50 scroll-mt-20">
                    <div className="max-w-[1440px] mx-auto px-6">
                        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
                            <div className="space-y-4">
                                <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase">High-Fit <span className="text-indigo-600">Roles.</span></h2>
                                <p className="text-lg text-gray-500 font-medium">Strategic matches for <span className="text-indigo-600 font-black">{selections.background}</span> / <span className="text-indigo-600 font-black">{selections.batch}</span>.</p>
                            </div>
                            <button onClick={resetWizard} className="px-6 py-3 bg-white border border-gray-200 text-gray-900 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-900 transition-all shadow-lg">Reset Search</button>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {matchedJobs.map((job) => (
                                <div key={job.id} className="bg-white p-8 rounded-[2rem] shadow-lg hover:shadow-xl transition-all group border border-gray-50">
                                    <div className="flex gap-6">
                                        <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600 transition-all shadow-md">
                                            <Briefcase className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-3">
                                                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">{job.title}</h3>
                                                <div className="flex items-center gap-3">
                                                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-widest">{job.type}</span>
                                                    <button onClick={(e) => handleShare(e, `/jobs/${job.id}`)} className="text-gray-300 hover:text-indigo-600 transition-colors" title="Share Job">
                                                        <Share2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 mb-6">
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">{job.company}</p>
                                                <div className="flex items-center gap-1 px-1.5 py-0.5 bg-blue-50 rounded border border-blue-100" title="Verified Employer">
                                                    <CheckCircle2 className="w-3 h-3 text-blue-500" />
                                                    <span className="text-[8px] font-bold text-blue-600 uppercase tracking-wider">Verified</span>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <button onClick={() => navigate(`/jobs/${job.id}`)} className="py-4 bg-gray-50 text-gray-900 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-100 transition-all">Details</button>
                                                <button onClick={() => setApplyingJob(job)} className="py-4 bg-[#0f172a] text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-600 transition-all shadow-lg">Apply Now</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Domain Verticals */}
            <section className="py-20 md:py-32 bg-white">
                <div className="max-w-[1440px] mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase">Domain <span className="text-indigo-600">Verticals.</span></h2>
                        <form onSubmit={handleSearch} className="flex-grow max-w-lg w-full relative">
                            <input type="text" placeholder="Search specific role vertical..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-14 pr-6 py-6 bg-gray-50 border-2 border-gray-100 rounded-[1.5rem] focus:border-indigo-600 transition-all font-bold text-lg placeholder:text-gray-300" />
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                        </form>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.map((cat, i) => (
                            <Link key={i} to={`/careers?search=${encodeURIComponent(cat.title)}`} className="group p-10 rounded-[2rem] border border-gray-100 bg-white hover:border-indigo-600 hover:shadow-xl transition-all duration-500">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${cat.color} group-hover:scale-110 transition-transform shadow-md`}>
                                    <cat.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tight">{cat.title}</h3>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-10">{cat.impact}</p>
                                <div className="flex items-center justify-between text-xs font-black text-indigo-600 uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                                    Explore Domain <ArrowRight className="w-5 h-5" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 md:py-32 px-6 bg-[#0f172a] text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[100px]" />
                <div className="relative z-10 max-w-4xl mx-auto space-y-12">
                    <h2 className="text-3xl md:text-6xl font-black text-white tracking-tighter uppercase leading-[0.95]">Architect Your <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Future Here.</span></h2>
                    <Link to="/contact" className="inline-flex items-center gap-4 px-10 py-5 bg-white text-gray-900 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-indigo-600 hover:text-white transition-all shadow-xl">Enter Talent Pool <ArrowRight className="w-5 h-5" /></Link>
                </div>
            </section>

            {/* Modals */}
            {(applyingJob || viewingJob) && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
                    <div className="absolute inset-0 bg-[#0f172a]/95 backdrop-blur-3xl" onClick={() => { setApplyingJob(null); navigate('/find-jobs'); }} />
                    <div className="relative w-full max-w-5xl bg-white rounded-[3rem] shadow-2xl z-10 overflow-hidden">
                        <div className="absolute top-10 right-10 flex gap-4">
                            <button onClick={handleShare} className="p-4 bg-gray-50 rounded-full text-indigo-600 hover:bg-indigo-50 transition-all"><Share2 className="w-6 h-6" /></button>
                            <button onClick={() => { setApplyingJob(null); navigate('/find-jobs'); }} className="p-4 bg-gray-50 rounded-full text-gray-400 hover:text-gray-900 transition-all"><X className="w-6 h-6" /></button>
                        </div>
                        {viewingJob && !applyingJob && (
                            <div className="p-12 md:p-20 overflow-y-auto max-h-[90vh]">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-[10px] font-mono tracking-widest">REF: {viewingJob.id}</span>
                                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-widest">{viewingJob.type}</span>
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase mb-6">{viewingJob.title}</h2>
                                <div className="flex flex-wrap gap-10 text-sm font-bold text-gray-400 uppercase tracking-widest mb-16">
                                    <div className="flex items-center gap-2 text-indigo-600">
                                        <span>@ {viewingJob.company}</span>
                                        <CheckCircle2 className="w-4 h-4 text-blue-500" />
                                    </div>
                                    <span className="flex items-center gap-2"><MapPin className="w-5 h-5" /> {viewingJob.location}</span>
                                </div>
                                <p className="text-xl text-gray-500 leading-relaxed font-medium mb-16">{viewingJob.description}</p>
                                <button onClick={() => setApplyingJob(viewingJob)} className="w-full py-8 bg-[#0f172a] text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs shadow-2xl hover:bg-indigo-600 transition-all">Initiate Application Protocol</button>
                            </div>
                        )}
                        {applyingJob && (
                            <div className="p-12 md:p-20 overflow-y-auto max-h-[90vh] scrollbar-hide">
                                <ApplicationForm job={applyingJob} onBack={() => setApplyingJob(null)} onSuccess={() => { setApplyingJob(null); setShowSuccess(true); setTimeout(() => setShowSuccess(false), 5000); }} />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
