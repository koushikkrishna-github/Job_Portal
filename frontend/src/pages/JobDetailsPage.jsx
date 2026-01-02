import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
    MapPin, Clock, DollarSign, ArrowLeft, Share2,
    Building2, CheckCircle2, Shield, RefreshCw
} from "lucide-react";
import { getJobById } from "../api";
import ApplicationForm from "../components/ApplicationForm";

export default function JobDetailsPage() {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showShareToast, setShowShareToast] = useState(false);
    const [isApplying, setIsApplying] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const data = await getJobById(jobId);
                setJob(data);
            } catch (err) {
                console.error("Failed to fetch job", err);
                setError("Job not found or has expired.");
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [jobId]);

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setShowShareToast(true);
            setTimeout(() => setShowShareToast(false), 3000);
        } catch (err) {
            console.error("Failed to copy link", err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
                <div className="text-center">
                    <RefreshCw className="w-16 h-16 animate-spin text-indigo-600 mx-auto mb-10" />
                    <h2 className="text-white font-bold tracking-[0.5em] uppercase text-xs animate-pulse">Loading Job...</h2>
                </div>
            </div>
        );
    }

    if (error || !job) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center max-w-md px-6">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Shield className="w-10 h-10 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 mb-4">Job Unavailable</h2>
                    <p className="text-gray-500 mb-8">{error || "The requested job position is no longer active."}</p>
                    <Link to="/find-jobs" className="px-8 py-3 bg-[#0f172a] text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-indigo-600 transition-all">
                        Return to Hub
                    </Link>
                </div>
            </div>
        );
    }

    if (isApplying) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 px-6 flex justify-center items-start">
                {showSuccess && (
                    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[9999] animate-fadeIn">
                        <div className="bg-[#0f172a] text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-indigo-500/30">
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                            <span className="font-bold text-sm tracking-tight uppercase">Application Transmitted</span>
                        </div>
                    </div>
                )}
                <div className="w-full max-w-4xl bg-white rounded-[2rem] shadow-xl overflow-hidden">
                    <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                        <button onClick={() => setIsApplying(false)} className="flex items-center gap-2 text-gray-400 hover:text-indigo-600 font-bold uppercase tracking-widest text-[10px] transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back to Details
                        </button>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Application Form</p>
                    </div>
                    <ApplicationForm
                        job={job}
                        onBack={() => setIsApplying(false)}
                        onSuccess={() => {
                            setIsApplying(false);
                            setShowSuccess(true);
                            setTimeout(() => setShowSuccess(false), 5000);
                        }}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-['Plus_Jakarta_Sans']">
            {/* Share Toast */}
            {showShareToast && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-fadeIn">
                    <div className="bg-[#0f172a] text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-indigo-500/30">
                        <Share2 className="w-5 h-5 text-indigo-400" />
                        <span className="font-bold text-sm tracking-tight uppercase">Link Copied to Clipboard</span>
                    </div>
                </div>
            )}

            <div className="max-w-[1440px] mx-auto px-6 py-12 md:py-20">
                <div className="flex justify-between items-center mb-12">
                    <Link to="/find-jobs" className="inline-flex items-center gap-3 text-gray-400 hover:text-indigo-600 transition-all font-bold uppercase tracking-[0.3em] text-[10px] group">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
                        Return to Hub
                    </Link>
                    <Link to="/find-jobs" className="md:hidden">
                        <img src="/logo.png" alt="HexaJobs" className="w-8 h-8 opacity-50 hover:opacity-100 transition-opacity" />
                    </Link>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
                    <div className="lg:col-span-8">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-[10px] font-mono tracking-widest">REF: {job.id}</span>
                            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-widest">{job.type}</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase mb-6 leading-[0.95]">{job.title}</h1>

                        <div className="flex flex-wrap gap-8 text-sm font-bold text-gray-400 uppercase tracking-widest mb-16 border-b border-gray-100 pb-12">
                            <div className="flex items-center gap-2 text-indigo-600">
                                <Building2 className="w-5 h-5" />
                                <span>{job.company}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5" />
                                <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                <span>{job.postedDate || "Recently Indexed"}</span>
                            </div>
                        </div>

                        <div className="space-y-12">
                            <div>
                                <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-tight">Job Summary</h3>
                                <p className="text-lg text-gray-500 leading-relaxed font-medium">{job.description}</p>
                            </div>

                            {job.responsibilities && (
                                <div>
                                    <h3 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tight">Responsibilities</h3>
                                    <div className="grid gap-4">
                                        {Array.isArray(job.responsibilities) ? job.responsibilities.map((res, i) => (
                                            <div key={i} className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                                <div className="mt-1 min-w-[20px]"><CheckCircle2 className="w-5 h-5 text-emerald-500" /></div>
                                                <p className="text-gray-600 font-medium">{res}</p>
                                            </div>
                                        )) : (
                                            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 text-gray-600 font-medium">{job.responsibilities}</div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-4">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-[#0f172a] rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-[150%] h-[150%] bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none" />

                                <div className="relative z-10 space-y-8">
                                    <div>
                                        <p className="text-[10px] text-indigo-300 font-bold uppercase tracking-[0.3em] mb-2">Salary</p>
                                        <p className="text-3xl font-black tracking-tight text-white">{job.salary}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-indigo-300 font-bold uppercase tracking-[0.3em] mb-2">Experience</p>
                                        <p className="text-xl font-bold tracking-tight text-white">{job.experience}</p>
                                    </div>

                                    <div className="pt-8 border-t border-white/10 space-y-4">
                                        <button onClick={() => setIsApplying(true)} className="w-full py-5 bg-white text-[#0f172a] rounded-xl font-black uppercase tracking-[0.2em] text-xs hover:bg-indigo-50 transition-all shadow-lg active:scale-95">
                                            Apply Now
                                        </button>
                                        <button onClick={handleShare} className="w-full py-5 bg-white/5 border border-white/10 text-white rounded-xl font-black uppercase tracking-[0.2em] text-xs hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                                            <Share2 className="w-4 h-4" /> Share Job
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
