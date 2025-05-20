"use client"

import { useAuth } from "@/context/auth-context"
import { Bell, Search, Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function DashboardHeader() {
  const { user, logout } = useAuth()
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-30">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <button className="md:hidden mr-2 p-2 rounded-md hover:bg-gray-100">
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Logo" width={32} height={32} />
            <span className="font-bold text-lg hidden sm:inline">Leśna Szkółka</span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Szukaj..."
              className="w-64 pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <button className="p-2 rounded-full hover:bg-gray-100 relative">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[rgb(var(--primary))] rounded-full"></span>
          </button>

          <div className="relative">
            <button className="flex items-center gap-2" onClick={() => setShowProfileMenu(!showProfileMenu)}>
              <div className="w-8 h-8 bg-[rgb(var(--primary))] rounded-full flex items-center justify-center text-white">
                {user?.name?.charAt(0) || "U"}
              </div>
              <span className="hidden md:inline font-medium">{user?.name || "Użytkownik"}</span>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <Link
                  href="/dashboard/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowProfileMenu(false)}
                >
                  Profil
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowProfileMenu(false)}
                >
                  Ustawienia
                </Link>
                <button
                  onClick={() => {
                    logout()
                    setShowProfileMenu(false)
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Wyloguj się
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
