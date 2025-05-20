"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Download, Eye } from "lucide-react"

// Dane przykładowe dla karuzeli i listy
const zasiewyData = [
  {
    id: 1,
    year: 2024,
    number: 1,
    title: "Zasiewy 1/2024",
    coverImage: "/placeholder.svg?height=400&width=300",
    pdfUrl: "/documents/zasiewy/2024_1.pdf",
  },
  {
    id: 2,
    year: 2023,
    number: 3,
    title: "Zasiewy 3/2023",
    coverImage: "/placeholder.svg?height=400&width=300",
    pdfUrl: "/documents/zasiewy/2023_3.pdf",
  },
  {
    id: 3,
    year: 2023,
    number: 2,
    title: "Zasiewy 2/2023",
    coverImage: "/placeholder.svg?height=400&width=300",
    pdfUrl: "/documents/zasiewy/2023_2.pdf",
  },
  {
    id: 4,
    year: 2023,
    number: 1,
    title: "Zasiewy 1/2023",
    coverImage: "/placeholder.svg?height=400&width=300",
    pdfUrl: "/documents/zasiewy/2023_1.pdf",
  },
  {
    id: 5,
    year: 2022,
    number: 3,
    title: "Zasiewy 3/2022",
    coverImage: "/placeholder.svg?height=400&width=300",
    pdfUrl: "/documents/zasiewy/2022_3.pdf",
  },
  {
    id: 6,
    year: 2022,
    number: 2,
    title: "Zasiewy 2/2022",
    coverImage: "/placeholder.svg?height=400&width=300",
    pdfUrl: "/documents/zasiewy/2022_2.pdf",
  },
  {
    id: 7,
    year: 2022,
    number: 1,
    title: "Zasiewy 1/2022",
    coverImage: "/placeholder.svg?height=400&width=300",
    pdfUrl: "/documents/zasiewy/2022_1.pdf",
  },
  {
    id: 8,
    year: 2021,
    number: 3,
    title: "Zasiewy 3/2021",
    coverImage: "/placeholder.svg?height=400&width=300",
    pdfUrl: "/documents/zasiewy/2021_3.pdf",
  },
  {
    id: 9,
    year: 2021,
    number: 2,
    title: "Zasiewy 2/2021",
    coverImage: "/placeholder.svg?height=400&width=300",
    pdfUrl: "/documents/zasiewy/2021_2.pdf",
  },
  {
    id: 10,
    year: 2021,
    number: 1,
    title: "Zasiewy 1/2021",
    coverImage: "/placeholder.svg?height=400&width=300",
    pdfUrl: "/documents/zasiewy/2021_1.pdf",
  },
  {
    id: 11,
    year: 2020,
    number: 3,
    title: "Zasiewy 3/2020",
    coverImage: "/placeholder.svg?height=400&width=300",
    pdfUrl: "/documents/zasiewy/2020_3.pdf",
  },
  {
    id: 12,
    year: 2020,
    number: 2,
    title: "Zasiewy 2/2020",
    coverImage: "/placeholder.svg?height=400&width=300",
    pdfUrl: "/documents/zasiewy/2020_2.pdf",
  },
  {
    id: 13,
    year: 2020,
    number: 1,
    title: "Zasiewy 1/2020",
    coverImage: "/placeholder.svg?height=400&width=300",
    pdfUrl: "/documents/zasiewy/2020_1.pdf",
  },
  {
    id: 14,
    year: 2019,
    number: 3,
    title: "Zasiewy 3/2019",
    coverImage: "/placeholder.svg?height=400&width=300",
    pdfUrl: "/documents/zasiewy/2019_3.pdf",
  },
  {
    id: 15,
    year: 2019,
    number: 2,
    title: "Zasiewy 2/2019",
    coverImage: "/placeholder.svg?height=400&width=300",
    pdfUrl: "/documents/zasiewy/2019_2.pdf",
  },
  {
    id: 16,
    year: 2019,
    number: 1,
    title: "Zasiewy 1/2019",
    coverImage: "/placeholder.svg?height=400&width=300",
    pdfUrl: "/documents/zasiewy/2019_1.pdf",
  },
]

