import React, { useState } from 'react';
import { X, Search, Crown, Target, Briefcase, Users, TrendingUp, Heart, Zap } from 'lucide-react';

interface EmailTemplatesProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (template: string) => void;
  isPremium: boolean;
}

interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  preview: string;
  isPremium: boolean;
  icon: React.ReactNode;
}

const EmailTemplates: React.FC<EmailTemplatesProps> = ({ isOpen, onClose, onSelect, isPremium }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const templates: Template[] = [
    // Free Templates
    {
      id: 'job-inquiry',
      name: 'Job Inquiry',
      category: 'career',
      description: 'Professional job application outreach',
      preview: 'Hi [Name], I came across your company and I\'m very interested in potential opportunities...',
      isPremium: false,
      icon: <Briefcase className="w-5 h-5" />
    },
    {
      id: 'networking',
      name: 'Networking',
      category: 'networking',
      description: 'General networking and connection building',
      preview: 'Hi [Name], I\'d love to connect and learn more about your work in [Industry]...',
      isPremium: false,
      icon: <Users className="w-5 h-5" />
    },
    {
      id: 'collaboration',
      name: 'Collaboration Request',
      category: 'business',
      description: 'Partnership and collaboration proposals',
      preview: 'Hi [Name], I believe there\'s a great opportunity for us to collaborate on...',
      isPremium: false,
      icon: <Target className="w-5 h-5" />
    },

    // Premium Templates
    {
      id: 'sales-outreach',
      name: 'Sales Outreach',
      category: 'sales',
      description: 'High-converting sales emails with proven frameworks',
      preview: 'Hi [Name], I noticed [Company] is expanding into [Market]. We\'ve helped similar companies achieve...',
      isPremium: true,
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      id: 'investor-pitch',
      name: 'Investor Pitch',
      category: 'fundraising',
      description: 'Professional investor outreach template',
      preview: 'Hi [Name], [Company] is revolutionizing [Industry] with our innovative approach to...',
      isPremium: true,
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: 'media-outreach',
      name: 'Media & PR',
      category: 'marketing',
      description: 'Press and media relationship building',
      preview: 'Hi [Name], I have an exclusive story that would be perfect for [Publication]...',
      isPremium: true,
      icon: <Heart className="w-5 h-5" />
    },
    {
      id: 'customer-success',
      name: 'Customer Success',
      category: 'customer',
      description: 'Customer retention and upselling emails',
      preview: 'Hi [Name], I wanted to check in on how [Product] has been working for your team...',
      isPremium: true,
      icon: <Users className="w-5 h-5" />
    },
    {
      id: 'thought-leadership',
      name: 'Thought Leadership',
      category: 'content',
      description: 'Expert positioning and content collaboration',
      preview: 'Hi [Name], I\'ve been following your insights on [Topic] and would love to collaborate...',
      isPremium: true,
      icon: <Target className="w-5 h-5" />
    }
  ];

  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'career', name: 'Career' },
    { id: 'networking', name: 'Networking' },
    { id: 'business', name: 'Business' },
    { id: 'sales', name: 'Sales' },
    { id: 'fundraising', name: 'Fundraising' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'customer', name: 'Customer' },
    { id: 'content', name: 'Content' }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const hasAccess = isPremium || !template.isPremium;
    
    return matchesSearch && matchesCategory && hasAccess;
  });

  const premiumTemplatesCount = templates.filter(t => t.isPremium).length;
  const freeTemplatesCount = templates.filter(t => !t.isPremium).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <div>
            <h2 className="text-2xl font-bold text-white">Email Templates</h2>
            <p className="text-gray-300 text-sm">
              {isPremium 
                ? `${templates.length} templates available` 
                : `${freeTemplatesCount} free templates • ${premiumTemplatesCount} premium templates`
              }
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search and Filter */}
        <div className="p-6 border-b border-white/20">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id} className="bg-gray-800">
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {!isPremium && (
            <div className="mb-6 p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Crown className="w-5 h-5 text-yellow-400 mr-2" />
                  <div>
                    <p className="text-purple-300 font-medium">Unlock Premium Templates</p>
                    <p className="text-purple-200 text-sm">Get access to {premiumTemplatesCount} additional high-converting templates</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all text-sm font-medium">
                  Upgrade
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTemplates.map(template => (
              <div
                key={template.id}
                className={`relative bg-white/5 backdrop-blur-sm rounded-xl p-6 border transition-all cursor-pointer hover:scale-105 ${
                  template.isPremium && !isPremium
                    ? 'border-yellow-500/30 opacity-75'
                    : 'border-white/20 hover:border-purple-500/50'
                }`}
                onClick={() => {
                  if (!template.isPremium || isPremium) {
                    onSelect(template.name);
                  }
                }}
              >
                {template.isPremium && (
                  <div className="absolute top-3 right-3">
                    <Crown className="w-5 h-5 text-yellow-400" />
                  </div>
                )}

                <div className="flex items-center mb-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg mr-3">
                    {template.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{template.name}</h3>
                    <p className="text-gray-400 text-sm capitalize">{template.category}</p>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4">{template.description}</p>

                <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700">
                  <p className="text-gray-400 text-xs italic">
                    "{template.preview}"
                  </p>
                </div>

                {template.isPremium && !isPremium && (
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <Crown className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                      <p className="text-white font-medium">Premium Template</p>
                      <p className="text-gray-300 text-sm">Upgrade to unlock</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No templates found</p>
              <p className="text-gray-500 text-sm">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailTemplates;