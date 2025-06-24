import React, { useState, useEffect } from 'react';
import { 
  Clock, Search, Filter, Download, Star, Copy, Check, Trash2, 
  BarChart3, Heart, TrendingUp, Mail, Eye, Edit3, Lightbulb 
} from 'lucide-react';
import { copyToClipboard } from '../../utils/clipboard';
import { 
  getEmailHistory, 
  toggleFavorite, 
  deleteEmailHistory, 
  getEmailStats,
  EmailHistoryRecord 
} from '../../services/emailHistory';

const EmailHistory: React.FC = () => {
  const [emails, setEmails] = useState<EmailHistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTone, setFilterTone] = useState('all');
  const [filterIndustry, setFilterIndustry] = useState('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});
  const [stats, setStats] = useState<{
    totalEmails: number;
    favoriteEmails: number;
    responseRate: number;
    topTone: string;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [expandedIcebreakers, setExpandedIcebreakers] = useState<{ [key: string]: boolean }>({});
  const itemsPerPage = 10;

  useEffect(() => {
    fetchEmailHistory();
    fetchStats();
  }, [searchTerm, filterTone, filterIndustry, showFavoritesOnly, currentPage]);

  const fetchEmailHistory = async () => {
    setLoading(true);
    const offset = (currentPage - 1) * itemsPerPage;
    const result = await getEmailHistory(
      itemsPerPage,
      offset,
      searchTerm,
      filterTone,
      filterIndustry,
      showFavoritesOnly
    );

    if (result) {
      setEmails(result.data);
      setTotalCount(result.count);
    }
    setLoading(false);
  };

  const fetchStats = async () => {
    const statsData = await getEmailStats();
    setStats(statsData);
  };

  const handleCopy = async (content: string, id: string) => {
    const success = await copyToClipboard(content);
    if (success) {
      setCopiedStates(prev => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [id]: false }));
      }, 2000);
    }
  };

  const handleToggleFavorite = async (id: string, currentFavorite: boolean) => {
    const success = await toggleFavorite(id, !currentFavorite);
    if (success) {
      setEmails(prev => prev.map(email => 
        email.id === id ? { ...email, is_favorite: !currentFavorite } : email
      ));
      fetchStats();
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this email?')) {
      const success = await deleteEmailHistory(id);
      if (success) {
        setEmails(prev => prev.filter(email => email.id !== id));
        setTotalCount(prev => prev - 1);
        fetchStats();
      }
    }
  };

  const toggleIcebreakers = (emailId: string) => {
    setExpandedIcebreakers(prev => ({
      ...prev,
      [emailId]: !prev[emailId]
    }));
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
      `"${email.recipient_name}","${email.recipient_company || ''}","${email.purpose}","${email.tone}","${email.created_at}","${email.cold_email_content.replace(/"/g, '""')}","${email.icebreakers?.join('; ') || ''}","${email.recipient_context || ''}"`
    ).join('\n');
    
    const blob = new Blob([`Recipient,Company,Purpose,Tone,Date,Content,Icebreakers,Context\n${csvContent}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'email-history.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-blue-100/50 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Clock className="w-6 h-6 text-purple-400 mr-3" />
          <div>
            <h3 className="text-xl font-semibold text-slate-800">Email History</h3>
            <p className="text-slate-600 text-sm">
              Complete email history with unlimited access + AI icebreakers
            </p>
          </div>
        </div>
        
        {emails.length > 0 && (
          <button
            onClick={exportEmails}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
        )}
      </div>

      {/* Stats Dashboard */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 text-center">
            <Mail className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-700">{stats.totalEmails}</div>
            <div className="text-blue-600 text-sm">Total Emails</div>
          </div>
          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 text-center">
            <Star className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-700">{stats.favoriteEmails}</div>
            <div className="text-yellow-600 text-sm">Favorites</div>
          </div>
          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-center">
            <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-700">{stats.responseRate}%</div>
            <div className="text-green-600 text-sm">Response Rate</div>
          </div>
          <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4 text-center">
            <BarChart3 className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <div className="text-lg font-bold text-purple-700">{stats.topTone}</div>
            <div className="text-purple-600 text-sm">Top Tone</div>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search emails..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-3 bg-white/80 border border-blue-200/50 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center">
            <Filter className="w-5 h-5 text-slate-400 mr-2" />
            <select
              value={filterTone}
              onChange={(e) => {
                setFilterTone(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-3 bg-white/80 border border-blue-200/50 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            >
              <option value="all" className="bg-white">All Tones</option>
              <option value="Professional" className="bg-white">Professional</option>
              <option value="Friendly" className="bg-white">Friendly</option>
              <option value="Funny" className="bg-white">Funny</option>
              <option value="Confident" className="bg-white">Confident</option>
              <option value="Persuasive" className="bg-white">Persuasive</option>
              <option value="Empathetic" className="bg-white">Empathetic</option>
              <option value="Authoritative" className="bg-white">Authoritative</option>
            </select>
          </div>

          <button
            onClick={() => {
              setShowFavoritesOnly(!showFavoritesOnly);
              setCurrentPage(1);
            }}
            className={`flex items-center px-4 py-3 rounded-lg transition-all ${
              showFavoritesOnly 
                ? 'bg-yellow-600 text-white' 
                : 'bg-white/80 text-slate-600 hover:bg-white'
            }`}
          >
            <Star className={`w-4 h-4 mr-2 ${showFavoritesOnly ? 'fill-current' : ''}`} />
            Favorites
          </button>
        </div>
      </div>

      {/* Email List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {emails.map(email => (
            <div key={email.id} className="bg-blue-50/50 rounded-lg p-4 border border-blue-200/50 hover:border-blue-300/50 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h4 className="text-slate-800 font-medium mr-3">{email.recipient_name}</h4>
                    {email.recipient_company && (
                      <span className="text-slate-500 text-sm">at {email.recipient_company}</span>
                    )}
                    <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${
                      email.tone === 'Professional' ? 'bg-blue-500/20 text-blue-700' :
                      email.tone === 'Friendly' ? 'bg-green-500/20 text-green-700' :
                      email.tone === 'Funny' ? 'bg-yellow-500/20 text-yellow-700' :
                      'bg-purple-500/20 text-purple-700'
                    }`}>
                      {email.tone}
                    </span>
                    {email.tone_score && (
                      <span className="ml-2 px-2 py-1 bg-green-500/20 text-green-700 rounded-full text-xs font-medium">
                        {email.tone_score}% tone match
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 text-sm mb-2 line-clamp-2">{email.purpose}</p>
                  <div className="flex items-center text-slate-500 text-xs space-x-4">
                    <span>{formatDate(email.created_at)}</span>
                    {email.industry && <span>Industry: {email.industry}</span>}
                    {email.urgency && <span>Priority: {email.urgency}</span>}
                    {email.recipient_context && <span>Has Context</span>}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleToggleFavorite(email.id, email.is_favorite)}
                    className={`p-2 rounded-lg transition-colors ${
                      email.is_favorite 
                        ? 'text-yellow-600 hover:text-yellow-500' 
                        : 'text-slate-400 hover:text-yellow-600'
                    }`}
                  >
                    <Star className={`w-4 h-4 ${email.is_favorite ? 'fill-current' : ''}`} />
                  </button>
                  
                  <button
                    onClick={() => handleCopy(email.cold_email_content, email.id)}
                    className={`flex items-center px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                      copiedStates[email.id]
                        ? 'bg-green-600 text-white'
                        : 'bg-white/80 text-slate-600 hover:bg-white'
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

                  <button
                    onClick={() => handleDelete(email.id)}
                    className="p-2 text-red-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* AI Icebreakers Section */}
              {email.icebreakers && email.icebreakers.length > 0 && (
                <div className="mb-3">
                  <button
                    onClick={() => toggleIcebreakers(email.id)}
                    className="flex items-center text-yellow-600 hover:text-yellow-500 transition-colors text-sm font-medium mb-2"
                  >
                    <Lightbulb className="w-4 h-4 mr-1" />
                    AI Icebreakers ({email.icebreakers.length})
                    <span className="ml-1">{expandedIcebreakers[email.id] ? '▼' : '▶'}</span>
                  </button>
                  
                  {expandedIcebreakers[email.id] && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                      {email.icebreakers.map((icebreaker, index) => (
                        <div key={index} className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-yellow-700 text-xs font-medium">
                              {index === 0 ? 'Direct' : index === 1 ? 'Question' : 'Insight'}
                            </span>
                            <button
                              onClick={() => handleCopy(icebreaker, `icebreaker-${email.id}-${index}`)}
                              className={`text-xs px-1 py-0.5 rounded transition-all ${
                                copiedStates[`icebreaker-${email.id}-${index}`]
                                  ? 'bg-green-600 text-white'
                                  : 'bg-white/80 text-slate-600 hover:bg-white'
                              }`}
                            >
                              {copiedStates[`icebreaker-${email.id}-${index}`] ? '✓' : 'Copy'}
                            </button>
                          </div>
                          <p className="text-yellow-800 text-xs leading-relaxed">{icebreaker}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Context Display */}
              {email.recipient_context && (
                <div className="mb-3 p-2 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <div className="text-blue-700 text-xs font-medium mb-1">Personal Context Used:</div>
                  <p className="text-blue-800 text-xs">{email.recipient_context}</p>
                </div>
              )}
              
              <div className="bg-white/80 rounded-lg p-3 border border-blue-200/50">
                <p className="text-slate-700 text-sm line-clamp-3">
                  {email.cold_email_content.substring(0, 200)}...
                </p>
              </div>

              {/* Analytics */}
              {(email.tone_score || email.readability_score) && (
                <div className="mt-3 flex items-center space-x-4">
                  {email.tone_score && (
                    <div className="flex items-center text-sm">
                      <BarChart3 className="w-4 h-4 text-blue-600 mr-1" />
                      <span className="text-blue-700">Tone: {email.tone_score}%</span>
                    </div>
                  )}
                  {email.readability_score && (
                    <div className="flex items-center text-sm">
                      <Eye className="w-4 h-4 text-green-600 mr-1" />
                      <span className="text-green-700">Readability: {email.readability_score}%</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-slate-500">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} emails
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 bg-white/80 text-slate-800 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>
            <span className="px-3 py-2 text-slate-800">
              {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 bg-white/80 text-slate-800 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {emails.length === 0 && !loading && (
        <div className="text-center py-12">
          <Clock className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-500 text-lg">No emails found</p>
          <p className="text-slate-400 text-sm">
            {totalCount === 0 ? 'Generate your first email to see it here' : 'Try adjusting your search criteria'}
          </p>
        </div>
      )}
    </div>
  );
};

export default EmailHistory;