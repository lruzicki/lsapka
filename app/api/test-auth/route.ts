import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization') || ''
    console.log('Test auth - Authorization header:', authHeader ? 'Present' : 'Missing')
    
    const response = await fetch(`${API_BASE_URL}/test-auth`, {
      method: 'GET',
      headers: {
        'Authorization': authHeader,
      },
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.log('Test auth - Backend error response:', errorText)
      return NextResponse.json({ error: 'Backend error' }, { status: response.status })
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Test auth - Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 