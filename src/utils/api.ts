// Mock API functions for demonstration purposes
// In a real application, these would make actual API calls

interface FormData {
  name: string;
  recipient: string;
  purpose: string;
  tone: string;
  portfolio: string;
  template?: string;
  industry?: string;
  urgency?: string;
}

interface GeneratedEmails {
  coldEmail: string;
  followUp: string;
  subjectLines?: string[];
  toneScore?: number;
  readabilityScore?: number;
}

export const generateEmails = async (formData: FormData, isPremium: boolean = false): Promise<GeneratedEmails> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const { name, recipient, purpose, tone, portfolio, industry, urgency } = formData;
  
  // Mock email generation based on form data
  const coldEmail = `Subject: ${getPurposeSubject(purpose, urgency)}

Hi ${recipient.split(',')[0].replace(/^(Mr\.|Ms\.|Dr\.)?\s*/, '')},

${getOpeningLine(tone)} I hope this email finds you well.

My name is ${name}, and I'm reaching out because ${purpose.toLowerCase()}.

${getToneSpecificContent(tone, purpose, industry, isPremium)}

${portfolio ? `I'd love for you to check out my work at ${portfolio} to get a better sense of what I can bring to the table.` : ''}

${getUrgencyContent(urgency)}

${getClosing(tone)}

Best regards,
${name}`;

  const followUp = `Subject: Re: ${getPurposeSubject(purpose, urgency)}

Hi ${recipient.split(',')[0].replace(/^(Mr\.|Ms\.|Dr\.)?\s*/, '')},

I wanted to follow up on my previous email about ${purpose.toLowerCase()}.

${getFollowUpContent(tone, isPremium)}

I completely understand if you're swamped with other priorities. If now isn't the right time, I'd be happy to reconnect in a few weeks.

${getFollowUpClosing(tone)}

Thanks again for your time,
${name}`;

  const result: GeneratedEmails = { coldEmail, followUp };

  // Premium features
  if (isPremium) {
    result.subjectLines = generateSubjectLines(purpose, tone, urgency);
    result.toneScore = Math.floor(Math.random() * 20) + 80; // 80-100%
    result.readabilityScore = Math.floor(Math.random() * 15) + 85; // 85-100%
  }

  return result;
};

export const generateVoiceMessage = async (text: string): Promise<string> => {
  // Simulate ElevenLabs API call
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // In a real implementation, this would call ElevenLabs API
  // For demo purposes, we'll return a placeholder audio URL
  // You could use a text-to-speech Web API or a placeholder audio file
  
  // Using Web Speech API for demo (browser-based TTS)
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
  utterance.pitch = 1;
  speechSynthesis.speak(utterance);
  
  // Return a mock audio URL for the interface
  return 'data:audio/wav;base64,mock-audio-data';
};

// Helper functions for email generation
const getPurposeSubject = (purpose: string, urgency?: string): string => {
  const keywords = purpose.toLowerCase();
  let subject = '';
  
  if (keywords.includes('job') || keywords.includes('position')) {
    subject = 'Opportunity to Connect - Potential Collaboration';
  } else if (keywords.includes('partnership') || keywords.includes('collaborate')) {
    subject = 'Partnership Opportunity';
  } else if (keywords.includes('interview') || keywords.includes('talk')) {
    subject = 'Request for Brief Conversation';
  } else {
    subject = 'Introduction and Potential Opportunity';
  }

  // Add urgency prefix
  if (urgency === 'high') {
    subject = `Urgent: ${subject}`;
  } else if (urgency === 'low') {
    subject = `When convenient: ${subject}`;
  }

  return subject;
};

const generateSubjectLines = (purpose: string, tone: string, urgency?: string): string[] => {
  const baseSubjects = [
    getPurposeSubject(purpose, urgency),
    `Quick question about ${purpose.split(' ')[0].toLowerCase()}`,
    `${tone === 'Funny' ? '🚀 ' : ''}Exploring potential collaboration`
  ];

  return baseSubjects;
};

const getOpeningLine = (tone: string): string => {
  switch (tone) {
    case 'Friendly':
      return 'Hope you\'re having a great day!';
    case 'Funny':
      return 'I promise this isn\'t another generic sales email (plot twist: it kind of is, but in a good way)!';
    case 'Confident':
      return 'I\'m writing to you because I believe we could create something amazing together.';
    case 'Persuasive':
      return 'I have something that could significantly impact your business goals.';
    case 'Empathetic':
      return 'I understand how challenging it can be to find the right partnerships in today\'s market.';
    case 'Authoritative':
      return 'Based on my extensive experience in this field, I see a valuable opportunity for collaboration.';
    default:
      return '';
  }
};

const getToneSpecificContent = (tone: string, purpose: string, industry?: string, isPremium: boolean = false): string => {
  let baseContent = `I believe there's a great opportunity for us to work together, and I'd love to explore how we can make that happen.`;
  
  // Add industry-specific content for premium users
  if (isPremium && industry) {
    const industryInsights = {
      technology: 'With the rapid evolution in tech, strategic partnerships are more crucial than ever.',
      healthcare: 'In the healthcare sector, collaboration drives innovation and better patient outcomes.',
      finance: 'The financial landscape is constantly changing, and partnerships help navigate these shifts.',
      education: 'Educational partnerships create lasting impact on learning and development.',
      retail: 'In retail, customer experience is everything, and the right partnerships enhance that experience.',
      manufacturing: 'Manufacturing efficiency and innovation thrive through strategic collaborations.',
      consulting: 'Consulting success depends on diverse expertise and strong professional networks.',
      marketing: 'Marketing partnerships amplify reach and create more compelling brand stories.',
      'real-estate': 'Real estate success is built on relationships and strategic partnerships.'
    };
    
    const insight = industryInsights[industry as keyof typeof industryInsights];
    if (insight) {
      baseContent = `${insight} ${baseContent}`;
    }
  }
  
  switch (tone) {
    case 'Friendly':
      return `${baseContent} I'm really excited about the possibility of collaborating and think we could accomplish some wonderful things together.`;
    case 'Funny':
      return `${baseContent} I know, I know - another person sliding into your inbox. But hear me out, I think this could be the start of something pretty cool (and profitable for both of us).`;
    case 'Confident':
      return `${baseContent} I have a track record of delivering exceptional results, and I'm confident that my skills and experience would be valuable to your organization.`;
    case 'Persuasive':
      return `${baseContent} The data shows that partnerships like this typically result in 40% faster growth and significantly improved market positioning.`;
    case 'Empathetic':
      return `${baseContent} I understand the importance of finding partners who truly understand your vision and challenges.`;
    case 'Authoritative':
      return `${baseContent} My expertise in this area has helped numerous organizations achieve their strategic objectives.`;
    default:
      return baseContent;
  }
};

