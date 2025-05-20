"use client"

import { useState } from "react"
import { PlusCircle, Pencil, Trash2, Eye } from "lucide-react"

interface Post {
  id: number
  title: string
  excerpt: string
  date: string
  author: string
  status: "published" | "draft"
}

export default function PostsManager() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: "Obóz letni 2025 - zapisy otwarte!",
      excerpt: "Zapraszamy wszystkich harcerzy na obóz letni, który odbędzie się w dniach 15-30 czerwca 2025 roku...",
      date: "2025-03-15",
      author: "hm. Jan Kowalski",
      status: "published",
    },
    {
      id: 2,
      title: "Podsumowanie roku harcerskiego 2024",
      excerpt: "Za nami kolejny rok pełen przygód, wyzwań i harcerskich doświadczeń...",
      date: "2024-12-20",
      author: "phm. Anna Nowak",
      status: "published",
    },
    {
      id: 3,
      title: "Nowy program szkoleniowy dla drużynowych",
      excerpt: "Z radością informujemy o uruchomieniu nowego programu szkoleniowego dla drużynowych...",
      date: "2025-02-10",
      author: "hm. Piotr Wiśniewski",
      status: "draft",
    },
  ])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Zarządzanie postami</h2>
        <button className="bg-[rgb(var(--primary))] hover:bg-[rgb(var(--primary-dark))] text-white px-4 py-2 rounded-md flex items-center">
          <PlusCircle className="mr-2 h-5 w-5" />
          Dodaj nowy post
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tytuł
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
                  Autor
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
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{post.title}</div>
                    <div className="text-sm text-gray-500">{post.excerpt}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(post.date).toLocaleDateString("pl-PL")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        post.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {post.status === "published" ? "Opublikowany" : "Szkic"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
