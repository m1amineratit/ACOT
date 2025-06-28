# ColdSendr - AI Cold Outreach Tool - 100% Free

A powerful, completely free AI-powered cold email generation tool that helps you create personalized, professional outreach emails that get responses.

## 🎉 Features (All Free!)

### ✨ **Core Features**
- **Unlimited Email Generation** - No monthly limits or restrictions
- **7 Advanced Tone Options** - Professional, Friendly, Funny, Confident, Persuasive, Empathetic, Authoritative
- **Smart AI Follow-ups** - Automatically generate perfectly timed follow-up emails
- **Voice Message Generation** - Convert emails to natural-sounding voice messages
- **Email Preview** - Preview emails before generating the final version

### 🔐 **Authentication**
- **Email/Password Authentication** - Traditional signup and login
- **Google OAuth** - Quick sign-in with your Google account
- **Secure Session Management** - Powered by Supabase Auth
- **Profile Management** - Display name and avatar from Google

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

### Option 1: Quick Start with Google
1. **Click "Sign in with Google"** - Use your existing Google account
2. **Fill the Form** - Enter your details and outreach purpose
3. **Generate** - Let AI create personalized emails instantly
4. **Copy & Send** - Use the generated content in your email client

### Option 2: Traditional Signup
1. **Sign Up** - Create your free account with email/password
2. **Fill the Form** - Enter your details and outreach purpose
3. **Generate** - Let AI create personalized emails instantly
4. **Copy & Send** - Use the generated content in your email client
5. **Track & Optimize** - Monitor performance and improve over time

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Supabase (Database + Auth + Edge Functions)
- **Authentication**: Supabase Auth with Google OAuth
- **AI**: OpenRouter API with Claude 3.5 Sonnet
- **Icons**: Lucide React
- **Build Tool**: Vite

## 🏗 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components (Login, Signup, Google OAuth)
│   ├── features/       # Feature-specific components
│   ├── layout/         # Layout components
│   └── ui/             # Basic UI components
├── contexts/           # React contexts (Auth with Google OAuth support)
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
- Supabase account
- Google OAuth credentials (optional, for Google sign-in)

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
VITE_OPENROUTER_API_KEY=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
```

### Google OAuth Setup (Optional)

To enable Google authentication:

1. **Create Google OAuth Credentials**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `https://your-project.supabase.co/auth/v1/callback`

2. **Configure Supabase**:
   - Go to your Supabase dashboard
   - Navigate to Authentication > Providers
   - Enable Google provider
   - Add your Google OAuth client ID and secret
   - Save the configuration

3. **Test the Integration**:
   - The "Sign in with Google" button should now work
   - Users can sign up/sign in with their Google accounts
   - Profile pictures and names are automatically imported

## 📝 Database Schema

The application uses Supabase with the following main tables:
- `email_history` - Stores generated emails and analytics
- `user_usage` - Tracks user activity (for analytics only)

### Authentication
- Supports both email/password and Google OAuth
- User profiles include name and avatar from Google
- Secure session management with Supabase Auth

## 🎨 Design Philosophy

- **Clean & Modern** - Apple-level design aesthetics
- **Responsive** - Works perfectly on all devices
- **Accessible** - WCAG compliant with proper contrast ratios
- **Fast** - Optimized for performance and user experience
- **Consistent** - Unified design across all authentication methods

## 🔐 Security Features

- **Row Level Security (RLS)** - Database-level security
- **Secure OAuth Flow** - Industry-standard Google OAuth implementation
- **Session Management** - Automatic token refresh and secure logout
- **Data Privacy** - User data is isolated and protected

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with ❤️ by Amine Ratit
- Powered by Supabase and OpenRouter
- Google OAuth integration for seamless authentication
- Icons by Lucide
- UI components with Tailwind CSS

---

**🎉 Enjoy unlimited, free AI-powered cold email generation with seamless Google authentication!**