const getUrgencyContent = (urgency?: string): string => {
  switch (urgency) {
    case 'high':
      return 'I understand you have a busy schedule, but I believe this opportunity is time-sensitive and could be mutually beneficial. Would you have 15 minutes this week for a quick call?';
    case 'low':
      return 'I know timing is everything, so please feel free to reach out whenever it\'s convenient for you. I\'m happy to work around your schedule.';
    default:
      return 'I understand you\'re probably busy, but I\'d be grateful for just a few minutes of your time to discuss this opportunity. Would you be available for a brief call this week?';
  }
};

const getClosing = (tone: string): string => {
  switch (tone) {
    case 'Friendly':
      return 'Looking forward to hopefully connecting soon!';
    case 'Funny':
      return 'Thanks for reading this far - you\'re already awesome in my book!';
    case 'Confident':
      return 'I\'m confident this conversation will be worth both our time.';
    case 'Persuasive':
      return 'I\'m excited about the potential this partnership holds.';
    case 'Empathetic':
      return 'I appreciate your time and look forward to the possibility of working together.';
    case 'Authoritative':
      return 'I look forward to discussing how we can achieve exceptional results together.';
    default:
      return 'Thank you for considering this opportunity.';
  }
};

const getFollowUpContent = (tone: string, isPremium: boolean = false): string => {
  let baseContent = '';
  
  switch (tone) {
    case 'Friendly':
      baseContent = 'I know inboxes can get crazy, so I wanted to gently bump this back up to the top of your list.';
      break;
    case 'Funny':
      baseContent = 'Just checking if my first email got lost in the digital void (happens to the best of us).';
      break;
    case 'Confident':
      baseContent = 'I wanted to reconnect as I believe this opportunity could be mutually beneficial.';
      break;
    case 'Persuasive':
      baseContent = 'I wanted to follow up because I believe the timing for this partnership is ideal.';
      break;
    case 'Empathetic':
      baseContent = 'I understand how overwhelming email can be, so I wanted to reach out once more.';
      break;
    case 'Authoritative':
      baseContent = 'I wanted to follow up on my previous message regarding our potential collaboration.';
      break;
    default:
      baseContent = 'I wanted to follow up to see if you had a chance to review my previous message.';
  }

  if (isPremium) {
    baseContent += ' I\'ve also included some additional insights that might be relevant to your current initiatives.';
  }

  return baseContent;
};

const getFollowUpClosing = (tone: string): string => {
  switch (tone) {
    case 'Friendly':
      return 'Hope to hear from you soon!';
    case 'Funny':
      return 'Either way, you\'re still awesome - but a reply would make you legendary!';
    case 'Confident':
      return 'I look forward to your response.';
    case 'Persuasive':
      return 'I\'m confident you\'ll see the value in this opportunity.';
    case 'Empathetic':
      return 'Thank you for your time and consideration.';
    case 'Authoritative':
      return 'I look forward to hearing from you.';
    default:
      return 'I appreciate your time and consideration.';
  }
};