import { useState, useEffect } from "react";
import {
  Users, Briefcase, Download, Filter, Search,
  Eye, Trash2, RefreshCw, TrendingUp, Calendar,
  CheckCircle, Clock, XCircle, AlertCircle, BarChart3,
  FileText, Mail, Phone, GraduationCap, Award, X,
  ChevronDown, ChevronUp, ArrowUpRight, ArrowDownRight,
  Plus, Edit2, Save, MapPin, DollarSign, Building2,
  LayoutDashboard, ShieldCheck, Activity, Globe, ArrowRight
} from "lucide-react";
import {
  getApplications,
  getStatistics,
  updateApplicationStatus,
  deleteApplication,
  downloadAdminExcel,
  viewResume,
  downloadResume,
  getJobs,
  createJob,
  updateJob,
  deleteJob
} from "../api";

// High-Fidelity Stat Card - Optimized Density
const StatCard = ({ title, value, icon: Icon, color, trend, delay }) => (
  <div
    className="group relative bg-white border border-gray-100 rounded-2xl p-5 md:p-6 hover:border-indigo-200 transition-all duration-300 hover:shadow-xl animate-fadeInUp animate-fill-both"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      {trend !== undefined && (
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold tracking-widest ${trend >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
          {trend >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{title}</p>
    <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{value}</h3>
  </div>
);

function JobManagementTab() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const data = await getJobs();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateJob = () => {
    setEditingJob(null);
    setShowJobForm(true);
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setShowJobForm(true);
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm("Protocol confirmation required: Deleting job node?")) return;

    try {
      await deleteJob(jobId);
      await fetchJobs();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <RefreshCw className="w-10 h-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Job Listings</h2>
          <p className="text-gray-400 font-medium text-sm">Manage active recruitment roles</p>
        </div>
        <button
          onClick={handleCreateJob}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          Add New Role
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job, idx) => (
          <div
            key={job.id}
            className="group bg-white border border-gray-100 rounded-2xl p-5 md:p-6 hover:border-indigo-100 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2 h-2 rounded-full ${job.status === 'Active' ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{job.status}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 tracking-tight leading-tight mb-1">{job.title}</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{job.company}</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                <MapPin className="w-4 h-4 text-gray-300" />
                {job.location}
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                <Briefcase className="w-4 h-4 text-gray-300" />
                {job.type}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-50">
              <button
                onClick={() => handleEditJob(job)}
                className="flex-1 py-3 bg-indigo-50 text-indigo-600 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-indigo-100 transition-colors"
              >
                Configure
              </button>
              <button
                onClick={() => handleDeleteJob(job.id)}
                className="p-3 text-gray-300 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {jobs.length === 0 && (
          <div className="col-span-full py-20 text-center bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-100">
            <Briefcase className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 uppercase tracking-tight mb-2">Network Idle</h3>
            <p className="text-gray-400 font-medium text-sm">No active recruitment nodes detected.</p>
          </div>
        )}
      </div>

      {showJobForm && (
        <JobFormModal
          job={editingJob}
          onClose={() => { setShowJobForm(false); fetchJobs(); }}
        />
      )}
    </div>
  );
}

function JobFormModal({ job, onClose }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(job || {
    title: "",
    company: "Nexus Staffing Solutions",
    location: "",
    type: "Full-time",
    experience: "Fresher",
    salary: "",
    description: "",
    responsibilities: [""],
    requirements: [""],
    skills: [""],
    benefits: [""],
    status: "Active"
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (job) await updateJob(job.id, formData);
      else await createJob(formData);
      onClose();
    } catch (error) {
      console.error("Error saving job:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0f172a]/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-scaleIn">
        <div className="bg-gray-50/50 border-b border-gray-100 px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              {job ? "Edit Job Posting" : "Create New Job"}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-all shadow-sm">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Job Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="w-full px-5 py-3 bg-white border-2 border-gray-100 rounded-xl focus:bg-white focus:border-indigo-600 outline-none transition-all text-gray-900 font-medium shadow-sm text-sm"
                placeholder="e.g. Software Engineer"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="w-full px-5 py-3 bg-white border-2 border-gray-100 rounded-xl focus:bg-white focus:border-indigo-600 outline-none transition-all text-gray-900 font-medium shadow-sm text-sm"
                placeholder="e.g. Hyderabad / Remote"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows="4"
              className="w-full px-5 py-3 bg-white border-2 border-gray-100 rounded-xl focus:bg-white focus:border-indigo-600 outline-none transition-all text-gray-900 font-medium shadow-sm text-sm"
            />
          </div>
        </div>

        <div className="bg-gray-50 border-t border-gray-100 px-6 py-5 flex items-center justify-between">
          <button onClick={onClose} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-red-500 transition-colors">Cancel</button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? "Saving..." : job ? "Save Changes" : "Create Posting"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ApplicationsTab() {
  const [applications, setApplications] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterPosition, setFilterPosition] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    fetchData();
  }, [filterPosition]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const filters = filterPosition !== 'all' ? { position: filterPosition } : {};
      const [appsData, statsData] = await Promise.all([
        getApplications(filters),
        getStatistics()
      ]);
      setApplications(appsData);
      setStatistics(statsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadExcel = async () => {
    try { await downloadAdminExcel(filterPosition); }
    catch (error) { console.error("Export failure:", error); }
  };

  const handleStatusChange = async (appId, newStatus) => {
    try {
      await updateApplicationStatus(appId, newStatus);
      await fetchData();
    } catch (error) { console.error("Status update failure:", error); }
  };

  const handleDelete = async (appId) => {
    if (!window.confirm("Confirm deletion of candidate dossier?")) return;
    try {
      await deleteApplication(appId);
      await fetchData();
      setSelectedApp(null);
    } catch (error) { console.error("Deletion failure:", error); }
  };

  const filteredApplications = applications.filter(app =>
    (app.Name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (app.Email?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (app.Position?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusBadge = (status) => {
    const config = {
      Pending: { bg: "bg-gray-50", text: "text-gray-400" },
      Reviewed: { bg: "bg-indigo-50", text: "text-indigo-600" },
      Shortlisted: { bg: "bg-emerald-50", text: "text-emerald-600" },
      Rejected: { bg: "bg-red-50", text: "text-red-600" }
    };
    const style = config[status] || config.Pending;
    return (
      <span className={`px-3 py-1.5 ${style.bg} ${style.text} rounded-lg text-[10px] font-bold uppercase tracking-widest`}>
        {status}
      </span>
    );
  };

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <RefreshCw className="w-10 h-10 animate-spin text-indigo-600" />
    </div>
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">Applications</h2>
          <p className="text-gray-400 font-medium font-sm text-sm">Managing {applications.length} active candidates</p>
        </div>
        <button
          onClick={handleDownloadExcel}
          className="group flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg transition-all"
        >
          <Download className="w-4 h-4" />
          Export Data
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <StatCard title="Total Dossiers" value={statistics?.total || 0} icon={Users} color="from-indigo-600 to-indigo-700" trend={12} delay={100} />
        <StatCard title="In Evaluation" value={statistics?.by_status?.Reviewed || 0} icon={Activity} color="from-emerald-600 to-emerald-700" trend={8} delay={200} />
        <StatCard title="Qualified" value={statistics?.by_status?.Shortlisted || 0} icon={ShieldCheck} color="from-purple-600 to-purple-700" trend={5} delay={300} />
        <StatCard title="Sync Nodes" value={Object.keys(statistics?.by_position || {}).length} icon={Globe} color="from-blue-600 to-blue-700" trend={0} delay={400} />
      </div>

      {/* Applications Grid */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row gap-6 items-center bg-gray-50/10">
          <div className="flex-1 relative w-full">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
            <input
              type="text"
              placeholder="Query candidate dossiers..."
              className="w-full pl-14 pr-8 py-3 bg-white rounded-xl text-gray-900 font-bold border-2 border-gray-100 focus:border-indigo-600 transition-all outline-none text-sm placeholder:text-gray-300 shadow-sm"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-6 py-3 bg-white border-2 border-gray-100 rounded-xl text-[10px] font-bold uppercase tracking-widest text-gray-900 outline-none focus:border-indigo-600 transition-all shadow-sm"
            value={filterPosition}
            onChange={e => setFilterPosition(e.target.value)}
          >
            <option value="all">All Channels</option>
            {Object.keys(statistics?.by_position || {}).map(pos => <option key={pos} value={pos}>{pos}</option>)}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">
                <th className="px-6 py-6 text-left">Candidate Name</th>
                <th className="px-6 py-6 text-left">Applied Stream</th>
                <th className="px-6 py-6 text-left">Status</th>
                <th className="px-6 py-6 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredApplications.map((app, idx) => (
                <tr key={app.ID} className="group hover:bg-indigo-50/30 transition-all duration-300 outline-none">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 font-bold group-hover:bg-indigo-600 group-hover:text-white transition-all text-sm">
                        {app.Name?.[0]}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 uppercase tracking-tight text-sm">{app.Name}</p>
                        <p className="text-[10px] text-gray-400 font-medium">{app.Email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{app.Position}</span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(app.Status || 'Pending')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="p-2 hover:bg-white rounded-xl transition-all shadow-none hover:shadow-lg group-hover:text-indigo-600 text-gray-300"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(app.ID)}
                        className="p-2 hover:bg-white rounded-xl transition-all shadow-none hover:shadow-lg hover:text-red-500 text-gray-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedApp && (
        <div className="fixed inset-0 bg-[#0f172a]/90 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-scaleIn">
            <div className="px-6 py-5 bg-gray-50 flex items-center justify-between border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">Application Details</h2>
              </div>
              <button onClick={() => setSelectedApp(null)} className="p-2 hover:bg-white rounded-xl transition-all shadow-sm">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              <section>
                <h3 className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-4">Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { label: "Full Name", val: selectedApp.Name },
                    { label: "Email Node", val: selectedApp.Email },
                    { label: "Communication", val: selectedApp.Phone },
                    { label: "Applied For", val: selectedApp.Position }
                  ].map((item, i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
                      <p className="text-base font-bold text-gray-900 tracking-tight">{item.val}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-4">Education</h3>
                <div className="p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-4">
                  <div>
                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">College/University</p>
                    <p className="text-lg font-bold text-gray-900 tracking-tight">{selectedApp.College}</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Degree</p>
                      <p className="text-base font-bold text-gray-700">{selectedApp.Degree}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Passout Year</p>
                      <p className="text-base font-bold text-gray-700">{selectedApp["Passout Year"]}</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-4">Attachments</h3>
                <button
                  onClick={() => viewResume(selectedApp["Resume File"])}
                  className="w-full p-6 bg-[#0f172a] rounded-2xl flex items-center justify-between hover:bg-[#1e293b] transition-all group"
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                      <FileText className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-white tracking-tight">{selectedApp["Resume File"]}</p>
                      <p className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest">Resume Document</p>
                    </div>
                  </div>
                  <Eye className="w-5 h-5 text-white/20 group-hover:text-white transition-all" />
                </button>
              </section>

              <section>
                <h3 className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-4">Evaluation Status</h3>
                <div className="flex flex-wrap gap-2">
                  {["Pending", "Reviewed", "Shortlisted", "Rejected"].map(status => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(selectedApp.ID, status)}
                      className={`px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all ${selectedApp.Status === status
                        ? "bg-indigo-600 text-white shadow-xl shadow-indigo-900/40 translate-y-[-2px]"
                        : "bg-gray-50 text-gray-400 border border-transparent hover:border-gray-100"
                        }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </section>
            </div>

            <div className="bg-gray-50 p-6 flex items-center justify-between border-t border-gray-100">
              <button onClick={() => handleDelete(selectedApp.ID)} className="text-[10px] font-bold text-red-500 uppercase tracking-widest hover:text-red-600 transition-colors">Delete Application</button>
              <button onClick={() => setSelectedApp(null)} className="px-8 py-3 bg-white border border-gray-200 text-gray-900 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-sm">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("applications");

  const tabs = [
    { id: "applications", label: "Intelligence", icon: LayoutDashboard },
    { id: "jobs", label: "Pipeline Config", icon: Activity }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-['Plus_Jakarta_Sans']">
      {/* Strategic Sidebar */}
      <aside className="w-full md:w-64 bg-[#0f172a] md:fixed md:h-full z-40 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[#0f172a] shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-emerald-500 opacity-80" />
            <Building2 className="w-5 h-5 relative z-10 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold text-white leading-none tracking-tight">NEXUS</span>
            <span className="text-[8px] text-emerald-400 font-bold tracking-widest uppercase mt-0.5">Command Center</span>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all ${isActive
                  ? "bg-indigo-600 text-white shadow-xl shadow-indigo-900/50"
                  : "text-gray-500 hover:text-white hover:bg-white/5"
                  }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-600"}`} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="pt-8 mt-8 border-t border-white/5">
          <div className="px-6 py-5 bg-white/5 rounded-xl border border-white/5 hidden md:block">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">System Load</p>
            <div className="w-full h-1 bg-white/5 rounded-full mb-3 overflow-hidden">
              <div className="w-1/3 h-full bg-emerald-500" />
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              Secure Link Active
            </p>
          </div>
        </div>
      </aside>

      {/* Main Command Surface */}
      <main className="flex-1 md:ml-64 p-6 md:p-10 bg-white">
        <div className="max-w-7xl mx-auto">
          {activeTab === "applications" && <ApplicationsTab />}
          {activeTab === "jobs" && <JobManagementTab />}
        </div>
      </main>
    </div>
  );
}