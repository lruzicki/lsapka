import Link from "next/link"

export default function ZasiewySection() {
  return (
    <section id="zasiewy" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Zasiewy</h2>
          <div className="w-20 h-1 bg-[rgb(var(--primary))] mx-auto mb-8"></div>
          <p className="text-lg text-gray-700">
            „Zasiewy" to nasza gazetka, w której publikujemy artykuły, relacje z wydarzeń i materiały metodyczne.
            Poniżej znajdziesz archiwalne numery z ostatnich kilkunastu lat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[2024, 2023, 2022, 2021, 2020, 2019].map((year) => (
            <div key={year} className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4">Zasiewy {year}</h3>
              <ul className="space-y-3">
                <li className="flex justify-between items-center">
                  <span>Numer 1/{year}</span>
                  <div className="flex space-x-2">
                    <Link
                      href={`#view-zasiewy-${year}-1`}
                      className="text-[rgb(var(--primary))] hover:underline flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-eye mr-1"
                      >
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      Czytaj
                    </Link>
                    <Link
                      href={`/documents/zasiewy/${year}_1.pdf`}
                      className="text-[rgb(var(--primary))] hover:underline flex items-center"
                      download
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-download mr-1"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" x2="12" y1="15" y2="3" />
                      </svg>
                      Pobierz
                    </Link>
                  </div>
                </li>
                <li className="flex justify-between items-center">
                  <span>Numer 2/{year}</span>
                  <div className="flex space-x-2">
                    <Link
                      href={`#view-zasiewy-${year}-2`}
                      className="text-[rgb(var(--primary))] hover:underline flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-eye mr-1"
                      >
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      Czytaj
                    </Link>
                    <Link
                      href={`/documents/zasiewy/${year}_2.pdf`}
                      className="text-[rgb(var(--primary))] hover:underline flex items-center"
                      download
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-download mr-1"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" x2="12" y1="15" y2="3" />
                      </svg>
                      Pobierz
                    </Link>
                  </div>
                </li>
                <li className="flex justify-between items-center">
                  <span>Numer 3/{year}</span>
                  <div className="flex space-x-2">
                    <Link
                      href={`#view-zasiewy-${year}-3`}
                      className="text-[rgb(var(--primary))] hover:underline flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-eye mr-1"
                      >
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      Czytaj
                    </Link>
                    <Link
                      href={`/documents/zasiewy/${year}_3.pdf`}
                      className="text-[rgb(var(--primary))] hover:underline flex items-center"
                      download
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-download mr-1"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" x2="12" y1="15" y2="3" />
                      </svg>
                      Pobierz
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="#wszystkie-zasiewy"
            className="bg-transparent border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] hover:bg-[rgba(var(--primary),0.1)] px-6 py-3 rounded-md transition-colors inline-block"
          >
            Zobacz wszystkie numery
          </Link>
        </div>
      </div>
    </section>
  )
}
