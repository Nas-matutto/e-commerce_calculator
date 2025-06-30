export async function POST({ request }) {
  console.log('🔥 API endpoint called');
  
  try {
    const body = await request.json();
    console.log('📨 Request body:', body);
    
    // Return mock data for testing
    const mockResponse = {
      analysisRationale: `Based on your product "${body.productDescription}" and target market "${body.targetMarket || 'global'}", here are the estimated launch costs.`,
      costs: [
        {
          category: "Product Sourcing & Development",
          amount: "$2,500 - $8,000",
          details: "Initial product development, samples, and supplier setup"
        },
        {
          category: "Initial Inventory (MOQ)",
          amount: "$5,000 - $15,000", 
          details: "Minimum order quantity based on supplier requirements"
        },
        {
          category: "Shipping & Import Costs",
          amount: "$800 - $2,500",
          details: "International shipping, customs, duties, and local logistics"
        },
        {
          category: "E-commerce Platform Setup",
          amount: "$1,200 - $5,000",
          details: "Website development, design, apps, and initial setup"
        },
        {
          category: "Initial Marketing & Customer Acquisition",
          amount: "$3,000 - $10,000",
          details: "First 3 months of advertising, content creation, and brand building"
        },
        {
          category: "Legal & Compliance",
          amount: "$500 - $2,000",
          details: "Business registration, trademarks, insurance, and certifications"
        },
        {
          category: "Working Capital & Miscellaneous",
          amount: "$2,000 - $7,500",
          details: "3-month operational buffer and unexpected expenses"
        }
      ],
      totalCost: "$15,000 - $50,000",
      considerations: [
        `For ${body.productDescription}, consider seasonal demand patterns`,
        "Quality control is crucial for customer satisfaction",
        "Budget for marketing testing across different channels",
        "Plan for inventory management and storage costs",
        "Consider regulatory requirements for your product category"
      ]
    };
    
    console.log('✅ Sending response');
    
    return new Response(JSON.stringify(mockResponse), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
  } catch (error) {
    console.error('❌ API Error:', error);
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}