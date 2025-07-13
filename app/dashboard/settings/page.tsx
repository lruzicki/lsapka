"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Save, Globe, Users, Shield, Plus, Edit, Trash2 } from "lucide-react"

interface Komenda {
  id: number
  stopien: string
  imie: string
  nazwisko: string
  ksywka: string
}

interface KomisjaRewizyjna {
  id: number
  stopien: string
  imie: string
  nazwisko: string
  ksywka: string
}

export default function SettingsPage() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState("site")
  const [komenda, setKomenda] = useState<Komenda[]>([])
  const [komisja, setKomisja] = useState<KomisjaRewizyjna[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showKomendaForm, setShowKomendaForm] = useState(false)
  const [showKomisjaForm, setShowKomisjaForm] = useState(false)
  const [editingKomenda, setEditingKomenda] = useState<Komenda | null>(null)
  const [editingKomisja, setEditingKomisja] = useState<KomisjaRewizyjna | null>(null)

  useEffect(() => {
    if (activeTab === "komenda" || activeTab === "komisja") {
      fetchData()
    }
  }, [activeTab])

  const fetchData = async () => {
    setLoading(true)
    try {
      if (activeTab === "komenda") {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'}/komenda`)
        if (!response.ok) throw new Error('Błąd podczas pobierania komendy')
        const data = await response.json()
        setKomenda(data)
      } else if (activeTab === "komisja") {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'}/komisja-rewizyjna`)
        if (!response.ok) throw new Error('Błąd podczas pobierania komisji rewizyjnej')
        const data = await response.json()
        setKomisja(data)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd')
    } finally {
      setLoading(false)
    }
  }

  const handleKomendaSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const komendaData = {
      stopien: formData.get('stopien') as string,
      imie: formData.get('imie') as string,
      nazwisko: formData.get('nazwisko') as string,
      ksywka: formData.get('ksywka') as string,
    }

    try {
      const url = editingKomenda 
        ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'}/komenda/${editingKomenda.id}`
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'}/komenda`
      
      const method = editingKomenda ? 'PUT' : 'POST'

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      }
      
      if (session?.accessToken) {
        headers['Authorization'] = `Bearer ${session.accessToken}`
      }

      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(komendaData)
      })

      if (!response.ok) throw new Error('Błąd podczas zapisywania')

      setShowKomendaForm(false)
      setEditingKomenda(null)
      fetchData()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd')
    }
  }

  const handleKomisjaSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const komisjaData = {
      stopien: formData.get('stopien') as string,
      imie: formData.get('imie') as string,
      nazwisko: formData.get('nazwisko') as string,
      ksywka: formData.get('ksywka') as string,
    }

    try {
      const url = editingKomisja 
        ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'}/komisja-rewizyjna/${editingKomisja.id}`
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'}/komisja-rewizyjna`
      
      const method = editingKomisja ? 'PUT' : 'POST'

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      }
      
      if (session?.accessToken) {
        headers['Authorization'] = `Bearer ${session.accessToken}`
      }

      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(komisjaData)
      })

      if (!response.ok) throw new Error('Błąd podczas zapisywania')

      setShowKomisjaForm(false)
      setEditingKomisja(null)
      fetchData()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd')
    }
  }

  const handleDelete = async (type: 'komenda' | 'komisja', id: number) => {
    if (!confirm('Czy na pewno chcesz usunąć tego członka?')) return

    try {
      const endpoint = type === 'komenda' 
        ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'}/komenda/${id}` 
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'}/komisja-rewizyjna/${id}`
      const headers: HeadersInit = {}
      
      if (session?.accessToken) {
        headers['Authorization'] = `Bearer ${session.accessToken}`
      }

      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers
      })

      if (!response.ok) throw new Error('Błąd podczas usuwania')

      fetchData()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Ustawienia</h1>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-gray-50 p-4 md:p-6 border-b md:border-b-0 md:border-r border-gray-200">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab("site")}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === "site"
                    ? "bg-[rgba(var(--primary),0.1)] text-[rgb(var(--primary))]"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Globe className="mr-3 h-5 w-5" />
                <span>Ustawienia strony</span>
              </button>
              <button
                onClick={() => setActiveTab("komenda")}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === "komenda"
                    ? "bg-[rgba(var(--primary),0.1)] text-[rgb(var(--primary))]"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Users className="mr-3 h-5 w-5" />
                <span>Komenda</span>
              </button>
              <button
                onClick={() => setActiveTab("komisja")}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === "komisja"
                    ? "bg-[rgba(var(--primary),0.1)] text-[rgb(var(--primary))]"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Shield className="mr-3 h-5 w-5" />
                <span>Komisja Rewizyjna</span>
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            {activeTab === "site" && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Ustawienia strony</h2>
                <p className="text-sm text-gray-500 mb-6">
                  Zarządzaj ustawieniami strony i jej zawartością.
                </p>

                <form className="space-y-6">
                  <div>
                    <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-1">
                      Nazwa strony
                    </label>
                    <input
                      type="text"
                      id="siteName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent"
                      defaultValue="Leśna Szkółka"
                    />
                  </div>

                  <div>
                    <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 mb-1">
                      Opis strony
                    </label>
                    <textarea
                      id="siteDescription"
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent"
                      defaultValue="Niezależny Krąg Instruktorów Harcerskich"
                    ></textarea>
                  </div>

                  <div>
                    <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      Email kontaktowy
                    </label>
                    <input
                      type="email"
                      id="contactEmail"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent"
                      defaultValue="kontakt@lesnaszkolka.org"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">Funkcje</label>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="mr-3"
                        />
                        <span>Włącz komentarze</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="mr-3"
                        />
                        <span>Włącz powiadomienia email</span>
                    </label>
                      <label className="flex items-center">
                    <input
                          type="checkbox"
                          className="mr-3"
                        />
                        <span>Tryb konserwacji</span>
                      </label>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 italic">
                      💡 Kiedy tutaj będzie opcja na edycję kontentu.
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-[rgb(var(--primary))] hover:bg-[rgb(var(--primary-dark))] text-white px-4 py-2 rounded-md flex items-center"
                    >
                      <Save className="mr-2 h-5 w-5" />
                      Zapisz zmiany
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === "komenda" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">Zarządzanie komendą</h2>
                    <p className="text-sm text-gray-500">Dodawaj i edytuj członków komendy.</p>
                  </div>
                  <button
                    onClick={() => setShowKomendaForm(true)}
                    className="bg-[rgb(var(--primary))] hover:bg-[rgb(var(--primary-dark))] text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    Dodaj członka
                  </button>
                </div>

                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                  </div>
                )}

                {showKomendaForm && (
                  <div className="bg-gray-50 p-6 rounded-lg mb-6">
                    <h3 className="text-lg font-medium mb-4">
                      {editingKomenda ? 'Edytuj członka komendy' : 'Dodaj nowego członka komendy'}
                    </h3>
                    <form onSubmit={handleKomendaSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Stopień
                          </label>
                          <input
                            type="text"
                            name="stopien"
                            defaultValue={editingKomenda?.stopien || ''}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ksywa
                          </label>
                          <input
                            type="text"
                            name="ksywka"
                            defaultValue={editingKomenda?.ksywka || ''}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Imię
                          </label>
                          <input
                            type="text"
                            name="imie"
                            defaultValue={editingKomenda?.imie || ''}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nazwisko
                          </label>
                          <input
                            type="text"
                            name="nazwisko"
                            defaultValue={editingKomenda?.nazwisko || ''}
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
                          {editingKomenda ? 'Zapisz zmiany' : 'Dodaj członka'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowKomendaForm(false)
                            setEditingKomenda(null)
                          }}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md transition-colors"
                        >
                          Anuluj
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {loading ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[rgb(var(--primary))]"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {komenda.map((member) => (
                      <div key={member.id} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-bold text-lg">
                              {member.stopien}. {member.imie} {member.nazwisko}
                              {member.ksywka && (
                                <span className="text-gray-600 font-normal"> "{member.ksywka}"</span>
                              )}
                            </h4>
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={() => {
                                setEditingKomenda(member)
                                setShowKomendaForm(true)
                              }}
                              className="p-1 text-gray-600 hover:text-[rgb(var(--primary))] transition-colors"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete('komenda', member.id)}
                              className="p-1 text-gray-600 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "komisja" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">Zarządzanie komisją rewizyjną</h2>
                    <p className="text-sm text-gray-500">Dodawaj i edytuj członków komisji rewizyjnej.</p>
                  </div>
                  <button
                    onClick={() => setShowKomisjaForm(true)}
                    className="bg-[rgb(var(--primary))] hover:bg-[rgb(var(--primary-dark))] text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    Dodaj członka
                  </button>
                </div>

                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                  </div>
                )}

                {showKomisjaForm && (
                  <div className="bg-gray-50 p-6 rounded-lg mb-6">
                    <h3 className="text-lg font-medium mb-4">
                      {editingKomisja ? 'Edytuj członka komisji rewizyjnej' : 'Dodaj nowego członka komisji rewizyjnej'}
                    </h3>
                    <form onSubmit={handleKomisjaSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Stopień
                          </label>
                          <input
                            type="text"
                            name="stopien"
                            defaultValue={editingKomisja?.stopien || ''}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ksywa
                          </label>
                          <input
                            type="text"
                            name="ksywka"
                            defaultValue={editingKomisja?.ksywka || ''}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Imię
                          </label>
                          <input
                            type="text"
                            name="imie"
                            defaultValue={editingKomisja?.imie || ''}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nazwisko
                          </label>
                          <input
                            type="text"
                            name="nazwisko"
                            defaultValue={editingKomisja?.nazwisko || ''}
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
                          {editingKomisja ? 'Zapisz zmiany' : 'Dodaj członka'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowKomisjaForm(false)
                            setEditingKomisja(null)
                          }}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md transition-colors"
                        >
                          Anuluj
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {loading ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[rgb(var(--primary))]"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {komisja.map((member) => (
                      <div key={member.id} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-bold text-lg">
                              {member.stopien}. {member.imie} {member.nazwisko}
                              {member.ksywka && (
                                <span className="text-gray-600 font-normal"> "{member.ksywka}"</span>
                              )}
                            </h4>
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={() => {
                                setEditingKomisja(member)
                                setShowKomisjaForm(true)
                              }}
                              className="p-1 text-gray-600 hover:text-[rgb(var(--primary))] transition-colors"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete('komisja', member.id)}
                              className="p-1 text-gray-600 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
