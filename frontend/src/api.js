const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Get token from localStorage
const getToken = () => {
  return localStorage.getItem("adminToken");
};

// Admin login
export const adminLogin = async (username, password) => {
  const response = await fetch(`${API_URL}/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Login failed");
  }

  return response.json();
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getToken();
};

// Logout
export const logout = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminUsername");
};

// Submit job application (PUBLIC - No token needed)
export const applyJob = async (formData) => {
  const response = await fetch(`${API_URL}/apply`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Application failed");
  }

  return response.json();
};

// Get all applications (PROTECTED - Requires token)
export const getApplications = async (filters = {}) => {
  const params = new URLSearchParams();

  if (filters.position) params.append("position", filters.position);
  if (filters.status) params.append("status", filters.status);

  const response = await fetch(`${API_URL}/admin/applications?${params}`, {
    headers: {
      "Authorization": `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      logout();
      throw new Error("Session expired. Please login again.");
    }
    throw new Error("Failed to fetch applications");
  }

  return response.json();
};

// Get statistics (PROTECTED - Requires token)
export const getStatistics = async () => {
  const response = await fetch(`${API_URL}/admin/statistics`, {
    headers: {
      "Authorization": `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      logout();
      throw new Error("Session expired. Please login again.");
    }
    throw new Error("Failed to fetch statistics");
  }

  return response.json();
};

// Update application status (PROTECTED - Requires token)
export const updateApplicationStatus = async (appId, status) => {
  const response = await fetch(`${API_URL}/admin/application/${appId}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      logout();
      throw new Error("Session expired. Please login again.");
    }
    const error = await response.json();
    throw new Error(error.error || "Failed to update status");
  }

  return response.json();
};

// Delete application (PROTECTED - Requires token)
export const deleteApplication = async (appId) => {
  const response = await fetch(`${API_URL}/admin/application/${appId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      logout();
      throw new Error("Session expired. Please login again.");
    }
    const error = await response.json();
    throw new Error(error.error || "Failed to delete application");
  }

  return response.json();
};

// Download Excel file (PROTECTED - Requires token)
export const downloadAdminExcel = async (position = "all") => {
  const token = getToken();

  if (!token) {
    throw new Error("Not authenticated");
  }

  const url = `${API_URL}/admin/download-excel?position=${position}`;

  try {
    const response = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        logout();
        throw new Error("Session expired. Please login again.");
      }
      throw new Error("Failed to download Excel file");
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `applications_${position}_${new Date().getTime()}.xlsx`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(downloadUrl);
    document.body.removeChild(a);

    return { success: true };
  } catch (error) {
    console.error("Excel download error:", error);
    throw error;
  }
};

// Check backend health (PUBLIC)
export const checkHealth = async () => {
  const response = await fetch(`${API_URL}/health`);
  return response.json();
};

// ============================================
// JOB MANAGEMENT API FUNCTIONS
// ============================================

// Get all jobs (PUBLIC - anyone can view jobs)
export const getJobs = async (filters = {}) => {
  const params = new URLSearchParams();

  if (filters.type) params.append("type", filters.type);
  if (filters.experience) params.append("experience", filters.experience);
  if (filters.status) params.append("status", filters.status);

  const response = await fetch(`${API_URL}/jobs?${params}`);

  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  return response.json();
};

// Get single job by ID (PUBLIC)
export const getJobById = async (jobId) => {
  const response = await fetch(`${API_URL}/jobs/${jobId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch job details");
  }

  return response.json();
};

// Create new job (PROTECTED - Requires token)
export const createJob = async (jobData) => {
  const response = await fetch(`${API_URL}/admin/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`,
    },
    body: JSON.stringify(jobData),
  });

  if (!response.ok) {
    if (response.status === 401) {
      logout();
      throw new Error("Session expired. Please login again.");
    }
    const error = await response.json();
    throw new Error(error.error || "Failed to create job");
  }

  return response.json();
};

// Update job (PROTECTED - Requires token)
export const updateJob = async (jobId, jobData) => {
  const response = await fetch(`${API_URL}/admin/jobs/${jobId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`,
    },
    body: JSON.stringify(jobData),
  });

  if (!response.ok) {
    if (response.status === 401) {
      logout();
      throw new Error("Session expired. Please login again.");
    }
    const error = await response.json();
    throw new Error(error.error || "Failed to update job");
  }

  return response.json();
};

// Delete job (PROTECTED - Requires token)
export const deleteJob = async (jobId) => {
  const response = await fetch(`${API_URL}/admin/jobs/${jobId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      logout();
      throw new Error("Session expired. Please login again.");
    }
    const error = await response.json();
    throw new Error(error.error || "Failed to delete job");
  }

  return response.json();
};

// Toggle job status (Active/Inactive) (PROTECTED - Requires token)
export const toggleJobStatus = async (jobId) => {
  const response = await fetch(`${API_URL}/admin/jobs/${jobId}/toggle-status`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      logout();
      throw new Error("Session expired. Please login again.");
    }
    const error = await response.json();
    throw new Error(error.error || "Failed to toggle job status");
  }

  return response.json();
};