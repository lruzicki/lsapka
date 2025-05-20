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
          <Link
            href="/galeria"
            className="bg-transparent border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] hover:bg-[rgba(var(--primary),0.1)] px-6 py-3 rounded-md transition-colors"
          >
            Zobacz więcej zdjęć
          </Link>
        </div>
      </div>
    </section>
  )
}
