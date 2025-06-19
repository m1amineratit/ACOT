# Google OAuth Setup Instructions

## 🔧 **Step-by-Step Google OAuth Configuration**

### **1. Get Your Supabase Project URL**
Your Supabase project URL is: `https://ftihtaghmodpfwtcimne.supabase.co`

### **2. Configure Google Cloud Console**

1. **Go to Google Cloud Console**:
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Select your project or create a new one

2. **Enable Required APIs**:
   - Go to "APIs & Services" > "Library"
   - Search for and enable "Google+ API" (or "People API")

3. **Create OAuth 2.0 Credentials**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application" as the application type

4. **Configure Authorized Redirect URIs**:
   Add these **EXACT** redirect URIs (copy and paste):
   ```
   https://ftihtaghmodpfwtcimne.supabase.co/auth/v1/callback
   http://localhost:3000/auth/callback
   ```

5. **Save and Get Credentials**:
   - Click "Create"
   - Copy the **Client ID** and **Client Secret**

### **3. Configure Supabase Dashboard**

1. **Go to Supabase Dashboard**:
   - Visit [Supabase Dashboard](https://supabase.com/dashboard)
   - Select your project

2. **Enable Google Provider**:
   - Go to "Authentication" > "Providers"
   - Find "Google" and click to configure
   - Toggle "Enable sign in with Google" to ON

3. **Add Google Credentials**:
   - **Client ID**: Paste your Google OAuth Client ID
   - **Client Secret**: Paste your Google OAuth Client Secret
   - **Redirect URL**: Should automatically show `https://ftihtaghmodpfwtcimne.supabase.co/auth/v1/callback`

4. **Save Configuration**

### **4. Test the Integration**

1. **Clear Browser Cache**: Clear cookies and cache for your app
2. **Try Google Sign-In**: Click the "Sign in with Google" button
3. **Check Console**: Look for any errors in browser console

### **5. Troubleshooting**

If you still get redirect URI mismatch:

1. **Double-check URLs**: Make sure the redirect URI in Google Cloud Console exactly matches:
   ```
   https://ftihtaghmodpfwtcimne.supabase.co/auth/v1/callback
   ```

2. **Wait for Propagation**: Google changes can take a few minutes to propagate

3. **Check Supabase Settings**: Ensure the redirect URL in Supabase matches your Google Cloud Console settings

4. **Verify Project**: Make sure you're using the correct Google Cloud project

### **6. Common Issues**

- **Case Sensitivity**: URLs are case-sensitive
- **Trailing Slashes**: Don't add trailing slashes to redirect URIs
- **HTTP vs HTTPS**: Use HTTPS for production
- **Multiple Projects**: Ensure you're configuring the correct Google Cloud project

### **7. Development vs Production**

For development, you might also want to add:
```
http://localhost:5173/auth/callback
```

But for your current Bolt environment, use:
```
https://ftihtaghmodpfwtcimne.supabase.co/auth/v1/callback
```