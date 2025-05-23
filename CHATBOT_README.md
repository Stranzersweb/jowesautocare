# 🤖 Jower's Auto Service Chatbot Setup Guide

A modern AI-powered chatbot for your auto service website that can integrate with multiple affordable LLM providers.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up your API key:**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and add your chosen API key.

3. **Start the development server:**
   ```bash
   npm run dev
   ```

## 💰 LLM Provider Options (Cheapest to Most Expensive)

### 1. 🏆 **Groq** (Recommended for speed & cost)
- **Cost:** ~$0.0001 per 1K tokens
- **Speed:** Extremely fast (lightning-fast inference)
- **Quality:** Very good
- **Setup:** Get free API key at [console.groq.com](https://console.groq.com/)

### 2. **Together.ai**
- **Cost:** ~$0.0002 per 1K tokens  
- **Speed:** Fast
- **Quality:** Good
- **Setup:** Get API key at [api.together.xyz](https://api.together.xyz/)

### 3. **Anthropic Claude Haiku**
- **Cost:** ~$0.00025 per 1K tokens
- **Speed:** Fast
- **Quality:** Excellent
- **Setup:** Get API key at [console.anthropic.com](https://console.anthropic.com/)

### 4. **OpenAI GPT-3.5-turbo**
- **Cost:** ~$0.002 per 1K tokens
- **Speed:** Good
- **Quality:** Very good
- **Setup:** Get API key at [platform.openai.com](https://platform.openai.com/api-keys)

## ⚙️ Configuration

### Switching Providers

Edit `src/utils/chatAPI.js` and change the `CURRENT_PROVIDER`:

```javascript
const CURRENT_PROVIDER = 'GROQ'; // Options: 'GROQ', 'TOGETHER', 'ANTHROPIC', 'OPENAI'
```

### Environment Variables

In your `.env.local` file:

```bash
# For any provider, use the same variable name:
VITE_LLM_API_KEY=your-api-key-here
```

## 🎯 Features

- ✅ **Modern UI** - Sleek chat interface with animations
- ✅ **Mobile Responsive** - Works perfectly on all devices  
- ✅ **Smart Context** - Remembers conversation history
- ✅ **Auto Service Focus** - Trained on automotive knowledge
- ✅ **Quick Questions** - Pre-loaded common questions
- ✅ **Fallback System** - Works even if API fails
- ✅ **Multiple Providers** - Easy switching between LLM services
- ✅ **Cost Effective** - Choose the cheapest option that works for you

## 🛠️ Customization

### Business Information
Update the `BUSINESS_CONTEXT` in `src/utils/chatAPI.js` with your actual:
- Business address
- Phone number  
- Operating hours
- Services offered
- Pricing information

### Styling
The chatbot uses Tailwind CSS and can be customized by editing:
- `src/components/Chatbot.jsx` - Main chat interface
- `src/components/ChatMessage.jsx` - Individual message styling

### Quick Questions
Modify the `quickQuestions` array in `Chatbot.jsx` to show relevant questions for your customers.

## 💡 Cost Optimization Tips

1. **Start with Groq** - Fastest and cheapest option
2. **Monitor Usage** - Most providers have generous free tiers
3. **Set Token Limits** - Adjust `max_tokens` in API calls
4. **Use Caching** - Consider caching common responses
5. **Fallback Responses** - Handle API failures gracefully

## 🔧 Local Development (Free Option)

For completely free local development, consider:

1. **Ollama** (Run models locally)
2. **LM Studio** (Local model interface)  
3. **text-generation-webui** (Self-hosted interface)

## 📊 Expected Costs

For a small auto shop with ~1000 chat messages per month:

- **Groq:** ~$0.10-0.50/month
- **Together.ai:** ~$0.20-1.00/month
- **Anthropic:** ~$0.25-1.25/month  
- **OpenAI:** ~$2.00-10.00/month ⚠️

## 🚨 Security Notes

- Never commit API keys to version control
- Use environment variables for all secrets
- Consider rate limiting in production
- Monitor API usage regularly

## 🎨 Customization Examples

### Change Colors
```css
/* In your Tailwind config or CSS */
.chat-primary { @apply bg-red-600; } /* Change from blue to red */
```

### Add More Providers
```javascript
// In chatAPI.js, add to LLM_CONFIG:
CUSTOM_PROVIDER: {
  apiUrl: 'https://your-api.com/chat',
  model: 'your-model',
  headers: (apiKey) => ({ /* your headers */ })
}
```

## 🐛 Troubleshooting

**Chat not loading?**
- Check browser console for errors
- Verify API key is set correctly
- Ensure `.env.local` is in project root

**API errors?**  
- Verify API key has sufficient credits
- Check provider status pages
- Review network connectivity

**Messages not sending?**
- Check CORS settings if using custom API
- Verify API endpoint URLs
- Test with curl/Postman first

## 📞 Support

Having issues? The chatbot includes smart fallback responses that will direct customers to call your business directly, ensuring you never lose a potential customer even if the AI is temporarily unavailable.

---

**Ready to launch?** Your customers will love the instant 24/7 support, and you'll love the affordable pricing! 🚗💬