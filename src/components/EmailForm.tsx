import React, { useState } from 'react';
import { Loader, Send, Volume2, Sparkles, Target, Clock, AlertTriangle, Lightbulb } from 'lucide-react';
import { generateEmails, generateVoiceMessage } from '../utils/api';
import ResultsSection from './ResultsSection';
import AIFollowUpSuggestions from './AIFollowUpSuggestions';
import ToneAnalyzer from './features/ToneAnalyzer';
import EmailPreview from './features/EmailPreview';

interface FormData {
  name: string;
  recipient: string;
  purpose: string;
  tone: string;
  portfolio: string;
  industry?: string;
  urgency?: string;
  recipientContext?: string;
}

interface GeneratedContent {
  coldEmail: string;
  followUp: string;
  subjectLines?: string[];
  icebreakers?: string[];
  toneScore?: number;
  readabilityScore?: number;
}

const EmailForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    recipient: '',
    purpose: '',
    tone: 'Professional',
    portfolio: '',
    industry: '',
    urgency: 'medium',
    recipientContext: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingVoice, setIsGeneratingVoice] = useState(false);
  const [results, setResults] = useState<GeneratedContent | null>(null);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showPreview, setShowPreview] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const toneOptions = [
    { value: 'Friendly', label: 'Friendly', description: 'Warm and approachable' },
    { value: 'Professional', label: 'Professional', description: 'Formal and business-like' },
    { value: 'Funny', label: 'Funny', description: 'Light-hearted and humorous' },
    { value: 'Confident', label: 'Confident', description: 'Assertive and direct' },
    { value: 'Persuasive', label: 'Persuasive', description: 'Compelling and convincing' },
    { value: 'Empathetic', label: 'Empathetic', description: 'Understanding and caring' },
    { value: 'Authoritative', label: 'Authoritative', description: 'Expert and knowledgeable' }
  ];

  const industryOptions = [
    { value: '', label: 'Select Industry (Optional)' },
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Finance' },
    { value: 'education', label: 'Education' },
    { value: 'retail', label: 'Retail' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'real-estate', label: 'Real Estate' },
    { value: 'other', label: 'Other' }
  ];

  const urgencyOptions = [
    { value: 'low', label: 'Low Priority', description: 'No rush, flexible timing' },
    { value: 'medium', label: 'Medium Priority', description: 'Standard business timing' },
    { value: 'high', label: 'High Priority', description: 'Time-sensitive opportunity' }
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.recipient.trim()) newErrors.recipient = 'Recipient is required';
    if (!formData.purpose.trim()) newErrors.purpose = 'Purpose is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    
    // Clear API error when user makes changes
    if (apiError) {
      setApiError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setApiError(null);
    
    try {
      const generated = await generateEmails(formData, true);
      setResults(generated);
    } catch (error) {
      console.error('Error generating emails:', error);
      setApiError(error instanceof Error ? error.message : 'Failed to generate emails. Please check your OpenRouter API configuration.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateVoice = async () => {
    if (!results?.coldEmail) return;
    
    setIsGeneratingVoice(true);
    try {
      const audioUrl = await generateVoiceMessage(results.coldEmail);
      // Audio is played directly by the generateVoiceMessage function
    } catch (error) {
      console.error('Error generating voice message:', error);
    } finally {
      setIsGeneratingVoice(false);
    }
  };

  // Check if OpenRouter API key is configured
  const isApiConfigured = !!import.meta.env.VITE_OPENROUTER_API_KEY;

  return (
    <>
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
            {/* API Configuration Warning */}
            {!isApiConfigured && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
                  <p className="text-red-300 font-medium">
                    OpenRouter API key not configured. Please add VITE_OPENROUTER_API_KEY to your environment variables.
                  </p>
                </div>
              </div>
            )}

            {/* New Icebreaker Feature Banner */}
            <div className="mb-6 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg">
              <div className="flex items-center">
                <Lightbulb className="w-5 h-5 text-yellow-400 mr-2" />
                <p className="text-yellow-300 font-medium">
                  🆕 NEW: AI Icebreaker Generator - Add personal context for ultra-personalized opening lines!
                </p>
              </div>
            </div>

            {/* All Features Available Banner */}
            <div className="mb-6 p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-lg">
              <div className="flex items-center">
                <Sparkles className="w-5 h-5 text-yellow-400 mr-2" />
                <p className="text-purple-300 font-medium">
                  All emails generated dynamically using AI - no templates, just pure AI creativity!
                </p>
              </div>
            </div>

            {/* API Error Display */}
            {apiError && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
                  <p className="text-red-300">{apiError}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                    errors.name ? 'border-red-500' : 'border-white/30'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="recipient" className="block text-sm font-medium text-gray-200 mb-2">
                  Who are you reaching out to? *
                </label>
                <input
                  type="text"
                  id="recipient"
                  name="recipient"
                  value={formData.recipient}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                    errors.recipient ? 'border-red-500' : 'border-white/30'
                  }`}
                  placeholder="e.g., John Smith, CEO of TechCorp"
                />
                {errors.recipient && <p className="text-red-400 text-sm mt-1">{errors.recipient}</p>}
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="purpose" className="block text-sm font-medium text-gray-200 mb-2">
                Reason/Purpose of Email *
              </label>
              <textarea
                id="purpose"
                name="purpose"
                value={formData.purpose}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none ${
                  errors.purpose ? 'border-red-500' : 'border-white/30'
                }`}
                placeholder="Describe why you're reaching out and what you hope to achieve..."
              />
              {errors.purpose && <p className="text-red-400 text-sm mt-1">{errors.purpose}</p>}
            </div>

            {/* NEW: Recipient Context Field for Icebreakers */}
            <div className="mb-6">
              <label htmlFor="recipientContext" className="block text-sm font-medium text-gray-200 mb-2">
                <div className="flex items-center">
                  <Lightbulb className="w-4 h-4 text-yellow-400 mr-2" />
                  Personal Context for AI Icebreakers
                  <span className="text-yellow-400 ml-2 text-xs font-bold">NEW!</span>
                </div>
              </label>
              <textarea
                id="recipientContext"
                name="recipientContext"
                value={formData.recipientContext}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all resize-none"
                placeholder="e.g., 'They recently posted about AI adoption challenges on LinkedIn' or 'Their company just announced a $10M Series A funding' or 'We both attended Stanford' - AI will create personalized icebreakers from this!"
              />
              <p className="text-gray-400 text-xs mt-1">
                💡 Add any personal detail, recent activity, or connection point. AI will generate custom icebreakers to make your email stand out!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="tone" className="block text-sm font-medium text-gray-200 mb-2">
                  Tone <span className="text-xs text-green-300">(AI will match perfectly)</span>
                </label>
                <select
                  id="tone"
                  name="tone"
                  value={formData.tone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                >
                  {toneOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-gray-800">
                      {option.label} - {option.description}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-200 mb-2">
                  Industry <span className="text-xs text-green-300">(AI personalization)</span>
                </label>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                >
                  {industryOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-gray-800">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label htmlFor="portfolio" className="block text-sm font-medium text-gray-200 mb-2">
                  Your Portfolio or Website
                  <span className="text-gray-400 ml-1">(optional)</span>
                </label>
                <input
                  type="url"
                  id="portfolio"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div>
                <label htmlFor="urgency" className="block text-sm font-medium text-gray-200 mb-2">
                  Priority Level <span className="text-xs text-green-300">(AI adapts tone)</span>
                </label>
                <select
                  id="urgency"
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                >
                  {urgencyOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-gray-800">
                      {option.label} - {option.description}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={isLoading || !isApiConfigured}
                className="flex-1 flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                    AI Generating...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Generate with AI + Icebreakers
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setShowPreview(true)}
                disabled={!formData.name || !formData.recipient || !formData.purpose || !isApiConfigured}
                className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <Clock className="w-5 h-5 mr-2" />
                AI Preview
              </button>

              {results && (
                <button
                  type="button"
                  onClick={handleGenerateVoice}
                  disabled={isGeneratingVoice}
                  className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isGeneratingVoice ? (
                    <>
                      <Loader className="w-5 h-5 mr-2 animate-spin" />
                      Generating Voice...
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-5 h-5 mr-2" />
                      Generate Voice Message
                    </>
                  )}
                </button>
              )}
            </div>
          </form>

          {results && (
            <>
              <ResultsSection results={results} isPremium={true} />
              <ToneAnalyzer email={results.coldEmail} />
              <AIFollowUpSuggestions originalFormData={formData} />
            </>
          )}
        </div>
      </section>

      <EmailPreview
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        formData={formData}
      />
    </>
  );
};

export default EmailForm;