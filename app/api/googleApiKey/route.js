import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ key: process.env.GOOGLE_API_KEY });
}
