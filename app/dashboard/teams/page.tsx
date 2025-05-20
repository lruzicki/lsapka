"use client"

import { useState } from "react"
import { Users, UserPlus, MapPin, Mail, Pencil, Trash2, Search } from "lucide-react"
import Image from "next/image"

// Przykładowe dane drużyn
const teamsData = [
  {
    id: 1,
    name: "1 DH „Leśne Wilki”",
    location: "Warszawa",
    leader: "phm. Jan Kowalski",
    members: 24,
    email: "lesnewilki@lesnaszkolka.pl",
    phone: "+48 123 456 789",
    address: "ul. Harcerska 12, 00-001 Warszawa",
    image: "/placeholder.svg?height=400&width=600",
    active: true,
  },
  {
    id: 2,
    name: "2 DH „Sokoły\"",
    location: "Kraków",
    leader: "pwd. Anna Nowak",
    members: 18,
    email: "sokoly@lesnaszkolka.pl",
    phone: "+48 123 456 789",
    address: "ul. Wawelska 5, 30-001 Kraków",
    image: "/placeholder.svg?height=400&width=600",
    active: true,
  },
  {
    id: 3,
    name: "3 DH „Morskie Fale\"",
    location: "Gdańsk",
    leader: "hm. Piotr Wiśniewski",
    members: 22,
    email: "morskiefale@lesnaszkolka.pl",
    phone: "+48 123 456 789",
    address: "ul. Morska 8, 80-001 Gdańsk",
    image: "/placeholder.svg?height=400&width=600",
    active: true,
  },
  {
    id: 4,
    name: "4 DH „Puszczyki\"",
    location: "Poznań",
    leader: "pwd. Marek Nowicki",
    members: 15,
    email: "puszczyki@lesnaszkolka.pl",
    phone: "+48 123 456 789",
    address: "ul. Poznańska 10, 60-001 Poznań",
    image: "/placeholder.svg?height=400&width=600",
    active: false,
  },
]

export default function TeamsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showInactive, setShowInactive] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Filtrowanie drużyn
  const filteredTeams = teamsData.filter((team) => {
    const matchesSearch =
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.leader.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = showInactive ? true : team.active
    return matchesSearch && matchesStatus
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Drużyny</h1>
        <button className="bg-[rgb(var(--primary))] hover:bg-[rgb(var(--primary-dark))] text-white px-4 py-2 rounded-md flex items-center">
          <UserPlus className="mr-2 h-5 w-5" />
          Dodaj drużynę
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Szukaj drużyn..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showInactive}
                onChange={() => setShowInactive(!showInactive)}
                className="rounded text-[rgb(var(--primary))]"
              />
              <span>Pokaż nieaktywne</span>
            </label>
            <div className="flex border border-gray-300 rounded-md overflow-hidden">
              <button
                className={`px-3 py-2 ${viewMode === "grid" ? "bg-gray-100" : "bg-white"}`}
                onClick={() => setViewMode("grid")}
                aria-label="Widok siatki"
              >
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
                  className="lucide lucide-grid"
                >
                  <rect width="7" height="7" x="3" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="14" rx="1" />
                  <rect width="7" height="7" x="3" y="14" rx="1" />
                </svg>
              </button>
              <button
                className={`px-3 py-2 ${viewMode === "list" ? "bg-gray-100" : "bg-white"}`}
                onClick={() => setViewMode("list")}
                aria-label="Widok listy"
              >
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
                  className="lucide lucide-list"
                >
                  <line x1="8" x2="21" y1="6" y2="6" />
                  <line x1="8" x2="21" y1="12" y2="12" />
                  <line x1="8" x2="21" y1="18" y2="18" />
                  <line x1="3" x2="3.01" y1="6" y2="6" />
                  <line x1="3" x2="3.01" y1="12" y2="12" />
                  <line x1="3" x2="3.01" y1="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeams.length > 0 ? (
              filteredTeams.map((team) => (
                <div
                  key={team.id}
                  className={`bg-white rounded-lg overflow-hidden shadow-sm border ${
                    team.active ? "border-gray-200" : "border-red-200"
                  }`}
                >
                  <div className="relative h-48">
                    <Image src={team.image || "/placeholder.svg"} alt={team.name} fill className="object-cover" />
                    {!team.active && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        Nieaktywna
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{team.name}</h3>
                    <p className="text-gray-600 mb-4">Lokalizacja: {team.location}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-[rgb(var(--primary))]" />
                        <span>Liczba członków: {team.members}</span>
                      </div>
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="rgb(var(--primary))"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-user mr-2"
                        >
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        <span>Drużynowy: {team.leader}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-[rgb(var(--primary))]" />
                        <span>{team.address}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <a
                        href={`mailto:${team.email}`}
                        className="text-[rgb(var(--primary))] hover:underline flex items-center"
                      >
                        <Mail className="w-4 h-4 mr-1" />
                        <span>Email</span>
                      </a>
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
                Nie znaleziono drużyn spełniających kryteria wyszukiwania
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
                    Drużyna
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Lokalizacja
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Drużynowy
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Członkowie
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
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
                {filteredTeams.length > 0 ? (
                  filteredTeams.map((team) => (
                    <tr key={team.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 relative rounded-full overflow-hidden">
                            <Image
                              src={team.image || "/placeholder.svg"}
                              alt={team.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{team.name}</div>
                            <div className="text-sm text-gray-500">{team.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.leader}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.members}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            team.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {team.active ? "Aktywna" : "Nieaktywna"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
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
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      Nie znaleziono drużyn spełniających kryteria wyszukiwania
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
