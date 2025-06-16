import { createEmailHistory } from '../services/emailHistory';

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
  const { name, recipient, purpose, tone, portfolio, industry, urgency } = formData;
  
  try {
    // Create the prompt for AI generation
    const prompt = createEmailPrompt(formData, isPremium);
    
    // Call OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY || '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'}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'AI Cold Outreach Tool'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          {
            role: 'system',
            content: 'You are an expert AI assistant specialized in writing personalized, professional, and engaging cold outreach emails. Generate emails that are natural, conversational, and avoid generic template language.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0]?.message?.content;

    if (!generatedContent) {
      throw new Error('No content generated from API');
    }

    // Parse the generated content
    const result = parseGeneratedContent(generatedContent, isPremium);

    // Save to database
    try {
      const recipientParts = recipient.split(',');
      const recipientName = recipientParts[0].trim();
      const recipientCompany = recipientParts[1]?.trim();

      await createEmailHistory({
        recipient_name: recipientName,
        recipient_company: recipientCompany,
        purpose,
        tone,
        industry,
        urgency: urgency || 'medium',
        template_used: formData.template,
        cold_email_content: result.coldEmail,
        follow_up_content: result.followUp,
        subject_lines: result.subjectLines,
        tone_score: result.toneScore,
        readability_score: result.readabilityScore
      });
    } catch (error) {
      console.error('Failed to save email history:', error);
      // Don't fail the generation if saving fails
    }

    return result;
  } catch (error) {
    console.error('Error generating emails with AI:', error);
    // Fallback to mock generation if API fails
    return generateMockEmails(formData, isPremium);
  }
};

const createEmailPrompt = (formData: FormData, isPremium: boolean): string => {
  const { name, recipient, purpose, tone, portfolio, industry, urgency, template } = formData;
  
  let prompt = `Generate a personalized cold outreach email and follow-up email with the following details:

**Sender:** ${name}
**Recipient:** ${recipient}
**Purpose:** ${purpose}
**Tone:** ${tone}
**Industry:** ${industry || 'Not specified'}
**Urgency:** ${urgency || 'medium'}
${portfolio ? `**Portfolio/Website:** ${portfolio}` : ''}
${template ? `**Template Style:** ${template}` : ''}

Requirements:
1. Create a compelling cold email that captures attention immediately
2. Use natural, conversational language that matches the ${tone} tone
3. Include a clear value proposition and call to action
4. Create a follow-up email for if there's no response
5. Make both emails feel personal and authentic, not templated

${isPremium ? `
Premium Features:
- Generate 3 subject line options
- Include tone analysis score (0-100)
- Include readability score (0-100)
- Use advanced personalization techniques
- Include industry-specific insights
` : ''}

Format your response as JSON:
{
  "coldEmail": "The main cold outreach email content",
  "followUp": "The follow-up email content",
  ${isPremium ? `"subjectLines": ["Subject 1", "Subject 2", "Subject 3"],
  "toneScore": 85,
  "readabilityScore": 92,` : ''}
}

Make sure the emails are professional, engaging, and tailored to the specific recipient and purpose.`;

  return prompt;
};

const parseGeneratedContent = (content: string, isPremium: boolean): GeneratedEmails => {
  try {
    // Try to extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        coldEmail: parsed.coldEmail || '',
        followUp: parsed.followUp || '',
        ...(isPremium && {
          subjectLines: parsed.subjectLines || [],
          toneScore: parsed.toneScore || Math.floor(Math.random() * 20) + 80,
          readabilityScore: parsed.readabilityScore || Math.floor(Math.random() * 15) + 85
        })
      };
    }
  } catch (error) {
    console.error('Error parsing JSON response:', error);
  }

  // Fallback: try to extract emails from text
  const emails = content.split(/(?:Follow[- ]?up|FOLLOW[- ]?UP)/i);
  const coldEmail = emails[0]?.trim() || content;
  const followUp = emails[1]?.trim() || generateSimpleFollowUp(coldEmail);

  return {
    coldEmail,
    followUp,
    ...(isPremium && {
      subjectLines: generateSubjectLines(coldEmail),
      toneScore: Math.floor(Math.random() * 20) + 80,
      readabilityScore: Math.floor(Math.random() * 15) + 85
    })
  };
};

const generateSimpleFollowUp = (originalEmail: string): string => {
  const lines = originalEmail.split('\n');
  const recipientLine = lines.find(line => line.toLowerCase().includes('hi ') || line.toLowerCase().includes('hello '));
  const recipient = recipientLine ? recipientLine.split(' ')[1]?.replace(',', '') : 'there';
  
  return `Hi ${recipient},

I wanted to follow up on my previous email. I understand you're probably busy, but I believe this opportunity could be valuable for both of us.

If now isn't the right time, I'd be happy to reconnect in a few weeks when things might be less hectic.

Thanks for your time and consideration.

Best regards`;
};

const generateSubjectLines = (email: string): string[] => {
  const purpose = email.toLowerCase();
  const subjects = [];
  
  if (purpose.includes('partnership') || purpose.includes('collaborate')) {
    subjects.push('Partnership Opportunity', 'Collaboration Proposal', 'Strategic Partnership Discussion');
  } else if (purpose.includes('job') || purpose.includes('position')) {
    subjects.push('Opportunity to Connect', 'Professional Introduction', 'Career Discussion');
  } else {
    subjects.push('Quick Introduction', 'Potential Opportunity', 'Brief Connection Request');
  }
  
  return subjects;
};

// Fallback mock generation function
const generateMockEmails = async (formData: FormData, isPremium: boolean): Promise<GeneratedEmails> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const { name, recipient, purpose, tone, portfolio, industry, urgency } = formData;
  
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
    result.subjectLines = generateSubjectLines(coldEmail);
    result.toneScore = Math.floor(Math.random() * 20) + 80;
    result.readabilityScore = Math.floor(Math.random() * 15) + 85;
  }

  return result;
};

export const generateVoiceMessage = async (text: string): Promise<string> => {
  // Simulate ElevenLabs API call
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Using Web Speech API for demo (browser-based TTS)
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
  utterance.pitch = 1;
  speechSynthesis.speak(utterance);
  
  return 'data:audio/wav;base64,mock-audio-data';
};

// Helper functions for mock generation
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

  if (urgency === 'high') {
    subject = `Urgent: ${subject}`;
  } else if (urgency === 'low') {
    subject = `When convenient: ${subject}`;
  }

  return subject;
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
      return `${baseContent} I know, I know - another person sliding into your inbox. But hear me out, I think this could be the start of something pretty cool.`;
    case 'Confident':
      return `${baseContent} I have a track record of delivering exceptional results, and I'm confident that my skills would be valuable to your organization.`;
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