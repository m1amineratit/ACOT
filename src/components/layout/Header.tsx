import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut, User, LogIn, Send } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, signOut, signInWithGoogle } = useAuth();

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

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Google sign in error:', error);
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-blue-100/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Send className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              ColdSendr
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/app" className="text-slate-600 hover:text-emerald-600 transition-colors">
              App
            </Link>
            <Link to="/" className="text-slate-600 hover:text-emerald-600 transition-colors">
              About
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
                      className="w-8 h-8 rounded-full border-2 border-emerald-200/50"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
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
                  className="flex items-center px-4 py-2 bg-white/80 text-slate-600 rounded-lg hover:bg-white transition-all border border-emerald-200/50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleGoogleSignIn}
                  className="flex items-center px-4 py-2 bg-white/80 text-slate-600 rounded-lg hover:bg-white transition-all border border-emerald-200/50"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign in with Google
                </button>
                
                <div className="text-slate-500 text-sm hidden sm:block">
                  Save your history
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;