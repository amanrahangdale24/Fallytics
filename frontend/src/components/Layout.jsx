import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, ListTodo, LogOut, User, LoaderIcon } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast'

const Layout = ({ children })=> {
  const {logout, error, isLoggingOut, authUser} = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await logout(); 
    if(result.success){
        navigate('/login');
    }else{
        toast.error("Logout failed"); 
    }
  };

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/tasks', icon: ListTodo, label: 'Tasks' },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <nav className="bg-gray-900/80 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-linear-to-br from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">F</span>
                </div>
                <span className="text-white font-bold text-xl hidden sm:block">Faillytics</span>
              </Link>

              <div className="flex gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link key={item.path} to={item.path}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                          isActive
                            ? 'bg-indigo-600 text-white'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium hidden sm:block">{item.label}</span>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {authUser ? (
                <>
                  <div className="hidden sm:flex items-center gap-2 text-gray-300">
                    <User className="w-5 h-5" />
                    <span className="text-sm">{authUser.name}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    {isLoggingOut ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : (
                      <span className='flex gap-1 items-center'>
                          <LogOut className="w-5 h-5" />
                          <span className="hidden sm:block">Logout</span>
                      </span>
                    )}
                  </motion.button>
                </>
              ) : (
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                  >
                    <div className="w-5 h-5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                        <polyline points="10 17 15 12 10 7" />
                        <line x1="15" y1="12" x2="3" y2="12" />
                      </svg>
                    </div>
                    <span>Login</span>
                  </motion.button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main>{children}</main>
    </div>
  );
}

export default Layout;
