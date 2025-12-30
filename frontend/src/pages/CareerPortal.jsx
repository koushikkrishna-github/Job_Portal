import { useState, useEffect } from "react";
import {
  Briefcase, MapPin, Clock, DollarSign, ChevronRight, ArrowLeft,
  Users, Search, Filter, Sparkles, TrendingUp, Award, Target,
  CheckCircle2, Upload, X, FileText, Calendar, Building2, RefreshCw
} from "lucide-react";
import { applyJob, getJobs } from "../api";

// JobCard Component
function JobCard({ job, onApply, index }) {
  return (
    <div
      className="card p-6 hover-lift cursor-pointer group animate-fadeInUp"
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={() => onApply(job)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
            {job.title}
          </h3>
          <p className="text-sm text-gray-600 flex items-center gap-1">
            <Building2 className="w-3 h-3" />
            {job.company}
          </p>
        </div>
        <span className="badge badge-primary">{job.type}</span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          {job.location}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <DollarSign className="w-4 h-4" />
          {job.salary}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          {job.experience}
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

      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>{job.applicants || 0} applicants</span>
        </div>
        <div className="flex items-center gap-1 text-blue-600 font-semibold group-hover:gap-2 transition-all">
          View Details
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

// JobDetails Component
function JobDetails({ job, onBack, onApplyNow }) {
  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Listings
      </button>

      <div className="card p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6 pb-6 border-b">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
            <p className="text-lg text-gray-600 flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              {job.company}
            </p>
          </div>
          <span className="badge badge-success text-base px-4 py-2">{job.status}</span>
        </div>

        {/* Quick Info */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 bg-blue-50 rounded-xl">
            <MapPin className="w-5 h-5 text-blue-600 mb-2" />
            <p className="text-sm text-gray-600">Location</p>
            <p className="font-semibold text-gray-900">{job.location}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-xl">
            <DollarSign className="w-5 h-5 text-green-600 mb-2" />
            <p className="text-sm text-gray-600">Salary</p>
            <p className="font-semibold text-gray-900">{job.salary}</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl">
            <Briefcase className="w-5 h-5 text-purple-600 mb-2" />
            <p className="text-sm text-gray-600">Job Type</p>
            <p className="font-semibold text-gray-900">{job.type}</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl">
            <Target className="w-5 h-5 text-orange-600 mb-2" />
            <p className="text-sm text-gray-600">Experience</p>
            <p className="font-semibold text-gray-900">{job.experience}</p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Job Description</h2>
          <p className="text-gray-700 leading-relaxed">{job.description}</p>
        </div>

        {/* Responsibilities */}
        {job.responsibilities && job.responsibilities.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Responsibilities</h2>
            <ul className="space-y-2">
              {job.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Requirements */}
        {job.requirements && job.requirements.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Requirements</h2>
            <ul className="space-y-2">
              {job.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Skills */}
        {job.skills && job.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, idx) => (
                <span key={idx} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Benefits */}
        {job.benefits && job.benefits.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Benifits</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {job.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                  <Award className="w-5 h-5 text-green-600" />
                  <span className="text-gray-900">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Apply Button */}
        <div className="flex items-center justify-between pt-6 border-t">
          <div className="text-sm text-gray-600">
            <Calendar className="w-4 h-4 inline mr-1" />
            Posted: {job.postedDate || 'Recently'}
          </div>
          <button
            onClick={onApplyNow}
            className="btn btn-primary px-8 py-3 text-lg font-semibold"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}

// ApplicationForm Component
function ApplicationForm({ job, onBack, onSuccess }) {
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
      setError(err.message || "Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-fadeIn">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Job Details
      </button>

      <div className="card p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Apply for {job.title}</h1>
          <p className="text-gray-600">at {job.company}</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="input"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Education</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  College/University *
                </label>
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  required
                  className="input"
                  placeholder="MIT"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Degree *
                </label>
                <input
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  required
                  className="input"
                  placeholder="B.Tech in Computer Science"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Passout Year *
                </label>
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="input"
                  placeholder="2024"
                />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Skills *
            </label>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              required
              rows="3"
              className="input resize-none"
              placeholder="Python, JavaScript, React, Node.js, etc."
            />
          </div>

          {/* Resume Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload Resume *
            </label>
            <div className="relative">
              <input
                type="file"
                onChange={handleFileChange}
                required
                accept=".pdf,.doc,.docx"
                className="hidden"
                id="resume-upload"
              />
              <label
                htmlFor="resume-upload"
                className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer"
              >
                {formData.resume ? (
                  <>
                    <FileText className="w-6 h-6 text-blue-600" />
                    <span className="font-medium text-gray-900">{formData.resume.name}</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-6 h-6 text-gray-400" />
                    <span className="text-gray-600">Click to upload resume (PDF, DOC, DOCX)</span>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn btn-primary px-6 py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Submitting...
                </span>
              ) : (
                "Submit Application"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Main CareerPortal Component
export default function CareerPortal() {
  const [view, setView] = useState("listings");
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  // State for filters and application form visibility
  const [filters, setFilters] = useState({ type: "All Types", experience: "All Levels" });
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch jobs from API on component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(data);
    } catch (err) {
      console.error("Failed to load jobs:", err);
      setError("Could not load job listings. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Filter jobs logic
  const filteredJobs = jobs.filter(job => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()); // Added location search

    const matchesType = filters.type === "All Types" || job.type === filters.type;
    const matchesExp = filters.experience === "All Levels" || job.experience === filters.experience;

    return matchesSearch && matchesType && matchesExp;
  });

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
  };

  const handleApplySuccess = () => {
    alert("Application Submitted Successfully! We will review your profile.");
    setShowApplicationForm(false);
    setSelectedJob(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-700">Loading Career Opportunities...</p>
        </div>
      </div>
    );
  }

  if (showApplicationForm && selectedJob) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <ApplicationForm
          job={selectedJob}
          onBack={() => setShowApplicationForm(false)}
          onSuccess={handleApplySuccess}
        />
      </div>
    );
  }

  if (selectedJob) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <JobDetails
          job={selectedJob}
          onBack={() => setSelectedJob(null)}
          onApplyNow={() => setShowApplicationForm(true)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold animate-fadeInDown">
            Find Your Dream Career
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto animate-fadeInUp">
            Explore opportunities that match your skills and aspirations.
          </p>

          <div className="max-w-3xl mx-auto mt-8 relative animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-14 pr-6 py-4 rounded-full text-gray-900 bg-white placeholder-gray-500 shadow-xl focus:ring-4 focus:ring-blue-500/30 focus:outline-none transition-all text-lg"
              placeholder="Search by job title, company, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-2 text-gray-700 font-medium">
            <Filter className="w-5 h-5" />
            <span>Filters:</span>
          </div>

          <div className="relative group">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer hover:border-blue-500 transition-colors"
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
            >
              <option>All Types</option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Internship</option>
            </select>
            <ChevronRight className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-gray-500 pointer-events-none" />
          </div>

          <div className="relative group">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer hover:border-blue-500 transition-colors"
              value={filters.experience}
              onChange={(e) => setFilters(prev => ({ ...prev, experience: e.target.value }))}
            >
              <option>All Levels</option>
              <option>Fresher</option>
              <option>0-2 Years</option>
              <option>2-5 Years</option>
              <option>5+ Years</option>
            </select>
            <ChevronRight className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-gray-500 pointer-events-none" />
          </div>

          <div className="ml-auto text-sm text-gray-500">
            Scanning <strong>{filteredJobs.length}</strong> available positions
          </div>
        </div>

        {/* Jobs Grid */}
        {error ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <div className="text-red-500 mb-4 text-lg">{error}</div>
            <button onClick={fetchJobs} className="btn btn-primary">Try Again</button>
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
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
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-dashed border-gray-300">
            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
            <button
              onClick={() => { setSearchTerm(""); setFilters({ type: "All Types", experience: "All Levels" }) }}
              className="mt-4 btn btn-outline"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}