"use client"

import { useState } from "react"
import { Save, Globe } from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("site")

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Ustawienia</h1>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-gray-50 p-4 md:p-6 border-b md:border-b-0 md:border-r border-gray-200">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab("site")}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === "site"
                    ? "bg-[rgba(var(--primary),0.1)] text-[rgb(var(--primary))]"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Globe className="mr-3 h-5 w-5" />
                <span>Ustawienia strony</span>
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            {activeTab === "site" && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Ustawienia strony</h2>
                <p className="text-sm text-gray-500 mb-6">
                  Zarządzaj ustawieniami strony i jej zawartością.
                </p>

                <form className="space-y-6">
                  <div>
                    <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-1">
                      Nazwa strony
                    </label>
                    <input
                      type="text"
                      id="siteName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent"
                      defaultValue="Leśna Szkółka"
                    />
                  </div>

                  <div>
                    <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 mb-1">
                      Opis strony
                    </label>
                    <textarea
                      id="siteDescription"
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent"
                      defaultValue="Niezależny Krąg Instruktorów Harcerskich"
                    ></textarea>
                  </div>

                  <div>
                    <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      Email kontaktowy
                    </label>
                    <input
                      type="email"
                      id="contactEmail"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent"
                      defaultValue="kontakt@lesnaszkolka.org"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">Funkcje</label>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="mr-3"
                        />
                        <span>Włącz komentarze</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="mr-3"
                        />
                        <span>Włącz powiadomienia email</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-3"
                        />
                        <span>Tryb konserwacji</span>
                      </label>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 italic">
                      💡 Kiedy tutaj będzie opcja na edycję kontentu.
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-[rgb(var(--primary))] hover:bg-[rgb(var(--primary-dark))] text-white px-4 py-2 rounded-md flex items-center"
                    >
                      <Save className="mr-2 h-5 w-5" />
                      Zapisz zmiany
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
