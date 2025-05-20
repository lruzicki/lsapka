import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative h-10 w-10">
                <Image src="/logo.svg" alt="Logo Leśna Szkółka" fill className="object-contain invert" />
              </div>
              <div className="font-medium">
                <h3 className="text-sm">Niezależny Krąg Instruktorów</h3>
                <h4 className="text-sm">Harcerskich „Leśna Szkółka"</h4>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Wspólnota instruktorów harcerskich, którzy kontynuują tradycje leśnych kursów instruktorskich i wychowania
              w duchu harcerskich wartości.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Nawigacja</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#o-nas" className="text-gray-400 hover:text-white transition-colors">
                  O nas
                </Link>
              </li>
              <li>
                <Link href="#wydarzenia" className="text-gray-400 hover:text-white transition-colors">
                  Wydarzenia
                </Link>
              </li>
              <li>
                <Link href="#galeria" className="text-gray-400 hover:text-white transition-colors">
                  Galeria
                </Link>
              </li>
              <li>
                <Link href="#mapa" className="text-gray-400 hover:text-white transition-colors">
                  Mapa
                </Link>
              </li>
              <li>
                <Link href="#kontakt" className="text-gray-400 hover:text-white transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Podstrony</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/zasiewy" className="text-gray-400 hover:text-white transition-colors">
                  Zasiewy
                </Link>
              </li>
              <li>
                <Link href="/historia" className="text-gray-400 hover:text-white transition-colors">
                  Historia
                </Link>
              </li>
              <li>
                <Link href="/wladze" className="text-gray-400 hover:text-white transition-colors">
                  Władze
                </Link>
              </li>
              <li>
                <Link href="/dokumenty" className="text-gray-400 hover:text-white transition-colors">
                  Dokumenty
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-gray-400 hover:text-white transition-colors">
                  Strefa instruktora
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Kontakt</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
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
                  className="lucide lucide-mail mr-2 text-[rgb(var(--primary))]"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span className="text-gray-400">komenda@lesnaszkolka.pl</span>
              </li>
              <li className="flex items-center">
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
                  className="lucide lucide-phone mr-2 text-[rgb(var(--primary))]"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="text-gray-400">+48 123 456 789</span>
              </li>
              <li className="flex items-center">
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
                  className="lucide lucide-map-pin mr-2 text-[rgb(var(--primary))]"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-gray-400">ul. Harcerska 12, 00-001 Warszawa</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Leśna Szkółka. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="/dokumenty/polityka-prywatnosci" className="text-gray-400 hover:text-white transition-colors">
              Polityka prywatności
            </a>
            <a href="/dokumenty/regulamin" className="text-gray-400 hover:text-white transition-colors">
              Regulamin
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
