import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { LogOut, User, DollarSign, Sun, Moon, Monitor } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme, setSpecificTheme } = useTheme();

  if (!isAuthenticated) {
    return null;
  }

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-5 w-5" />;
      case 'dark':
        return <Moon className="h-5 w-5" />;
      case 'black':
        return <Monitor className="h-5 w-5" />;
      default:
        return <Sun className="h-5 w-5" />;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'black':
        return 'Black';
      default:
        return 'Light';
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 black:bg-black shadow-lg dark:shadow-xl border-b border-gray-200 dark:border-gray-700 black:border-gray-800 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl group-hover:scale-110 transition-transform duration-200">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 dark:text-white black:text-white">ExpenseTracker</span>
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">₹ Rupees</span>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 black:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 black:hover:bg-gray-700 transition-colors duration-200 group"
                title={`Current: ${getThemeLabel()}. Click to cycle themes.`}
              >
                {getThemeIcon()}
              </button>
              
              {/* Quick Theme Selection */}
              <div className="flex space-x-1">
                {['light', 'dark', 'black'].map((themeOption) => (
                  <button
                    key={themeOption}
                    onClick={() => setSpecificTheme(themeOption)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      theme === themeOption 
                        ? 'ring-2 ring-blue-500 ring-offset-2' 
                        : ''
                    } ${
                      themeOption === 'light' ? 'bg-yellow-400' :
                      themeOption === 'dark' ? 'bg-blue-600' :
                      'bg-gray-800'
                    }`}
                    title={`Switch to ${themeOption} theme`}
                  />
                ))}
              </div>
            </div>

            {/* User Info */}
            <div className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-700 black:bg-gray-800 rounded-lg">
              <User className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 black:text-gray-200">
                {user?.name}
              </span>
            </div>
            
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
            >
              <LogOut className="h-4 w-4" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
