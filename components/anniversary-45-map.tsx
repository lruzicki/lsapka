"use client"

import { useEffect, useRef } from "react"
import "leaflet/dist/leaflet.css"

type Anniversary45MapProps = {
  lat: number
  lng: number
  label: string
}

export default function Anniversary45Map({ lat, lng, label }: Anniversary45MapProps) {
  const mapRef = useRef<import("leaflet").Map | null>(null)
  const mapIdRef = useRef(`anniversary-45-map-${Math.random().toString(36).slice(2, 10)}`)

  useEffect(() => {
    if (typeof window === "undefined" || mapRef.current) {
      return
    }

    let cancelled = false
    let mapInstance: import("leaflet").Map | null = null

    const initMap = async () => {
      const L = await import("leaflet")

      if (cancelled || mapRef.current) {
        return
      }

      delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "/images/marker-icon-2x.png",
        iconUrl: "/images/marker-icon.png",
      })

      mapInstance = L.map(mapIdRef.current, {
        scrollWheelZoom: false,
      }).setView([lat, lng], 15)

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance)

      L.marker([lat, lng]).addTo(mapInstance).bindPopup(label).openPopup()

      mapRef.current = mapInstance
    }

    void initMap()

    return () => {
      cancelled = true
      mapInstance?.remove()
      mapRef.current = null
    }
  }, [label, lat, lng])

  return <div id={mapIdRef.current} className="h-[320px] w-full" />
}
