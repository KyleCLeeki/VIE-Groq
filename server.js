require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Validate environment variables
const validateEnv = () => {
  const requiredVars = ['GROQ_API_KEY', 'HUGGINGFACE_API_KEY'];
  const missing = requiredVars.filter(v => !process.env[v]);
  if (missing.length > 0) {
    console.warn(`Warning: Missing environment variables: ${missing.join(', ')}`);
    console.warn('Please set these variables in .env file');
  }
};

validateEnv();

// Route to analyze country and generate image
app.post('/api/analyze-country', async (req, res) => {
  try {
    const { country } = req.body;

    if (!country || typeof country !== 'string' || country.trim() === '') {
      return res.status(400).json({ error: 'Country name is required' });
    }

    const countryName = country.trim();

    // Step 1: Get highest performing sector from Groq LLM
    console.log(`\nAnalyzing ${countryName}...`);
    
    let sector = '';
    try {
      if (!process.env.GROQ_API_KEY) {
        throw new Error('GROQ_API_KEY is not set in environment variables');
      }

      const groqResponse = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'user',
              content: `What is the highest performing economic sector in ${countryName}? Give a concise answer (1-3 words) with just the sector name, nothing else. For example: "Technology", "Agriculture", "Tourism", etc.`
            }
          ],
          temperature: 0.7,
          max_tokens: 50
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      sector = groqResponse.data.choices[0].message.content.trim();
      console.log(`✓ Sector identified: ${sector}`);
    } catch (groqError) {
      const errorMsg = groqError.response?.data?.error?.message || 
                       groqError.response?.statusText || 
                       groqError.message;
      const statusCode = groqError.response?.status || 'Unknown';
      
      console.error('Groq API Error Details:');
      console.error(`  Status: ${statusCode}`);
      console.error(`  Message: ${errorMsg}`);
      console.error(`  Full response:`, groqError.response?.data);
      
      return res.status(500).json({ 
        error: 'Failed to analyze country using Groq API',
        details: errorMsg,
        status: statusCode
      });
    }

    // Step 2: Generate image using Hugging Face
    console.log(`\nGenerating image for sector: ${sector}...`);
    
    let imageUrl = '';
    try {
      const imagePrompt = `Professional illustration of ${sector} sector in ${countryName}, economic landscape, modern and vibrant, high quality`;
      
      const hfResponse = await axios.post(
        'https://router.huggingface.co/models/stabilityai/stable-diffusion-2-1',
        { inputs: imagePrompt },
        {
          headers: {
            'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`
          },
          responseType: 'arraybuffer',
          timeout: 60000
        }
      );

      // Check if response is valid image data
      if (hfResponse.data && hfResponse.data.length > 0) {
        const imageBase64 = Buffer.from(hfResponse.data).toString('base64');
        imageUrl = `data:image/jpeg;base64,${imageBase64}`;
        console.log('✓ Image generated successfully');
      } else {
        console.warn('Hugging Face returned empty response');
      }
    } catch (hfError) {
      // Try to parse error response
      let errorDetails = 'Unknown error';
      try {
        if (hfError.response?.data) {
          const errorBuffer = Buffer.from(hfError.response.data);
          const errorText = errorBuffer.toString('utf-8');
          errorDetails = errorText;
        }
      } catch (parseErr) {
        errorDetails = hfError.message || 'Failed to parse error';
      }
      
      console.warn('Hugging Face API note:', errorDetails);
      // Don't fail the entire request if image generation fails
    }

    // Return results
    res.json({
      country: countryName,
      sector: sector,
      imageUrl: imageUrl,
      imagePrompt: `Professional illustration of ${sector} sector in ${countryName}`
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'An unexpected error occurred', details: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Serve index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n✓ Server running at http://localhost:${PORT}`);
  console.log(`  Make sure GROQ_API_KEY and HUGGINGFACE_API_KEY are set in .env file\n`);
});
