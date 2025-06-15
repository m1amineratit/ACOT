import React, { useState, useEffect } from 'react';
import { X, Eye, Clock, User, Mail, Target } from 'lucide-react';

interface EmailPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  formData: {
    name: string;
    recipient: string;
    purpose: string;
    tone: string;
    portfolio: string;
    industry?: string;
    urgency?: string;
  };
}

const EmailPreview: React.FC<EmailPreviewProps> = ({ isOpen, onClose, formData }) => {
  const [previewEmail, setPreviewEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (isOpen && formData.name && formData.recipient && formData.purpose) {
      generatePreview();
    }
  }, [isOpen, formData]);

  const generatePreview = async () => {
    setIsGenerating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate a quick preview based on form data
    const recipientName = formData.recipient.split(',')[0].replace(/^(Mr\.|Ms\.|Dr\.)?\s*/, '');
    const preview = `Subject: ${getSubjectLine()}

Hi ${recipientName},

${getOpeningLine()} I hope this email finds you well.

My name is ${formData.name}, and I'm reaching out because ${formData.purpose.toLowerCase()}.

${getToneSpecificContent()}

${formData.portfolio ? `I'd love for you to check out my work at ${formData.portfolio} to get a better sense of what I can bring to the table.` : ''}

I understand you're probably busy, but I'd be grateful for just a few minutes of your time to discuss this opportunity. Would you be available for a brief call this week?

${getClosing()}

Best regards,
${formData.name}`;

    setPreviewEmail(preview);
    setIsGenerating(false);
  };

  const getSubjectLine = () => {
    const urgencyMap = {
      high: 'Urgent: ',
      medium: '',
      low: 'When convenient: '
    };
    const prefix = urgencyMap[formData.urgency as keyof typeof urgencyMap] || '';
    
    if (formData.purpose.toLowerCase().includes('job')) {
      return `${prefix}Opportunity to Connect - Potential Collaboration`;
    } else if (formData.purpose.toLowerCase().includes('partnership')) {
      return `${prefix}Partnership Opportunity`;
    }
    return `${prefix}Introduction and Potential Opportunity`;
  };

  const getOpeningLine = () => {
    switch (formData.tone) {
      case 'Friendly':
        return 'Hope you\'re having a great day!';
      case 'Funny':
        return 'I promise this isn\'t another generic sales email (plot twist: it kind of is, but in a good way)!';
      case 'Confident':
        return 'I\'m writing to you because I believe we could create something amazing together.';
      default:
        return '';
    }
  };

  const getToneSpecificContent = () => {
    const baseContent = `I believe there's a great opportunity for us to work together, and I'd love to explore how we can make that happen.`;
    
    switch (formData.tone) {
      case 'Friendly':
        return `${baseContent} I'm really excited about the possibility of collaborating and think we could accomplish some wonderful things together.`;
      case 'Funny':
        return `${baseContent} I know, I know - another person sliding into your inbox. But hear me out, I think this could be the start of something pretty cool.`;
      case 'Confident':
        return `${baseContent} I have a track record of delivering exceptional results, and I'm confident that my skills would be valuable to your organization.`;
      default:
        return baseContent;
    }
  };

  const getClosing = () => {
    switch (formData.tone) {
      case 'Friendly':
        return 'Looking forward to hopefully connecting soon!';
      case 'Funny':
        return 'Thanks for reading this far - you\'re already awesome in my book!';
      case 'Confident':
        return 'I\'m confident this conversation will be worth both our time.';
      default:
        return 'Thank you for considering this opportunity.';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <div className="flex items-center">
            <Eye className="w-6 h-6 text-purple-400 mr-3" />
            <div>
              <h2 className="text-2xl font-bold text-white">Email Preview</h2>
              <p className="text-gray-300 text-sm">Quick preview based on your inputs</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Summary */}
        <div className="p-6 border-b border-white/20 bg-white/5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center">
              <User className="w-4 h-4 text-blue-400 mr-2" />
              <div>
                <div className="text-gray-400">Sender</div>
                <div className="text-white font-medium">{formData.name || 'Not set'}</div>
              </div>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 text-green-400 mr-2" />
              <div>
                <div className="text-gray-400">Recipient</div>
                <div className="text-white font-medium">{formData.recipient || 'Not set'}</div>
              </div>
            </div>
            <div className="flex items-center">
              <Target className="w-4 h-4 text-purple-400 mr-2" />
              <div>
                <div className="text-gray-400">Tone</div>
                <div className="text-white font-medium">{formData.tone}</div>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-orange-400 mr-2" />
              <div>
                <div className="text-gray-400">Priority</div>
                <div className="text-white font-medium capitalize">{formData.urgency || 'Medium'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {isGenerating ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                <p className="text-gray-300">Generating preview...</p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <div className="mb-4 pb-4 border-b border-gray-600">
                <div className="text-sm text-gray-400 mb-2">Email Preview</div>
                <div className="text-xs text-gray-500">
                  This is a quick preview. The final generated email will be more polished and personalized.
                </div>
              </div>
              <pre className="text-gray-200 whitespace-pre-wrap text-sm leading-relaxed font-sans">
                {previewEmail}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/20 bg-white/5">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">
              This preview helps you see how your email will look before generating the final version.
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-medium"
            >
              Close Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailPreview;