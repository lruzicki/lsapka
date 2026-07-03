"use client"

import { FormEvent, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, LockKeyhole, MapPinned } from "lucide-react"
import Footer from "@/components/footer"
import Anniversary45Map from "@/components/anniversary-45-map"
import { Separator } from "@/components/ui/separator"

type EncryptedResponse = {
  salt: string
  iv: string
  ciphertext: string
}

type AnniversaryContent = {
  title: string
  intro: string
  body: string[]
  schedule: Array<{ label: string; value: string }>
  venue: {
    name: string
    address: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  hero_image: {
    src: string
    alt: string
  }
  gallery: Array<{
    src: string
    alt: string
  }>
}

function decodeBase64(value: string) {
  return Uint8Array.from(atob(value), (char) => char.charCodeAt(0))
}

async function decryptPayload(password: string, payload: EncryptedResponse): Promise<AnniversaryContent> {
  const encoder = new TextEncoder()
  const keyMaterial = await window.crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, [
    "deriveKey",
  ])

  const key = await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: decodeBase64(payload.salt),
      iterations: 120000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"],
  )

  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: decodeBase64(payload.iv),
      tagLength: 128,
    },
    key,
    decodeBase64(payload.ciphertext),
  )

  return JSON.parse(new TextDecoder().decode(decrypted)) as AnniversaryContent
}

