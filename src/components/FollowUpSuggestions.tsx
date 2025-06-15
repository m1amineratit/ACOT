import React, { useState } from 'react';
import { RefreshCw, Calendar, Mail, MessageSquare, Copy, Check } from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard';

interface FollowUpSuggestionsProps {
  originalFormData: {
    name: string;
    recipient: string;
    purpose: string;
    tone: string;
    portfolio: string;
  };
}

const FollowUpSuggestions: React.FC<FollowUpSuggestionsProps> = ({ originalFormData }) => {
  const [selectedTone, setSelectedTone] = useState(originalFormData.tone);
  const [copiedStates, setCopiedStates] = useState<{ [key: number]: boolean }>({});

  const toneOptions = [
    { value: 'Professional', label: 'Professional' },
    { value: 'Friendly', label: 'Friendly' },
    { value: 'Casual', label: 'Casual' },
    { value: 'Funny', label: 'Funny' }
  ];

  const generateFollowUpSuggestions = (tone: string) => {
    const recipientName = originalFormData.recipient.split(',')[0].replace(/^(Mr\.|Ms\.|Dr\.)?\s*/, '');
    const purpose = originalFormData.purpose.toLowerCase();
    
    const suggestions = {
      Professional: [
        `Hi ${recipientName}, I wanted to follow up on my previous email regarding ${purpose}. I understand you have a busy schedule, but I'd appreciate the opportunity to discuss this further at your convenience.`,
        `Hello ${recipientName}, I hope this message finds you well. I'm following up on my earlier correspondence about ${purpose}. Would you have a few minutes this week for a brief conversation?`,
        `Dear ${recipientName}, I wanted to circle back on my previous message. I believe there's significant value in exploring ${purpose} together. Please let me know if you'd like to schedule a quick call.`
      ],
      Friendly: [
        `Hi ${recipientName}! Just checking in on my previous email about ${purpose}. I know things can get hectic, but I'd love to chat if you're interested!`,
        `Hey ${recipientName}, hope you're having a great week! I wanted to follow up on my message about ${purpose}. Would love to hear your thoughts when you have a moment.`,
        `Hi there ${recipientName}! Following up on my earlier email about ${purpose}. No pressure at all, but I'm here if you'd like to explore this opportunity together.`
      ],
      Casual: [
        `Hey ${recipientName}, just bumping this back up in case it got buried in your inbox. Still interested in chatting about ${purpose} if you are!`,
        `Hi ${recipientName}, totally understand things get busy! Just wanted to check in about ${purpose} - let me know if you'd like to talk.`,
        `Hey there! Just following up on my email about ${purpose}. No worries if now isn't the right time, but I'm here if you want to connect.`
      ],
      Funny: [
        `Hi ${recipientName}! Just making sure my last email didn't get lost in the digital void 😄 Still excited to chat about ${purpose} if you are!`,
        `Hey ${recipientName}, I promise this isn't me being pushy - just genuinely excited about ${purpose} and wanted to see if you're interested in exploring it together!`,
        `Hi there! Following up on my email about ${purpose}. I know, I know - another email in your already overflowing inbox. But hey, this could be the start of something awesome! 🚀`
      ]
    };

    return suggestions[tone as keyof typeof suggestions] || suggestions.Professional;
  };

  const suggestions = generateFollowUpSuggestions(selectedTone);

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
          <RefreshCw className="w-6 h-6 text-purple-400 mr-3" />
          <h3 className="text-xl font-semibold text-white">Smart Follow-up Suggestions</h3>
        </div>
        
        {/* Tone Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-300">Tone:</span>
          <select
            value={selectedTone}
            onChange={(e) => setSelectedTone(e.target.value)}
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

      <p className="text-gray-300 mb-6 text-sm">
        Here are some personalized follow-up suggestions based on your original email:
      </p>

      <div className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                {getIcon(index)}
                <span className="text-sm font-medium text-gray-300 ml-2">
                  Follow-up {index + 1}
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
            
            <p className="text-gray-200 text-sm leading-relaxed">
              {suggestion}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <div className="flex items-center">
          <MessageSquare className="w-5 h-5 text-blue-400 mr-2" />
          <span className="text-blue-300 text-sm font-medium">Pro Tip:</span>
        </div>
        <p className="text-blue-200 text-sm mt-1">
          Wait 3-5 business days between follow-ups for optimal response rates. Personalize each message based on any new information you discover about the recipient.
        </p>
      </div>
    </div>
  );
};

export default FollowUpSuggestions;