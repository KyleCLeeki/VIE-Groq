#!/bin/bash
# Example API test script
# This script demonstrates how to call the /api/analyze-country endpoint

# Make sure the server is running first!
# Run this in a new terminal window while the server is still running

echo "🌍 Testing Country Sector Analyzer API"
echo "========================================"
echo ""

# Test with a sample country
COUNTRY="France"
API_URL="http://localhost:3000/api/analyze-country"

echo "Testing with country: $COUNTRY"
echo "API Endpoint: $API_URL"
echo ""

# Send the request
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d "{\"country\": \"$COUNTRY\"}" \
  -w "\n\nHTTP Status: %{http_code}\n"

echo ""
echo "========================================"
echo "✓ Request complete"
echo ""
echo "You can modify the COUNTRY variable to test different countries:"
echo 'COUNTRY="Japan"'
echo 'COUNTRY="Brazil"'
echo 'COUNTRY="India"'
echo 'COUNTRY="Germany"'
echo ""
echo "To test from a different terminal, make sure:"
echo "1. The server is running (npm start)"
echo "2. Your API keys are set in .env"
echo "3. You have curl installed (should be available on Linux/Mac/WSL)"
