// Mock API functions for demonstration purposes
// In a real application, these would make actual API calls

interface FormData {
  name: string;
  recipient: string;
  purpose: string;
  tone: string;
  portfolio: string;
}

interface GeneratedEmails {
  coldEmail: string;
  followUp: string;
}

export const generateEmails = async (formData: FormData): Promise<GeneratedEmails> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const { name, recipient, purpose, tone, portfolio } = formData;
  
  // Mock email generation based on form data
  const coldEmail = `Subject: ${getPurposeSubject(purpose)}

Hi ${recipient.split(',')[0].replace(/^(Mr\.|Ms\.|Dr\.)?\s*/, '')},

${getOpeningLine(tone)} I hope this email finds you well.

My name is ${name}, and I'm reaching out because ${purpose.toLowerCase()}.

${getToneSpecificContent(tone, purpose)}

${portfolio ? `I'd love for you to check out my work at ${portfolio} to get a better sense of what I can bring to the table.` : ''}

I understand you're probably busy, but I'd be grateful for just a few minutes of your time to discuss this opportunity. Would you be available for a brief call this week?

${getClosing(tone)}

Best regards,
${name}`;

  const followUp = `Subject: Re: ${getPurposeSubject(purpose)}

Hi ${recipient.split(',')[0].replace(/^(Mr\.|Ms\.|Dr\.)?\s*/, '')},

I wanted to follow up on my previous email about ${purpose.toLowerCase()}.

${getFollowUpContent(tone)}

I completely understand if you're swamped with other priorities. If now isn't the right time, I'd be happy to reconnect in a few weeks.

${getFollowUpClosing(tone)}

Thanks again for your time,
${name}`;

  return { coldEmail, followUp };
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
const getPurposeSubject = (purpose: string): string => {
  const keywords = purpose.toLowerCase();
  if (keywords.includes('job') || keywords.includes('position')) {
    return 'Opportunity to Connect - Potential Collaboration';
  } else if (keywords.includes('partnership') || keywords.includes('collaborate')) {
    return 'Partnership Opportunity';
  } else if (keywords.includes('interview') || keywords.includes('talk')) {
    return 'Request for Brief Conversation';
  }
  return 'Introduction and Potential Opportunity';
};

const getOpeningLine = (tone: string): string => {
  switch (tone) {
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

const getToneSpecificContent = (tone: string, purpose: string): string => {
  const baseContent = `I believe there's a great opportunity for us to work together, and I'd love to explore how we can make that happen.`;
  
  switch (tone) {
    case 'Friendly':
      return `${baseContent} I'm really excited about the possibility of collaborating and think we could accomplish some wonderful things together.`;
    case 'Funny':
      return `${baseContent} I know, I know - another person sliding into your inbox. But hear me out, I think this could be the start of something pretty cool (and profitable for both of us).`;
    case 'Confident':
      return `${baseContent} I have a track record of delivering exceptional results, and I'm confident that my skills and experience would be valuable to your organization.`;
    default:
      return baseContent;
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
    default:
      return 'Thank you for considering this opportunity.';
  }
};

const getFollowUpContent = (tone: string): string => {
  switch (tone) {
    case 'Friendly':
      return 'I know inboxes can get crazy, so I wanted to gently bump this back up to the top of your list.';
    case 'Funny':
      return 'Just checking if my first email got lost in the digital void (happens to the best of us).';
    case 'Confident':
      return 'I wanted to reconnect as I believe this opportunity could be mutually beneficial.';
    default:
      return 'I wanted to follow up to see if you had a chance to review my previous message.';
  }
};

const getFollowUpClosing = (tone: string): string => {
  switch (tone) {
    case 'Friendly':
      return 'Hope to hear from you soon!';
    case 'Funny':
      return 'Either way, you\'re still awesome - but a reply would make you legendary!';
    case 'Confident':
      return 'I look forward to your response.';
    default:
      return 'I appreciate your time and consideration.';
  }
};