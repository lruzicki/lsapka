"use client"

import { useState, useEffect } from "react"
import { Users, Shield, FileText } from "lucide-react"
import Link from "next/link"

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

export default function AboutSection() {
  const [komenda, setKomenda] = useState<Komenda[]>([])
  const [komisja, setKomisja] = useState<KomisjaRewizyjna[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [komendaResponse, komisjaResponse] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'}/komenda`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'}/komisja-rewizyjna`)
      ])

      if (komendaResponse.ok) {
        const komendaData = await komendaResponse.json()
        setKomenda(komendaData)
      }

      if (komisjaResponse.ok) {
        const komisjaData = await komisjaResponse.json()
        setKomisja(komisjaData)
      }
    } catch (error) {
      console.error('Błąd podczas pobierania danych:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="o-nas" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">O nas</h2>
          <div className="w-20 h-1 bg-[rgb(var(--primary))] mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 mb-6">
            Początków Kręgu można upatrywać w kursie instruktorskim Leśna Szkółka, prowadzonym przez hm. Jerzego Gacha w
            dniach 25 czerwca-16 lipca 1981, w ramach obozu ZHP w Wygoninie.
          </p>
          <p className="text-lg text-gray-700">
            Nazwa kursu był dosłownym tłumaczeniem kryptonimiu czeskich leśnych kursów instruktorskich - Lesní Škola. Od
            tego czasu kontynuujemy tradycje leśnych kursów, kształcąc kolejne pokolenia instruktorów harcerskich.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="w-16 h-16 bg-[rgba(var(--primary),0.1)] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgb(var(--primary))"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-trees"
              >
                <path d="M10 10v.2A3 3 0 0 1 8.9 16v0H5v0h0a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z" />
                <path d="M7 16v6" />
                <path d="M13 19v3" />
                <path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-4 4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4">Puszczaństwo</h3>
            <p className="text-gray-600">
              Rozwijamy umiejętności życia w zgodzie z naturą, uczymy szacunku do przyrody i kształtujemy postawę
              odpowiedzialności za środowisko naturalne.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="w-16 h-16 bg-[rgba(var(--primary),0.1)] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgb(var(--primary))"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-users"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4">Społeczeństwo</h3>
            <p className="text-gray-600">
              Kształtujemy postawy obywatelskie, uczymy współpracy i odpowiedzialności za wspólnotę, przygotowując
              młodych ludzi do aktywnego udziału w życiu społecznym.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="w-16 h-16 bg-[rgba(var(--primary),0.1)] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgb(var(--primary))"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-flag"
              >
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                <line x1="4" x2="4" y1="22" y2="15" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4">Tożsamość narodowa</h3>
            <p className="text-gray-600">
              Pielęgnujemy polskie tradycje i historię, budujemy świadomość narodową i patriotyzm, ucząc szacunku do
              symboli narodowych i bohaterów.
            </p>
          </div>
        </div>

        {/* Komenda i Komisja Rewizyjna */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[rgba(var(--primary),0.1)] rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-[rgb(var(--primary))]" />
              </div>
              <h3 className="text-2xl font-bold">Komenda</h3>
            </div>
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[rgb(var(--primary))]"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {komenda.map((member) => (
                  <div key={member.id} className="border-l-4 border-[rgb(var(--primary))] pl-4">
                    <h4 className="font-bold text-lg">
                      {member.stopien}. {member.imie} {member.nazwisko}
                      {member.ksywka && (
                        <span className="text-gray-600 font-normal"> "{member.ksywka}"</span>
                      )}
                    </h4>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[rgba(var(--primary),0.1)] rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-[rgb(var(--primary))]" />
              </div>
              <h3 className="text-2xl font-bold">Komisja Rewizyjna</h3>
            </div>
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[rgb(var(--primary))]"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {komisja.map((member) => (
                  <div key={member.id} className="border-l-4 border-[rgb(var(--primary))] pl-4">
                    <h4 className="font-bold text-lg">
                      {member.stopien}. {member.imie} {member.nazwisko}
                      {member.ksywka && (
                        <span className="text-gray-600 font-normal"> "{member.ksywka}"</span>
                      )}
                    </h4>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Informacja o dokumentach */}
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="h-8 w-8 text-[rgb(var(--primary))]" />
            <h3 className="text-xl font-bold">Więcej informacji</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Statut, regulaminy i wszystkie dokumenty dostępne w zakładce "Dokumenty".
          </p>
          <a
            href="https://nkihlesnaszkolka.sharepoint.com/:f:/s/NKIHLS-dokumentypubliczne/ErDdWMWDSFlDmXxJayyzJMsBkeRIuZovo3a6dhdwezUh2w?e=9VTkpQ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[rgb(var(--primary))] hover:bg-[rgb(var(--primary-dark))] text-white px-4 py-2 rounded-md transition-colors"
          >
            Zobacz dokumenty
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
