import { useState } from "react";
import {
    Clock, X, Upload, FileText, CheckCircle2, AlertCircle
} from "lucide-react";
import { applyJob } from "../api";

export default function ApplicationForm({ job, onBack, onSuccess }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        college: "",
        degree: "",
        year: "",
        skills: "",
        resume: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, resume: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.resume) {
            setError("Please upload your resume to continue.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const submitData = new FormData();
            submitData.append("position", job.title);
            submitData.append("name", formData.name);
            submitData.append("email", formData.email);
            submitData.append("phone", formData.phone);
            submitData.append("college", formData.college);
            submitData.append("degree", formData.degree);
            submitData.append("year", formData.year);
            submitData.append("skills", formData.skills);
            submitData.append("resume", formData.resume);

            await applyJob(submitData);
            onSuccess();
        } catch (err) {
            console.error("Application error:", err);
            setError(err.message || "Submission failed. Please check your network.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden transition-all duration-500 animate-in fade-in zoom-in-95">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-widest">
                        Official Application
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Apply for <span className="text-indigo-600">{job.title}</span></h1>
                    <p className="text-sm text-gray-400 font-medium">@ {job.company} — {job.location}</p>
                </div>
                <div className="px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 min-w-[160px] hidden md:block">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1 text-center">Estimated Time</p>
                    <p className="text-xl font-bold text-gray-900 flex items-center justify-center gap-2">
                        <Clock className="w-5 h-5 text-indigo-500" />
                        2 Mins
                    </p>
                </div>
            </div>

            {/* Job Brief for final confirmation */}
            <div className="mb-12 p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100/30">
                <h3 className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Role Overview
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed italic">
                    "{job.description || "Exciting role at " + job.company + ". Apply today to learn more."}"
                </p>
            </div>

            {error && (
                <div className="mb-10 p-6 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-4 text-red-600 animate-in fade-in slide-in-from-top-2">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-xs font-bold uppercase tracking-widest leading-relaxed">{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-10">
                {/* Personal Info */}
                <div className="space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">1</div>
                        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Personal Information</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-900 uppercase tracking-widest ml-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-xl focus:bg-white focus:border-indigo-600 outline-none transition-all font-medium text-gray-900 shadow-sm"
                                placeholder="e.g. Rahul Sharma"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-900 uppercase tracking-widest ml-1">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-xl focus:bg-white focus:border-indigo-600 outline-none transition-all font-medium text-gray-900 shadow-sm"
                                placeholder="rahul@example.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-900 uppercase tracking-widest ml-1">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-xl focus:bg-white focus:border-indigo-600 outline-none transition-all font-medium text-gray-900 shadow-sm"
                                placeholder="+91 XXXXX XXXXX"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-900 uppercase tracking-widest ml-1">Skills (Comma separated)</label>
                            <input
                                type="text"
                                name="skills"
                                value={formData.skills}
                                onChange={handleChange}
                                required
                                className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-xl focus:bg-white focus:border-indigo-600 outline-none transition-all font-medium text-gray-900 shadow-sm"
                                placeholder="React, Java, Python..."
                            />
                        </div>
                    </div>
                </div>

                {/* Academic Info */}
                <div className="space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">2</div>
                        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Academic Details</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-900 uppercase tracking-widest ml-1">College/University</label>
                            <input
                                type="text"
                                name="college"
                                value={formData.college}
                                onChange={handleChange}
                                required
                                className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-xl focus:bg-white focus:border-indigo-600 outline-none transition-all font-medium text-gray-900 shadow-sm"
                                placeholder="Your College Name"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-900 uppercase tracking-widest ml-1">Degree & Stream</label>
                            <input
                                type="text"
                                name="degree"
                                value={formData.degree}
                                onChange={handleChange}
                                required
                                className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-xl focus:bg-white focus:border-indigo-600 outline-none transition-all font-medium text-gray-900 shadow-sm"
                                placeholder="B.Tech CS"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-900 uppercase tracking-widest ml-1">Passout Year</label>
                            <select
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                required
                                className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-xl focus:bg-white focus:border-indigo-600 outline-none transition-all font-medium text-gray-900 shadow-sm"
                            >
                                <option value="">Select Year</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Resume Upload */}
                <div className="space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">3</div>
                        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Upload Resume</h2>
                    </div>

                    <div className="relative">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            required
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                            id="resume-upload-shared"
                        />
                        <label
                            htmlFor="resume-upload-shared"
                            className="flex flex-col items-center justify-center gap-4 p-10 border-2 border-dashed border-gray-100 rounded-2xl hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer group"
                        >
                            {formData.resume ? (
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <FileText className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-gray-900 text-sm">{formData.resume.name}</span>
                                        <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">Click to change</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-white transition-colors">
                                        <Upload className="w-6 h-6 text-gray-300 group-hover:text-indigo-600" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs font-bold text-gray-600 uppercase tracking-widest">Click to upload Resume</p>
                                        <p className="text-[10px] text-gray-300 uppercase mt-1 tracking-tighter">PDF, DOC, DOCX (Max 10MB)</p>
                                    </div>
                                </div>
                            )}
                        </label>
                    </div>
                </div>

                {/* Actions */}
                <div className="pt-10 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-6">
                    <button
                        type="button"
                        onClick={onBack}
                        className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-red-500 transition-colors"
                    >
                        Discard Application
                    </button>
                    <div className="flex items-center gap-6 w-full md:w-auto">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full md:w-auto px-12 py-5 bg-indigo-600 text-white rounded-2xl font-bold uppercase tracking-widest text-xs shadow-xl shadow-indigo-600/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                        >
                            {loading ? (
                                <div className="flex items-center gap-3">
                                    <RefreshCw className="w-4 h-4 animate-spin" />
                                    <span>Processing...</span>
                                </div>
                            ) : (
                                "Submit Application"
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

function RefreshCw(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M3 21v-5h5" />
        </svg>
    )
}
