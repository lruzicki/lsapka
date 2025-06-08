import Image from "next/image"
import Link from "next/link"

export default function GallerySection() {
  return (
    <section id="galeria" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Galeria</h2>
          <div className="w-20 h-1 bg-[rgb(var(--primary))] mx-auto mb-8"></div>
          <p className="text-lg text-gray-700">Zobacz zdjęcia z naszych wydarzeń, obozów i kursów instruktorskich.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=500&width=500"
              alt="Krąg harcerski wokół ogniska"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=500&width=500"
              alt="Ceremonia wręczenia nagród"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=500&width=500"
              alt="Zdjęcie z obozu"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=500&width=500"
              alt="Zdjęcie z obozu"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        <div className="text-center mt-10">
          <a
            href="https://www.instagram.com/lesnaszkolka/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] hover:bg-[rgba(var(--primary),0.1)] px-6 py-3 rounded-md transition-colors inline-flex items-center gap-2"
          >
            <span>Zobacz więcej zdjęć na Instagramie</span>
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
              className="lucide lucide-instagram"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
