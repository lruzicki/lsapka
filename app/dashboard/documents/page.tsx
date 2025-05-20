"use client"

import { useState } from "react"
import { FileText, Download, Eye, Plus, Pencil, Trash2, Search } from "lucide-react"

// Przykładowe dane dokumentów
const documentsData = [
  {
    id: 1,
    title: "Zgoda RODO",
    category: "Formularze",
    date: "2024-01-15",
    size: "245 KB",
    type: "PDF",
  },
  {
    id: 2,
    title: "Karta wyjazdowa - obóz letni 2024",
    category: "Wyjazdy",
    date: "2024-02-20",
    size: "320 KB",
    type: "DOCX",
  },
  {
    id: 3,
    title: "Statut organizacji",
    category: "Dokumenty prawne",
    date: "2023-11-05",
    size: "1.2 MB",
    type: "PDF",
  },
  {
    id: 4,
    title: "Regulamin obozu",
    category: "Regulaminy",
    date: "2024-03-10",
    size: "180 KB",
    type: "PDF",
  },
  {
    id: 5,
    title: "Preliminarz finansowy 2024",
    category: "Finanse",
    date: "2024-01-05",
    size: "450 KB",
    type: "XLSX",
  },
  {
    id: 6,
    title: "Sprawozdanie roczne 2023",
    category: "Sprawozdania",
    date: "2024-01-30",
    size: "2.1 MB",
    type: "PDF",
  },
]

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Unikalne kategorie do filtrowania
  const categories = Array.from(new Set(documentsData.map((doc) => doc.category)))

  // Filtrowanie dokumentów
  const filteredDocuments = documentsData.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory ? doc.category === selectedCategory : true
    return matchesSearch && matchesCategory
  })

  // Funkcja do określania ikony na podstawie typu dokumentu
  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return (
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <FileText className="h-5 w-5 text-red-600" />
          </div>
        )
      case "docx":
        return (
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <FileText className="h-5 w-5 text-blue-600" />
          </div>
        )
      case "xlsx":
        return (
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <FileText className="h-5 w-5 text-green-600" />
          </div>
        )
      default:
        return (
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <FileText className="h-5 w-5 text-gray-600" />
          </div>
        )
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dokumenty</h1>
        <button className="bg-[rgb(var(--primary))] hover:bg-[rgb(var(--primary-dark))] text-white px-4 py-2 rounded-md flex items-center">
          <Plus className="mr-2 h-5 w-5" />
          Dodaj dokument
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Szukaj dokumentów..."
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
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Dokument
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
                  Rozmiar
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
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map((doc) => (
                  <tr key={doc.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getFileIcon(doc.type)}
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{doc.title}</div>
                          <div className="text-sm text-gray-500">{doc.type}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(doc.date).toLocaleDateString("pl-PL")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="h-5 w-5" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Download className="h-5 w-5" />
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
                    Nie znaleziono dokumentów spełniających kryteria wyszukiwania
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
