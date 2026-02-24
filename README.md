# 🌍 Country Sector Analyzer

A web application that analyzes any country's highest performing economic sector using **Groq LLM** and generates AI-powered imagery using **Hugging Face Stable Diffusion**.

## Features

✨ **Simple & Intuitive UI** - Just enter a country name
🤖 **Groq LLM Integration** - Analyzes economic sectors using advanced language models
🎨 **Hugging Face Image Generation** - Creates relevant imagery based on the identified sector
⚡ **Fast & Efficient** - Powered by cutting-edge APIs
📱 **Responsive Design** - Works on desktop and mobile devices

## Prerequisites

Before you begin, ensure you have the following:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Groq API Key** - Get it from [console.groq.com](https://console.groq.com)
- **Hugging Face API Key** - Get it from [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)

## Installation

1. **Clone the repository** (if not already done)
   ```bash
   cd /workspaces/VIE-Groq
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and add your API keys:
   ```env
   PORT=3000
   GROQ_API_KEY=your_groq_api_key_here
   HUGGINGFACE_API_KEY=your_huggingface_api_key_here
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```
(Requires nodemon - automatically installed)

### Production Mode
```bash
npm start
```

The application will be available at **http://localhost:3000**

## How to Use

1. Open the web app in your browser
2. Enter the name of any country (e.g., "Japan", "Brazil", "Germany")
3. Click the "Analyze" button
4. Wait for the app to:
   - Query Groq LLM to identify the highest performing sector
   - Generate an AI image related to that sector using Hugging Face
5. View the results with the sector name and generated image
6. Optionally analyze another country

## Project Structure

```
VIE-Groq/
├── server.js              # Express backend server
├── package.json           # Project dependencies
├── .env.example           # Example environment variables
├── public/
│   ├── index.html        # Main HTML page
│   ├── style.css         # Styling
│   └── script.js         # Frontend logic
└── README.md             # This file
```

## Technical Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **APIs**: 
  - [Groq API](https://console.groq.com) - For LLM analysis
  - [Hugging Face API](https://huggingface.co/api) - For image generation (Stable Diffusion)
- **HTTP Client**: Axios

## API Endpoints

### POST /api/analyze-country
Analyzes a country and generates related imagery

**Request Body:**
```json
{
  "country": "France"
}
```

**Response:**
```json
{
  "country": "France",
  "sector": "Tourism & Hospitality",
  "imageUrl": "data:image/jpeg;base64,...",
  "imagePrompt": "Professional illustration of Tourism & Hospitality sector in France..."
}
```

## Troubleshooting

### "API Key not found" error
- Ensure your `.env` file is properly configured
- Check that your API keys are valid and have the required permissions
- Restart the server after updating `.env`

### Image generation fails
- The Hugging Face API might be under heavy load
- Try again in a few moments
- Ensure your Hugging Face API key has sufficient credits

### Slow response times
- The LLM and image generation can take 10-30 seconds
- This is normal for AI-powered requests
- First request might be slower due to model loading

## API Key Setup Guide

### Getting Groq API Key
1. Visit [console.groq.com](https://console.groq.com)
2. Sign up or log in
3. Go to API Keys section
4. Create a new API key
5. Copy and paste it into your `.env` file

### Getting Hugging Face API Key
1. Visit [huggingface.co](https://huggingface.co)
2. Sign up or log in
3. Go to Settings → Access Tokens
4. Create a new token (read access is enough)
5. Copy and paste it into your `.env` file

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## Support

If you encounter any issues, please:
1. Check that your API keys are valid
2. Ensure Node.js is properly installed
3. Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
4. Check the console logs for specific error messages