export default function ZasiewyPage() {
  // Stan dla karuzeli
  const [currentSlide, setCurrentSlide] = useState(0)
  const carouselItems = zasiewyData.slice(0, 5) // Pokazujemy 5 najnowszych wydań w karuzeli

  // Stan dla paginacji
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const totalPages = Math.ceil(zasiewyData.length / itemsPerPage)

  // Funkcje dla karuzeli
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1))
  }

  // Funkcje dla paginacji
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Obliczanie elementów do wyświetlenia na bieżącej stronie
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = zasiewyData.slice(indexOfFirstItem, indexOfLastItem)

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      <section className="pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Zasiewy</h1>
            <div className="w-20 h-1 bg-[rgb(var(--primary))] mx-auto mb-8"></div>
            <p className="text-lg text-gray-700">
              „Zasiewy" to nasza gazetka, w której publikujemy artykuły, relacje z wydarzeń i materiały metodyczne.
              Poniżej znajdziesz archiwalne numery z ostatnich kilkunastu lat.
            </p>
          </div>

          {/* Karuzela */}
          <div className="relative bg-white rounded-lg shadow-md p-8 mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Najnowsze wydania</h2>

            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {carouselItems.map((item, index) => (
                  <div key={item.id} className="w-full flex-shrink-0 px-4">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="relative w-full md:w-1/3 aspect-[3/4] cursor-pointer group">
                        <Link href={item.pdfUrl} target="_blank">
                          <Image
                            src={item.coverImage || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover rounded-lg shadow-md group-hover:opacity-90 transition-opacity"
                          />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 rounded-lg">
                            <Eye className="w-12 h-12 text-white" />
                          </div>
                        </Link>
                      </div>
                      <div className="w-full md:w-2/3">
                        <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                        <p className="text-gray-600 mb-6">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus
                          hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh
                          porttitor.
                        </p>
                        <div className="flex gap-4">
                          <Link
                            href={item.pdfUrl}
                            target="_blank"
                            className="flex items-center gap-2 bg-[rgb(var(--primary))] text-white px-4 py-2 rounded-md hover:bg-[rgb(var(--primary-dark))] transition-colors"
                          >
                            <Eye size={18} />
                            <span>Czytaj online</span>
                          </Link>
                          <Link
                            href={item.pdfUrl}
                            download
                            className="flex items-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                          >
                            <Download size={18} />
                            <span>Pobierz PDF</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Przyciski nawigacyjne */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md z-10"
              aria-label="Poprzedni slajd"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md z-10"
              aria-label="Następny slajd"
            >
              <ChevronRight size={24} />
            </button>

            {/* Wskaźniki slajdów */}
            <div className="flex justify-center gap-2 mt-6">
              {carouselItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentSlide === index ? "bg-[rgb(var(--primary))]" : "bg-gray-300"
                  }`}
                  aria-label={`Przejdź do slajdu ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Lista wszystkich wydań z paginacją */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-8 text-center">Archiwum Zasiewów</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentItems.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-lg p-4 flex flex-col">
                  <div className="relative aspect-[3/4] mb-4 cursor-pointer group">
                    <Link href={item.pdfUrl} target="_blank">
                      <Image
                        src={item.coverImage || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover rounded-lg shadow-sm group-hover:opacity-90 transition-opacity"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 rounded-lg">
                        <Eye className="w-8 h-8 text-white" />
                      </div>
                    </Link>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <div className="mt-auto flex justify-between items-center">
                    <Link
                      href={item.pdfUrl}
                      target="_blank"
                      className="text-[rgb(var(--primary))] hover:underline flex items-center gap-1"
                    >
                      <Eye size={16} />
                      <span>Czytaj</span>
                    </Link>
                    <Link
                      href={item.pdfUrl}
                      download
                      className="text-[rgb(var(--primary))] hover:underline flex items-center gap-1"
                    >
                      <Download size={16} />
                      <span>Pobierz</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Paginacja */}
            <div className="flex justify-center mt-8">
              <nav className="flex items-center gap-1">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-md ${
                    currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"
                  }`}
                  aria-label="Poprzednia strona"
                >
                  <ChevronLeft size={20} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-md ${
                      currentPage === page ? "bg-[rgb(var(--primary))] text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                    aria-label={`Strona ${page}`}
                    aria-current={currentPage === page ? "page" : undefined}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-md ${
                    currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"
                  }`}
                  aria-label="Następna strona"
                >
                  <ChevronRight size={20} />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
