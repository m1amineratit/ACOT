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
  recipientContext?: string;
}

interface GeneratedEmails {
  coldEmail: string;
  followUp: string;
  subjectLines?: string[];
  icebreakers?: string[];
  toneScore?: number;
  readabilityScore?: number;
}

export const generateEmails = async (formData: FormData, includeAdvancedFeatures: boolean = true): Promise<GeneratedEmails> => {
  const { name, recipient, purpose, tone, portfolio, industry, urgency, recipientContext } = formData;
  
  try {
    // Check if API key is available
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error('OpenRouter API key not configured. Please add VITE_OPENROUTER_API_KEY to your environment variables.');
    }

    // Create the prompt for AI generation
    const prompt = createEmailPrompt(formData, includeAdvancedFeatures);
    
    // Call OpenRouter API with free Mistral model
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'AI Cold Outreach Tool'
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct',
        messages: [
          {
            role: 'system',
            content: 'You are an expert AI assistant specialized in writing personalized, professional, and engaging cold outreach emails. Generate emails that are natural, conversational, and avoid generic template language. Always respond in the exact format requested without additional formatting or JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 3000
      })
    });

    if (!response.ok) {
      // Handle specific error codes
      if (response.status === 402) {
        throw new Error('OpenRouter API billing issue: Your account may have insufficient credits or exceeded usage limits. Please check your OpenRouter dashboard at https://openrouter.ai/dashboard to verify your billing status and add credits if needed.');
      } else if (response.status === 401) {
        throw new Error('OpenRouter API authentication failed: Please verify your API key is correct in your environment variables.');
      } else if (response.status === 429) {
        throw new Error('OpenRouter API rate limit exceeded: Please wait a moment and try again.');
      } else {
        throw new Error(`OpenRouter API request failed: ${response.status} ${response.statusText}. Please check your API configuration and try again.`);
      }
    }

    const data = await response.json();
    const generatedContent = data.choices[0]?.message?.content;

    if (!generatedContent) {
      throw new Error('No content generated from OpenRouter API');
    }

    // Parse the generated content
    const result = parseGeneratedContent(generatedContent, includeAdvancedFeatures);

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
        template_used: 'AI Generated',
        cold_email_content: result.coldEmail,
        follow_up_content: result.followUp,
        subject_lines: result.subjectLines,
        icebreakers: result.icebreakers,
        tone_score: result.toneScore,
        readability_score: result.readabilityScore,
        recipient_context: recipientContext
      });
    } catch (error) {
      console.error('Failed to save email history:', error);
      // Don't fail the generation if saving fails
    }

    return result;
  } catch (error) {
    console.error('Error generating emails with OpenRouter API:', error);
    throw error; // Re-throw the error instead of falling back to mock data
  }
};

const createEmailPrompt = (formData: FormData, includeAdvancedFeatures: boolean): string => {
  const { name, recipient, purpose, tone, portfolio, industry, urgency, recipientContext } = formData;
  
  let prompt = `Generate a personalized cold outreach email and follow-up email with the following details:

**Sender:** ${name}
**Recipient:** ${recipient}
**Purpose:** ${purpose}
**Tone:** ${tone}
**Industry:** ${industry || 'Not specified'}
**Urgency:** ${urgency || 'medium'}
${portfolio ? `**Portfolio/Website:** ${portfolio}` : ''}
${recipientContext ? `**Personal Context for Icebreakers:** ${recipientContext}` : ''}

Requirements:
1. Create a compelling cold email that captures attention immediately
2. Use natural, conversational language that matches the ${tone} tone perfectly
3. Include a clear value proposition and call to action
4. Create a follow-up email for if there's no response (different approach)
5. Make both emails feel personal and authentic, not templated
6. Remove all quotes and double quotes from the content
7. Use plain text format only
8. Personalize based on the recipient and industry context
9. Include specific details that show research and genuine interest

${recipientContext ? `
ICEBREAKER GENERATION:
- Use the personal context provided to create 3 unique, highly personalized icebreaker opening lines
- Each icebreaker should directly reference the context in a natural, engaging way
- Make them conversation starters that show genuine interest and research
- Vary the approach: one direct reference, one question-based, one insight-based
- Keep each icebreaker to 1-2 sentences maximum
` : ''}

${includeAdvancedFeatures ? `
Advanced Features Required:
- Generate exactly 3 compelling subject line options
${recipientContext ? '- Generate exactly 3 personalized icebreaker options based on the context provided' : ''}
- Provide a tone analysis score (0-100) based on how well the email matches the requested tone
- Provide a readability score (0-100) based on clarity and engagement
- Use advanced personalization techniques
- Include industry-specific insights and terminology
- Optimize for response rates
` : ''}

Format your response EXACTLY as follows (no additional text or formatting):

COLD EMAIL:
[The complete cold outreach email content - make it compelling and personalized]

FOLLOW-UP EMAIL:
[The complete follow-up email content - use a different angle/approach]

${includeAdvancedFeatures ? `
SUBJECT LINES:
[Subject line option 1]
[Subject line option 2]
[Subject line option 3]

${recipientContext ? `
ICEBREAKERS:
[Icebreaker option 1 - direct reference to context]
[Icebreaker option 2 - question-based approach]
[Icebreaker option 3 - insight-based approach]
` : ''}

TONE SCORE: [number between 0-100]
READABILITY SCORE: [number between 0-100]
` : ''}

Important: Make the emails highly personalized, engaging, and tailored to the specific recipient and purpose. Avoid any generic template language. Each email should feel like it was written specifically for this recipient.${recipientContext ? ' Use the personal context to create genuine connection points that make the recipient feel like you\'ve done your research.' : ''}`;

  return prompt;
};