export default function Anniversary45Page() {
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [content, setContent] = useState<AnniversaryContent | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const gallery = content?.gallery ?? []
  const currentImage = useMemo(() => gallery[currentSlide] ?? null, [currentSlide, gallery])
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001"

  const nextSlide = () => {
    if (gallery.length < 2) {
      return
    }

    setCurrentSlide((prev) => (prev + 1) % gallery.length)
  }

  const prevSlide = () => {
    if (gallery.length < 2) {
      return
    }

    setCurrentSlide((prev) => (prev - 1 + gallery.length) % gallery.length)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch(`${apiUrl}/anniversary/45`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.detail || "Nie udało się odblokować strony.")
      }

      const encrypted = (await response.json()) as EncryptedResponse
      const decrypted = await decryptPayload(password, encrypted)

      setContent(decrypted)
      setCurrentSlide(0)
      setPassword("")
    } catch (err) {
      setContent(null)
      setError(err instanceof Error ? err.message : "Nie udało się odblokować strony.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <header className="fixed w-full z-50 bg-white shadow-md py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 z-50">
            <div className="relative h-12 w-12">
              <Image
                src="/images/logo-lilijka.png"
                alt="Logo Leśna Szkółka"
                width={35}
                height={35}
                className="object-contain"
              />
            </div>
            <div className="font-medium text-gray-800">
              <h1 className="text-sm md:text-base">Niezależny Krąg Instruktorów</h1>
              <h2 className="text-sm md:text-base">Harcerskich „Leśna Szkółka"</h2>
            </div>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center rounded-md bg-[rgb(var(--primary))] px-4 py-2 text-white transition-colors hover:bg-[rgb(var(--primary-dark))]"
          >
            Główna strona
          </Link>
        </div>
      </header>

      <section className="relative h-screen w-full">
        <div className="absolute inset-0">
          <Image
            src="/images/old-new-photo.png"
            alt="Archiwalne i współczesne zdjęcie Leśnej Szkółki"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 hero-gradient" />
        </div>

        <div className="relative flex h-full flex-col items-center justify-center px-4 pt-24 text-center text-white">
          <p className="mb-4 text-sm uppercase tracking-[0.2em]">Prywatny link</p>
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl">45-lecie Leśnej Szkółki</h1>
          <p className="mb-10 max-w-2xl text-lg md:text-xl">
            Spotkanie instruktorskie.
          </p>
          <a
            href="#dostep"
            className="bg-[rgb(var(--primary))] px-8 py-3 text-lg text-white transition-colors hover:bg-[rgb(var(--primary-dark))]"
          >
            Otwórz zaproszenie
          </a>
        </div>
      </section>

      {!content ? (
        <section id="dostep" className="section-padding bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">Dostęp do treści</h2>
              <div className="mx-auto mb-8 h-1 w-20 bg-[rgb(var(--primary))]" />
            </div>

            <div className="mx-auto mt-12 max-w-2xl">
              <form onSubmit={handleSubmit} className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(var(--primary),0.1)]">
                    <LockKeyhole className="h-5 w-5 text-[rgb(var(--primary))]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Hasło dostępu</h3>
                    <p className="text-sm text-gray-600">Odblokowanie pełnego zaproszenia i szczegółów wydarzenia.</p>
                  </div>
                </div>

                <label htmlFor="anniversary-password" className="mb-2 block text-sm font-medium text-gray-700">
                  Wpisz hasło
                </label>
                <input
                  id="anniversary-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Hasło wydarzenia"
                  autoComplete="current-password"
                  className="w-full rounded-md border border-gray-300 px-4 py-3 text-base text-gray-900 outline-none transition focus:border-[rgb(var(--primary))]"
                />

                <button
                  type="submit"
                  disabled={loading || password.length === 0}
                  className="mt-4 inline-flex items-center justify-center rounded-md bg-[rgb(var(--primary))] px-6 py-3 text-white transition-colors hover:bg-[rgb(var(--primary-dark))] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Pobieranie..." : "Pokaż treść"}
                </button>

                {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
              </form>
            </div>
          </div>
        </section>
      ) : null}

      {content ? (
        <>
          <section className="section-padding">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-3xl text-center mb-16">
                <h2 className="mb-6 text-3xl font-bold md:text-4xl">{content.title}</h2>
                <div className="mx-auto mb-8 h-1 w-20 bg-[rgb(var(--primary))]" />
                <p className="text-lg text-gray-700">{content.intro}</p>
              </div>

              <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
                <div className="space-y-6">
                  {content.body.map((paragraph) => (
                    <p key={paragraph} className="text-lg leading-8 text-gray-700">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="rounded-lg bg-gray-50 p-8">
                  <h3 className="text-2xl font-bold text-gray-900">Szczegóły wydarzenia</h3>
                  <div className="mt-6">
                    {content.schedule.map((item, index) => (
                      <div key={item.label}>
                        <div className="py-4">
                          <div className="text-sm font-medium uppercase tracking-[0.14em] text-gray-500">
                            {item.label}
                          </div>
                          <div className="mt-1 text-lg text-gray-900">{item.value}</div>
                        </div>
                        {index < content.schedule.length - 1 ? <Separator className="bg-gray-200" /> : null}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section-padding bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Miejsce</h2>
                <div className="w-20 h-1 bg-[rgb(var(--primary))] mx-auto mb-8"></div>
                <p className="text-lg text-gray-700">{content.venue.address}</p>
              </div>

              <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                <div className="border-b border-gray-200 px-8 py-6">
                  <div className="flex items-start gap-3">
                    <MapPinned className="mt-1 h-5 w-5 text-[rgb(var(--primary))]" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{content.venue.name}</h3>
                      <p className="mt-1 text-gray-600">
                        {content.venue.address} | {content.venue.coordinates.lat}, {content.venue.coordinates.lng}
                      </p>
                    </div>
                  </div>
                </div>
                <Anniversary45Map
                  lat={content.venue.coordinates.lat}
                  lng={content.venue.coordinates.lng}
                  label={content.venue.address}
                />
              </div>
            </div>
          </section>

          <section className="section-padding">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Archiwalne zdjęcia grupowe</h2>
                <div className="w-20 h-1 bg-[rgb(var(--primary))] mx-auto mb-8"></div>
                <p className="text-lg text-gray-700">Ile osób rozpoznajesz?</p>
              </div>

              {currentImage ? (
                <div className="mx-auto max-w-5xl">
                  <div className="relative overflow-hidden rounded-lg bg-white shadow-sm">
                    <div className="relative aspect-[16/9]">
                      <img src={currentImage.src} alt={currentImage.alt} className="h-full w-full object-cover" />
                      {gallery.length > 1 ? (
                        <>
                          <button
                            type="button"
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-md transition hover:bg-white"
                            aria-label="Poprzednie zdjęcie"
                          >
                            <ChevronLeft className="h-6 w-6" />
                          </button>
                          <button
                            type="button"
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-md transition hover:bg-white"
                            aria-label="Następne zdjęcie"
                          >
                            <ChevronRight className="h-6 w-6" />
                          </button>
                        </>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    {gallery.map((image, index) => (
                      <button
                        key={image.src}
                        type="button"
                        onClick={() => setCurrentSlide(index)}
                        className={`relative h-16 w-24 overflow-hidden rounded-md border-2 transition ${
                          index === currentSlide
                            ? "border-[rgb(var(--primary))]"
                            : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                        aria-label={`Pokaż zdjęcie ${index + 1}`}
                      >
                        <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </section>
        </>
      ) : null}

      <Footer />
    </main>
  )
}
