// DOM Elements
const countryForm = document.getElementById('countryForm');
const countryInput = document.getElementById('countryInput');
const analyzeBtn = document.getElementById('analyzeBtn');
const loadingState = document.getElementById('loadingState');
const resultsSection = document.getElementById('resultsSection');
const errorSection = document.getElementById('errorSection');
const resetBtn = document.getElementById('resetBtn');
const errorResetBtn = document.getElementById('errorResetBtn');
const sectorName = document.getElementById('sectorName');
const generatedImage = document.getElementById('generatedImage');
const resultTitle = document.getElementById('resultTitle');
const errorText = document.getElementById('errorText');

// Form submission
countryForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const country = countryInput.value.trim();

    if (!country) {
        showError('Please enter a country name');
        return;
    }

    await analyzeCountry(country);
});

// Reset buttons
resetBtn.addEventListener('click', resetForm);
errorResetBtn.addEventListener('click', resetForm);

// Analyze country function
async function analyzeCountry(country) {
    try {
        // Show loading state
        hideAllSections();
        loadingState.classList.remove('hidden');
        analyzeBtn.disabled = true;

        // Send request to backend
        const response = await fetch('/api/analyze-country', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ country })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || data.details || 'An error occurred');
        }

        // Display results
        displayResults(data);
    } catch (error) {
        console.error('Error:', error);
        showError(error.message || 'Failed to analyze country. Please try again.');
    } finally {
        analyzeBtn.disabled = false;
    }
}

// Display results
function displayResults(data) {
    hideAllSections();
    
    // Update content
    resultTitle.textContent = `Results for ${data.country}`;
    sectorName.textContent = data.sector;
    
    if (data.imageUrl) {
        generatedImage.src = data.imageUrl;
        generatedImage.alt = data.imagePrompt;
    } else {
        // Show placeholder if image generation failed
        generatedImage.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-size="16"%3EImage generation unavailable%3C/text%3E%3C/svg%3E';
        generatedImage.alt = 'Image not available';
    }
    
    // Show results section
    resultsSection.classList.remove('hidden');
}

// Show error
function showError(message) {
    hideAllSections();
    errorText.textContent = message;
    errorSection.classList.remove('hidden');
}

// Hide all sections
function hideAllSections() {
    loadingState.classList.add('hidden');
    resultsSection.classList.add('hidden');
    errorSection.classList.add('hidden');
}

// Reset form
function resetForm() {
    countryInput.value = '';
    hideAllSections();
    countryInput.focus();
}

// Focus on input on page load
window.addEventListener('load', () => {
    countryInput.focus();
});
