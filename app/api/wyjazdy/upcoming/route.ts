import { NextResponse } from 'next/server'

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8001'

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/wyjazdy/upcoming`)
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching upcoming wyjazdy:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 