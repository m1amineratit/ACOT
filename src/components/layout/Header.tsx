import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, LogOut, User, Crown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useSubscription } from '../../hooks/useSubscription';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const { activeProductName } = useSubscription();

  return (
    <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Mail className="w-8 h-8 text-purple-400" />
            <span className="text-xl font-bold text-white">AI Outreach</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {activeProductName && (
                  <div className="flex items-center px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-500/30">
                    <Crown className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-yellow-300 text-sm font-medium">{activeProductName}</span>
                  </div>
                )}
                
                <div className="flex items-center space-x-2 text-gray-300">
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">{user.email}</span>
                </div>
                
                <button
                  onClick={signOut}
                  className="flex items-center px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
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