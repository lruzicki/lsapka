import Image from "next/image"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-background.jpg"
          alt="Krąg harcerski wokół ogniska"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 hero-gradient"></div>
      </div>

      <div className="relative h-full flex flex-col justify-center items-center text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Niezależny Krąg Instruktorów Harcerskich</h1>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-8">„Leśna Szkółka"</h2>
        <p className="text-lg md:text-xl max-w-2xl mb-10">Trójmiejska organizacja harcerska</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="#o-nas"
            className="bg-[rgb(var(--primary))] hover:bg-[rgb(var(--primary-dark))] text-white px-8 py-3 rounded-md transition-colors text-lg"
          >
            Poznaj nas
          </Link>
        </div>
      </div>
    </section>
  )
}
