import React, { useState, useEffect } from 'react';
import { Clock, Search, Filter, Download, Star, Copy, Check } from 'lucide-react';
import { copyToClipboard } from '../../utils/clipboard';

interface EmailRecord {
  id: string;
  recipient: string;
  subject: string;
  content: string;
  tone: string;
  createdAt: string;
  isFavorite: boolean;
  responseRate?: number;
}

interface EmailHistoryProps {
  isPremium: boolean;
}

const EmailHistory: React.FC<EmailHistoryProps> = ({ isPremium }) => {
  const [emails, setEmails] = useState<EmailRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTone, setFilterTone] = useState('all');
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});

  // Mock data - in a real app, this would come from your backend
  useEffect(() => {
    const mockEmails: EmailRecord[] = [
      {
        id: '1',
        recipient: 'John Smith, CEO of TechCorp',
        subject: 'Partnership Opportunity',
        content: 'Hi John,\n\nI hope this email finds you well...',
        tone: 'Professional',
        createdAt: '2025-01-15T10:30:00Z',
        isFavorite: true,
        responseRate: 85
      },
      {
        id: '2',
        recipient: 'Sarah Johnson, Marketing Director',
        subject: 'Collaboration Request',
        content: 'Hey Sarah,\n\nHope you\'re having a great day!...',
        tone: 'Friendly',
        createdAt: '2025-01-14T14:20:00Z',
        isFavorite: false,
        responseRate: 72
      },
      {
        id: '3',
        recipient: 'Mike Davis, Startup Founder',
        subject: 'Let\'s Chat About Your Project',
        content: 'Hi Mike,\n\nI promise this isn\'t another generic sales email...',
        tone: 'Funny',
        createdAt: '2025-01-13T09:15:00Z',
        isFavorite: false,
        responseRate: 90
      }
    ];

    // Only show limited history for free users
    setEmails(isPremium ? mockEmails : mockEmails.slice(0, 2));
  }, [isPremium]);

  const filteredEmails = emails.filter(email => {
    const matchesSearch = email.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTone = filterTone === 'all' || email.tone === filterTone;
    return matchesSearch && matchesTone;
  });

  const handleCopy = async (content: string, id: string) => {
    const success = await copyToClipboard(content);
    if (success) {
      setCopiedStates(prev => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [id]: false }));
      }, 2000);
    }
  };

  const toggleFavorite = (id: string) => {
    setEmails(prev => prev.map(email => 
      email.id === id ? { ...email, isFavorite: !email.isFavorite } : email
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const exportEmails = () => {
    const csvContent = emails.map(email => 
      `"${email.recipient}","${email.subject}","${email.tone}","${email.createdAt}","${email.content.replace(/"/g, '""')}"`
    ).join('\n');
    
    const blob = new Blob([`Recipient,Subject,Tone,Date,Content\n${csvContent}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'email-history.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Clock className="w-6 h-6 text-purple-400 mr-3" />
          <div>
            <h3 className="text-xl font-semibold text-white">Email History</h3>
            <p className="text-gray-300 text-sm">
              {isPremium ? 'All your generated emails' : 'Last 2 emails (Premium: unlimited history)'}
            </p>
          </div>
        </div>
        
        {isPremium && emails.length > 0 && (
          <button
            onClick={exportEmails}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
        )}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search emails..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
        </div>
        <div className="flex items-center">
          <Filter className="w-5 h-5 text-gray-400 mr-2" />
          <select
            value={filterTone}
            onChange={(e) => setFilterTone(e.target.value)}
            className="px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          >
            <option value="all" className="bg-gray-800">All Tones</option>
            <option value="Professional" className="bg-gray-800">Professional</option>
            <option value="Friendly" className="bg-gray-800">Friendly</option>
            <option value="Funny" className="bg-gray-800">Funny</option>
            <option value="Confident" className="bg-gray-800">Confident</option>
          </select>
        </div>
      </div>

      {/* Email List */}
      <div className="space-y-4">
        {filteredEmails.map(email => (
          <div key={email.id} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h4 className="text-white font-medium mr-3">{email.subject}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    email.tone === 'Professional' ? 'bg-blue-500/20 text-blue-300' :
                    email.tone === 'Friendly' ? 'bg-green-500/20 text-green-300' :
                    email.tone === 'Funny' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-purple-500/20 text-purple-300'
                  }`}>
                    {email.tone}
                  </span>
                  {isPremium && email.responseRate && (
                    <span className="ml-2 px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-medium">
                      {email.responseRate}% response rate
                    </span>
                  )}
                </div>
                <p className="text-gray-300 text-sm mb-2">To: {email.recipient}</p>
                <p className="text-gray-400 text-xs">{formatDate(email.createdAt)}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleFavorite(email.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    email.isFavorite 
                      ? 'text-yellow-400 hover:text-yellow-300' 
                      : 'text-gray-400 hover:text-yellow-400'
                  }`}
                >
                  <Star className={`w-4 h-4 ${email.isFavorite ? 'fill-current' : ''}`} />
                </button>
                
                <button
                  onClick={() => handleCopy(email.content, email.id)}
                  className={`flex items-center px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                    copiedStates[email.id]
                      ? 'bg-green-600 text-white'
                      : 'bg-white/20 text-gray-300 hover:bg-white/30'
                  }`}
                >
                  {copiedStates[email.id] ? (
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
            </div>
            
            <div className="bg-black/20 rounded-lg p-3 border border-gray-600">
              <p className="text-gray-300 text-sm line-clamp-3">
                {email.content.substring(0, 200)}...
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredEmails.length === 0 && (
        <div className="text-center py-12">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No emails found</p>
          <p className="text-gray-500 text-sm">
            {emails.length === 0 ? 'Generate your first email to see it here' : 'Try adjusting your search criteria'}
          </p>
        </div>
      )}

      {!isPremium && emails.length >= 2 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-300 font-medium">Unlock Full Email History</p>
              <p className="text-purple-200 text-sm">Premium users get unlimited email history and analytics</p>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all text-sm font-medium">
              Upgrade
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailHistory;