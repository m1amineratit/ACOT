import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();

  const getDisplayName = () => {
    if (user?.full_name) {
      return user.full_name;
    }
    return user?.email?.split('@')[0] || 'User';
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-blue-100/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img
                src="/508396209_1062706966037301_4833881911616339195_n.webp"
                alt="ColdSpark Logo"
                className="w-10 h-10 rounded-xl group-hover:scale-105 transition-transform"
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              ColdSpark
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-600 hover:text-blue-600 transition-colors">
              Home
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-3 text-slate-600">
                  {user.avatar_url ? (
                    <img
                      src={user.avatar_url}
                      alt={getDisplayName()}
                      className="w-8 h-8 rounded-full border-2 border-blue-200/50"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {getInitials(getDisplayName())}
                    </div>
                  )}
                  <div className="hidden sm:block">
                    <div className="text-slate-800 font-medium text-sm">{getDisplayName()}</div>
                    {user.provider && user.provider !== 'email' && (
                      <div className="text-xs text-slate-500 capitalize">via {user.provider}</div>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={signOut}
                  className="flex items-center px-4 py-2 bg-white/80 text-slate-600 rounded-lg hover:bg-white transition-all border border-blue-200/50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-violet-600 text-white rounded-xl hover:from-blue-600 hover:to-violet-700 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;