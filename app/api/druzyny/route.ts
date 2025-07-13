import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/druzyny`)
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching druzyny:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const authHeader = request.headers.get('Authorization') || ''
    console.log('Frontend API route - Authorization header:', authHeader ? 'Present' : 'Missing')
    console.log('Frontend API route - Request body:', body)
    
    const response = await fetch(`${API_BASE_URL}/druzyny`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
      },
      body: JSON.stringify(body),
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.log('Backend error response:', errorText)
      return NextResponse.json({ error: 'Backend error' }, { status: response.status })
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error creating druzyna:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 