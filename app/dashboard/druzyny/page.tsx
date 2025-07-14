"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Plus, Edit, Trash2, MapPin, Users, Link as LinkIcon } from "lucide-react"

interface Druzyna {
  id: number
  nazwa: string
  opis: string
  link: string
  miasto: string
  dzielnica: string
  dokladny_adres: string
  pinezka: string
  created_at: string
  updated_at: string
}

interface DruzynyGrouped {
  [pinezka: string]: Druzyna[]
}

export default function DruzynyPage() {
  const { data: session } = useSession()
  const [druzyny, setDruzyny] = useState<DruzynyGrouped>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingDruzyna, setEditingDruzyna] = useState<Druzyna | null>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchDruzyny()
  }, [])

  const fetchDruzyny = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'}/druzyny`)
      if (!response.ok) {
        throw new Error('Błąd podczas pobierania drużyn')
      }
      const data = await response.json()
      setDruzyny(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Czy na pewno chcesz usunąć tę drużynę?')) return

    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      }
      
      if (session?.accessToken) {
        headers['Authorization'] = `Bearer ${session.accessToken}`
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'}/druzyny/${id}`, {
        method: 'DELETE',
        headers
      })

      if (!response.ok) {
        throw new Error('Błąd podczas usuwania drużyny')
      }

      fetchDruzyny()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd')
    }
  }

  const handleEdit = (druzyna: Druzyna) => {
    setEditingDruzyna(druzyna)
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const druzynaData = {
      nazwa: formData.get('nazwa') as string,
      opis: formData.get('opis') as string,
      link: formData.get('link') as string,
      miasto: formData.get('miasto') as string,
      dzielnica: formData.get('dzielnica') as string,
      dokladny_adres: formData.get('dokladny_adres') as string,
      pinezka: formData.get('pinezka') as string,
    }

    try {
      const url = editingDruzyna 
        ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'}/druzyny/${editingDruzyna.id}`
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'}/druzyny`
      
      const method = editingDruzyna ? 'PUT' : 'POST'

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      }
      
      if (session?.accessToken) {
        headers['Authorization'] = `Bearer ${session.accessToken}`
      }

      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(druzynaData)
      })

      if (!response.ok) {
        throw new Error('Błąd podczas zapisywania drużyny')
      }

      setShowForm(false)
      setEditingDruzyna(null)
      fetchDruzyny()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd')
    }
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
        <h1 className="text-3xl font-bold">Zarządzanie drużynami</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-[rgb(var(--primary))] hover:bg-[rgb(var(--primary-dark))] text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Dodaj drużynę
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
            {editingDruzyna ? 'Edytuj drużynę' : 'Dodaj nową drużynę'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nazwa drużyny
                </label>
                                 <input
                   type="text"
                   name="nazwa"
                   defaultValue={editingDruzyna?.nazwa || ''}
                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]"
                 />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Miasto
                </label>
                                 <input
                   type="text"
                   name="miasto"
                   defaultValue={editingDruzyna?.miasto || ''}
                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]"
                 />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dzielnica
                </label>
                <input
                  type="text"
                  name="dzielnica"
                  defaultValue={editingDruzyna?.dzielnica || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pinezka
                </label>
                                 <input
                   type="text"
                   name="pinezka"
                   defaultValue={editingDruzyna?.pinezka || ''}
                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]"
                 />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Link
                </label>
                <input
                  type="url"
                  name="link"
                  defaultValue={editingDruzyna?.link || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dokładny adres
              </label>
              <input
                type="text"
                name="dokladny_adres"
                defaultValue={editingDruzyna?.dokladny_adres || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Opis
              </label>
              <textarea
                name="opis"
                defaultValue={editingDruzyna?.opis || ''}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-[rgb(var(--primary))] hover:bg-[rgb(var(--primary-dark))] text-white px-4 py-2 rounded-md transition-colors"
              >
                {editingDruzyna ? 'Zapisz zmiany' : 'Dodaj drużynę'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingDruzyna(null)
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md transition-colors"
              >
                Anuluj
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-6">
        {Object.entries(druzyny).map(([pinezka, druzynyList]) => (
          <div key={pinezka} className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[rgb(var(--primary))]" />
                {pinezka}
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {druzynyList.map((druzyna) => (
                  <div key={druzyna.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                                           <div className="flex items-center gap-2">
                       <div className="w-8 h-8 bg-[rgba(var(--primary),0.1)] rounded-full flex items-center justify-center">
                         <span className="text-xs font-bold text-[rgb(var(--primary))]">
                           {druzyna.nazwa.split(' ')[0]}
                         </span>
                       </div>
                       <h4 className="font-bold text-lg">{druzyna.nazwa}</h4>
                     </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEdit(druzyna)}
                          className="p-1 text-gray-600 hover:text-[rgb(var(--primary))] transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(druzyna.id)}
                          className="p-1 text-gray-600 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{druzyna.miasto}</span>
                        {druzyna.dzielnica && <span>({druzyna.dzielnica})</span>}
                      </div>
                      
                      {druzyna.dokladny_adres && (
                        <div className="text-xs">
                          {druzyna.dokladny_adres}
                        </div>
                      )}
                      
                      {druzyna.opis && (
                        <div className="text-xs">
                          {druzyna.opis}
                        </div>
                      )}
                      
                      {druzyna.link && (
                        <a
                          href={druzyna.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[rgb(var(--primary))] hover:underline"
                        >
                          <LinkIcon className="h-3 w-3" />
                          <span className="text-xs">Strona drużyny</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 