"use client"

import { useSectionVisibility } from "@/context/section-visibility-context"

export default function SectionsManager() {
  const { visibleSections, toggleSectionVisibility } = useSectionVisibility()

  const sections = [
    { id: "hero", name: "Strona główna (Hero)" },
    { id: "about", name: "O nas" },
    { id: "events", name: "Wydarzenia" },
    { id: "teams", name: "Drużyny" },
    { id: "gallery", name: "Galeria" },
    { id: "history", name: "Historia" },
    { id: "authorities", name: "Władze" },
    { id: "statute", name: "Statut" },
    { id: "zasiewy", name: "Zasiewy" },
    { id: "support", name: "Wsparcie (1,5%)" },
    { id: "chaszcze", name: "Chaszcze" },
    { id: "documents", name: "Dokumenty" },
    { id: "map", name: "Mapa" },
    { id: "contact", name: "Kontakt" },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Zarządzanie sekcjami</h2>
      <p className="text-gray-600 mb-8">Włącz lub wyłącz widoczność poszczególnych sekcji na stronie głównej.</p>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sections.map((section) => (
            <div key={section.id} className="flex items-center justify-between p-4 border rounded-md">
              <span className="font-medium">{section.name}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={visibleSections[section.id as keyof typeof visibleSections]}
                  onChange={() => toggleSectionVisibility(section.id as keyof typeof visibleSections)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[rgba(var(--primary),0.2)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[rgb(var(--primary))]"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
