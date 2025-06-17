# AI Cold Outreach Tool - 100% Free

A powerful, completely free AI-powered cold email generation tool that helps you create personalized, professional outreach emails that get responses.

## 🎉 Features (All Free!)

### ✨ **Core Features**
- **Unlimited Email Generation** - No monthly limits or restrictions
- **7 Advanced Tone Options** - Professional, Friendly, Funny, Confident, Persuasive, Empathetic, Authoritative
- **Smart AI Follow-ups** - Automatically generate perfectly timed follow-up emails
- **Voice Message Generation** - Convert emails to natural-sounding voice messages
- **Email Preview** - Preview emails before generating the final version

### 📊 **Analytics & Optimization**
- **Email Analytics** - Tone accuracy and readability scoring
- **Complete Email History** - Unlimited storage with search and filtering
- **Subject Line Generation** - 3 AI-generated subject line options per email
- **Tone Analyzer** - Detailed analysis of email effectiveness
- **Export Capabilities** - Download your email history as CSV

### 🎯 **Advanced Features**
- **Industry-Specific Insights** - Tailored content for different industries
- **Priority Level Settings** - Adjust urgency and timing
- **Portfolio Integration** - Include your work samples
- **Response Tracking** - Monitor and optimize your outreach strategy
- **Favorites System** - Save and organize your best emails

## 🚀 Getting Started

1. **Sign Up** - Create your free account (no credit card required)
2. **Fill the Form** - Enter your details and outreach purpose
3. **Generate** - Let AI create personalized emails instantly
4. **Copy & Send** - Use the generated content in your email client
5. **Track & Optimize** - Monitor performance and improve over time

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Supabase (Database + Auth + Edge Functions)
- **AI**: OpenRouter API with Claude 3.5 Sonnet
- **Icons**: Lucide React
- **Build Tool**: Vite

## 🏗 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── features/       # Feature-specific components
│   ├── layout/         # Layout components
│   └── ui/             # Basic UI components
├── contexts/           # React contexts
├── hooks/              # Custom React hooks
├── lib/                # Third-party library configurations
├── pages/              # Page components
├── services/           # API and database services
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🔧 Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in your Supabase and OpenRouter API keys

# Start development server
npm run dev
```

### Environment Variables
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_OPENROUTER_API_KEY=your_openrouter_api_key
```

## 📝 Database Schema

The application uses Supabase with the following main tables:
- `email_history` - Stores generated emails and analytics
- `user_usage` - Tracks user activity (for analytics only)

## 🎨 Design Philosophy

- **Clean & Modern** - Apple-level design aesthetics
- **Responsive** - Works perfectly on all devices
- **Accessible** - WCAG compliant with proper contrast ratios
- **Fast** - Optimized for performance and user experience

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with ❤️ by Amine Ratit
- Powered by Supabase and OpenRouter
- Icons by Lucide
- UI components with Tailwind CSS

---

**🎉 Enjoy unlimited, free AI-powered cold email generation!**