"use client"

import Link from "next/link"
import { FileText, Layers, Users, FileBox, ImageIcon, Settings, Home } from "lucide-react"

type AdminView = "posts" | "sections" | "teams" | "documents" | "gallery" | "settings"

interface AdminSidebarProps {
  currentView: AdminView
  setCurrentView: (view: AdminView) => void
}

export default function AdminSidebar({ currentView, setCurrentView }: AdminSidebarProps) {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen pt-6 fixed left-0 top-16 h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="px-6 py-4">
        <h2 className="text-xl font-bold">Panel Administracyjny</h2>
        <p className="text-gray-400 text-sm">Zarządzaj zawartością strony</p>
      </div>

      <nav className="mt-6">
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setCurrentView("posts")}
              className={`w-full flex items-center px-6 py-3 text-left ${
                currentView === "posts" ? "bg-[rgb(var(--primary))] text-white" : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <FileText className="mr-3 h-5 w-5" />
              <span>Posty</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setCurrentView("sections")}
              className={`w-full flex items-center px-6 py-3 text-left ${
                currentView === "sections" ? "bg-[rgb(var(--primary))] text-white" : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <Layers className="mr-3 h-5 w-5" />
              <span>Sekcje</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setCurrentView("teams")}
              className={`w-full flex items-center px-6 py-3 text-left ${
                currentView === "teams" ? "bg-[rgb(var(--primary))] text-white" : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <Users className="mr-3 h-5 w-5" />
              <span>Drużyny</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setCurrentView("documents")}
              className={`w-full flex items-center px-6 py-3 text-left ${
                currentView === "documents" ? "bg-[rgb(var(--primary))] text-white" : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <FileBox className="mr-3 h-5 w-5" />
              <span>Dokumenty</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setCurrentView("gallery")}
              className={`w-full flex items-center px-6 py-3 text-left ${
                currentView === "gallery" ? "bg-[rgb(var(--primary))] text-white" : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <ImageIcon className="mr-3 h-5 w-5" />
              <span>Galeria</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setCurrentView("settings")}
              className={`w-full flex items-center px-6 py-3 text-left ${
                currentView === "settings" ? "bg-[rgb(var(--primary))] text-white" : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <Settings className="mr-3 h-5 w-5" />
              <span>Ustawienia</span>
            </button>
          </li>
        </ul>
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800">
        <Link href="/" className="flex items-center text-gray-300 hover:text-white">
          <Home className="mr-2 h-5 w-5" />
          <span>Powrót do strony</span>
        </Link>
      </div>
    </div>
  )
}
