import React from 'react';
import { Copy, Mail, MessageSquare, Check } from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard';

interface ResultsSectionProps {
  results: {
    coldEmail: string;
    followUp: string;
  };
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ results }) => {
  const [copiedStates, setCopiedStates] = React.useState<{ [key: string]: boolean }>({});

  const handleCopy = async (text: string, key: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }));
      }, 2000);
    }
  };

  return (
    <div className="mt-12 space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Your Generated Messages</h2>
        <p className="text-gray-300">Ready to copy and use in your outreach</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cold Email */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Mail className="w-6 h-6 text-purple-400 mr-3" />
              <h3 className="text-xl font-semibold text-white">Cold Email</h3>
            </div>
            <button
              onClick={() => handleCopy(results.coldEmail, 'coldEmail')}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
                copiedStates.coldEmail
                  ? 'bg-green-600 text-white'
                  : 'bg-white/20 text-gray-300 hover:bg-white/30'
              }`}
            >
              {copiedStates.coldEmail ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </>
              )}
            </button>
          </div>
          
          <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
            <pre className="text-gray-200 whitespace-pre-wrap text-sm leading-relaxed font-sans">
              {results.coldEmail}
            </pre>
          </div>
        </div>

        {/* Follow-up Email */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <MessageSquare className="w-6 h-6 text-blue-400 mr-3" />
              <h3 className="text-xl font-semibold text-white">Follow-up Message</h3>
            </div>
            <button
              onClick={() => handleCopy(results.followUp, 'followUp')}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
                copiedStates.followUp
                  ? 'bg-green-600 text-white'
                  : 'bg-white/20 text-gray-300 hover:bg-white/30'
              }`}
            >
              {copiedStates.followUp ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </>
              )}
            </button>
          </div>
          
          <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
            <pre className="text-gray-200 whitespace-pre-wrap text-sm leading-relaxed font-sans">
              {results.followUp}
            </pre>
          </div>
        </div>
      </div>

      <div className="text-center">
        <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-full border border-green-500/30">
          <Check className="w-5 h-5 text-green-400 mr-2" />
          <span className="text-green-300 font-medium">Messages generated successfully!</span>
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;