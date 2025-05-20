export default function StatuteSection() {
  return (
    <section id="statut" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Statut</h2>
          <div className="w-20 h-1 bg-[rgb(var(--primary))] mx-auto mb-8"></div>
          <p className="text-lg text-gray-700">
            Zapoznaj się ze statutem Niezależnego Kręgu Instruktorów Harcerskich „Leśna Szkółka".
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="pdf-viewer">
            {/* Tutaj będzie osadzony PDF - na razie placeholder */}
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <p className="text-gray-500">Podgląd statutu w formacie PDF</p>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <a
              href="/documents/statut.pdf"
              download
              className="bg-[rgb(var(--primary))] hover:bg-[rgb(var(--primary-dark))] text-white px-6 py-3 rounded-md transition-colors flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-download mr-2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              Pobierz statut
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
