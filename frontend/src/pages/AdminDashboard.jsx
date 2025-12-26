import { useState, useEffect } from "react";
import {
  Users, Briefcase, Download, Filter, Search,
  Eye, Trash2, RefreshCw, TrendingUp, Calendar,
  CheckCircle, Clock, XCircle, AlertCircle, BarChart3,
  FileText, Mail, Phone, GraduationCap, Award, X,
  ChevronDown, ChevronUp, ArrowUpRight, ArrowDownRight,
  Plus, Edit2, Save, MapPin, DollarSign, Building2
} from "lucide-react";
import {
  getApplications,
  getStatistics,
  updateApplicationStatus,
  deleteApplication,
  downloadAdminExcel,
  getJobs,
  createJob,
  updateJob,
  deleteJob
} from "../api";

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
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    
    try {
      await deleteJob(jobId);
      await fetchJobs();
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job");
    }
  };

  const handleFormClose = () => {
    setShowJobForm(false);
    setEditingJob(null);
    fetchJobs();
  };

  if (loading) {
    return (
      <div className="text-center py-16">
        <RefreshCw className="w-16 h-16 animate-spin text-blue-600 mx-auto mb-4" />
        <p className="text-lg text-gray-600">Loading jobs...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Job Management</h2>
          <p className="text-gray-600">Create and manage job postings</p>
        </div>
        <button
          onClick={handleCreateJob}
          className="btn btn-primary flex items-center gap-2 px-6 py-3"
        >
          <Plus className="w-5 h-5" />
          Create New Job
        </button>
      </div>

      {/* Jobs Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job, idx) => (
          <div
            key={job.id}
            className="card p-6 hover-lift animate-fadeInUp"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  {job.company}
                </p>
              </div>
              <span className={`badge ${job.status === 'Active' ? 'badge-success' : 'bg-gray-100 text-gray-600'}`}>
                {job.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                {job.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Briefcase className="w-4 h-4" />
                {job.type} • {job.experience}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <DollarSign className="w-4 h-4" />
                {job.salary}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {job.skills.slice(0, 3).map((skill, idx) => (
                <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                  {skill}
                </span>
              ))}
              {job.skills.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{job.skills.length - 3}
                </span>
              )}
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <button
                onClick={() => handleEditJob(job)}
                className="flex-1 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => handleDeleteJob(job.id)}
                className="flex-1 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {jobs.length === 0 && (
        <div className="text-center py-16 card">
          <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs posted yet</h3>
          <p className="text-gray-600 mb-6">Create your first job posting to get started</p>
          <button
            onClick={handleCreateJob}
            className="btn btn-primary inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create First Job
          </button>
        </div>
      )}

      {/* Job Form Modal */}
      {showJobForm && (
        <JobFormModal
          job={editingJob}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}

function JobFormModal({ job, onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(job || {
    title: "",
    company: "",
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

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const handleArrayAdd = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const handleArrayRemove = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const cleanedData = {
        ...formData,
        responsibilities: formData.responsibilities.filter(r => r.trim()),
        requirements: formData.requirements.filter(r => r.trim()),
        skills: formData.skills.filter(s => s.trim()),
        benefits: formData.benefits.filter(b => b.trim())
      };

      if (job) {
        await updateJob(job.id, cleanedData);
      } else {
        await createJob(cleanedData);
      }
      
      onClose();
    } catch (error) {
      console.error("Error saving job:", error);
      alert("Failed to save job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn">
        <div className="sticky top-0 bg-white border-b px-8 py-6 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {job ? "Edit Job" : "Create New Job"}
              </h2>
              <p className="text-sm text-gray-600 mt-1">Fill in the job details below</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-8 space-y-6">
          {currentStep === 1 && (
            <div className="space-y-5 animate-fadeIn">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
              
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    placeholder="e.g., Python Developer"
                    className="input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name *</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    placeholder="e.g., Tech Innovations Ltd"
                    className="input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    placeholder="e.g., Hyderabad, India"
                    className="input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Job Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleChange("type", e.target.value)}
                    className="input"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Experience Level *</label>
                  <select
                    value={formData.experience}
                    onChange={(e) => handleChange("experience", e.target.value)}
                    className="input"
                  >
                    <option value="Fresher">Fresher</option>
                    <option value="1-3 years">1-3 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5+ years">5+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Salary Range *</label>
                  <input
                    type="text"
                    value={formData.salary}
                    onChange={(e) => handleChange("salary", e.target.value)}
                    placeholder="e.g., ₹3-5 LPA"
                    className="input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Job Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Describe the role and what the candidate will be doing..."
                  rows="4"
                  className="input resize-none"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Details</h3>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Responsibilities</label>
                {formData.responsibilities.map((resp, idx) => (
                  <div key={idx} className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={resp}
                      onChange={(e) => handleArrayChange("responsibilities", idx, e.target.value)}
                      placeholder="e.g., Develop and maintain applications"
                      className="input flex-1"
                    />
                    {formData.responsibilities.length > 1 && (
                      <button
                        onClick={() => handleArrayRemove("responsibilities", idx)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => handleArrayAdd("responsibilities")}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add Responsibility
                </button>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Requirements</label>
                {formData.requirements.map((req, idx) => (
                  <div key={idx} className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={req}
                      onChange={(e) => handleArrayChange("requirements", idx, e.target.value)}
                      placeholder="e.g., Bachelor's degree in Computer Science"
                      className="input flex-1"
                    />
                    {formData.requirements.length > 1 && (
                      <button
                        onClick={() => handleArrayRemove("requirements", idx)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => handleArrayAdd("requirements")}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add Requirement
                </button>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Required Skills</label>
                {formData.skills.map((skill, idx) => (
                  <div key={idx} className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => handleArrayChange("skills", idx, e.target.value)}
                      placeholder="e.g., Python, Django, React"
                      className="input flex-1"
                    />
                    {formData.skills.length > 1 && (
                      <button
                        onClick={() => handleArrayRemove("skills", idx)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => handleArrayAdd("skills")}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add Skill
                </button>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Eligibility</label>
                {formData.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) => handleArrayChange("benefits", idx, e.target.value)}
                      placeholder="e.g., Health Insurance, Remote Work"
                      className="input flex-1"
                    />
                    {formData.benefits.length > 1 && (
                      <button
                        onClick={() => handleArrayRemove("benefits", idx)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => handleArrayAdd("benefits")}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add Benefit
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-gray-50 border-t px-8 py-6 flex gap-4">
          {currentStep > 1 && (
            <button
              onClick={() => setCurrentStep(1)}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-white"
            >
              Previous
            </button>
          )}
          {currentStep < 2 ? (
            <button
              onClick={() => setCurrentStep(2)}
              className="flex-1 btn btn-primary py-3"
            >
              Next Step
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 btn btn-primary py-3 flex items-center justify-center gap-2"
            >
              {loading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {loading ? "Saving..." : job ? "Update Job" : "Create Job"}
            </button>
          )}
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
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApp, setSelectedApp] = useState(null);
  const [sortField, setSortField] = useState("ID");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    fetchData();
  }, [filterPosition, filterStatus]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const filters = {};
      if (filterPosition !== 'all') filters.position = filterPosition;
      if (filterStatus !== 'all') filters.status = filterStatus;

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
    try {
      await downloadAdminExcel(filterPosition);
    } catch (error) {
      console.error("Error downloading Excel:", error);
      alert("Failed to download Excel file. Please try again.");
    }
  };

  const handleStatusChange = async (appId, newStatus) => {
    try {
      await updateApplicationStatus(appId, newStatus);
      await fetchData();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async (appId) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;

    try {
      await deleteApplication(appId);
      await fetchData();
      setSelectedApp(null);
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const filteredApplications = applications
    .filter(app =>
      (app.Name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (app.Email?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (app.Position?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
    )
    .sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (sortOrder === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

  const positions = statistics?.by_position ? Object.keys(statistics.by_position) : [];

  const getStatusBadge = (status) => {
    const badges = {
      Pending: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Clock },
      Reviewed: { color: "bg-blue-100 text-blue-800 border-blue-200", icon: Eye },
      Shortlisted: { color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle },
      Rejected: { color: "bg-red-100 text-red-800 border-red-200", icon: XCircle }
    };

    const badge = badges[status] || badges.Pending;
    const Icon = badge.icon;

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${badge.color}`}>
        <Icon className="w-3.5 h-3.5" />
        {status}
      </span>
    );
  };

  const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="card p-6 hover-lift animate-fadeInUp">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-semibold ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );

  if (loading) {
    return (
      <div className="text-center py-16">
        <RefreshCw className="w-16 h-16 animate-spin text-blue-600 mx-auto mb-4" />
        <p className="text-lg text-gray-600 font-medium">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Action Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Applications Management</h2>
          <p className="text-gray-600">Track and manage all job applications</p>
        </div>
        <button
          onClick={handleDownloadExcel}
          className="btn btn-primary flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
        >
          <Download className="w-5 h-5 flex-shrink-0" />
          <span className="font-semibold">Export Excel</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Applications"
          value={statistics?.total || 0}
          icon={Users}
          color="from-blue-500 to-blue-600"
          trend={12}
        />
        <StatCard
          title="Pending Review"
          value={statistics?.by_status?.Pending || 0}
          icon={Clock}
          color="from-yellow-500 to-yellow-600"
          trend={-5}
        />
        <StatCard
          title="Shortlisted"
          value={statistics?.by_status?.Shortlisted || 0}
          icon={CheckCircle}
          color="from-green-500 to-green-600"
          trend={8}
        />
        <StatCard
          title="Open Positions"
          value={positions.length}
          icon={Briefcase}
          color="from-purple-500 to-purple-600"
        />
      </div>

      {/* Position-wise Breakdown */}
      <div className="card p-6 mb-8 animate-fadeInUp">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Applications by Position</h2>
            <p className="text-sm text-gray-600">Distribution across all job roles</p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {Object.entries(statistics?.by_position || {}).map(([position, count], idx) => (
            <div
              key={position}
              className="p-5 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100 hover-lift animate-fadeInUp"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-700">{position}</p>
                <TrendingUp className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-blue-600">{count}</p>
              <p className="text-xs text-gray-600 mt-1">
                {((count / (statistics?.total || 1)) * 100).toFixed(1)}% of total
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card p-6 mb-6 animate-fadeInUp">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Search className="w-4 h-4 inline mr-2" />
              Search Applications
            </label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, or position..."
                className="input pl-12"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Filter className="w-4 h-4 inline mr-2" />
              Position
            </label>
            <select
              value={filterPosition}
              onChange={(e) => setFilterPosition(e.target.value)}
              className="input"
            >
              <option value="all">All Positions</option>
              {positions.map(pos => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Filter className="w-4 h-4 inline mr-2" />
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="card overflow-hidden animate-fadeInUp">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
              <tr>
                <th
                  className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
                  onClick={() => handleSort("ID")}
                >
                  <div className="flex items-center gap-2">
                    ID
                    {sortField === "ID" && (
                      sortOrder === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
                  onClick={() => handleSort("Name")}
                >
                  <div className="flex items-center gap-2">
                    Name
                    {sortField === "Name" && (
                      sortOrder === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Position</th>
                <th
                  className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
                  onClick={() => handleSort("Applied Date")}
                >
                  <div className="flex items-center gap-2">
                    Applied Date
                    {sortField === "Applied Date" && (
                      sortOrder === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredApplications.map((app, idx) => (
                <tr
                  key={app.ID}
                  className="hover:bg-blue-50 transition-colors animate-fadeIn"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-bold text-sm">
                      {app.ID}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                        {app.Name?.charAt(0)}
                      </div>
                      <span className="font-semibold text-gray-900">{app.Name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{app.Email}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium">
                      <Briefcase className="w-3.5 h-3.5" />
                      {app.Position}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {app["Applied Date"]?.split(' ')[0]}
                    </span>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(app.Status || 'Pending')}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(app.ID)}
                        className="p-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredApplications.length === 0 && (
            <div className="text-center py-16 animate-fadeIn">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No applications found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Application Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Application Details</h2>
                  <p className="text-sm text-gray-600 mt-1">ID: #{selectedApp.ID}</p>
                </div>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-8 space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Full Name</label>
                    <p className="text-gray-900 font-semibold mt-1">{selectedApp.Name}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      Email
                    </label>
                    <p className="text-gray-900 mt-1">{selectedApp.Email}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      Phone
                    </label>
                    <p className="text-gray-900 mt-1">{selectedApp.Phone}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide flex items-center gap-1">
                      <Briefcase className="w-3 h-3" />
                      Position
                    </label>
                    <p className="text-gray-900 font-semibold mt-1">{selectedApp.Position}</p>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-purple-600" />
                  Education
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-purple-50 rounded-xl">
                    <label className="text-xs font-semibold text-purple-700 uppercase tracking-wide">College/University</label>
                    <p className="text-gray-900 mt-1">{selectedApp.College}</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-xl">
                    <label className="text-xs font-semibold text-purple-700 uppercase tracking-wide">Degree</label>
                    <p className="text-gray-900 mt-1">{selectedApp.Degree}</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-xl md:col-span-2">
                    <label className="text-xs font-semibold text-purple-700 uppercase tracking-wide">Passout Year</label>
                    <p className="text-gray-900 mt-1">{selectedApp["Passout Year"]}</p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-green-600" />
                  Skills
                </h3>
                <div className="p-4 bg-green-50 rounded-xl">
                  <p className="text-gray-900">{selectedApp.Skills}</p>
                </div>
              </div>

              {/* Resume */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Resume
                </h3>
                <div className="p-4 bg-blue-50 rounded-xl flex items-center gap-3">
                  <FileText className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-gray-900 font-medium">{selectedApp["Resume File"]}</p>
                    <p className="text-sm text-gray-600">Uploaded on {selectedApp["Applied Date"]}</p>
                  </div>
                </div>
              </div>

              {/* Status Update */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Update Application Status</label>
                <select
                  value={selectedApp.Status || 'Pending'}
                  onChange={(e) => handleStatusChange(selectedApp.ID, e.target.value)}
                  className="input"
                >
                  <option value="Pending">Pending</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-8 py-6 flex gap-4">
              <button
                onClick={() => setSelectedApp(null)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-white transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => handleDelete(selectedApp.ID)}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all"
              >
                Delete Application
              </button>
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
    { id: "applications", label: "Applications", icon: Users },
    { id: "jobs", label: "Job Management", icon: Briefcase }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
          
          {/* Tabs */}
          <div className="flex gap-2 border-b">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 font-medium transition-all ${
                    activeTab === tab.id
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "applications" && <ApplicationsTab />}
        {activeTab === "jobs" && <JobManagementTab />}
      </div>
    </div>
  );
}