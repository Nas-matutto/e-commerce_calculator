export async function POST({ request }) {
  console.log('API endpoint hit');
  
  try {
    const body = await request.json();
    console.log('Request body:', body);
    
    // Return mock data for now to test the connection
    const mockResponse = {
      analysisRationale: "Test analysis for your product idea",
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
        }
      ],
      totalCost: "$15,000 - $50,000",
      considerations: [
        "This is a test response",
        "The API endpoint is working correctly"
      ]
    };
    
    return new Response(JSON.stringify(mockResponse), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
  } catch (error) {
    console.error('API Error:', error);
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