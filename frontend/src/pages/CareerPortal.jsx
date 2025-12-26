import { useState } from "react";
import {
  Briefcase, MapPin, Clock, DollarSign, ChevronRight, ArrowLeft,
  Users, Search, Filter, Sparkles, TrendingUp, Award, Target,
  CheckCircle2, Upload, X, FileText, Calendar, Building2
} from "lucide-react";
import { applyJob } from "../api";

const jobsData = [
  {
    id: 1,
    title: "Python Developer",
    company: "Tech Innovations Ltd",
    location: "Hyderabad, India",
    type: "Full-time",
    experience: "Fresher",
    salary: "₹3-5 LPA",
    postedDate: "2 days ago",
    applicants: 45,
    description: "We are looking for a talented Python Developer to join our team. As a fresher, you will work on exciting projects involving web development, data analysis, and automation.",
    responsibilities: [
      "Develop and maintain Python applications",
      "Write clean, maintainable, and efficient code",
      "Collaborate with cross-functional teams",
      "Debug and troubleshoot application issues",
      "Participate in code reviews and team meetings"
    ],
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "Strong knowledge of Python programming",
      "Understanding of web frameworks like Django or Flask",
      "Basic knowledge of databases (SQL/NoSQL)",
      "Good problem-solving skills",
      "Excellent communication skills"
    ],
    skills: ["Python", "Django", "Flask", "SQL", "Git", "REST APIs"],
    benefits: ["Health Insurance", "Work from Home", "Learning Budget", "Flexible Hours"]
  },
  {
    id: 2,
    title: "Java Developer",
    company: "Digital Solutions Inc",
    location: "Bangalore, India",
    type: "Full-time",
    experience: "Fresher",
    salary: "₹3.5-5.5 LPA",
    postedDate: "1 week ago",
    applicants: 62,
    description: "Join our dynamic team as a Java Developer! You'll be working on enterprise-level applications and learning from experienced developers.",
    responsibilities: [
      "Design and develop Java-based applications",
      "Write well-designed, testable code",
      "Conduct software analysis and testing",
      "Ensure designs comply with specifications",
      "Support continuous improvement initiatives"
    ],
    requirements: [
      "Bachelor's degree in Computer Science or IT",
      "Solid understanding of Java and OOP concepts",
      "Knowledge of Spring Framework is a plus",
      "Familiarity with Maven/Gradle",
      "Strong analytical skills",
      "Team player with good communication"
    ],
    skills: ["Java", "Spring Boot", "Hibernate", "MySQL", "Maven", "REST APIs"],
    benefits: ["Health Insurance", "Gym Membership", "Team Outings", "Career Growth"]
  },
  {
    id: 3,
    title: "Data Analyst",
    company: "Analytics Pro",
    location: "Pune, India",
    type: "Full-time",
    experience: "Fresher",
    salary: "₹3-4.5 LPA",
    postedDate: "3 days ago",
    applicants: 38,
    description: "We're seeking a Data Analyst to help transform data into insights. You'll work with various data sources and create meaningful visualizations.",
    responsibilities: [
      "Collect and analyze data from various sources",
      "Create reports and dashboards",
      "Identify trends and patterns in data",
      "Present findings to stakeholders",
      "Maintain data quality and integrity"
    ],
    requirements: [
      "Bachelor's degree in Statistics, Mathematics, or related field",
      "Strong analytical and problem-solving skills",
      "Knowledge of SQL and Excel",
      "Understanding of data visualization tools",
      "Attention to detail",
      "Good presentation skills"
    ],
    skills: ["SQL", "Excel", "Python", "Power BI", "Tableau", "Statistics"],
    benefits: ["Health Insurance", "Remote Work", "Training Programs", "Performance Bonus"]
  }
];

