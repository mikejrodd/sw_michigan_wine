import { NextResponse } from 'next/server';

export async function POST(request) {
  const { messages } = await request.json();

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini-2024-07-18',
      messages,
      max_tokens: 800,
    }),
  });

  const data = await response.json();
  return NextResponse.json(data);
}
