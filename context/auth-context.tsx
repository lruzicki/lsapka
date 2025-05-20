"use client"

import { createContext, useState, useContext, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: () => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Sprawdź, czy użytkownik jest zalogowany przy ładowaniu strony
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)

    // Przekieruj do dashboardu, jeśli użytkownik jest zalogowany i próbuje wejść na stronę logowania
    if (storedUser && pathname === "/login") {
      router.push("/dashboard")
    }

    // Przekieruj do logowania, jeśli użytkownik nie jest zalogowany i próbuje wejść na dashboard
    if (!storedUser && pathname?.startsWith("/dashboard")) {
      router.push("/login")
    }
  }, [pathname, router])

  // Mock funkcji logowania
  const login = () => {
    // Symulacja logowania przez Microsoft 365
    const mockUser = {
      id: "1",
      name: "Jan Kowalski",
      email: "jan.kowalski@lesnaszkolka.pl",
      role: "instructor",
    }

    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
    router.push("/dashboard")
  }

  // Funkcja wylogowania
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/")
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
