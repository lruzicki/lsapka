import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const response = await fetch(`${API_BASE_URL}/druzyny/${params.id}`, {
      method: 'PUT',
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
    console.error('Error updating druzyna:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(`${API_BASE_URL}/druzyny/${params.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': request.headers.get('Authorization') || '',
      },
    })
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Backend error' }, { status: response.status })
    }
    
    return NextResponse.json({ message: 'Deleted successfully' })
  } catch (error) {
    console.error('Error deleting druzyna:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 