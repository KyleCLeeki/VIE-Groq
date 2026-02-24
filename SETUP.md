# 🚀 Quick Start Guide

## Step 1: Get Your API Keys

### Groq API Key
1. Go to [console.groq.com](https://console.groq.com)
2. Click "Sign in with Google" or create an account
3. Navigate to the **API Keys** section (left sidebar)
4. Click "Create New API Key"
5. Copy the key - **save it somewhere safe**

### Hugging Face API Key
1. Go to [huggingface.co](https://huggingface.co)
2. Sign up or log in
3. Click your profile icon (top right) → **Settings**
4. Select **Access Tokens** from the sidebar
5. Click "New token"
6. Give it a name (e.g., "VIE-Groq")
7. Make sure **Read** permission is selected
8. Click "Create token"
9. Copy the token immediately - **it won't be shown again**

## Step 2: Configure Environment

1. Open the `.env` file in the project root:
   ```bash
   nano .env
   ```

2. Replace the placeholder values:
   ```env
   PORT=3000
   GROQ_API_KEY=gsk_xxxxxxxxxxxxx  # Paste your Groq key here
   HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxxx  # Paste your HF token here
   ```

3. Save and exit (Ctrl+X, then Y, then Enter if using nano)

4. **Important**: The `.env` file is in `.gitignore` - your keys won't be committed to Git

## Step 3: Install Dependencies

```bash
cd /workspaces/VIE-Groq
npm install
```

## Step 4: Start the Server

### For Development (auto-reload):
```bash
npm run dev
```

### For Production:
```bash
npm start
```

You should see:
```
✓ Server running at http://localhost:3000
```

## Step 5: Open the Web App

1. Open your browser
2. Go to **http://localhost:3000**
3. You should see the "Country Sector Analyzer" interface

## Step 6: Try It Out!

1. Enter a country name (e.g., "Japan", "Switzerland", "India")
2. Click the **Analyze** button
3. Wait 10-30 seconds for:
   - Groq LLM to identify the highest performing sector
   - Hugging Face to generate a related image
4. View your results!

## Example Countries to Try

- **Japan** - likely Technology
- **France** - likely Tourism or Wine
- **Brazil** - likely Agriculture or Mining
- **Germany** - likely Automotive or Manufacturing
- **UAE** - likely Tourism or Finance
- **Iceland** - likely Tourism or Energy
- **Nigeria** - likely Energy (Oil)
- **South Korea** - likely Technology

## Troubleshooting

### "Cannot find module 'express'"
- Run: `npm install`

### "API keys not valid"
- Make sure you pasted the correct keys from both services
- Check that there are no extra spaces before/after the keys in `.env`
- Restart the server after updating `.env`

### Server shows error "EADDRINUSE: address already in use :::3000"
- The port 3000 is already being used
- Either: close the other process, or change PORT in `.env` to 3001 or 3002

### Image generation fails but sector analysis works
- The Hugging Face API might be rate limited or overloaded
- Try again in a few moments
- Your HF account might not have enough API credits

### "Slow response time"
- First requests are slower (model loading)
- Subsequent requests are faster
- LLM analysis: 5-15 seconds
- Image generation: 10-20 seconds
- This is normal!

## Project Flow

```
User Input (Country Name)
         ↓
   Backend Server (Node.js/Express)
         ↓
    ┌────┴────┐
    ↓         ↓
 Groq API   Hugging Face API
   (LLM)    (Image Generation)
    ↓         ↓
    └────┬────┘
         ↓
   Send Results to Frontend
         ↓
   Display Results (HTML/CSS/JS)
```

## Project Architecture

```
Frontend (HTML/CSS/JavaScript)
  ├─ Sends country name to backend
  ├─ Shows loading indicator
  ├─ Receives results
  └─ Displays sector + image

Backend (Node.js + Express)
  ├─ Receives country request
  ├─ Calls Groq API (LLM)
  ├─ Gets sector information
  ├─ Calls Hugging Face API (Image Gen)
  ├─ Converts image to base64
  └─ Sends results to frontend
```

## What Happens Behind the Scenes

1. **User enters country** → Frontend sends HTTP POST request
2. **Groq LLM analyzes** → "What is the highest performing sector of [country]?"
3. **Gets sector name** → e.g., "Technology", "Tourism", "Agriculture"
4. **Hugging Face generates image** → Creates visual based on sector and country
5. **Image converted** → Embedded as base64 in response
6. **Frontend displays** → Shows sector name and generated image

## API Models Used

- **Groq Model**: `mixtral-8x7b-32768` (free tier available)
- **Hugging Face Model**: `stabilityai/stable-diffusion-3-medium`

## Cost Considerations

- **Groq**: Free tier available (includes 30 requests/minute)
- **Hugging Face**: Free tier available (includes image generation credits)
- No costs for basic usage!

Need help? Check the main [README.md](README.md) for more details.
