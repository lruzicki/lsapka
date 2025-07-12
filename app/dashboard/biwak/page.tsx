"use client"

import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  User, 
  Users2, 
  CheckCircle,
  ExternalLink,
  Droplets,
  Utensils,
  Package,
  Trash2,
  DollarSign,
  Download
} from "lucide-react"

export default function BiwakPage() {
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const [formData, setFormData] = useState({
    termin: '',
    miejsce: '',
    odjazd: '',
    przyjazd: '',
    maxOsob: '',
    druzyny: '',
    osobaOdpowiedzialna: '',
    opiekunowie: '',
    osobyPelnnoletnie: '',
    transportZgloszony: false,
    transportOsob: '',
    koszt: '',
    numeryKontaktowe: ''
  })

  const [checklist, setChecklist] = useState({
    woda: false,
    jedzenie: false,
    transportRzeczy: false,
    workiSmieci: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/biwak', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          checklist,
          submittedBy: user?.name,
          submittedByEmail: user?.email
        }),
      })

      if (!response.ok) throw new Error('Failed to send biwak notification')
      
      setSubmitStatus('success')
      setFormData({
        termin: '',
        miejsce: '',
        odjazd: '',
        przyjazd: '',
        maxOsob: '',
        druzyny: '',
        osobaOdpowiedzialna: '',
        opiekunowie: '',
        osobyPelnnoletnie: '',
        transportZgloszony: false,
        transportOsob: '',
        koszt: '',
        numeryKontaktowe: ''
      })
      setChecklist({
        woda: false,
        jedzenie: false,
        transportRzeczy: false,
        workiSmieci: false
      })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGenerateCard = async () => {
    // Validation
    const requiredFields = ['termin', 'miejsce', 'odjazd', 'przyjazd', 'maxOsob', 'druzyny', 'osobaOdpowiedzialna', 'opiekunowie', 'numeryKontaktowe', 'koszt'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      alert(`Proszę uzupełnić wszystkie wymagane pola: ${missingFields.join(', ')}`);
      return;
    }

    try {
      const response = await fetch('/api/biwak/generate-card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `biwak-${formData.termin}-${formData.miejsce}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error('Error generating card:', error)
    }
  }

  const transportLinks = [
    { name: 'SKM', url: 'https://www.skm.pkp.pl/', icon: '🚆' },
    { name: 'PKP', url: 'https://rozklad-pkp.pl/', icon: '🚂' },
    { name: 'E-podróżnik', url: 'https://www.e-podroznik.pl/', icon: '🚌' }
  ]

  const shouldShowTransportCheckbox = parseInt(formData.maxOsob) > 25

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Zgłoszenie biwaku</h1>
        <p className="text-gray-600">Wypełnij formularz, aby zgłosić biwak. Zgłoszenie powinno nastąpić nie później niż na 1 tydzień przed wyjazdem.</p>
      </div>

      <div className="space-y-8">
        {/* Formularz główny */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold mb-6">Informacje o biwaku</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Termin biwaku
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.termin}
                    onChange={(e) => setFormData({ ...formData, termin: e.target.value })}
                    className="w-48 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    Miejsce biwaku
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.miejsce}
                    onChange={(e) => setFormData({ ...formData, miejsce: e.target.value })}
                    className="w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent"
                    placeholder="np. Las miejski, ul. Leśna 5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Clock className="inline h-4 w-4 mr-1" />
                    Miejsce i godzina odjazdu
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.odjazd}
                    onChange={(e) => setFormData({ ...formData, odjazd: e.target.value })}
                    className="w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent"
                    placeholder="Gdynia, Dworzec Główny PKP, 12:20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Clock className="inline h-4 w-4 mr-1" />
                    Miejsce i godzina przyjazdu
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.przyjazd}
                    onChange={(e) => setFormData({ ...formData, przyjazd: e.target.value })}
                    className="w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent"
                    placeholder="Gdańsk, kasy na Oliwa SKM, 19:50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Users className="inline h-4 w-4 mr-1" />
                    Maksymalna ilość osób
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.maxOsob}
                    onChange={(e) => setFormData({ ...formData, maxOsob: e.target.value })}
                    className="w-32 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent"
                    placeholder="np. 25"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <DollarSign className="inline h-4 w-4 mr-1" />
                    Koszt biwaku
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.koszt}
                    onChange={(e) => setFormData({ ...formData, koszt: e.target.value })}
                    className="w-32 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent"
                    placeholder="np. 150 zł"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Users2 className="inline h-4 w-4 mr-1" />
                    Drużyna/y
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.druzyny}
                    onChange={(e) => setFormData({ ...formData, druzyny: e.target.value })}
                    className="w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent"
                    placeholder="np. 1. GDH Leśne Wilki"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <User className="inline h-4 w-4 mr-1" />
                    Osoba odpowiedzialna
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.osobaOdpowiedzialna}
                    onChange={(e) => setFormData({ ...formData, osobaOdpowiedzialna: e.target.value })}
                    className="w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent"
                    placeholder="stopień, imię, nazwisko, ksywka"
                  />
                  <p className="text-xs text-gray-500 mt-1">Zaleca się, aby osobą odpowiedzialną był członek zwyczajny Kręgu</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Users2 className="inline h-4 w-4 mr-1" />
                    Opiekunowie
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.opiekunowie}
                    onChange={(e) => setFormData({ ...formData, opiekunowie: e.target.value })}
                    className="w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent"
                    placeholder="stopień, imię, nazwisko, ksywka"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Users2 className="inline h-4 w-4 mr-1" />
                    Osoby pełnoletnie (opcjonalne)
                  </label>
                  <input
                    type="text"
                    value={formData.osobyPelnnoletnie}
                    onChange={(e) => setFormData({ ...formData, osobyPelnnoletnie: e.target.value })}
                    className="w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent"
                    placeholder="stopień, imię, nazwisko, ksywka"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Users className="inline h-4 w-4 mr-1" />
                    Numery kontaktowe
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.numeryKontaktowe}
                    onChange={(e) => setFormData({ ...formData, numeryKontaktowe: e.target.value })}
                    className="w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent"
                    placeholder="np. 000 000 000"
                  />
                </div>
              </div>

              {/* Checklista */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold mb-6">Checklista biwakowa</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="woda"
                      checked={checklist.woda}
                      onChange={(e) => setChecklist({ ...checklist, woda: e.target.checked })}
                      className="mr-3"
                    />
                    <label htmlFor="woda" className="flex items-center text-sm">
                      <Droplets className="h-4 w-4 mr-2 text-blue-500" />
                      Woda
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="jedzenie"
                      checked={checklist.jedzenie}
                      onChange={(e) => setChecklist({ ...checklist, jedzenie: e.target.checked })}
                      className="mr-3"
                    />
                    <label htmlFor="jedzenie" className="flex items-center text-sm">
                      <Utensils className="h-4 w-4 mr-2 text-orange-500" />
                      Jedzenie
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="transportRzeczy"
                      checked={checklist.transportRzeczy}
                      onChange={(e) => setChecklist({ ...checklist, transportRzeczy: e.target.checked })}
                      className="mr-3"
                    />
                    <label htmlFor="transportRzeczy" className="flex items-center text-sm">
                      <Package className="h-4 w-4 mr-2 text-green-500" />
                      Transport rzeczy
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="workiSmieci"
                      checked={checklist.workiSmieci}
                      onChange={(e) => setChecklist({ ...checklist, workiSmieci: e.target.checked })}
                      className="mr-3"
                    />
                    <label htmlFor="workiSmieci" className="flex items-center text-sm">
                      <Trash2 className="h-4 w-4 mr-2 text-gray-500" />
                      Worki na śmieci
                    </label>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-sm mb-2">Postęp przygotowań:</h3>
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                      <div 
                        className="bg-[rgb(var(--primary))] h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${Object.values(checklist).filter(Boolean).length / Object.keys(checklist).length * 100}%` 
                        }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">
                      {Object.values(checklist).filter(Boolean).length}/{Object.keys(checklist).length}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Transport */}
            <div className="border-t pt-6">
              <h3 className="text-md font-semibold mb-4">Transport</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {shouldShowTransportCheckbox && (
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.transportZgloszony}
                        onChange={(e) => setFormData({ ...formData, transportZgloszony: e.target.checked })}
                        className="mr-2"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Transport zgłoszony (wymagane dla grup &gt;25 osób)
                      </span>
                    </label>
                  </div>
                )}
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-3">Przydatne linki do transportu:</p>
                <div className="flex flex-wrap gap-2">
                  {transportLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm transition-colors"
                    >
                      <span>{link.icon}</span>
                      {link.name}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Wysyłanie...' : 'Wyślij zgłoszenie biwaku'}
              </button>

              <button
                type="button"
                onClick={handleGenerateCard}
                disabled={!formData.termin || !formData.miejsce}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-md transition-colors disabled:opacity-50"
              >
                <Download className="h-4 w-4" />
                Generuj kartę PDF
              </button>
            </div>

            {submitStatus === 'success' && (
              <p className="text-green-600 text-center">Zgłoszenie zostało wysłane!</p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-600 text-center">Wystąpił błąd podczas wysyłania zgłoszenia.</p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
} 