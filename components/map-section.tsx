"use client"

import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface Druzyna {
  id: number
  nazwa: string
  opis: string
  link: string
  miasto: string
  dzielnica: string
  dokladny_adres: string
  pinezka: string
}

interface DruzynyGrouped {
  [pinezka: string]: Druzyna[]
}

export default function MapSection() {
  const mapRef = useRef<L.Map | null>(null)
  const [druzyny, setDruzyny] = useState<DruzynyGrouped>({})
  const [loading, setLoading] = useState(true)
  const [expandedPinezka, setExpandedPinezka] = useState<string | null>(null)
  const [expandedDruzyna, setExpandedDruzyna] = useState<number | null>(null)

  const fetchDruzyny = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'}/druzyny`)
      if (response.ok) {
        const data = await response.json()
        setDruzyny(data)
      }
    } catch (error) {
      console.error('Błąd podczas pobierania drużyn:', error)
    } finally {
      setLoading(false)
    }
  }

  const togglePinezka = (pinezka: string) => {
    setExpandedPinezka(expandedPinezka === pinezka ? null : pinezka)
  }

  const toggleDruzyna = (druzynaId: number) => {
    setExpandedDruzyna(expandedDruzyna === druzynaId ? null : druzynaId)
  }

  // Funkcja do parsowania koordynatów z pola pinezka
  const parseCoordinates = (pinezka: string): { lat: number; lng: number } | null => {
    try {
      const coords = pinezka.split(',').map(coord => parseFloat(coord.trim()))
      if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
        return { lat: coords[0], lng: coords[1] }
      }
    } catch (error) {
      console.error('Błąd parsowania koordynatów:', pinezka)
    }
    return null
  }

  // Funkcja do centrowania mapy na pinezce
  const centerOnPinezka = (pinezka: string) => {
    if (mapRef.current) {
      const coords = parseCoordinates(pinezka)
      if (coords) {
        mapRef.current.setView([coords.lat, coords.lng], 15)
      }
    }
  }

  useEffect(() => {
    fetchDruzyny()
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && Object.keys(druzyny).length > 0) {
      // Fix for Leaflet icon issues in Next.js
      const L = require('leaflet')
      delete L.Icon.Default.prototype._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: '/images/marker-icon-2x.png',
        iconUrl: '/images/marker-icon.png',
        shadowUrl: '/images/marker-shadow.png',
      })

      if (!mapRef.current) {
        // Initialize map with default center (Gdańsk/Gdynia area)
        mapRef.current = L.map('map').setView([54.4, 18.5], 11)

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapRef.current)

        // Create custom icon
        const customIcon = L.icon({
          iconUrl: '/images/marker-icon.png',
          iconRetinaUrl: '/images/marker-icon-2x.png',
          iconSize: [25, 25],
          iconAnchor: [12, 12],
          popupAnchor: [0, -12],
        })

        // Add markers for each pinezka with coordinates
        Object.entries(druzyny).forEach(([pinezka, druzynyList]) => {
          const coords = parseCoordinates(pinezka)
          if (coords) {
            const druzynyNames = druzynyList.map(d => d.nazwa).join('<br>')
            const popupContent = `
              <div style="text-align: center;">
                <strong>${pinezka}</strong><br>
                ${druzynyNames}
              </div>
            `
            
            L.marker([coords.lat, coords.lng], { icon: customIcon })
              .addTo(mapRef.current!)
              .bindPopup(popupContent)
          }
        })

        // Set map bounds based on actual coordinates
        const allCoords = Object.keys(druzyny)
          .map(pinezka => parseCoordinates(pinezka))
          .filter(coords => coords !== null) as { lat: number; lng: number }[]

        if (allCoords.length > 0 && mapRef.current) {
          const bounds = L.latLngBounds(allCoords)
          mapRef.current.fitBounds(bounds)
        }
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [druzyny])

  return (
    <section id="mapa" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Mapa drużyn</h2>
          <div className="w-20 h-1 bg-[rgb(var(--primary))] mx-auto mb-8"></div>
          <p className="text-lg text-gray-700">
            Znajdź nasze drużyny i kręgi instruktorskie w całej Polsce.
          </p>
        </div>

        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <div id="map" className="w-full h-[400px]" />
          
          <div className="p-8">
            <h3 className="text-xl font-bold mb-6">Nasze jednostki</h3>
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[rgb(var(--primary))]"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Object.entries(druzyny).map(([pinezka, druzynyList]) => {
                  // Sprawdź czy pinezka to koordynaty czy nazwa lokalizacji
                  const isCoordinates = pinezka.includes(',') && pinezka.split(',').length === 2
                  const locationName = isCoordinates 
                    ? `${druzynyList[0]?.miasto || ''}${druzynyList[0]?.dzielnica ? `, ${druzynyList[0].dzielnica}` : ''}`
                    : pinezka
                  
                  return (
                                          <div key={pinezka} className="space-y-3">
                        <div className="text-sm font-medium text-gray-600">{locationName}</div>
                        {druzynyList.slice(0, expandedPinezka === pinezka ? undefined : 3).map((druzyna) => (
                          <div key={druzyna.id} className="space-y-2">
                            <div 
                              className="flex items-start cursor-pointer transition-all duration-200 hover:scale-102"
                              onClick={() => centerOnPinezka(pinezka)}
                            >
                              <div className="h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 mr-4 transition-colors bg-gray-300 hover:bg-[rgb(var(--primary))]">
                                <span className="font-bold transition-colors text-gray-700 text-xs">
                                  {druzyna.nazwa.split(' ')[0]}
                                </span>
                              </div>
                              <div className="flex-1">
                                <h4 className="font-bold text-lg transition-colors text-gray-900">
                                  {druzyna.nazwa}
                                </h4>
                                <p className="text-sm text-gray-600">{druzyna.miasto}</p>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleDruzyna(druzyna.id)
                                }}
                                className="p-1 text-gray-400 hover:text-[rgb(var(--primary))] transition-colors"
                              >
                                <svg
                                  className={`w-4 h-4 transform transition-transform ${expandedDruzyna === druzyna.id ? 'rotate-180' : ''}`}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>
                            </div>
                            
                            {/* Rozwijane szczegóły */}
                            {expandedDruzyna === druzyna.id && (
                              <div className="ml-14 space-y-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                {druzyna.dzielnica && (
                                  <div>
                                    <span className="font-medium">Dzielnica:</span> {druzyna.dzielnica}
                                  </div>
                                )}
                                {druzyna.dokladny_adres && (
                                  <div>
                                    <span className="font-medium">Adres:</span> {druzyna.dokladny_adres}
                                  </div>
                                )}
                                {druzyna.opis && (
                                  <div>
                                    <span className="font-medium">Opis:</span> {druzyna.opis}
                                  </div>
                                )}
                                {druzyna.link && (
                                  <div>
                                    <span className="font-medium">Link:</span>{' '}
                                    <a 
                                      href={druzyna.link} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-[rgb(var(--primary))] hover:underline"
                                    >
                                      {druzyna.link}
                                    </a>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                        {druzynyList.length > 3 && (
                          <button
                            onClick={() => togglePinezka(pinezka)}
                            className="text-sm text-[rgb(var(--primary))] hover:underline"
                          >
                            {expandedPinezka === pinezka ? 'Pokaż mniej' : `Pokaż więcej (${druzynyList.length - 3})`}
                          </button>
                        )}
                      </div>
                    )
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
