import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/komisja-rewizyjna`)
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching komisja rewizyjna:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const response = await fetch(`${API_BASE_URL}/komisja-rewizyjna`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('Authorization') || '',
      },
      body: JSON.stringify(body),
    })
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Backend error' }, { status: response.status })
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error creating komisja rewizyjna member:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 