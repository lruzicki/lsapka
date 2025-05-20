"use client"

import { createContext, useState, useContext, type ReactNode } from "react"

type SectionName =
  | "hero"
  | "about"
  | "events"
  | "gallery"
  | "map"
  | "contact"
  | "teams"
  | "documents"
  | "statute"
  | "zasiewy"
  | "history"
  | "authorities"
  | "support"
  | "chaszcze"

interface SectionVisibilityContextType {
  visibleSections: Record<SectionName, boolean>
  toggleSectionVisibility: (section: SectionName) => void
  isSectionVisible: (section: SectionName) => boolean
}

const SectionVisibilityContext = createContext<SectionVisibilityContextType | undefined>(undefined)

export function SectionVisibilityProvider({ children }: { children: ReactNode }) {
  const [visibleSections, setVisibleSections] = useState<Record<SectionName, boolean>>({
    hero: true,
    about: true,
    events: true,
    gallery: true,
    map: true,
    contact: true,
    teams: true,
    documents: true,
    statute: true,
    zasiewy: true,
    history: true,
    authorities: true,
    support: true,
    chaszcze: true,
  })

  const toggleSectionVisibility = (section: SectionName) => {
    setVisibleSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const isSectionVisible = (section: SectionName) => {
    return visibleSections[section]
  }

  return (
    <SectionVisibilityContext.Provider value={{ visibleSections, toggleSectionVisibility, isSectionVisible }}>
      {children}
    </SectionVisibilityContext.Provider>
  )
}

export function useSectionVisibility() {
  const context = useContext(SectionVisibilityContext)
  if (context === undefined) {
    throw new Error("useSectionVisibility must be used within a SectionVisibilityProvider")
  }
  return context
}
