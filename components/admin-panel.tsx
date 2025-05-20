"use client"

import { useState } from "react"
import AdminSidebar from "./admin-sidebar"
import PostsManager from "./posts-manager"
import SectionsManager from "./sections-manager"
import TeamsManager from "./teams-manager"
import DocumentsManager from "./documents-manager"
import GalleryManager from "./gallery-manager"
import SettingsManager from "./settings-manager"

type AdminView = "posts" | "sections" | "teams" | "documents" | "gallery" | "settings"

export default function AdminPanel() {
  const [currentView, setCurrentView] = useState<AdminView>("sections")

  return (
    <div className="flex min-h-screen pt-16">
      <AdminSidebar currentView={currentView} setCurrentView={setCurrentView} />

      <div className="flex-1 p-8">
        {currentView === "posts" && <PostsManager />}
        {currentView === "sections" && <SectionsManager />}
        {currentView === "teams" && <TeamsManager />}
        {currentView === "documents" && <DocumentsManager />}
        {currentView === "gallery" && <GalleryManager />}
        {currentView === "settings" && <SettingsManager />}
      </div>
    </div>
  )
}
