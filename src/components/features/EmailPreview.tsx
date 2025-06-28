import React, { useState, useEffect } from 'react';
import { X, Eye, Clock, User, Mail, Target, Loader, Sparkles, Send } from 'lucide-react';

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && formData.name && formData.recipient && formData.purpose) {
      generateAIPreview();
    }
  }, [isOpen, formData]);

  const generateAIPreview = async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
      
      if (!apiKey) {
        throw new Error('OpenRouter API key not configured');
      }

      const prompt = `Generate a quick preview of a cold outreach email with these details:

**Details:**
- Sender: ${formData.name}
- Recipient: ${formData.recipient}
- Purpose: ${formData.purpose}
- Tone: ${formData.tone}
- Industry: ${formData.industry || 'Not specified'}
- Urgency: ${formData.urgency || 'medium'}
- Portfolio: ${formData.portfolio || 'Not provided'}

**Requirements:**
- Generate a concise preview (not the full email)
- Show the subject line and first 2-3 paragraphs
- Match the ${formData.tone} tone perfectly
- Make it personalized and engaging
- Include a clear value proposition
- Use natural, conversational language
- Avoid generic template phrases

Format as:
Subject: [subject line]

[Email preview content...]`;

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'ColdSendr AI Cold Outreach Tool'
        },
        body: JSON.stringify({
          model: 'mistralai/mistral-7b-instruct',
          messages: [
            {
              role: 'system',
              content: 'You are an expert at writing compelling cold outreach emails. Generate engaging previews that capture attention and show value. Always use natural, personalized language and avoid generic templates.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 800
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;

      if (!content) {
        throw new Error('No content generated from AI');
      }

      setPreviewEmail(content);
    } catch (error) {
      console.error('Error generating AI preview:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate preview');
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl border border-emerald-100/50 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-emerald-100/50">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
              <Send className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">ColdSendr AI Preview</h2>
              <p className="text-slate-600 text-sm">Real-time AI-generated preview of your email</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Summary */}
        <div className="p-6 border-b border-emerald-100/50 bg-emerald-50/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center">
              <User className="w-4 h-4 text-emerald-400 mr-2" />
              <div>
                <div className="text-slate-500">Sender</div>
                <div className="text-slate-800 font-medium">{formData.name || 'Not set'}</div>
              </div>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 text-blue-400 mr-2" />
              <div>
                <div className="text-slate-500">Recipient</div>
                <div className="text-slate-800 font-medium">{formData.recipient || 'Not set'}</div>
              </div>
            </div>
            <div className="flex items-center">
              <Target className="w-4 h-4 text-emerald-400 mr-2" />
              <div>
                <div className="text-slate-500">Tone</div>
                <div className="text-slate-800 font-medium">{formData.tone}</div>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-orange-400 mr-2" />
              <div>
                <div className="text-slate-500">Priority</div>
                <div className="text-slate-800 font-medium capitalize">{formData.urgency || 'Medium'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {isGenerating ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                <p className="text-slate-600">ColdSendr AI generating real-time preview...</p>
                <p className="text-slate-500 text-sm mt-2">Using OpenRouter API with Mistral 7B</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-600 mb-4">⚠️ Preview Generation Failed</div>
              <p className="text-slate-600 mb-4">{error}</p>
              <button
                onClick={generateAIPreview}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="bg-emerald-50/50 rounded-lg p-6 border border-emerald-200/50">
              <div className="mb-4 pb-4 border-b border-emerald-200/50">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-500 mb-2">ColdSendr AI-Generated Email Preview</div>
                  <div className="flex items-center px-2 py-1 bg-emerald-500/20 rounded-full">
                    <Sparkles className="w-3 h-3 text-emerald-400 mr-1" />
                    <span className="text-emerald-600 text-xs font-medium">Live AI Generation</span>
                  </div>
                </div>
                <div className="text-xs text-slate-400">
                  Generated in real-time using OpenRouter API. The final email will be fully detailed and optimized.
                </div>
              </div>
              <pre className="text-slate-700 whitespace-pre-wrap text-sm leading-relaxed font-sans">
                {previewEmail}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-emerald-100/50 bg-emerald-50/30">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-500">
              This AI preview shows how your email will look. Generate the full version for complete content.
            </div>
            <div className="flex gap-3">
              {error && (
                <button
                  onClick={generateAIPreview}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all font-medium"
                >
                  Retry Preview
                </button>
              )}
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg hover:from-emerald-700 hover:to-blue-700 transition-all font-medium"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailPreview;