import React from 'react';
import { Copy, Mail, MessageSquare, Check, BarChart3, Target, Sparkles, Lightbulb } from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard';

interface ResultsSectionProps {
  results: {
    coldEmail: string;
    followUp: string;
    subjectLines?: string[];
    icebreakers?: string[];
    toneScore?: number;
    readabilityScore?: number;
  };
  isPremium?: boolean;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ results, isPremium = true }) => {
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
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Your Generated Messages</h2>
        <p className="text-slate-600">Ready to copy and use in your outreach</p>
        <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-500/30 mt-2">
          <Sparkles className="w-4 h-4 text-yellow-600 mr-1" />
          <span className="text-yellow-700 text-sm font-medium">All Features Included</span>
        </div>
      </div>

      {/* AI Icebreakers Section */}
      {results.icebreakers && results.icebreakers.length > 0 && (
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-lg rounded-2xl p-6 border border-yellow-500/30 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Lightbulb className="w-6 h-6 text-yellow-600 mr-3" />
              <div>
                <h3 className="text-xl font-semibold text-slate-800">AI-Generated Icebreakers</h3>
                <p className="text-yellow-700 text-sm">Personalized opening lines based on your context</p>
              </div>
            </div>
            <div className="flex items-center px-3 py-1 bg-yellow-500/20 rounded-full">
              <Sparkles className="w-4 h-4 text-yellow-600 mr-1" />
              <span className="text-yellow-700 text-sm font-medium">🆕 NEW FEATURE</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {results.icebreakers.map((icebreaker, index) => (
              <div key={index} className="bg-white/80 rounded-lg p-4 border border-yellow-500/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-yellow-700 text-sm font-medium">
                    {index === 0 ? 'Direct Reference' : index === 1 ? 'Question-Based' : 'Insight-Based'}
                  </span>
                  <button
                    onClick={() => handleCopy(icebreaker, `icebreaker-${index}`)}
                    className={`flex items-center px-2 py-1 rounded text-xs font-medium transition-all ${
                      copiedStates[`icebreaker-${index}`]
                        ? 'bg-green-600 text-white'
                        : 'bg-white/80 text-slate-600 hover:bg-white'
                    }`}
                  >
                    {copiedStates[`icebreaker-${index}`] ? (
                      <>
                        <Check className="w-3 h-3 mr-1" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 mr-1" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed">{icebreaker}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
            <p className="text-yellow-700 text-sm">
              💡 <strong>Pro Tip:</strong> Use these icebreakers as your email opening lines to create instant personal connection and dramatically increase response rates!
            </p>
          </div>
        </div>
      )}

      {/* Subject Lines */}
      {results.subjectLines && (
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-blue-100/50 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Target className="w-6 h-6 text-orange-400 mr-3" />
              <h3 className="text-xl font-semibold text-slate-800">Subject Line Options</h3>
            </div>
            <div className="flex items-center px-3 py-1 bg-orange-500/20 rounded-full">
              <Sparkles className="w-4 h-4 text-orange-400 mr-1" />
              <span className="text-orange-600 text-sm font-medium">AI Generated</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {results.subjectLines.map((subject, index) => (
              <div key={index} className="bg-blue-50/50 rounded-lg p-4 border border-blue-200/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-orange-600 text-sm font-medium">Option {index + 1}</span>
                  <button
                    onClick={() => handleCopy(subject, `subject-${index}`)}
                    className={`flex items-center px-2 py-1 rounded text-xs font-medium transition-all ${
                      copiedStates[`subject-${index}`]
                        ? 'bg-green-600 text-white'
                        : 'bg-white/80 text-slate-600 hover:bg-white'
                    }`}
                  >
                    {copiedStates[`subject-${index}`] ? (
                      <>
                        <Check className="w-3 h-3 mr-1" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 mr-1" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <p className="text-slate-700 text-sm">{subject}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cold Email */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-blue-100/50 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Mail className="w-6 h-6 text-purple-400 mr-3" />
              <h3 className="text-xl font-semibold text-slate-800">Cold Email</h3>
            </div>
            <button
              onClick={() => handleCopy(results.coldEmail, 'coldEmail')}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
                copiedStates.coldEmail
                  ? 'bg-green-600 text-white'
                  : 'bg-white/80 text-slate-600 hover:bg-white'
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
          
          <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-200/50">
            <pre className="text-slate-700 whitespace-pre-wrap text-sm leading-relaxed font-sans">
              {results.coldEmail}
            </pre>
          </div>

          {/* Analytics */}
          {(results.toneScore || results.readabilityScore) && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              {results.toneScore && (
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{results.toneScore}%</div>
                  <div className="text-blue-700 text-sm">Tone Match</div>
                </div>
              )}
              {results.readabilityScore && (
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">{results.readabilityScore}%</div>
                  <div className="text-green-700 text-sm">Readability</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Follow-up Email */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-blue-100/50 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <MessageSquare className="w-6 h-6 text-blue-400 mr-3" />
              <h3 className="text-xl font-semibold text-slate-800">Follow-up Message</h3>
            </div>
            <button
              onClick={() => handleCopy(results.followUp, 'followUp')}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
                copiedStates.followUp
                  ? 'bg-green-600 text-white'
                  : 'bg-white/80 text-slate-600 hover:bg-white'
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
          
          <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-200/50">
            <pre className="text-slate-700 whitespace-pre-wrap text-sm leading-relaxed font-sans">
              {results.followUp}
            </pre>
          </div>
        </div>
      </div>

      <div className="text-center">
        <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-full border border-green-500/30">
          <Check className="w-5 h-5 text-green-600 mr-2" />
          <span className="text-green-700 font-medium">Messages generated successfully!</span>
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;