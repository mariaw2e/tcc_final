import { NextResponse } from 'next/server'

// Temporary authentication endpoint - NextAuth will be configured later
// This prevents build errors on Vercel until authentication is fully set up

export async function GET() {
  return NextResponse.json({ 
    message: 'Authentication endpoint - to be configured',
    status: 'inactive'
  })
}

export async function POST() {
  return NextResponse.json({ 
    message: 'Authentication endpoint - to be configured',
    status: 'inactive'
  })
}
