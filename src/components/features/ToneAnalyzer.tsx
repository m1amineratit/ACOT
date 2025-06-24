import React from 'react';
import { BarChart3, Target, Zap, CheckCircle, AlertTriangle } from 'lucide-react';

interface ToneAnalyzerProps {
  email: string;
}

const ToneAnalyzer: React.FC<ToneAnalyzerProps> = ({ email }) => {
  // Mock analysis - in a real app, this would use AI/ML
  const analyzeEmail = (text: string) => {
    const wordCount = text.split(' ').length;
    const sentenceCount = text.split(/[.!?]+/).length - 1;
    const avgWordsPerSentence = wordCount / sentenceCount;
    
    // Mock scores based on text characteristics
    const readabilityScore = Math.min(100, Math.max(0, 100 - (avgWordsPerSentence - 15) * 2));
    const professionalismScore = text.includes('Dear') || text.includes('Best regards') ? 85 : 70;
    const engagementScore = text.includes('?') ? 80 : 65;
    const clarityScore = avgWordsPerSentence < 20 ? 90 : 70;
    
    return {
      readabilityScore: Math.round(readabilityScore),
      professionalismScore: Math.round(professionalismScore),
      engagementScore: Math.round(engagementScore),
      clarityScore: Math.round(clarityScore),
      wordCount,
      sentenceCount,
      avgWordsPerSentence: Math.round(avgWordsPerSentence)
    };
  };

  const analysis = analyzeEmail(email);
  const overallScore = Math.round((analysis.readabilityScore + analysis.professionalismScore + analysis.engagementScore + analysis.clarityScore) / 4);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const suggestions = [
    ...(analysis.readabilityScore < 70 ? ['Consider shorter sentences for better readability'] : []),
    ...(analysis.engagementScore < 70 ? ['Add a question to increase engagement'] : []),
    ...(analysis.clarityScore < 70 ? ['Simplify complex phrases for clarity'] : []),
    ...(analysis.professionalismScore < 70 ? ['Consider a more formal greeting and closing'] : [])
  ];

  return (
    <div className="mt-8 bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-blue-100/50 shadow-xl">
      <div className="flex items-center mb-6">
        <BarChart3 className="w-6 h-6 text-purple-400 mr-3" />
        <h3 className="text-xl font-semibold text-slate-800">Email Analysis</h3>
        <div className="ml-auto flex items-center">
          <span className="text-sm text-slate-600 mr-2">Overall Score:</span>
          <div className={`text-2xl font-bold ${getScoreColor(overallScore)}`}>
            {overallScore}%
          </div>
        </div>
      </div>

      {/* Score Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50/50 rounded-lg p-4 text-center">
          <div className={`text-2xl font-bold mb-1 ${getScoreColor(analysis.readabilityScore)}`}>
            {analysis.readabilityScore}%
          </div>
          <div className="text-slate-600 text-sm">Readability</div>
          <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
            <div 
              className={`h-2 rounded-full ${getScoreBg(analysis.readabilityScore)}`}
              style={{ width: `${analysis.readabilityScore}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-blue-50/50 rounded-lg p-4 text-center">
          <div className={`text-2xl font-bold mb-1 ${getScoreColor(analysis.professionalismScore)}`}>
            {analysis.professionalismScore}%
          </div>
          <div className="text-slate-600 text-sm">Professional</div>
          <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
            <div 
              className={`h-2 rounded-full ${getScoreBg(analysis.professionalismScore)}`}
              style={{ width: `${analysis.professionalismScore}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-blue-50/50 rounded-lg p-4 text-center">
          <div className={`text-2xl font-bold mb-1 ${getScoreColor(analysis.engagementScore)}`}>
            {analysis.engagementScore}%
          </div>
          <div className="text-slate-600 text-sm">Engagement</div>
          <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
            <div 
              className={`h-2 rounded-full ${getScoreBg(analysis.engagementScore)}`}
              style={{ width: `${analysis.engagementScore}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-blue-50/50 rounded-lg p-4 text-center">
          <div className={`text-2xl font-bold mb-1 ${getScoreColor(analysis.clarityScore)}`}>
            {analysis.clarityScore}%
          </div>
          <div className="text-slate-600 text-sm">Clarity</div>
          <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
            <div 
              className={`h-2 rounded-full ${getScoreBg(analysis.clarityScore)}`}
              style={{ width: `${analysis.clarityScore}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-700 mb-1">{analysis.wordCount}</div>
          <div className="text-blue-600 text-sm">Words</div>
        </div>
        <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-700 mb-1">{analysis.sentenceCount}</div>
          <div className="text-green-600 text-sm">Sentences</div>
        </div>
        <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-700 mb-1">{analysis.avgWordsPerSentence}</div>
          <div className="text-purple-600 text-sm">Avg Words/Sentence</div>
        </div>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
            <h4 className="text-yellow-700 font-medium">Suggestions for Improvement</h4>
          </div>
          <ul className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start">
                <Target className="w-4 h-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-yellow-800 text-sm">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {suggestions.length === 0 && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-green-700 font-medium">Great job! Your email looks excellent.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToneAnalyzer;