"use client"

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import { units, mapBounds } from '@/lib/map-data'
import 'leaflet/dist/leaflet.css'

export default function MapSection() {
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Fix for Leaflet icon issues in Next.js
      const L = require('leaflet')
      delete L.Icon.Default.prototype._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: '/images/marker-icon-2x.png',
        iconUrl: '/images/marker-icon.png',
        shadowUrl: '/images/marker-shadow.png',
      })

      if (!mapRef.current) {
        // Initialize map
        mapRef.current = L.map('map').setView([
          (mapBounds.boundingBox.north + mapBounds.boundingBox.south) / 2,
          (mapBounds.boundingBox.east + mapBounds.boundingBox.west) / 2
        ], 11)

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapRef.current)

        // Create custom icon
        const customIcon = L.icon({
          iconUrl: '/images/marker-icon.png',
          iconRetinaUrl: '/images/marker-icon-2x.png',
          iconSize: [25, 25], // Zmniejszony rozmiar z 256x256
          iconAnchor: [12, 12], // Punkt zaczepienia (połowa rozmiaru)
          popupAnchor: [0, -12], // Punkt gdzie pojawia się popup (nad markerem)
        })

        // Add markers for each unit
        units.forEach(unit => {
          const marker = L.marker(
            [unit.coordinates.lat, unit.coordinates.lng],
            { icon: customIcon }
          )
            .addTo(mapRef.current!)
            .bindPopup(`<b>${unit.unit.name}</b>`)
        })

        // Set map bounds
        mapRef?.current?.fitBounds([
          [mapBounds.boundingBox.north, mapBounds.boundingBox.east],
          [mapBounds.boundingBox.south, mapBounds.boundingBox.west]
        ])
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

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
            <h3 className="text-xl font-bold mb-6">Nasze lokalizacje</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {units.map((unit, index) => (
                <div key={unit.unit.number} className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-[rgb(var(--primary))] flex items-center justify-center flex-shrink-0 mr-4">
                    <span className="text-white font-bold">{unit.unit.number}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{unit.unit.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
