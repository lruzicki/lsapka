"use client"

import { useAuth } from "@/context/auth-context"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <Image src="/logo.svg" alt="Logo Leśna Szkółka" width={80} height={80} className="mx-auto" />
            </Link>
            <h1 className="text-2xl font-bold mt-6">Strefa instruktora</h1>
            <p className="text-gray-600 mt-2">Zaloguj się, aby uzyskać dostęp do panelu instruktora</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="space-y-6">
              <button
                onClick={login}
                className="w-full flex items-center justify-center gap-3 bg-[#0078d4] text-white py-3 px-4 rounded-md hover:bg-[#106ebe] transition-colors"
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
                  className="lucide lucide-microsoft"
                >
                  <rect x="3" y="3" width="8" height="8" rx="1" />
                  <rect x="13" y="3" width="8" height="8" rx="1" />
                  <rect x="3" y="13" width="8" height="8" rx="1" />
                  <rect x="13" y="13" width="8" height="8" rx="1" />
                </svg>
                Zaloguj przez Microsoft 365
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">lub</span>
                </div>
              </div>

              {/* Mock logowania - w rzeczywistości tutaj byłby formularz */}
              <button
                onClick={login}
                className="w-full bg-[rgb(var(--primary))] text-white py-3 px-4 rounded-md hover:bg-[rgb(var(--primary-dark))] transition-colors"
              >
                Zaloguj się (mock)
              </button>
            </div>

            <div className="mt-6 text-center text-sm text-gray-600">
              <p>
                Potrzebujesz pomocy?{" "}
                <a href="mailto:pomoc@lesnaszkolka.pl" className="text-[rgb(var(--primary))] hover:underline">
                  Skontaktuj się z administratorem
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-4 text-center text-sm text-gray-600 border-t">
        <p>© {new Date().getFullYear()} Niezależny Krąg Instruktorów Harcerskich „Leśna Szkółka"</p>
      </footer>
    </div>
  )
}
