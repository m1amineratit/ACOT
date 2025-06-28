import React from 'react';
import { Heart, Github, Sparkles, Zap, Send } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-800 border-t border-slate-700">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center mb-4">
          <span className="text-gray-300 text-lg">Built with</span>
          <Heart className="w-5 h-5 text-red-500 mx-2 animate-pulse" />
          <span className="text-gray-300 text-lg">by</span>
          <span className="text-white font-semibold ml-2">Amine Ratit</span>
        </div>
        
        <div className="flex items-center justify-center mb-6">
          <Sparkles className="w-5 h-5 text-yellow-400 mr-2" />
          <p className="text-emerald-300 font-medium">
            100% Free - All Premium Features Included
          </p>
        </div>
        
        {/* Built with Bolt Badge */}
        <div className="flex items-center justify-center mb-6">
          <a
            href="https://bolt.new"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl border border-yellow-500/30 text-yellow-300 hover:text-yellow-200 hover:bg-gradient-to-r hover:from-yellow-500/30 hover:to-orange-500/30 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Zap className="w-5 h-5 mr-2 text-yellow-400 group-hover:animate-pulse" />
            <span className="font-semibold">Built with Bolt</span>
            <div className="ml-2 px-2 py-1 bg-yellow-500/20 rounded-full border border-yellow-500/40">
              <span className="text-yellow-300 text-xs font-bold">AI</span>
            </div>
          </a>
        </div>
        
        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-gray-300 hover:text-white hover:bg-white/20 transition-all"
          >
            <Github className="w-5 h-5 mr-2" />
            View on GitHub
          </a>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/10">
          <p className="text-gray-500 text-sm">
            © 2025 ColdSendr AI Cold Outreach Tool. Empowering connections through AI - completely free.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;