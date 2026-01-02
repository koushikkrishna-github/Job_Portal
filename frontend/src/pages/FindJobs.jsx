import { useState, useEffect } from "react";
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

    // Core States
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("All");

    // Application Modal state
    const [applyingJob, setApplyingJob] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showShareToast, setShowShareToast] = useState(false);
    const [serverStatus, setServerStatus] = useState("checking"); // checking, online, offline

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
        // Check Server Health
        const verifyServer = async () => {
            try {
                const res = await fetch(`${import.meta.env.PROD ? "/api" : "http://localhost:5000/api"}/health`);
                if (res.ok) setServerStatus("online");
                else setServerStatus("offline");
            } catch (e) {
                console.error("Server check failed:", e);
                setServerStatus("offline");
            }
        };

        verifyServer();
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const data = await getJobs();
            if (data && data.length > 0) {
                setJobs(data);
            } else {
                setJobs(STATIC_JOBS);
            }
        } catch (err) {
            console.error("Failed to load jobs, using static data", err);
            setJobs(STATIC_JOBS);
        } finally {
            setLoading(false);
        }
    };

    const STATIC_JOBS = [
        {
            id: "job_2025_001",
            title: "Senior Full Stack Engineer",
            company: "TechFlow Systems",
            location: "Bangalore (Hybrid)",
            type: "Full-time",
            experienceLevel: "Experienced",
            description: "We are seeking a Senior Full Stack Engineer to architect and build scalable enterprise solutions. You will lead a squad of developers, driving technical decisions for our core cloud platform using React, Node.js, and AWS. The ideal candidate has a strong background in distributed systems and a passion for clean, maintainable code.",
            requirements: ["5+ years experience with MERN/MEAN stack", "Deep understanding of Microservices architecture", "Experience with AWS (Lambda, ECS, DynamoDB)", "Proven leadership in Agile environments"],
            status: "Active",
            skills: ["React", "Node.js", "AWS"]
        },
        {
            id: "job_2025_002",
            title: "Lead Data Scientist (AI/ML)",
            company: "DataMinds Corp",
            location: "Hyderabad (On-site)",
            type: "Full-time",
            experienceLevel: "Experienced",
            description: "Join our advanced AI research division to build next-generation predictive models. You will work on Large Language Models (LLMs) and computer vision systems that power our flagship products. This role requires a robust mathematical foundation and expert-level Python skills.",
            requirements: ["M.Tech or PhD in Computer Science/Statistics", "Expertise in PyTorch, TensorFlow, and HuggingFace", "Experience deploying ML models to production", "Strong publication record is a plus"],
            status: "Active",
            skills: ["Python", "PyTorch", "AI/ML"]
        },
        {
            id: "job_2025_003",
            title: "UI/UX Design Intern",
            company: "Creative Pulse",
            location: "Mumbai (Remote)",
            type: "Internship",
            experienceLevel: "Fresher",
            description: "Start your design career with Creative Pulse. We are looking for a creative intern to assist in redesigning our mobile application suite. You will learn from senior designers and help translate user needs into intuitive interfaces.",
            requirements: ["Basic knowledge of Figma", "Strong eye for detail", "willingness to learn Mobile Design Systems", "A portfolio of concept projects"],
            status: "Active",
            skills: ["Figma", "UI Design", "Prototyping"]
        },
        {
            id: "job_2025_004",
            title: "Junior DevOps Engineer",
            company: "CloudScale Infra",
            location: "Pune (Remote)",
            type: "Full-time",
            experienceLevel: "Fresher",
            description: "Kickstart your career in Cloud Infrastructure. You will assist in maintaining CI/CD pipelines and monitoring global infrastructure. This is a great opportunity to learn Kubernetes and Terraform under expert guidance.",
            requirements: ["Basic Linux administration skills", "Familiarity with Docker concepts", "Knowledge of Python basics", "Eager to learn Cloud technologies"],
            status: "Active",
            skills: ["Linux", "Docker", "Python"]
        },
        {
            id: "job_2025_005",
            title: "iOS Developer Trainee",
            company: "AppWorks Studio",
            location: "Bangalore",
            type: "Full-time",
            experienceLevel: "Fresher",
            description: "We are hiring fresh graduates to join our iOS team. You will be trained in Swift and SwiftUI to build world-class mobile applications. We value logical thinking and a passion for mobile technology.",
            requirements: ["B.Tech/BE in Computer Science", "Basic understanding of Swift/Objective-C", "Academic project in Mobile Dev is a plus", "Good algorithmic skills"],
            status: "Active",
            skills: ["Swift", "iOS", "Xcode"]
        },
        {
            id: "job_2025_006",
            title: "Technical Product Analyst",
            company: "Innovate Fintech",
            location: "Gurgaon",
            type: "Full-time",
            experienceLevel: "Fresher",
            description: "Bridge the gap between business and tech. As an Analyst, you will help document requirements and test new features for our payments gateway. Perfect for engineers who love product management.",
            requirements: ["B.Tech or MBA (Freshers)", "Great written communication skills", "Analytical mindset", "Interest in Fintech domain"],
            status: "Active",
            skills: ["Analysis", "Documentation", "Agile"]
        },
        {
            id: "job_2025_007",
            title: "Junior Backend Developer (Golang)",
            company: "StreamLine Media",
            location: "Remote",
            type: "Contract",
            experienceLevel: "Fresher",
            description: "We are looking for a Junior Developer to join our video streaming backend team. You will be mentored to write high-performance Go code and understand distributed systems.",
            requirements: ["Strong grasp of any programming language (C++/Java/Go)", "Understanding of Basic Networking", "Interest in Backend Engineering", "Good problem solving skills"],
            status: "Active",
            skills: ["Golang", "Backend", "SQL"]
        },
        {
            id: "job_2025_008",
            title: "QA Automation Engineer",
            company: "Reliable Soft",
            location: "Chennai",
            type: "Full-time",
            experienceLevel: "Fresher",
            description: "Design and implement automated test frameworks for our web and mobile platforms. You will move us away from manual testing to a fully CI/integrated automated testing culture using Selenium and Appium.",
            requirements: ["Experience building frameworks with Selenium/Playwright", "Proficiency in Java or Python", "Experience enabling CI/CD test gates", "Strong understanding of SDLC and bug life cycle"],
            status: "Active",
            skills: ["Selenium", "Java", "Testing"]
        },
        {
            id: "job_2025_009",
            title: "Cyber Security Analyst",
            company: "SecurNet Global",
            location: "Noida",
            type: "Full-time",
            experienceLevel: "Fresher",
            description: "Protect our enterprise assets from cyber threats. You will monitor SOC dashboards, perform vulnerability assessments, and lead incident response activities. This is a high-responsibility role requiring integrity and quick thinking.",
            requirements: ["CEH or CISSP certification", "Experience with SIEM tools (Splunk/QRadar)", "Knowledge of OWASP Top 10", "Network forensics and packet analysis skills"],
            status: "Active",
            skills: ["Security", "Network", "SOC"]
        }
    ];

    // Filter Logic
    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase());

        let matchesType = true;
        if (filterType === "Fresher") {
            matchesType = job.experienceLevel === "Fresher" || (job.experience && job.experience.toLowerCase().includes("fresher"));
        } else if (filterType === "Experienced") {
            matchesType = job.experienceLevel === "Experienced" || (job.experience && !job.experience.toLowerCase().includes("fresher"));
        } else if (filterType !== "All") {
            matchesType = job.type === filterType;
        }

        return matchesSearch && matchesType;
    });

    const categories = [
        "All", "Fresher", "Experienced", "Full-time", "Internship", "Contract"
    ];

    return (
        <div className="flex flex-col bg-gray-50 font-['Plus_Jakarta_Sans'] min-h-screen">
            {/* Success Toast */}
            {showSuccess && (
                <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[9999] animate-fadeIn">
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

            {/* Server Offline Warning */}
            {serverStatus === "offline" && (
                <div className="bg-red-500 text-white px-6 py-2 text-center text-xs font-bold uppercase tracking-widest sticky top-0 z-[50]">
                    Backend Server Disconnected — Applications May Fail
                </div>
            )}

            {/* Simplified Hero */}
            <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-[#0f172a] text-white overflow-hidden rounded-b-[3rem] shadow-2xl">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-indigo-600 rounded-full blur-[150px]" />
                    <div className="absolute bottom-[-20%] left-[-10%] w-[70%] h-[70%] bg-emerald-600 rounded-full blur-[150px]" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">


                    <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-6 animate-fadeInDown">
                        Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Next Role.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-indigo-100/70 max-w-2xl mx-auto mb-12 font-medium leading-relaxed animate-fadeInUp">
                        Explore exclusive opportunities in Tech, AI, and Engineering.
                    </p>

                    {/* Modern Search Bar */}
                    <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-[2rem] flex flex-col md:flex-row gap-2 shadow-xl animate-fadeInUp delay-100">
                        <div className="flex-1 relative">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by role or company..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-14 pr-6 py-4 bg-transparent text-white placeholder:text-gray-400 focus:outline-none font-medium"
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto p-1 scrollbar-hide">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setFilterType(cat)}
                                    className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap ${filterType === cat
                                        ? 'bg-white text-gray-900 shadow-lg'
                                        : 'bg-white/5 text-white hover:bg-white/10'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Job Grid */}
            <section className="py-20 px-6 max-w-7xl mx-auto w-full">
                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map(n => (
                            <div key={n} className="h-64 bg-white rounded-[2rem] animate-pulse shadow-sm" />
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-end mb-10">
                            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
                                {filteredJobs.length} <span className="text-gray-400">Positions Available</span>
                            </h2>
                        </div>

                        {filteredJobs.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-[2rem] shadow-sm border border-gray-100">
                                <div className="inline-flex p-6 bg-gray-50 rounded-full mb-6">
                                    <Search className="w-8 h-8 text-gray-300" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No positions found</h3>
                                <p className="text-gray-400">Try adjusting your search criteria</p>
                                <button onClick={() => { setSearchTerm(""); setFilterType("All"); }} className="mt-6 text-indigo-600 font-bold uppercase text-xs tracking-widest hover:underline">
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredJobs.map((job) => (
                                    <div key={job.id} className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group cursor-pointer" onClick={() => navigate(`/jobs/${job.id}`)}>
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                                                <Briefcase className="w-7 h-7 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                                            </div>
                                            <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-gray-100">
                                                {job.type}
                                            </span>
                                            {job.experienceLevel && (
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${job.experienceLevel === 'Fresher'
                                                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                                    : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                                                    }`}>
                                                    {job.experienceLevel}
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="text-xl font-black text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                                            {job.title}
                                        </h3>

                                        {/* Skill Tags */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {job.skills && job.skills.slice(0, 3).map(skill => (
                                                <span key={skill} className="px-2 py-1 bg-gray-50 text-gray-500 rounded-md text-[9px] font-bold uppercase tracking-wider border border-gray-100">
                                                    {skill}
                                                </span>
                                            ))}
                                            {(!job.skills && job.requirements) && job.requirements.slice(0, 2).map((req, i) => (
                                                <span key={i} className="px-2 py-1 bg-gray-50 text-gray-500 rounded-md text-[9px] font-bold uppercase tracking-wider border border-gray-100 line-clamp-1 max-w-[120px]">
                                                    {req.split(" ")[0]} {req.split(" ")[1]}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center gap-2 mb-6">
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{job.company}</span>
                                            <CheckCircle2 className="w-3 h-3 text-blue-500" />
                                        </div>

                                        <div className="mt-auto space-y-4">
                                            <div className="flex items-center gap-3 text-sm text-gray-500 font-medium pb-6 border-b border-gray-50">
                                                <MapPin className="w-4 h-4 text-gray-300" />
                                                {job.location}
                                            </div>

                                            <div className="flex gap-2 pt-2">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setApplyingJob(job); }}
                                                    className="flex-1 py-3 bg-gray-900 text-white rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-indigo-600 transition-all shadow-lg"
                                                >
                                                    Apply
                                                </button>
                                                <button
                                                    onClick={(e) => handleShare(e, `/jobs/${job.id}`)}
                                                    className="px-4 py-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                                                >
                                                    <Share2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </section>

            {/* Application Modal */}
            {applyingJob && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
                    <div className="absolute inset-0 bg-[#0f172a]/95 backdrop-blur-3xl" onClick={() => setApplyingJob(null)} />
                    <div className="relative w-full max-w-5xl bg-white rounded-[3rem] shadow-2xl z-10 overflow-hidden h-[90vh] flex flex-col">
                        <div className="absolute top-8 right-8 z-20">
                            <button onClick={() => setApplyingJob(null)} className="p-3 bg-white/50 hover:bg-white rounded-full transition-all text-gray-500 hover:text-red-500">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto scrollbar-hide p-8 md:p-12">
                            <ApplicationForm
                                job={applyingJob}
                                onBack={() => setApplyingJob(null)}
                                onSuccess={() => { setApplyingJob(null); setShowSuccess(true); setTimeout(() => setShowSuccess(false), 5000); }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