function JobCard({ job, onApply, index }) {
  return (
    <div
      className="card-interactive bg-white rounded-2xl p-6 border border-gray-100 animate-fadeInUp"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Company Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
            {job.company.charAt(0)}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <Building2 className="w-3 h-3" />
              {job.company}
            </p>
          </div>
        </div>
        <span className="badge badge-success">{job.experience}</span>
      </div>

      {/* Job Info */}
      <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-4">
        <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
          <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
          {job.location}
        </span>
        <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
          <Clock className="w-4 h-4 text-green-600 flex-shrink-0" />
          {job.type}
        </span>
        <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
          <DollarSign className="w-4 h-4 text-purple-600" />
          {job.salary}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">{job.description}</p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.slice(0, 4).map((skill, idx) => (
          <span
            key={idx}
            className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full hover:bg-blue-100 transition-colors"
          >
            {skill}
          </span>
        ))}
        {job.skills.length > 4 && (
          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
            +{job.skills.length - 4} more
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
            {job.postedDate}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 flex-shrink-0" />
            {job.applicants} applicants
          </span>
        </div>
        <button
          onClick={() => onApply(job)}
          className="btn btn-primary text-sm py-2 px-4 flex items-center gap-2 group"
        >
          View Details
          <ChevronRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

function JobDetails({ job, onBack, onApplyNow }) {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: Sparkles },
    { id: "responsibilities", label: "Responsibilities", icon: Target },
    { id: "requirements", label: "Requirements", icon: CheckCircle2 },
    { id: "benefits", label: "Benefits", icon: Award }
  ];

  return (
    <div className="max-w-5xl mx-auto animate-fadeInUp">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Jobs</span>
      </button>

      {/* Header Card */}
      <div className="card p-8 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">
              {job.company.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
              <p className="text-lg text-gray-600 flex items-center gap-2 mb-3">
                <Building2 className="w-5 h-5" />
                {job.company}
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="flex items-center gap-2 text-gray-700">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  {job.location}
                </span>
                <span className="flex items-center gap-2 text-gray-700">
                  <Briefcase className="w-5 h-5 text-green-600" />
                  {job.experience}
                </span>
                <span className="flex items-center gap-2 text-gray-700">
                  <DollarSign className="w-5 h-5 text-purple-600" />
                  {job.salary}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onApplyNow}
            className="btn btn-primary px-8 py-3 text-lg font-semibold"
          >
            Apply Now
          </button>
        </div>

        {/* Skills */}
        <div className="pt-6 border-t border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Required Skills</h3>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-lg font-medium text-sm hover:from-blue-100 hover:to-purple-100 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card p-8">
        <div className="flex gap-2 mb-6 border-b border-gray-200 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 font-medium transition-all whitespace-nowrap ${activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="animate-fadeIn">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">About the Role</h2>
                <p className="text-gray-600 leading-relaxed">{job.description}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-gray-900">Posted</span>
                  </div>
                  <p className="text-gray-700">{job.postedDate}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    <span className="font-semibold text-gray-900">Applicants</span>
                  </div>
                  <p className="text-gray-700">{job.applicants} candidates applied</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "responsibilities" && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Responsibilities</h2>
              <ul className="space-y-3">
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700 leading-relaxed">{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "requirements" && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
              <ul className="space-y-3">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Target className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-gray-700 leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "benefits" && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Benefits & Perks</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {job.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
                    <Award className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-gray-900">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ApplicationForm({ job, onBack, onSuccess }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    degree: "",
    year: "",
    skills: "",
    referralName: "",
    referralEmail: ""
  });
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [hasReferral, setHasReferral] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const totalSteps = 3;

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!form.name.trim()) newErrors.name = "Name is required";
      if (!form.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        newErrors.email = "Invalid email format";
      }
      if (!form.phone.trim()) {
        newErrors.phone = "Phone is required";
      } else if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) {
        newErrors.phone = "Phone must be 10 digits";
      }
    }

    if (step === 2) {
      if (!form.college.trim()) newErrors.college = "College is required";
      if (!form.degree.trim()) newErrors.degree = "Degree is required";
      if (!form.year.trim()) {
        newErrors.year = "Passout year is required";
      } else if (!/^\d{4}$/.test(form.year) || form.year < 2000 || form.year > 2030) {
        newErrors.year = "Enter valid year (2000-2030)";
      }
      if (!form.skills.trim()) newErrors.skills = "Skills are required";
    }

    if (step === 3) {
      if (hasReferral) {
        if (!form.referralName.trim()) newErrors.referralName = "Referral name is required";
        if (!form.referralEmail.trim()) {
          newErrors.referralEmail = "Referral email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.referralEmail)) {
          newErrors.referralEmail = "Invalid email format";
        }
      }
      if (!resume) {
        newErrors.resume = "Resume is required";
      } else if (!resume.name.match(/\.(pdf|doc|docx)$/i)) {
        newErrors.resume = "Only PDF, DOC, DOCX allowed";
      } else if (resume.size > 5 * 1024 * 1024) {
        newErrors.resume = "File size must be under 5MB";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(form).forEach(key => {
        if (hasReferral || (key !== 'referralName' && key !== 'referralEmail')) {
          data.append(key, form[key]);
        }
      });
      data.append("resume", resume);
      data.append("position", job.title);
      data.append("hasReferral", hasReferral);

      await applyJob(data);
      onSuccess();
    } catch (error) {
      setErrors({ submit: "Submission failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (file) => {
    setResume(file);
    if (errors.resume) {
      setErrors({ ...errors, resume: "" });
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-fadeInUp">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Job Details</span>
      </button>

      <div className="card p-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Apply for {job.title}</h2>
          <p className="text-gray-600">Complete the application in {totalSteps} simple steps</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${currentStep >= step
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600'
                  }`}>
                  {currentStep > step ? <CheckCircle2 className="w-5 h-5" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-full h-1 mx-2 transition-all ${currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                    }`} style={{ width: '100px' }} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-2">
            <span>Personal Info</span>
            <span>Education</span>
            <span>Resume</span>
          </div>
        </div>

        {errors.submit && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-800">{errors.submit}</p>
          </div>
        )}

        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="space-y-5 animate-fadeIn">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={e => handleChange("name", e.target.value)}
                placeholder="John Doe"
                className={`input ${errors.name ? 'input-error' : ''}`}
              />
              {errors.name && <p className="mt-1.5 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                value={form.email}
                onChange={e => handleChange("email", e.target.value)}
                placeholder="john@example.com"
                className={`input ${errors.email ? 'input-error' : ''}`}
              />
              {errors.email && <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => handleChange("phone", e.target.value)}
                placeholder="1234567890"
                className={`input ${errors.phone ? 'input-error' : ''}`}
              />
              {errors.phone && <p className="mt-1.5 text-sm text-red-600">{errors.phone}</p>}
            </div>
          </div>
        )}

        {/* Step 2: Education */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-fadeIn">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">College/University *</label>
              <input
                type="text"
                value={form.college}
                onChange={e => handleChange("college", e.target.value)}
                placeholder="Massachusetts Institute of Technology"
                className={`input ${errors.college ? 'input-error' : ''}`}
              />
              {errors.college && <p className="mt-1.5 text-sm text-red-600">{errors.college}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Degree *</label>
              <input
                type="text"
                value={form.degree}
                onChange={e => handleChange("degree", e.target.value)}
                placeholder="B.Tech in Computer Science"
                className={`input ${errors.degree ? 'input-error' : ''}`}
              />
              {errors.degree && <p className="mt-1.5 text-sm text-red-600">{errors.degree}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Passout Year *</label>
              <input
                type="text"
                value={form.year}
                onChange={e => handleChange("year", e.target.value)}
                placeholder="2024"
                maxLength="4"
                className={`input ${errors.year ? 'input-error' : ''}`}
              />
              {errors.year && <p className="mt-1.5 text-sm text-red-600">{errors.year}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Skills *</label>
              <textarea
                value={form.skills}
                onChange={e => handleChange("skills", e.target.value)}
                placeholder="React, Python, Node.js, MongoDB, etc."
                rows="4"
                className={`input resize-none ${errors.skills ? 'input-error' : ''}`}
              />
              {errors.skills && <p className="mt-1.5 text-sm text-red-600">{errors.skills}</p>}
            </div>
          </div>
        )}

        {/* Step 3: Resume & Referral */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            {/* Resume Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Upload Resume *</label>
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${dragActive
                  ? 'border-blue-500 bg-blue-50'
                  : errors.resume
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                  }`}
              >
                <Upload className={`w-12 h-12 mx-auto mb-4 ${dragActive ? 'text-blue-600' : 'text-gray-400'}`} />
                <p className="text-gray-700 font-medium mb-2">
                  {resume ? resume.name : 'Drag and drop your resume here'}
                </p>
                <p className="text-sm text-gray-500 mb-4">or</p>
                <label className="btn btn-primary cursor-pointer">
                  Browse Files
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={e => handleFileChange(e.target.files[0])}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-gray-500 mt-3">PDF, DOC, DOCX (Max 5MB)</p>
                {resume && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-700">{resume.name} ({(resume.size / 1024).toFixed(2)} KB)</span>
                    </div>
                    <button
                      onClick={() => setResume(null)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
              {errors.resume && <p className="mt-1.5 text-sm text-red-600">{errors.resume}</p>}
            </div>

            {/* Referral Section */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-gray-900">Have a referral?</span>
                </div>
                <button
                  type="button"
                  onClick={() => setHasReferral(!hasReferral)}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${hasReferral ? "bg-blue-600" : "bg-gray-300"
                    }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${hasReferral ? "translate-x-6" : "translate-x-1"
                      }`}
                  />
                </button>
              </div>

              {hasReferral && (
                <div className="space-y-4 p-5 bg-blue-50 rounded-xl border border-blue-100 animate-fadeIn">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Referral Name *</label>
                    <input
                      type="text"
                      value={form.referralName}
                      onChange={e => handleChange("referralName", e.target.value)}
                      placeholder="Employee who referred you"
                      className={`input bg-white ${errors.referralName ? 'input-error' : ''}`}
                    />
                    {errors.referralName && <p className="mt-1.5 text-sm text-red-600">{errors.referralName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Referral Email *</label>
                    <input
                      type="email"
                      value={form.referralEmail}
                      onChange={e => handleChange("referralEmail", e.target.value)}
                      placeholder="referral@company.com"
                      className={`input bg-white ${errors.referralEmail ? 'input-error' : ''}`}
                    />
                    {errors.referralEmail && <p className="mt-1.5 text-sm text-red-600">{errors.referralEmail}</p>}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
          {currentStep > 1 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Previous
            </button>
          )}
          {currentStep < totalSteps ? (
            <button
              onClick={handleNext}
              className="flex-1 btn btn-primary py-3 text-lg font-semibold"
            >
              Next Step
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 btn btn-primary py-3 text-lg font-semibold"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CareerPortal() {
  const [view, setView] = useState("listings");
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filteredJobs = jobsData.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || job.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setView("details");
  };

  const handleApplyNow = () => {
    setView("apply");
  };

  const handleApplicationSuccess = () => {
    setView("success");
  };

  const handleBackToListings = () => {
    setView("listings");
    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      {view === "listings" && (
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fadeInDown">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" />
              Now Hiring
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Find Your <span className="text-gradient">Dream Job</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join innovative companies and build your career with exciting opportunities
            </p>
            <div className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-gray-900">{jobsData.length} Open Positions</span>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="card p-6 mb-8 animate-fadeInUp">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by job title, company, or location..."
                  className="input pl-12"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="input pl-12"
                >
                  <option value="all">All Job Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job, index) => (
              <JobCard key={job.id} job={job} onApply={handleViewDetails} index={index} />
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-16 animate-fadeIn">
              <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      )}

      {view === "details" && selectedJob && (
        <JobDetails
          job={selectedJob}
          onBack={handleBackToListings}
          onApplyNow={handleApplyNow}
        />
      )}

      {view === "apply" && selectedJob && (
        <ApplicationForm
          job={selectedJob}
          onBack={() => setView("details")}
          onSuccess={handleApplicationSuccess}
        />
      )}

      {view === "success" && (
        <div className="max-w-2xl mx-auto card p-12 text-center animate-scaleIn">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for applying for the <span className="font-semibold text-gray-900">{selectedJob.title}</span> position at <span className="font-semibold text-gray-900">{selectedJob.company}</span>.
            We'll review your application and get back to you soon.
          </p>
          <button
            onClick={handleBackToListings}
            className="btn btn-primary px-8 py-3 text-lg font-semibold"
          >
            Back to Job Listings
          </button>
        </div>
      )}
    </div>
  );
}