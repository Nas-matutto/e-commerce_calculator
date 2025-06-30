export async function POST({ request }) {
  try {
    const { productDescription, targetMarket } = await request.json();
    
    // Use your API key from environment variables
    const apiKey = import.meta.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY;
    
    if (!apiKey) {
      throw new Error('API key not configured');
    }

    const prompt = `As an e-commerce and business cost analysis expert, provide a detailed cost breakdown for launching an e-commerce brand selling: "${productDescription}"

Additional context:
- Target market: ${targetMarket || 'Not specified'}

Please provide a comprehensive analysis in the following JSON format:

{
  "analysisRationale": "A 2-3 sentence explanation of the key factors driving the cost estimates for this specific product type",
  "costs": [
    {
      "category": "Product Sourcing & Development",
      "amount": "estimated range (e.g., $2,000 - $5,000)",
      "details": "MOQ, unit cost, supplier details"
    },
    {
      "category": "Initial Inventory (MOQ)",
      "amount": "estimated range", 
      "details": "Based on MOQ and startup needs"
    },
    {
      "category": "Shipping & Import Costs",
      "amount": "estimated range",
      "details": "International shipping, customs, duties, logistics"
    },
    {
      "category": "E-commerce Platform Setup",
      "amount": "estimated range",
      "details": "Website, hosting, payment processing, apps"
    },
    {
      "category": "Initial Marketing & Customer Acquisition",
      "amount": "estimated range",
      "details": "First 3 months of advertising and brand building"
    },
    {
      "category": "Legal & Compliance",
      "amount": "estimated range",
      "details": "Business registration, insurance, certifications"
    },
    {
      "category": "Working Capital & Miscellaneous",
      "amount": "estimated range",
      "details": "3-month operational buffer and unexpected expenses"
    }
  ],
  "totalCost": "total estimated range (e.g., $15,000 - $45,000)",
  "considerations": [
    "Key consideration 1 with specific details",
    "Key consideration 2 with specific details", 
    "Key consideration 3 with specific details",
    "Key consideration 4 with specific details",
    "Key consideration 5 with specific details"
  ]
}

Provide realistic estimates based on current market conditions. Always use ranges and consider different scenarios from basic to premium approaches.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2000,
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `API Error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.content[0].text;
    
    // Extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse analysis response');
    }
    
    const analysis = JSON.parse(jsonMatch[0]);
    
    return new Response(JSON.stringify(analysis), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Internal server error' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}