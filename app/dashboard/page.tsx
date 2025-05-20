"use client"

import { useAuth } from "@/context/auth-context"
import { Calendar, Users, FileText, Map, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Witaj, {user?.name}!</h1>
        <p className="text-gray-600">Panel instruktora Leśnej Szkółki</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Nadchodzące wydarzenia</p>
              <p className="text-xl font-bold">3</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Aktywne drużyny</p>
              <p className="text-xl font-bold">12</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Dokumenty do przejrzenia</p>
              <p className="text-xl font-bold">5</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-[rgba(var(--primary),0.1)] rounded-full flex items-center justify-center mr-4">
              <BarChart3 className="h-6 w-6 text-[rgb(var(--primary))]" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Aktywność</p>
              <p className="text-xl font-bold">+12%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold mb-4">Kalendarz wydarzeń</h2>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Tutaj będzie kalendarz wydarzeń</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold mb-4">Szybkie akcje</h2>
          <div className="space-y-4">
            <Link
              href="/dashboard/trips"
              className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Map className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Karta wyjazdowa</p>
                <p className="text-sm text-gray-500">Utwórz nową kartę wyjazdową</p>
              </div>
            </Link>

            <Link
              href="/dashboard/calendar"
              className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <Calendar className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Kalendarz</p>
                <p className="text-sm text-gray-500">Zarządzaj wydarzeniami</p>
              </div>
            </Link>

            <Link
              href="/dashboard/ideas"
              className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
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
                  className="lucide lucide-lightbulb text-purple-600"
                >
                  <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                  <path d="M9 18h6" />
                  <path d="M10 22h4" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Pomysły</p>
                <p className="text-sm text-gray-500">Przeglądaj i dodawaj pomysły</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
