"use client"

import { useState } from "react"
import { Upload, Search, Grid, List, Pencil, Trash2, Eye, Plus } from "lucide-react"
import Image from "next/image"

// Przykładowe dane galerii
const galleryData = [
  {
    id: 1,
    title: "Obóz letni 2023",
    description: "Zdjęcia z obozu letniego w Puszczy Kampinoskiej",
    date: "2023-07-15",
    images: 24,
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kra%CC%A8g_foto_1.jpg-A4jkin0psySSNNgm6Yu0We928xUYR7.jpeg",
    category: "Obozy",
  },
  {
    id: 2,
    title: "Zimowisko 2023",
    description: "Zimowisko w Tatrach",
    date: "2023-02-10",
    images: 18,
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC05534.JPG-sm5QzisfOcCaQ4sSjkH2qFYjNZ15my.jpeg",
    category: "Zimowiska",
  },
  {
    id: 3,
    title: "Biwak wiosenny",
    description: "Biwak drużyny Leśne Wilki",
    date: "2023-04-22",
    images: 12,
    thumbnail: "/placeholder.svg?height=400&width=600",
    category: "Biwaki",
  },
  {
    id: 4,
    title: "Rajd Świętokrzyski",
    description: "Rajd po Górach Świętokrzyskich",
    date: "2023-05-15",
    images: 30,
    thumbnail: "/placeholder.svg?height=400&width=600",
    category: "Rajdy",
  },
  {
    id: 5,
    title: "Dzień Myśli Braterskiej",
    description: "Obchody Dnia Myśli Braterskiej",
    date: "2023-02-22",
    images: 15,
    thumbnail: "/placeholder.svg?height=400&width=600",
    category: "Wydarzenia",
  },
  {
    id: 6,
    title: "Zbiórka drużyny Sokoły",
    description: "Zbiórka drużyny w terenie",
    date: "2023-03-10",
    images: 8,
    thumbnail: "/placeholder.svg?height=400&width=600",
    category: "Zbiórki",
  },
]

export default function GalleryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Unikalne kategorie do filtrowania
  const categories = Array.from(new Set(galleryData.map((gallery) => gallery.category)))

  // Filtrowanie albumów
  const filteredGalleries = galleryData.filter((gallery) => {
    const matchesSearch =
      gallery.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gallery.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory ? gallery.category === selectedCategory : true
    return matchesSearch && matchesCategory
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Galeria</h1>
        <button className="bg-[rgb(var(--primary))] hover:bg-[rgb(var(--primary-dark))] text-white px-4 py-2 rounded-md flex items-center">
          <Plus className="mr-2 h-5 w-5" />
          Dodaj album
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Szukaj albumów..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-64">
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent"
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
            >
              <option value="">Wszystkie kategorie</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <button
              className={`px-3 py-2 ${viewMode === "grid" ? "bg-gray-100" : "bg-white"}`}
              onClick={() => setViewMode("grid")}
              aria-label="Widok siatki"
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              className={`px-3 py-2 ${viewMode === "list" ? "bg-gray-100" : "bg-white"}`}
              onClick={() => setViewMode("list")}
              aria-label="Widok listy"
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGalleries.length > 0 ? (
              filteredGalleries.map((gallery) => (
                <div key={gallery.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                  <div className="relative h-48 cursor-pointer group">
                    <Image
                      src={gallery.thumbnail || "/placeholder.svg"}
                      alt={gallery.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <Eye className="text-white opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8" />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold">{gallery.title}</h3>
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">{gallery.category}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{gallery.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        <span>{new Date(gallery.date).toLocaleDateString("pl-PL")}</span>
                        <span className="mx-2">•</span>
                        <span>{gallery.images} zdjęć</span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Pencil className="h-5 w-5" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500">
                Nie znaleziono albumów spełniających kryteria wyszukiwania
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Album
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Kategoria
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Data
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Zdjęcia
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Akcje
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredGalleries.length > 0 ? (
                  filteredGalleries.map((gallery) => (
                    <tr key={gallery.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 relative rounded overflow-hidden">
                            <Image
                              src={gallery.thumbnail || "/placeholder.svg"}
                              alt={gallery.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{gallery.title}</div>
                            <div className="text-sm text-gray-500">{gallery.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{gallery.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(gallery.date).toLocaleDateString("pl-PL")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{gallery.images}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="h-5 w-5" />
                          </button>
                          <button className="text-indigo-600 hover:text-indigo-900">
                            <Pencil className="h-5 w-5" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      Nie znaleziono albumów spełniających kryteria wyszukiwania
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Dodaj nowe zdjęcia</h3>
          <p className="text-gray-500 mb-4">Przeciągnij i upuść pliki lub kliknij, aby wybrać</p>
          <button className="bg-[rgb(var(--primary))] hover:bg-[rgb(var(--primary-dark))] text-white px-4 py-2 rounded-md inline-flex items-center">
            <Upload className="mr-2 h-5 w-5" />
            Wybierz pliki
          </button>
        </div>
      </div>
    </div>
  )
}
