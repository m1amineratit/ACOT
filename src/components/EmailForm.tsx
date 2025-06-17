import React, { useState } from 'react';
import { Loader, Send, Volume2, Sparkles, Target, Clock } from 'lucide-react';
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
}

interface GeneratedContent {
  coldEmail: string;
  followUp: string;
  subjectLines?: string[];
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
    urgency: 'medium'
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingVoice, setIsGeneratingVoice] = useState(false);
  const [results, setResults] = useState<GeneratedContent | null>(null);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showPreview, setShowPreview] = useState(false);

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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const generated = await generateEmails(formData, true); // Always use premium features
      setResults(generated);
    } catch (error) {
      console.error('Error generating emails:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateVoice = async () => {
    if (!results?.coldEmail) return;
    
    setIsGeneratingVoice(true);
    try {
      const audioUrl = await generateVoiceMessage(results.coldEmail);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error('Error generating voice message:', error);
    } finally {
      setIsGeneratingVoice(false);
    }
  };

  return (
    <>
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
            {/* All Features Available Banner */}
            <div className="mb-6 p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-lg">
              <div className="flex items-center">
                <Sparkles className="w-5 h-5 text-yellow-400 mr-2" />
                <p className="text-purple-300 font-medium">
                  All advanced AI features are now free! Enjoy unlimited access to all tools.
                </p>
              </div>
            </div>

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="tone" className="block text-sm font-medium text-gray-200 mb-2">
                  Tone <span className="text-xs text-green-300">(All 7 options available)</span>
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
                  Industry <span className="text-xs text-green-300">(Enhanced targeting)</span>
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
                  Priority Level <span className="text-xs text-green-300">(Affects tone)</span>
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
                disabled={isLoading}
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
                    Generate with AI
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setShowPreview(true)}
                disabled={!formData.name || !formData.recipient || !formData.purpose}
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