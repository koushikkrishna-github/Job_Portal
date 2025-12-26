import { useState, useEffect } from "react";
import {
  Users, Briefcase, Download, Filter, Search,
  Eye, Trash2, RefreshCw, TrendingUp, Calendar,
  CheckCircle, Clock, XCircle, AlertCircle, BarChart3,
  FileText, Mail, Phone, GraduationCap, Award, X,
  ChevronDown, ChevronUp, ArrowUpRight, ArrowDownRight
} from "lucide-react";
import {
  getApplications,
  getStatistics,
  updateApplicationStatus,
  deleteApplication,
  downloadAdminExcel
} from "../api";

export default function AdminDashboard() {
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
      // Success - file downloaded
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
          <div className={`flex items-center gap-1 text-sm font-semibold ${trend > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center animate-fadeIn">
          <RefreshCw className="w-16 h-16 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-lg text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="animate-fadeInLeft">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage and track job applications</p>
            </div>
            <button
              onClick={handleDownloadExcel}
              className="btn btn-primary flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 animate-fadeInRight"
            >
              <Download className="w-5 h-5 flex-shrink-0" />
              <span className="font-semibold">Export Excel</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
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