import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Briefcase, MapPin, Clock, DollarSign, ChevronRight, ArrowLeft,
  Users, Search, Filter, Sparkles, TrendingUp, Award, Target,
  CheckCircle2, Upload, X, FileText, Calendar, Building2, RefreshCw, ArrowRight, Shield
} from "lucide-react";
import { applyJob, getJobs } from "../api";
import ApplicationForm from "../components/ApplicationForm";

// JobCard Component
function JobCard({ job, onApply, index }) {
  return (
    <div
      className="group relative bg-white border border-gray-100 rounded-[2rem] p-6 md:p-8 hover:border-indigo-200 transition-all duration-500 hover:shadow-xl cursor-pointer animate-fadeInUp animate-fill-both"
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => onApply(job)}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Strategic Role
          </div>
          <h3 className="text-xl md:text-2xl font-black text-gray-900 group-hover:text-indigo-600 transition-colors leading-tight tracking-tight">
            {job.title}
          </h3>
          <p className="text-xs text-indigo-500 font-bold uppercase tracking-[0.3em] mt-2">
            {job.company}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="space-y-3">
          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-indigo-50 transition-all">
            <MapPin className="w-5 h-5 text-gray-300 group-hover:text-indigo-600" />
          </div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{job.location}</p>
        </div>
        <div className="space-y-3">
          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-emerald-50 transition-all">
            <DollarSign className="w-5 h-5 text-gray-300 group-hover:text-emerald-600" />
          </div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{job.salary}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {(job.skills || []).slice(0, 3).map((skill, idx) => (
          <span key={idx} className="px-3 py-1.5 bg-gray-50 text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] rounded-lg border border-gray-100">
            {skill}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          {job.applicants || 0} Applicants
        </div>
        <div className="flex items-center gap-2 text-indigo-600 font-bold uppercase tracking-[0.3em] text-[10px] group-hover:gap-3 transition-all">
          Explore Role
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

// JobDetails Component
function JobDetails({ job, onBack, onApplyNow }) {
  return (
    <div className="max-w-[1440px] mx-auto animate-fadeIn font-['Plus_Jakarta_Sans']">
      <button
        onClick={onBack}
        className="group flex items-center gap-3 text-gray-400 hover:text-indigo-600 mb-8 transition-all font-bold uppercase tracking-[0.3em] text-[10px]"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
        Return to Portal
      </button>

      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-8 space-y-10">
          <div className="bg-white border border-gray-100 rounded-[2rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
              <Building2 className="w-[200px] h-[200px]" />
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 pb-12 border-b border-gray-50">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-[0.3em]">
                  Active Engagement
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter leading-[1.0]">{job.title}</h1>
                <p className="text-lg text-indigo-500 font-bold uppercase tracking-[0.3em]">{job.company}</p>
              </div>
              <div className="flex flex-col md:items-end gap-4">
                <span className="px-6 py-2 bg-[#0f172a] text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.3em] shadow-lg">
                  {job.type}
                </span>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  Indexed: {job.postedDate || "24h ago"}
                </p>
              </div>
            </div>

            <div className="space-y-12">
              <div className="max-w-4xl">
                <h2 className="text-xl font-black text-gray-900 mb-6 tracking-tight flex items-center gap-3">
                  <div className="w-2 h-6 bg-indigo-600 rounded-full" />
                  Executive Summary
                </h2>
                <p className="text-lg text-gray-500 leading-relaxed font-medium">
                  {job.description}
                </p>
              </div>

              {job.responsibilities && job.responsibilities.length > 0 && (
                <div className="max-w-4xl">
                  <h2 className="text-xl font-black text-gray-900 mb-8 tracking-tight flex items-center gap-3">
                    <div className="w-2 h-6 bg-emerald-500 rounded-full" />
                    Strategic Responsibilities
                  </h2>
                  <div className="grid gap-4">
                    {job.responsibilities.map((resp, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-50 hover:border-indigo-100 transition-all">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                        <span className="text-gray-700 text-base leading-relaxed font-medium">{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-28 space-y-6">
            <div className="bg-[#0f172a] rounded-[2rem] p-8 md:p-12 text-white shadow-xl relative overflow-hidden group">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full blur-3xl" />
              </div>

              <h3 className="text-[10px] font-bold mb-8 border-b border-white/10 pb-6 uppercase tracking-[0.3em] text-indigo-400">Position Integrity</h3>

              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 shadow-lg group-hover:bg-indigo-600 transition-all">
                    <MapPin className="text-indigo-400 w-6 h-6 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-indigo-100/40 font-bold uppercase tracking-[0.3em] mb-1">HQ / Remote</p>
                    <p className="text-lg font-bold tracking-tight">{job.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 shadow-lg group-hover:bg-emerald-600 transition-all">
                    <DollarSign className="text-emerald-400 w-6 h-6 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-indigo-100/40 font-bold uppercase tracking-[0.3em] mb-1">Fiscal Package</p>
                    <p className="text-lg font-bold tracking-tight">{job.salary}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 shadow-lg group-hover:bg-indigo-600 transition-all">
                    <Target className="text-indigo-400 w-6 h-6 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-indigo-100/40 font-bold uppercase tracking-[0.3em] mb-1">Experience Index</p>
                    <p className="text-lg font-bold tracking-tight">{job.experience}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={onApplyNow}
                className="w-full mt-12 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold uppercase tracking-[0.2em] text-xs shadow-xl transition-all hover:-translate-y-1 active:scale-[0.98]"
              >
                Initiate Application
              </button>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-[2rem] p-8 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
                <Users className="w-4 h-4 text-indigo-600" />
                Community Insight
              </div>
              <p className="text-gray-500 text-base leading-relaxed font-medium">
                Join <span className="text-indigo-600 font-black">{job.applicants || 42} leading candidates</span> currently vying for this strategic role.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main CareerPortal Component
export default function CareerPortal() {
  const [searchParams] = useSearchParams();
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [filters, setFilters] = useState({ type: "All Types", experience: "All Levels" });
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(data);
    } catch (err) {
      console.error("Failed to load jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filters.type === "All Types" || job.type === filters.type;
    const matchesExp = filters.experience === "All Levels" || job.experience === filters.experience;

    return matchesSearch && matchesType && matchesExp;
  });

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowApplicationForm(false);
  };

  const handleApplySuccess = () => {
    setShowApplicationForm(false);
    setSelectedJob(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="text-center">
          <RefreshCw className="w-16 h-16 animate-spin text-indigo-600 mx-auto mb-10" />
          <h2 className="text-white font-bold tracking-[0.5em] uppercase text-xs animate-pulse">Initializing Nexus...</h2>
        </div>
      </div>
    );
  }

  if (showApplicationForm && selectedJob) {
    return (
      <div className="min-h-screen bg-white py-24 md:py-32 px-6 flex justify-center">
        <div className="w-full max-w-4xl">
          <ApplicationForm
            job={selectedJob}
            onBack={() => setShowApplicationForm(false)}
            onSuccess={handleApplySuccess}
          />
        </div>
      </div>
    );
  }

  if (selectedJob) {
    return (
      <div className="min-h-screen bg-white py-24 md:py-32 px-6">
        <JobDetails
          job={selectedJob}
          onBack={() => setSelectedJob(null)}
          onApplyNow={() => setShowApplicationForm(true)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-['Plus_Jakarta_Sans'] overflow-hidden">
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-fadeIn">
          <div className="bg-[#0f172a] text-white px-8 py-4 rounded-xl shadow-2xl flex items-center gap-4 border border-indigo-500/30">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-sm tracking-tight uppercase">Application Transmitted</span>
          </div>
        </div>
      )}

      {/* Expanded Search Header */}
      <div className="relative bg-[#0f172a] text-white pt-32 pb-20 md:pt-40 md:pb-32 px-6 overflow-hidden text-center">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-indigo-600 rounded-full blur-[150px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] bg-blue-600 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-[1440px] mx-auto relative z-10 space-y-8">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-400 backdrop-blur-xl animate-fadeIn">
            Strategic Ecosystem
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-[1.0] uppercase animate-fadeInDown">
            Your Next <br className="hidden lg:block" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Great Ascent.</span>
          </h1>
          <p className="text-lg md:text-xl text-indigo-100/70 max-w-3xl mx-auto font-medium animate-fadeInUp">
            Discover technical opportunities at South India's most innovative technology companies. Bridge the gap between talent and global impact.
          </p>

          <div className="max-w-2xl mx-auto mt-12 relative px-4 group">
            <div className="absolute inset-y-0 left-8 flex items-center pointer-events-none transition-all group-focus-within:translate-x-1">
              <Search className="h-5 w-5 text-indigo-400" />
            </div>
            <input
              type="text"
              className="w-full pl-16 pr-8 py-5 rounded-2xl text-white bg-white/5 backdrop-blur-3xl border-2 border-white/10 placeholder-gray-500 focus:bg-white focus:text-gray-900 focus:border-white transition-all text-lg font-bold shadow-2xl"
              placeholder="Search for roles (e.g. Java, Python, AI Engineer)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 py-20 md:py-28">
        {/* Strategic Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 mb-16 pb-8 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
              <Filter className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] mb-1">Catalog Filters</p>
              <p className="font-black text-gray-900 uppercase text-2xl tracking-tight">Refine Pulse</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {["type", "experience"].map(filterKey => (
              <select
                key={filterKey}
                className="bg-white border-2 border-gray-100 rounded-xl py-4 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 outline-none focus:bg-white focus:border-indigo-600 transition-all cursor-pointer shadow-sm hover:shadow-lg hover:border-gray-200"
                value={filters[filterKey]}
                onChange={(e) => setFilters(prev => ({ ...prev, [filterKey]: e.target.value }))}
              >
                {filterKey === "type" ? (
                  <>
                    <option>All Types</option>
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                  </>
                ) : (
                  <>
                    <option>All Levels</option>
                    <option>Fresher</option>
                    <option>0-2 Years</option>
                    <option>2-5 Years</option>
                    <option>5+ Years</option>
                  </>
                )}
              </select>
            ))}
          </div>

          <div className="lg:ml-auto text-right">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-1">Current Opportunities</p>
            <p className="font-black text-indigo-600 uppercase text-3xl tracking-tighter">{filteredJobs.length} Roles Identified</p>
          </div>
        </div>

        {/* Dynamic Grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filteredJobs.map((job, index) => (
              <JobCard
                key={job.id}
                job={job}
                index={index}
                onApply={handleApplyClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 md:py-32 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-100 px-6">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-8">
              <Search className="w-10 h-10 text-gray-200" />
            </div>
            <h3 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 uppercase tracking-tight">Zero Matches.</h3>
            <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto">Our strategic hub is currently mapping new opportunities. Broaden your filters to capture the next wave.</p>
            <button
              onClick={() => { setSearchTerm(""); setFilters({ type: "All Types", experience: "All Levels" }) }}
              className="px-8 py-4 bg-gray-900 text-white rounded-xl font-bold uppercase tracking-[0.2em] text-[10px] shadow-xl hover:bg-indigo-600 transition-all hover:-translate-y-1"
            >
              Reset Search Protocol
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
