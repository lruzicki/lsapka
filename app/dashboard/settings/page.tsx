"use client"

import { useState } from "react"
import { Save, User, Lock, Bell, Globe, Palette } from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Ustawienia</h1>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-gray-50 p-4 md:p-6 border-b md:border-b-0 md:border-r border-gray-200">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === "profile"
                    ? "bg-[rgba(var(--primary),0.1)] text-[rgb(var(--primary))]"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <User className="mr-3 h-5 w-5" />
                <span>Profil</span>
              </button>
              <button
                onClick={() => setActiveTab("password")}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === "password"
                    ? "bg-[rgba(var(--primary),0.1)] text-[rgb(var(--primary))]"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Lock className="mr-3 h-5 w-5" />
                <span>Hasło</span>
              </button>
              <button
                onClick={() => setActiveTab("notifications")}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === "notifications"
                    ? "bg-[rgba(var(--primary),0.1)] text-[rgb(var(--primary))]"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Bell className="mr-3 h-5 w-5" />
                <span>Powiadomienia</span>
              </button>
              <button
                onClick={() => setActiveTab("appearance")}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === "appearance"
                    ? "bg-[rgba(var(--primary),0.1)] text-[rgb(var(--primary))]"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Palette className="mr-3 h-5 w-5" />
                <span>Wygląd</span>
              </button>
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
            {activeTab === "profile" && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Profil</h2>
                <p className="text-sm text-gray-500 mb-6">
                  Tutaj możesz zaktualizować swoje dane osobowe i informacje kontaktowe.
                </p>

                <form className="space-y-6">
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        <User className="h-12 w-12 text-gray-400" />
                      </div>
                      <button
                        type="button"
                        className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md border border-gray-200"
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
                          className="lucide lucide-pencil"
                        >
                          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                          <path d="m15 5 4 4" />
                        </svg>
                      </button>
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-gray-900">Zdjęcie profilowe</h3>
                      <p className="text-sm text-gray-500">JPG, GIF lub PNG. Maksymalnie 2MB.</p>
                      <div className="mt-2">
                        <button
                          type="button"
                          className="px-3 py-1 text-sm text-[rgb(var(--primary))] border border-[rgb(var(--primary))] rounded-md hover:bg-[rgba(var(--primary),0.1)]"
                        >
                          Zmień
                        </button>
                        <button type="button" className="px-3 py-1 text-sm text-gray-600 ml-2 hover:text-gray-900">
                          Usuń
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        Imię
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent"
                        defaultValue="Jan"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Nazwisko
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent"
                        defaultValue="Kowalski"
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
                        defaultValue="jan.kowalski@lesnaszkolka.pl"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent"
                        defaultValue="+48 123 456 789"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                        O mnie
                      </label>
                      <textarea
                        id="bio"
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent"
                        defaultValue="Instruktor z 20-letnim stażem, specjalista w zakresie metodyki harcerskiej i organizacji obozów."
                      ></textarea>
                    </div>
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

            {activeTab === "password" && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Zmiana hasła</h2>
                <p className="text-sm text-gray-500 mb-6">
                  Zaktualizuj swoje hasło, aby zapewnić bezpieczeństwo konta.
                </p>

                <form className="space-y-6">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Obecne hasło
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Nowe hasło
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Potwierdź nowe hasło
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-[rgb(var(--primary))] hover:bg-[rgb(var(--primary-dark))] text-white px-4 py-2 rounded-md flex items-center"
                    >
                      <Save className="mr-2 h-5 w-5" />
                      Zmień hasło
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === "notifications" && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Powiadomienia</h2>
                <p className="text-sm text-gray-500 mb-6">Zarządzaj swoimi preferencjami dotyczącymi powiadomień.</p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-medium text-gray-900 mb-3">Powiadomienia email</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="events"
                            type="checkbox"
                            className="h-4 w-4 text-[rgb(var(--primary))] border-gray-300 rounded focus:ring-[rgb(var(--primary))]"
                            defaultChecked
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="events" className="font-medium text-gray-700">
                            Wydarzenia
                          </label>
                          <p className="text-gray-500">Otrzymuj powiadomienia o nowych wydarzeniach.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="documents"
                            type="checkbox"
                            className="h-4 w-4 text-[rgb(var(--primary))] border-gray-300 rounded focus:ring-[rgb(var(--primary))]"
                            defaultChecked
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="documents" className="font-medium text-gray-700">
                            Dokumenty
                          </label>
                          <p className="text-gray-500">Otrzymuj powiadomienia o nowych dokumentach.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="gallery"
                            type="checkbox"
                            className="h-4 w-4 text-[rgb(var(--primary))] border-gray-300 rounded focus:ring-[rgb(var(--primary))]"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="gallery" className="font-medium text-gray-700">
                            Galeria
                          </label>
                          <p className="text-gray-500">Otrzymuj powiadomienia o nowych zdjęciach w galerii.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-medium text-gray-900 mb-3">Powiadomienia w aplikacji</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="app_events"
                            type="checkbox"
                            className="h-4 w-4 text-[rgb(var(--primary))] border-gray-300 rounded focus:ring-[rgb(var(--primary))]"
                            defaultChecked
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="app_events" className="font-medium text-gray-700">
                            Wydarzenia
                          </label>
                          <p className="text-gray-500">Otrzymuj powiadomienia o nowych wydarzeniach.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="app_documents"
                            type="checkbox"
                            className="h-4 w-4 text-[rgb(var(--primary))] border-gray-300 rounded focus:ring-[rgb(var(--primary))]"
                            defaultChecked
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="app_documents" className="font-medium text-gray-700">
                            Dokumenty
                          </label>
                          <p className="text-gray-500">Otrzymuj powiadomienia o nowych dokumentach.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="app_gallery"
                            type="checkbox"
                            className="h-4 w-4 text-[rgb(var(--primary))] border-gray-300 rounded focus:ring-[rgb(var(--primary))]"
                            defaultChecked
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="app_gallery" className="font-medium text-gray-700">
                            Galeria
                          </label>
                          <p className="text-gray-500">Otrzymuj powiadomienia o nowych zdjęciach w galerii.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="bg-[rgb(var(--primary))] hover:bg-[rgb(var(--primary-dark))] text-white px-4 py-2 rounded-md flex items-center"
                    >
                      <Save className="mr-2 h-5 w-5" />
                      Zapisz preferencje
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "appearance" && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Wygląd</h2>
                <p className="text-sm text-gray-500 mb-6">Dostosuj wygląd panelu administracyjnego.</p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-medium text-gray-900 mb-3">Motyw</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="border border-gray-200 rounded-lg p-4 cursor-pointer bg-white relative">
                        <div className="h-20 bg-white border border-gray-200 rounded mb-2"></div>
                        <div className="text-center font-medium">Jasny</div>
                        <div className="absolute top-2 right-2 w-4 h-4 bg-[rgb(var(--primary))] rounded-full"></div>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4 cursor-pointer">
                        <div className="h-20 bg-gray-900 border border-gray-700 rounded mb-2"></div>
                        <div className="text-center font-medium">Ciemny</div>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4 cursor-pointer">
                        <div className="h-20 bg-gradient-to-b from-white to-gray-900 border border-gray-200 rounded mb-2"></div>
                        <div className="text-center font-medium">Systemowy</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-medium text-gray-900 mb-3">Kolor akcentu</h3>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                      <div className="h-10 bg-[rgb(var(--primary))] rounded-lg cursor-pointer relative">
                        <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-check text-[rgb(var(--primary))]"
                          >
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        </div>
                      </div>
                      <div className="h-10 bg-blue-600 rounded-lg cursor-pointer"></div>
                      <div className="h-10 bg-green-600 rounded-lg cursor-pointer"></div>
                      <div className="h-10 bg-purple-600 rounded-lg cursor-pointer"></div>
                      <div className="h-10 bg-orange-600 rounded-lg cursor-pointer"></div>
                      <div className="h-10 bg-gray-600 rounded-lg cursor-pointer"></div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="bg-[rgb(var(--primary))] hover:bg-[rgb(var(--primary-dark))] text-white px-4 py-2 rounded-md flex items-center"
                    >
                      <Save className="mr-2 h-5 w-5" />
                      Zapisz ustawienia
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "site" && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Ustawienia strony</h2>
                <p className="text-sm text-gray-500 mb-6">Zarządzaj ogólnymi ustawieniami strony internetowej.</p>

                <form className="space-y-6">
                  <div>
                    <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-1">
                      Nazwa strony
                    </label>
                    <input
                      type="text"
                      id="siteName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent"
                      defaultValue='Niezależny Krąg Instruktorów Harcerskich „Leśna Szkółka"'
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
                      defaultValue="Trójmiejska organizacja harcerska"
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
                      defaultValue="komenda@lesnaszkolka.pl"
                    />
                  </div>
                  <div>
                    <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                      Telefon kontaktowy
                    </label>
                    <input
                      type="tel"
                      id="contactPhone"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent"
                      defaultValue="+48 123 456 789"
                    />
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Adres
                    </label>
                    <input
                      type="text"
                      id="address"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent"
                      defaultValue="ul. Harcerska 12, 00-001 Warszawa"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-[rgb(var(--primary))] hover:bg-[rgb(var(--primary-dark))] text-white px-4 py-2 rounded-md flex items-center"
                    >
                      <Save className="mr-2 h-5 w-5" />
                      Zapisz ustawienia
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
