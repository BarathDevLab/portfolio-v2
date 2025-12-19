import { NextRequest, NextResponse } from 'next/server';

const RAG_API_URL = 'https://portfolio-rag-production-d9e8.up.railway.app';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received request body:', JSON.stringify(body, null, 2));
    
    // The RAG API might expect 'query' instead of 'message'
    const ragBody = {
      query: body.message || body.query,
      history: body.history || [],
    };
    console.log('Sending to RAG API:', JSON.stringify(ragBody, null, 2));

    const response = await fetch(`${RAG_API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ragBody),
    });

    console.log('RAG API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('RAG API error:', errorText);
      return NextResponse.json(
        { error: 'Failed to get response from RAG API', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('RAG API response:', JSON.stringify(data, null, 2));
    return NextResponse.json(data);
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
