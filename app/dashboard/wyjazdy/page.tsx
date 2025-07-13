"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Plus, Edit, Trash2, Calendar, MapPin, Wallet } from "lucide-react"

interface Wyjazd {
  id: number
  tytul: string
  opis: string
  miejsce: string
  data_rozpoczecia: string
  data_zakonczenia: string
  kwota: number
  created_at: string
  updated_at: string
}

export default function WyjazdyPage() {
  const { data: session } = useSession()
  const [wyjazdy, setWyjazdy] = useState<Wyjazd[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingWyjazd, setEditingWyjazd] = useState<Wyjazd | null>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchWyjazdy()
  }, [])

  const fetchWyjazdy = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'}/wyjazdy/upcoming`)
      if (!response.ok) {
        throw new Error('Błąd podczas pobierania wyjazdów')
      }
      const data = await response.json()
      setWyjazdy(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Czy na pewno chcesz usunąć ten wyjazd?')) return

    try {
      const headers: HeadersInit = {}
      
      if (session?.accessToken) {
        headers['Authorization'] = `Bearer ${session.accessToken}`
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'}/wyjazdy/${id}`, {
        method: 'DELETE',
        headers
      })

      if (!response.ok) {
        throw new Error('Błąd podczas usuwania wyjazdu')
      }

      fetchWyjazdy()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd')
    }
  }

  const handleEdit = (wyjazd: Wyjazd) => {
    setEditingWyjazd(wyjazd)
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const wyjazdData = {
      tytul: formData.get('tytul') as string,
      opis: formData.get('opis') as string,
      miejsce: formData.get('miejsce') as string,
      data_rozpoczecia: formData.get('data_rozpoczecia') as string,
      data_zakonczenia: formData.get('data_zakonczenia') as string,
      kwota: parseFloat(formData.get('kwota') as string) || 0,
    }

    try {
      const url = editingWyjazd 
        ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'}/wyjazdy/${editingWyjazd.id}`
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'}/wyjazdy`
      
      const method = editingWyjazd ? 'PUT' : 'POST'

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      }
      
      if (session?.accessToken) {
        headers['Authorization'] = `Bearer ${session.accessToken}`
      }

      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(wyjazdData)
      })

      if (!response.ok) {
        throw new Error('Błąd podczas zapisywania wyjazdu')
      }

      setShowForm(false)
      setEditingWyjazd(null)
      fetchWyjazdy()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd')
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pl-PL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString)
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const year = date.getFullYear()
    return `${month}-${day}-${year}`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[rgb(var(--primary))]"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Zarządzanie wyjazdami</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-[rgb(var(--primary))] hover:bg-[rgb(var(--primary-dark))] text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Dodaj wyjazd
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4">
            {editingWyjazd ? 'Edytuj wyjazd' : 'Dodaj nowy wyjazd'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tytuł wyjazdu
              </label>
              <input
                type="text"
                name="tytul"
                defaultValue={editingWyjazd?.tytul || ''}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Opis
              </label>
              <textarea
                name="opis"
                defaultValue={editingWyjazd?.opis || ''}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Miejsce
                </label>
                <input
                  type="text"
                  name="miejsce"
                  defaultValue={editingWyjazd?.miejsce || ''}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kwota (zł)
                </label>
                <input
                  type="number"
                  name="kwota"
                  step="0.01"
                  defaultValue={editingWyjazd?.kwota || 0}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data rozpoczęcia (mm-dd-yyyy)
                </label>
                <input
                  type="text"
                  name="data_rozpoczecia"
                  defaultValue={editingWyjazd ? formatDateForInput(editingWyjazd.data_rozpoczecia) : ''}
                  placeholder="mm-dd-yyyy"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data zakończenia (mm-dd-yyyy)
                </label>
                <input
                  type="text"
                  name="data_zakonczenia"
                  defaultValue={editingWyjazd ? formatDateForInput(editingWyjazd.data_zakonczenia) : ''}
                  placeholder="mm-dd-yyyy"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-[rgb(var(--primary))] hover:bg-[rgb(var(--primary-dark))] text-white px-4 py-2 rounded-md transition-colors"
              >
                {editingWyjazd ? 'Zapisz zmiany' : 'Dodaj wyjazd'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingWyjazd(null)
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md transition-colors"
              >
                Anuluj
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wyjazdy.map((wyjazd) => (
          <div key={wyjazd.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-[rgb(var(--primary))]">{wyjazd.tytul}</h3>
              <div className="flex gap-1">
                <button
                  onClick={() => handleEdit(wyjazd)}
                  className="p-1 text-gray-600 hover:text-[rgb(var(--primary))] transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(wyjazd.id)}
                  className="p-1 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {wyjazd.opis && (
              <p className="text-gray-600 mb-4">{wyjazd.opis}</p>
            )}

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{wyjazd.miejsce}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>
                  {formatDate(wyjazd.data_rozpoczecia)} - {formatDate(wyjazd.data_zakonczenia)}
                </span>
              </div>
              
              {wyjazd.kwota > 0 && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Wallet className="h-4 w-4" />
                  <span>{wyjazd.kwota} zł</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {wyjazdy.length === 0 && !loading && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Brak zaplanowanych wyjazdów</h3>
          <p className="text-gray-600">Dodaj pierwszy wyjazd, aby rozpocząć planowanie.</p>
        </div>
      )}
    </div>
  )
} 