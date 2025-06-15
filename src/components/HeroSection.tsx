import React from 'react';
import { Mail, Zap, Target } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 to-blue-800/20 backdrop-blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Reach Anyone with
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent block">
            Confidence
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Generate personalized cold emails and follow-ups that get responses. 
          Powered by AI to help you connect with anyone, professionally.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <Target className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Targeted Outreach</h3>
            <p className="text-gray-300 text-center">Personalized emails that resonate with your prospects</p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <Zap className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">AI-Powered</h3>
            <p className="text-gray-300 text-center">Advanced GPT-4 technology for natural conversations</p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <Mail className="w-8 h-8 text-green-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Multiple Formats</h3>
            <p className="text-gray-300 text-center">Email and voice messages for maximum impact</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;