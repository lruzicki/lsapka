"use client"

import { useState } from "react"

export default function ContactSection() {
  const [recipient, setRecipient] = useState<"komenda" | "kr">("komenda")

  return (
    <section id="kontakt" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Kontakt</h2>
          <div className="w-20 h-1 bg-[rgb(var(--primary))] mx-auto mb-8"></div>
          <p className="text-lg text-gray-700">
            Masz pytania? Skontaktuj się z nami! Chętnie odpowiemy na wszystkie pytania.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold mb-6">Napisz do nas</h3>

            <div className="mb-6">
              <div className="flex rounded-md overflow-hidden border border-gray-300">
                <button
                  className={`px-4 py-2 flex-1 ${recipient === "komenda" ? "bg-[rgb(var(--primary))] text-white" : "bg-gray-100 text-gray-700"}`}
                  onClick={() => setRecipient("komenda")}
                >
                  Komenda Kręgu
                </button>
                <button
                  className={`px-4 py-2 flex-1 ${recipient === "kr" ? "bg-[rgb(var(--primary))] text-white" : "bg-gray-100 text-gray-700"}`}
                  onClick={() => setRecipient("kr")}
                >
                  Komisja Rewizyjna
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {recipient === "komenda"
                  ? "Wiadomość zostanie wysłana do Komendy Kręgu"
                  : "Wiadomość zostanie wysłana do Komisji Rewizyjnej"}
              </p>
            </div>

            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Imię i nazwisko
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent"
                  placeholder="Jan Kowalski"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent"
                  placeholder="jan@example.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Temat
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent"
                  placeholder="Temat wiadomości"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Wiadomość
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent"
                  placeholder="Treść wiadomości..."
                ></textarea>
              </div>
              <div className="flex items-start">
                <input type="checkbox" id="rodo" className="mt-1 mr-2" />
                <label htmlFor="rodo" className="text-sm text-gray-700">
                  Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z{" "}
                  <a href="/dokumenty/rodo" className="text-[rgb(var(--primary))] hover:underline">
                    polityką RODO
                  </a>
                </label>
              </div>
              <button
                type="submit"
                className="bg-[rgb(var(--primary))] hover:bg-[rgb(var(--primary-dark))] text-white px-6 py-3 rounded-md transition-colors"
              >
                Wyślij wiadomość
              </button>
            </form>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold mb-6">Dane kontaktowe</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="h-10 w-10 bg-[rgba(var(--primary),0.1)] rounded-full flex items-center justify-center flex-shrink-0 mr-4">
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
                    className="lucide lucide-mail"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Email</h4>
                  <p className="text-gray-600">komenda@lesnaszkolka.pl</p>
                  <p className="text-gray-600">kr@lesnaszkolka.pl</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="h-10 w-10 bg-[rgba(var(--primary),0.1)] rounded-full flex items-center justify-center flex-shrink-0 mr-4">
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
                    className="lucide lucide-phone"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Telefon</h4>
                  <p className="text-gray-600">+48 123 456 789</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="h-10 w-10 bg-[rgba(var(--primary),0.1)] rounded-full flex items-center justify-center flex-shrink-0 mr-4">
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
                    className="lucide lucide-map-pin"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Adres</h4>
                  <p className="text-gray-600">ul. Harcerska 12, 00-001 Warszawa</p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h4 className="font-bold text-lg mb-4">Znajdź nas</h4>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="h-10 w-10 bg-[rgba(var(--primary),0.1)] rounded-full flex items-center justify-center hover:bg-[rgb(var(--primary))] hover:text-white transition-colors"
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
                      className="lucide lucide-facebook"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="h-10 w-10 bg-[rgba(var(--primary),0.1)] rounded-full flex items-center justify-center hover:bg-[rgb(var(--primary))] hover:text-white transition-colors"
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
                      className="lucide lucide-instagram"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="h-10 w-10 bg-[rgba(var(--primary),0.1)] rounded-full flex items-center justify-center hover:bg-[rgb(var(--primary))] hover:text-white transition-colors"
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
                      className="lucide lucide-youtube"
                    >
                      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                      <path d="m10 15 5-3-5-3z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
