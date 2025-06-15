import React from 'react';
import { Heart, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center mb-4">
          <span className="text-gray-300 text-lg">Built with</span>
          <Heart className="w-5 h-5 text-red-500 mx-2 animate-pulse" />
          <span className="text-gray-300 text-lg">by</span>
          <span className="text-white font-semibold ml-2">Amine Ratit</span>
        </div>
        
        <p className="text-gray-400 mb-6">
          for the World's Largest Hackathon
        </p>
        
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
            © 2025 AI Cold Outreach Tool. Empowering connections through AI.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;