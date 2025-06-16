import React, { useState } from 'react';
import { RefreshCw, Calendar, Mail, MessageSquare, Copy, Check, Loader, Sparkles } from 'lucide-react';
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

  const toneOptions = [
    { value: 'Professional', label: 'Professional' },
    { value: 'Friendly', label: 'Friendly' },
    { value: 'Casual', label: 'Casual' },
    { value: 'Funny', label: 'Funny' },
    { value: 'Persuasive', label: 'Persuasive' },
    { value: 'Empathetic', label: 'Empathetic' }
  ];

  const generateAIFollowUps = async () => {
    setIsGenerating(true);
    
    try {
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

Format as JSON:
{
  "followUps": [
    "First follow-up email content...",
    "Second follow-up email content...",
    "Third follow-up email content..."
  ]
}`;

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'AI Cold Outreach Tool'
        },
        body: JSON.stringify({
          model: 'anthropic/claude-3.5-sonnet',
          messages: [
            {
              role: 'system',
              content: 'You are an expert at writing follow-up emails for cold outreach. Generate personalized, natural follow-ups that maintain engagement without being pushy.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1500
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate follow-ups');
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;

      if (content) {
        try {
          const jsonMatch = content.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            setSuggestions(parsed.followUps || []);
          } else {
            // Fallback: split by common delimiters
            const fallbackSuggestions = content.split(/(?:\n\n|\d+\.|Follow-up \d+:)/i)
              .filter(s => s.trim().length > 50)
              .slice(0, 3);
            setSuggestions(fallbackSuggestions);
          }
        } catch (error) {
          console.error('Error parsing AI response:', error);
          setSuggestions([content]);
        }
      }
    } catch (error) {
      console.error('Error generating AI follow-ups:', error);
      // Fallback suggestions
      setSuggestions([
        `Hi ${originalFormData.recipient.split(',')[0]},\n\nI wanted to follow up on my previous email about ${originalFormData.purpose.toLowerCase()}. I understand you're probably busy, but I believe this could be valuable for both of us.\n\nWould you have 10 minutes this week for a quick call?\n\nBest regards,\n${originalFormData.name}`,
        `Hello ${originalFormData.recipient.split(',')[0]},\n\nI hope you're doing well. I'm following up on my message about ${originalFormData.purpose.toLowerCase()}.\n\nI've been thinking about how this could specifically benefit your organization, and I'd love to share some insights.\n\nWould you be interested in a brief conversation?\n\nThanks,\n${originalFormData.name}`,
        `Hi ${originalFormData.recipient.split(',')[0]},\n\nI wanted to reach out one more time regarding ${originalFormData.purpose.toLowerCase()}.\n\nI completely understand if now isn't the right time, but I'd be happy to reconnect in a few months when things might be less hectic.\n\nThanks for your time,\n${originalFormData.name}`
      ]);
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

  return (
    <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Sparkles className="w-6 h-6 text-purple-400 mr-3" />
          <div>
            <h3 className="text-xl font-semibold text-white">AI Follow-up Suggestions</h3>
            <p className="text-gray-300 text-sm">
              Personalized follow-up emails generated by AI
            </p>
          </div>
        </div>
        
        {/* Tone Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-300">Tone:</span>
          <select
            value={selectedTone}
            onChange={(e) => {
              setSelectedTone(e.target.value);
              setHasGenerated(false);
              setSuggestions([]);
            }}
            className="px-3 py-1 bg-white/10 border border-white/30 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          >
            {toneOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-gray-800">
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {!hasGenerated && (
        <div className="text-center py-8">
          <button
            onClick={generateAIFollowUps}
            disabled={isGenerating}
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

      {suggestions.length > 0 && (
        <>
          <div className="space-y-4 mb-6">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    {getIcon(index)}
                    <span className="text-sm font-medium text-gray-300 ml-2">
                      Follow-up {index + 1} ({index === 0 ? '1 week later' : index === 1 ? '2 weeks later' : '1 month later'})
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(suggestion, index)}
                    className={`flex items-center px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                      copiedStates[index]
                        ? 'bg-green-600 text-white'
                        : 'bg-white/20 text-gray-300 hover:bg-white/30'
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
                
                <div className="bg-black/20 rounded-lg p-3 border border-gray-600">
                  <pre className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap font-sans">
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
              }}
              className="flex items-center px-4 py-2 bg-white/10 text-gray-300 rounded-lg hover:bg-white/20 transition-all text-sm font-medium"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Generate New Suggestions
            </button>

            <div className="text-sm text-gray-400">
              💡 Tip: Wait 3-5 business days between follow-ups for optimal response rates
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AIFollowUpSuggestions;