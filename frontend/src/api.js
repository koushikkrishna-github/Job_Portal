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