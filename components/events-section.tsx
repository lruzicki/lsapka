"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Calendar, MapPin, Wallet } from "lucide-react"

interface Wyjazd {
  id: number
  tytul: string
  opis: string
  miejsce: string
  data_rozpoczecia: string
  data_zakonczenia: string
  kwota: number
}

export default function EventsSection() {
  const [wyjazdy, setWyjazdy] = useState<Wyjazd[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWyjazdy()
  }, [])

  const fetchWyjazdy = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'}/wyjazdy/upcoming`)
      if (response.ok) {
        const data = await response.json()
        setWyjazdy(data)
      }
    } catch (error) {
      console.error('Błąd podczas pobierania wyjazdów:', error)
    } finally {
      setLoading(false)
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

  const formatDateShort = (dateString: string) => {
    const date = new Date(dateString)
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('pl-PL', { month: 'short' })
    }
  }

  return (
    <section id="wydarzenia" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Wydarzenia</h2>
          <div className="w-20 h-1 bg-[rgb(var(--primary))] mx-auto mb-8"></div>
          <p className="text-lg text-gray-700">
            Podstawą naszego działania są cotygodniowe zbiórki harcerskie. Organizujemy kursy, warsztaty, obozy i inne wydarzenia dla harcerzy i instruktorów. Sprawdź nasze
            nadchodzące wydarzenia i dołącz do nas!
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[rgb(var(--primary))]"></div>
          </div>
        ) : wyjazdy.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold mb-6 text-[rgb(var(--primary))]">Kalendarz</h3>
            <div className="space-y-6">
                {wyjazdy.slice(0, 3).map((wyjazd) => {
                  const dateInfo = formatDateShort(wyjazd.data_rozpoczecia)
                  return (
                    <div key={wyjazd.id} className="flex">
                <div className="flex-shrink-0 w-16 h-16 bg-[rgba(var(--primary),0.1)] rounded-lg flex flex-col items-center justify-center mr-4">
                        <span className="font-bold text-[rgb(var(--primary))]">{dateInfo.day}</span>
                        <span className="text-sm text-gray-600">{dateInfo.month}</span>
                </div>
                <div>
                        <h4 className="font-bold text-lg">{wyjazd.tytul}</h4>
                        <p className="text-gray-600">{formatDate(wyjazd.data_rozpoczecia)} - {formatDate(wyjazd.data_zakonczenia)}, {wyjazd.miejsce}</p>
                      </div>
                </div>
                  )
                })}
            </div>
            <a
                href="https://www.facebook.com/lesnaszkolka/?locale=pl_PL"
                target="_blank"
                rel="noopener noreferrer"
              className="inline-block mt-8 text-[rgb(var(--primary))] font-medium hover:underline"
            >
              Zobacz pełen kalendarz →
            </a>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold mb-6 text-[rgb(var(--primary))]">Najbliższe wydarzenie</h3>
              {wyjazdy[0] && (
                <>
                  <h4 className="font-bold text-xl mb-4">{wyjazdy[0].tytul}</h4>
                  {wyjazdy[0].opis && (
                    <p className="text-gray-700 mb-6">{wyjazdy[0].opis}</p>
                  )}
            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-3 text-[rgb(var(--primary))]" />
                      <span>{wyjazdy[0].miejsce}</span>
              </div>
              <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-3 text-[rgb(var(--primary))]" />
                      <span>{formatDate(wyjazdy[0].data_rozpoczecia)} - {formatDate(wyjazdy[0].data_zakonczenia)}</span>
              </div>
                    {wyjazdy[0].kwota > 0 && (
              <div className="flex items-center">
                        <Wallet className="h-5 w-5 mr-3 text-[rgb(var(--primary))]" />
                        <span>Koszt: {wyjazdy[0].kwota} zł</span>
              </div>
                    )}
            </div>
            <a
                    href="https://www.facebook.com/lesnaszkolka/?locale=pl_PL"
                    target="_blank"
                    rel="noopener noreferrer"
              className="inline-block bg-[rgb(var(--primary))] hover:bg-[rgb(var(--primary-dark))] text-white px-6 py-3 rounded-md transition-colors"
            >
              Szczegóły i zapisy
            </a>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Brak zaplanowanych wydarzeń</h3>
            <p className="text-gray-600">Sprawdź ponownie wkrótce lub skontaktuj się z nami, aby dowiedzieć się więcej o nadchodzących wydarzeniach.</p>
        </div>
        )}
      </div>
    </section>
  )
}
