import Link from "next/link"

export default function EventsSection() {
  return (
    <section id="wydarzenia" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Wydarzenia</h2>
          <div className="w-20 h-1 bg-[rgb(var(--primary))] mx-auto mb-8"></div>
          <p className="text-lg text-gray-700">
            Organizujemy kursy, warsztaty, obozy i inne wydarzenia dla harcerzy i instruktorów. Sprawdź nasze
            nadchodzące wydarzenia i dołącz do nas!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold mb-6 text-[rgb(var(--primary))]">Kalendarz</h3>
            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0 w-16 h-16 bg-[rgba(var(--primary),0.1)] rounded-lg flex flex-col items-center justify-center mr-4">
                  <span className="font-bold text-[rgb(var(--primary))]">15</span>
                  <span className="text-sm text-gray-600">Cze</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Obóz letni "Leśne Wędrówki"</h4>
                  <p className="text-gray-600">15-30 czerwca 2025, Puszcza Kampinoska</p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 w-16 h-16 bg-[rgba(var(--primary),0.1)] rounded-lg flex flex-col items-center justify-center mr-4">
                  <span className="font-bold text-[rgb(var(--primary))]">10</span>
                  <span className="text-sm text-gray-600">Wrz</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Rozpoczęcie roku harcerskiego</h4>
                  <p className="text-gray-600">10 września 2025, Warszawa</p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 w-16 h-16 bg-[rgba(var(--primary),0.1)] rounded-lg flex flex-col items-center justify-center mr-4">
                  <span className="font-bold text-[rgb(var(--primary))]">11</span>
                  <span className="text-sm text-gray-600">Lis</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Święto Niepodległości - uroczysty apel</h4>
                  <p className="text-gray-600">11 listopada 2025, Warszawa</p>
                </div>
              </div>
            </div>
            <Link
              href="/wydarzenia"
              className="inline-block mt-8 text-[rgb(var(--primary))] font-medium hover:underline"
            >
              Zobacz pełen kalendarz →
            </Link>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold mb-6 text-[rgb(var(--primary))]">Najbliższe wydarzenie</h3>
            <h4 className="font-bold text-xl mb-4">Obóz letni "Leśne Wędrówki"</h4>
            <p className="text-gray-700 mb-6">
              Zapraszamy wszystkich harcerzy na obóz letni, który odbędzie się w dniach 15-30 czerwca 2025 roku w
              Puszczy Kampinoskiej. W programie: wędrówki, zajęcia survivalowe, warsztaty rzemiosła, ogniska i wiele
              innych atrakcji!
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgb(var(--primary))"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-map-pin mr-3"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Puszcza Kampinoska, Polska</span>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgb(var(--primary))"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-calendar-days mr-3"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                  <path d="M8 14h.01" />
                  <path d="M12 14h.01" />
                  <path d="M16 14h.01" />
                  <path d="M8 18h.01" />
                  <path d="M12 18h.01" />
                  <path d="M16 18h.01" />
                </svg>
                <span>15-30 czerwca 2025</span>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgb(var(--primary))"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-wallet mr-3"
                >
                  <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                  <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                  <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                </svg>
                <span>Koszt: 1200 zł</span>
              </div>
            </div>
            <Link
              href="/wydarzenia/oboz-letni-2025"
              className="inline-block bg-[rgb(var(--primary))] hover:bg-[rgb(var(--primary-dark))] text-white px-6 py-3 rounded-md transition-colors"
            >
              Szczegóły i zapisy
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