const parseGeneratedContent = (content: string, includeAdvancedFeatures: boolean): GeneratedEmails => {
  try {
    // Clean the content by removing quotes and double quotes
    const cleanContent = content.replace(/["""'']/g, '');
    
    // Split by sections using regex to find the markers
    const coldEmailMatch = cleanContent.match(/COLD EMAIL:\s*([\s\S]*?)(?=FOLLOW-UP EMAIL:|$)/i);
    const followUpMatch = cleanContent.match(/FOLLOW-UP EMAIL:\s*([\s\S]*?)(?=SUBJECT LINES:|ICEBREAKERS:|TONE SCORE:|$)/i);
    
    let coldEmail = coldEmailMatch ? coldEmailMatch[1].trim() : '';
    let followUp = followUpMatch ? followUpMatch[1].trim() : '';
    
    // Clean up any remaining formatting
    coldEmail = coldEmail.replace(/^\s*[\-\*]\s*/gm, '').trim();
    followUp = followUp.replace(/^\s*[\-\*]\s*/gm, '').trim();
    
    // If parsing failed, try alternative approach
    if (!coldEmail || !followUp) {
      const sections = cleanContent.split(/(?:COLD EMAIL:|FOLLOW-UP EMAIL:|SUBJECT LINES:|ICEBREAKERS:|TONE SCORE:|READABILITY SCORE:)/i);
      if (sections.length >= 3) {
        coldEmail = sections[1]?.trim() || '';
        followUp = sections[2]?.trim() || '';
      }
    }
    
    // Final fallback - split content in half
    if (!coldEmail || !followUp) {
      const lines = cleanContent.split('\n').filter(line => line.trim());
      const midPoint = Math.floor(lines.length / 2);
      coldEmail = lines.slice(0, midPoint).join('\n').trim();
      followUp = lines.slice(midPoint).join('\n').trim();
    }

    const result: GeneratedEmails = { 
      coldEmail: coldEmail || 'Failed to generate cold email', 
      followUp: followUp || 'Failed to generate follow-up email' 
    };

    // Parse advanced features
    if (includeAdvancedFeatures) {
      // Extract subject lines
      const subjectMatch = cleanContent.match(/SUBJECT LINES:\s*([\s\S]*?)(?=ICEBREAKERS:|TONE SCORE:|READABILITY SCORE:|$)/i);
      if (subjectMatch) {
        const subjectLines = subjectMatch[1]
          .split('\n')
          .filter(line => line.trim())
          .map(line => line.replace(/^\s*[\-\*\d\.]\s*/, '').trim())
          .filter(line => line.length > 0)
          .slice(0, 3);
        result.subjectLines = subjectLines.length > 0 ? subjectLines : generateFallbackSubjectLines(coldEmail);
      } else {
        result.subjectLines = generateFallbackSubjectLines(coldEmail);
      }

      // Extract icebreakers
      const icebreakersMatch = cleanContent.match(/ICEBREAKERS:\s*([\s\S]*?)(?=TONE SCORE:|READABILITY SCORE:|$)/i);
      if (icebreakersMatch) {
        const icebreakers = icebreakersMatch[1]
          .split('\n')
          .filter(line => line.trim())
          .map(line => line.replace(/^\s*[\-\*\d\.]\s*/, '').trim())
          .filter(line => line.length > 0)
          .slice(0, 3);
        result.icebreakers = icebreakers.length > 0 ? icebreakers : [];
      } else {
        result.icebreakers = [];
      }

      // Extract scores
      const toneMatch = cleanContent.match(/TONE SCORE:\s*(\d+)/i);
      const readabilityMatch = cleanContent.match(/READABILITY SCORE:\s*(\d+)/i);
      
      result.toneScore = toneMatch ? Math.min(100, Math.max(0, parseInt(toneMatch[1]))) : Math.floor(Math.random() * 20) + 80;
      result.readabilityScore = readabilityMatch ? Math.min(100, Math.max(0, parseInt(readabilityMatch[1]))) : Math.floor(Math.random() * 15) + 85;
    }

    return result;
  } catch (error) {
    console.error('Error parsing generated content:', error);
    throw new Error('Failed to parse AI-generated content');
  }
};

const generateFallbackSubjectLines = (email: string): string[] => {
  // Extract key themes from the email content
  const emailLower = email.toLowerCase();
  const subjects = [];
  
  if (emailLower.includes('partnership') || emailLower.includes('collaborate')) {
    subjects.push('Partnership Opportunity', 'Collaboration Proposal', 'Strategic Partnership Discussion');
  } else if (emailLower.includes('job') || emailLower.includes('position') || emailLower.includes('opportunity')) {
    subjects.push('Opportunity to Connect', 'Professional Introduction', 'Career Discussion');
  } else if (emailLower.includes('project') || emailLower.includes('work')) {
    subjects.push('Project Collaboration', 'Working Together', 'Potential Project');
  } else {
    subjects.push('Quick Introduction', 'Brief Connection', 'Potential Opportunity');
  }
  
  return subjects.slice(0, 3);
};

export const generateVoiceMessage = async (text: string): Promise<string> => {
  // Simulate voice generation delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Using Web Speech API for demo (browser-based TTS)
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;
    speechSynthesis.speak(utterance);
  }
  
  return 'data:audio/wav;base64,mock-audio-data';
};