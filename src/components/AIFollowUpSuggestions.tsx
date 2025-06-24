import React, { useState } from 'react';
import { RefreshCw, Calendar, Mail, MessageSquare, Copy, Check, Loader, Sparkles, AlertTriangle } from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard';

interface AIFollowUpSuggestionsProps {
  originalFormData: {
    name: string;
    recipient: string;
    purpose: string;
    tone: string;
    portfolio: string;
    industry?: string;
    urgency?: string;
  };
}

const AIFollowUpSuggestions: React.FC<AIFollowUpSuggestionsProps> = ({ originalFormData }) => {
  const [selectedTone, setSelectedTone] = useState(originalFormData.tone);
  const [copiedStates, setCopiedStates] = useState<{ [key: number]: boolean }>({});
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toneOptions = [
    { value: 'Professional', label: 'Professional' },
    { value: 'Friendly', label: 'Friendly' },
    { value: 'Casual', label: 'Casual' },
    { value: 'Funny', label: 'Funny' },
    { value: 'Persuasive', label: 'Persuasive' },
    { value: 'Empathetic', label: 'Empathetic' },
    { value: 'Authoritative', label: 'Authoritative' }
  ];

  const generateAIFollowUps = async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
      
      if (!apiKey) {
        throw new Error('OpenRouter API key not configured');
      }

      const prompt = `Generate 3 different follow-up email suggestions for a cold outreach campaign with these details:

**Original Context:**
- Sender: ${originalFormData.name}
- Recipient: ${originalFormData.recipient}
- Purpose: ${originalFormData.purpose}
- Industry: ${originalFormData.industry || 'Not specified'}
- Urgency: ${originalFormData.urgency || 'medium'}
- Portfolio: ${originalFormData.portfolio || 'Not provided'}

**Follow-up Requirements:**
- Tone: ${selectedTone}
- Each follow-up should be for different scenarios (1 week later, 2 weeks later, 1 month later)
- Keep them concise but personalized
- Include different approaches and value propositions
- Make them feel natural and not pushy
- Use real, engaging content - no generic templates
- Each should have a different angle or hook

Format as plain text with clear separators:

FOLLOW-UP 1:
[First follow-up email content - 1 week later approach]

FOLLOW-UP 2:
[Second follow-up email content - 2 weeks later approach]

FOLLOW-UP 3:
[Third follow-up email content - 1 month later approach]`;

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'AI Cold Outreach Tool'
        },
        body: JSON.stringify({
          model: 'mistralai/mistral-7b-instruct',
          messages: [
            {
              role: 'system',
              content: 'You are an expert at writing follow-up emails for cold outreach. Generate personalized, natural follow-ups that maintain engagement without being pushy. Avoid generic templates and create unique, compelling content.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2000
        })
      });

      if (!response.ok) {
        throw new Error(`OpenRouter API request failed: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;

      if (!content) {
        throw new Error('No content generated from OpenRouter API');
      }

      // Parse the response
      const sections = content.split(/FOLLOW-UP \d+:/i);
      const followUps = sections.slice(1).map(section => section.trim()).filter(section => section.length > 0);
      
      if (followUps.length >= 3) {
        setSuggestions(followUps.slice(0, 3));
      } else {
        throw new Error('Failed to generate all follow-up suggestions');
      }
    } catch (error) {
      console.error('Error generating AI follow-ups:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate follow-ups');
    } finally {
      setIsGenerating(false);
      setHasGenerated(true);
    }
  };

  const handleCopy = async (text: string, index: number) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedStates(prev => ({ ...prev, [index]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [index]: false }));
      }, 2000);
    }
  };

  const getIcon = (index: number) => {
    const icons = [Calendar, Mail, MessageSquare];
    const IconComponent = icons[index] || RefreshCw;
    return <IconComponent className="w-5 h-5 text-blue-400" />;
  };

  const isApiConfigured = !!import.meta.env.VITE_OPENROUTER_API_KEY;

  return (
    <div className="mt-8 bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-blue-100/50 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Sparkles className="w-6 h-6 text-purple-400 mr-3" />
          <div>
            <h3 className="text-xl font-semibold text-slate-800">AI Follow-up Suggestions</h3>
            <p className="text-slate-600 text-sm">
              Personalized follow-up emails generated by AI in real-time
            </p>
          </div>
        </div>
        
        {/* Tone Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-slate-600">Tone:</span>
          <select
            value={selectedTone}
            onChange={(e) => {
              setSelectedTone(e.target.value);
              setHasGenerated(false);
              setSuggestions([]);
              setError(null);
            }}
            className="px-3 py-1 bg-white/80 border border-blue-200/50 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          >
            {toneOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-white">
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* API Configuration Warning */}
      {!isApiConfigured && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
            <p className="text-red-600">
              OpenRouter API key not configured. Please add VITE_OPENROUTER_API_KEY to generate AI follow-ups.
            </p>
          </div>
        </div>
      )}

      {!hasGenerated && (
        <div className="text-center py-8">
          <button
            onClick={generateAIFollowUps}
            disabled={isGenerating || !isApiConfigured}
            className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isGenerating ? (
              <>
                <Loader className="w-5 h-5 mr-2 animate-spin" />
                AI Generating Follow-ups...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate AI Follow-ups
              </>
            )}
          </button>
        </div>
      )}

      {error && (
        <div className="text-center py-8">
          <div className="text-red-600 mb-4">⚠️ Generation Failed</div>
          <p className="text-slate-600 mb-4">{error}</p>
          <button
            onClick={generateAIFollowUps}
            disabled={!isApiConfigured}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            Try Again
          </button>
        </div>
      )}

      {suggestions.length > 0 && (
        <>
          <div className="space-y-4 mb-6">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="bg-blue-50/50 rounded-lg p-4 border border-blue-200/50 hover:border-blue-300/50 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    {getIcon(index)}
                    <span className="text-sm font-medium text-slate-600 ml-2">
                      Follow-up {index + 1} ({index === 0 ? '1 week later' : index === 1 ? '2 weeks later' : '1 month later'})
                    </span>
                    <div className="ml-3 flex items-center px-2 py-1 bg-purple-500/20 rounded-full">
                      <Sparkles className="w-3 h-3 text-purple-400 mr-1" />
                      <span className="text-purple-600 text-xs font-medium">AI Generated</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(suggestion, index)}
                    className={`flex items-center px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                      copiedStates[index]
                        ? 'bg-green-600 text-white'
                        : 'bg-white/80 text-slate-600 hover:bg-white'
                    }`}
                  >
                    {copiedStates[index] ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                
                <div className="bg-white/80 rounded-lg p-3 border border-blue-200/50">
                  <pre className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                    {suggestion}
                  </pre>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setHasGenerated(false);
                setSuggestions([]);
                setError(null);
              }}
              className="flex items-center px-4 py-2 bg-white/80 text-slate-600 rounded-lg hover:bg-white transition-all text-sm font-medium"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Generate New Suggestions
            </button>

            <div className="text-sm text-slate-500">
              💡 Tip: Wait 3-5 business days between follow-ups for optimal response rates
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AIFollowUpSuggestions;