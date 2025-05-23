import axios from 'axios';

// Configuration for different LLM providers
const LLM_CONFIG = {
  // OpenAI Configuration (most popular, moderate cost)
  OPENAI: {
    apiUrl: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-3.5-turbo', // Cheaper than GPT-4
    headers: (apiKey) => ({
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    })
  },
  
  // Anthropic Claude (high quality, competitive pricing)
  ANTHROPIC: {
    apiUrl: 'https://api.anthropic.com/v1/messages',
    model: 'claude-3-haiku-20240307', // Fastest and cheapest Claude model
    headers: (apiKey) => ({
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01'
    })
  },
  
  // Together.ai (very cheap, good for experimentation)
  TOGETHER: {
    apiUrl: 'https://api.together.xyz/inference',
    model: 'mistralai/Mixtral-8x7B-Instruct-v0.1', // Fast and cheap
    headers: (apiKey) => ({
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    })
  },
  
  // Groq (extremely fast inference, competitive pricing)
  GROQ: {
    apiUrl: 'https://api.groq.com/openai/v1/chat/completions',
    model: 'mixtral-8x7b-32768', // Fast Mixtral model
    headers: (apiKey) => ({
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    })
  }
};

// Choose your provider here - easily switchable!
let CURRENT_PROVIDER = 'GROQ'; // Now using Groq with your API key!
const API_KEY = import.meta.env.VITE_LLM_API_KEY; // Set this in your .env file

// Business context for the AI assistant
const BUSINESS_CONTEXT = `
You are a helpful customer service assistant for Jower's Auto Service, a professional automotive repair and maintenance shop in Tallahassee, Florida.

About Jower's Auto Service:
- Full-service automotive repair and maintenance since 1959
- Family-owned business serving Tallahassee for over 60 years
- Specializes in brake repair, oil changes, engine diagnostics, transmission service, and general automotive repairs
- Licensed and certified ASE technicians
- Located at 230 E. Pershing Street, Tallahassee, FL 32301
- Phone: (850) 224-3015
- Hours: Monday-Friday 8:00 AM - 5:30 PM, Saturday & Sunday Closed
- Competitive pricing with quality service guarantee
- Emergency roadside assistance available
- Proudly serving Florida State University students, faculty, and Tallahassee community

Your role:
- Be friendly, professional, and knowledgeable about automotive services
- Help customers understand services, pricing, and scheduling
- Provide general automotive advice when appropriate
- Always encourage customers to call (850) 224-3015 or visit for specific diagnostics or quotes
- If you don't know something specific, direct them to call the shop
- Keep responses concise but helpful (2-3 sentences max)
- Focus on building trust and providing value
- Mention our 60+ years of experience when relevant

Do not make up specific prices or appointment times - always direct customers to call (850) 224-3015 for current pricing and availability.
`;

const formatMessagesForProvider = (userMessage, conversationHistory, provider) => {
  const recentMessages = conversationHistory.slice(-10); // Keep last 10 messages for context
  
  switch (provider) {
    case 'OPENAI':
    case 'GROQ':
      return [
        { role: 'system', content: BUSINESS_CONTEXT },
        ...recentMessages.map(msg => ({
          role: msg.isBot ? 'assistant' : 'user',
          content: msg.text
        })),
        { role: 'user', content: userMessage }
      ];
      
    case 'ANTHROPIC':
      const systemPrompt = BUSINESS_CONTEXT;
      const messages = [
        ...recentMessages.map(msg => ({
          role: msg.isBot ? 'assistant' : 'user',
          content: msg.text
        })),
        { role: 'user', content: userMessage }
      ];
      return { system: systemPrompt, messages };
      
    case 'TOGETHER':
      const prompt = `${BUSINESS_CONTEXT}

Conversation history:
${recentMessages.map(msg => `${msg.isBot ? 'Assistant' : 'Customer'}: ${msg.text}`).join('\n')}

Customer: ${userMessage}
Assistant:`;
      return prompt;
      
    default:
      return userMessage;
  }
};

const makeAPIRequest = async (formattedMessages, provider) => {
  const config = LLM_CONFIG[provider];
  
  try {
    switch (provider) {
      case 'OPENAI':
      case 'GROQ':
        const openaiResponse = await axios.post(config.apiUrl, {
          model: config.model,
          messages: formattedMessages,
          max_tokens: 500,
          temperature: 0.7,
        }, {
          headers: config.headers(API_KEY)
        });
        return openaiResponse.data.choices[0].message.content;
        
      case 'ANTHROPIC':
        const anthropicResponse = await axios.post(config.apiUrl, {
          model: config.model,
          max_tokens: 500,
          system: formattedMessages.system,
          messages: formattedMessages.messages
        }, {
          headers: config.headers(API_KEY)
        });
        return anthropicResponse.data.content[0].text;
        
      case 'TOGETHER':
        const togetherResponse = await axios.post(config.apiUrl, {
          model: config.model,
          prompt: formattedMessages,
          max_new_tokens: 500,
          temperature: 0.7,
          stop: ['Customer:', 'Human:']
        }, {
          headers: config.headers(API_KEY)
        });
        return togetherResponse.data.output.choices[0].text.trim();
        
      default:
        throw new Error(`Unsupported provider: ${provider}`);
    }
  } catch (error) {
    console.error(`Error with ${provider}:`, error.response?.data || error.message);
    throw error;
  }
};

export const sendChatMessage = async (userMessage, conversationHistory = []) => {
  if (!API_KEY) {
    throw new Error('API key not configured. Please set VITE_LLM_API_KEY in your environment variables.');
  }

  try {
    const formattedMessages = formatMessagesForProvider(userMessage, conversationHistory, CURRENT_PROVIDER);
    const response = await makeAPIRequest(formattedMessages, CURRENT_PROVIDER);
    return response;
  } catch (error) {
    console.error('Chat API Error:', error);
    
    // Fallback responses for common questions
    const fallbackResponses = {
      'services': "We offer comprehensive automotive services including oil changes, brake repair, engine diagnostics, transmission service, and general repairs. Please call us at (850) 224-3015 for more details!",
      'hours': "We're open Monday-Friday 8:00 AM - 5:30 PM, and closed weekends. Call (850) 224-3015 to schedule an appointment!",
      'price': "Our prices are competitive and vary by service. Please call (850) 224-3015 for current pricing and to get a personalized quote for your vehicle.",
      'appointment': "To schedule an appointment, please call us at (850) 224-3015 or visit us at 230 E. Pershing Street, Tallahassee. We'll be happy to find a time that works for you!",
      'location': "You can find us at 230 E. Pershing Street, Tallahassee, FL 32301. Call (850) 224-3015 for directions or if you need roadside assistance!"
    };
    
    const lowerMessage = userMessage.toLowerCase();
    for (const [key, response] of Object.entries(fallbackResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return "I'm having trouble connecting right now, but I'd love to help! Please call us directly at (850) 224-3015 and our team will assist you with any questions about our automotive services.";
  }
};

// Export configuration for easy switching
export const switchProvider = (newProvider) => {
  if (LLM_CONFIG[newProvider]) {
    CURRENT_PROVIDER = newProvider;
    console.log(`Switched to provider: ${newProvider}`);
  } else {
    console.error(`Provider ${newProvider} not supported`);
  }
};

export const getSupportedProviders = () => Object.keys(LLM_CONFIG);