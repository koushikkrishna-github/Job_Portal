import { useState, useEffect } from 'react';
import CareerPortal from './pages/CareerPortal';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import { Shield, LogOut } from 'lucide-react';
import { isAuthenticated, logout } from './api';

function App() {
  const [view, setView] = useState('career');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    setIsAdminAuthenticated(isAuthenticated());
  }, []);

  const handleLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setView('admin');
  };

  const handleLogout = () => {
    logout();
    setIsAdminAuthenticated(false);
    setView('career');
  };

  const handleAdminClick = () => {
    if (isAdminAuthenticated) {
      setView('admin');
    } else {
      setView('login');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      {view !== 'login' && (
        <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <span className="text-xl font-bold text-gray-800">Job Portal</span>
              </div>

              <div className="flex gap-2 items-center">
                <button
                  onClick={() => setView('career')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    view === 'career'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Career Portal
                </button>

                {isAdminAuthenticated ? (
                  <>
                    <button
                      onClick={handleAdminClick}
                      className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                        view === 'admin'
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Shield className="w-4 h-4" />
                      Admin Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 rounded-lg font-medium text-red-600 hover:bg-red-50 transition flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleAdminClick}
                    className="px-4 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition flex items-center gap-2"
                  >
                    <Shield className="w-4 h-4" />
                    Admin Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Content */}
      {view === 'career' && <CareerPortal />}
      {view === 'login' && <AdminLogin onLoginSuccess={handleLoginSuccess} />}
      {view === 'admin' && isAdminAuthenticated && <AdminDashboard />}
      {view === 'admin' && !isAdminAuthenticated && <AdminLogin onLoginSuccess={handleLoginSuccess} />}
    </div>
  );
}

export default App;