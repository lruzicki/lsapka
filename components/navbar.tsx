"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, LogIn, ArrowUp } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(pathname !== "/" || false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const { user, isAuthenticated } = useAuth()

  const isDashboard = pathname?.startsWith("/dashboard")

  useEffect(() => {
    const handleScroll = () => {
      if (pathname !== "/" || window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      // Pokaż przycisk powrotu na górę, gdy użytkownik przewinie stronę o więcej niż 300px
      if (window.scrollY > 300) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    handleScroll() // Wywołaj od razu, aby ustawić stan dla podstron
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled || isDashboard ? "bg-white shadow-md py-2" : "bg-transparent py-4"
        }`}
      >
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
            <div className={`font-medium ${scrolled || isOpen || isDashboard ? "text-gray-800" : "text-white"}`}>
              <h1 className="text-sm md:text-base">Niezależny Krąg Instruktorów</h1>
              <h2 className="text-sm md:text-base">Harcerskich „Leśna Szkółka"</h2>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            {!isDashboard && (
              <>
                <button
                  className="z-50 md:hidden"
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label={isOpen ? "Zamknij menu" : "Otwórz menu"}
                >
                  {isOpen ? (
                    <X className={scrolled || isOpen ? "text-gray-800" : "text-white"} size={24} />
                  ) : (
                    <Menu className={scrolled ? "text-gray-800" : "text-white"} size={24} />
                  )}
                </button>

                <nav className={`hidden md:flex items-center space-x-6 ${scrolled ? "text-gray-800" : "text-white"}`}>
                  <Link href="#o-nas" className="hover:text-[rgb(var(--primary))] transition-colors">
                    O nas
                  </Link>
                  <Link href="#wydarzenia" className="hover:text-[rgb(var(--primary))] transition-colors">
                    Wydarzenia
                  </Link>
                  <Link href="#galeria" className="hover:text-[rgb(var(--primary))] transition-colors">
                    Galeria
                  </Link>
                  <Link href="#mapa" className="hover:text-[rgb(var(--primary))] transition-colors">
                    Mapa
                  </Link>
                  <Link href="#kontakt" className="hover:text-[rgb(var(--primary))] transition-colors">
                    Kontakt
                  </Link>
                  <Link href="/zasiewy" className="hover:text-[rgb(var(--primary))] transition-colors">
                    Zasiewy
                  </Link>
                  <Link
                    href="#wsparcie"
                    className="flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md shadow-sm transition-colors"
                  >
                    Przekaż 1,5%
                  </Link>
                  <Link
                    href="/login"
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                      scrolled
                        ? "bg-[rgb(var(--primary))] text-white"
                        : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                    }`}
                  >
                    <LogIn size={18} />
                    <span>Login</span>
                  </Link>
                </nav>
              </>
            )}

            {isDashboard && isAuthenticated && (
              <div className="flex items-center gap-4">
                <span className="hidden md:inline text-gray-700">Witaj, {user?.name}</span>
                <Link href="/dashboard" className="text-gray-700 hover:text-[rgb(var(--primary))] transition-colors">
                  Dashboard
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu */}
          <div
            className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
              isOpen ? "translate-x-0" : "translate-x-full"
            } md:hidden`}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-6 text-xl">
              <Link
                href="#wsparcie"
                className="flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md shadow-sm transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Przekaż 1,5%
              </Link>
              <Link
                href="#o-nas"
                className="hover:text-[rgb(var(--primary))] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                O nas
              </Link>
              <Link
                href="#wydarzenia"
                className="hover:text-[rgb(var(--primary))] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Wydarzenia
              </Link>
              <Link
                href="#galeria"
                className="hover:text-[rgb(var(--primary))] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Galeria
              </Link>
              <Link
                href="#mapa"
                className="hover:text-[rgb(var(--primary))] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Mapa
              </Link>
              <Link
                href="#kontakt"
                className="hover:text-[rgb(var(--primary))] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Kontakt
              </Link>
              <Link
                href="/zasiewy"
                className="hover:text-[rgb(var(--primary))] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Zasiewy
              </Link>
              <Link
                href="/login"
                className="bg-[rgb(var(--primary))] hover:bg-[rgb(var(--primary-dark))] text-white px-6 py-3 rounded-md transition-colors flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <LogIn size={18} />
                <span>{isAuthenticated ? "Dashboard" : "Zaloguj się"}</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Przycisk powrotu na górę */}
      <button
        onClick={scrollToTop}
        className={`fixed right-6 bottom-6 p-3 bg-[rgb(var(--primary))] text-white rounded-full shadow-lg z-40 transition-all duration-300 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Powrót na górę strony"
      >
        <ArrowUp size={24} />
      </button>
    </>
  )
}
