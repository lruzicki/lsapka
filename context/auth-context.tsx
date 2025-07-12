"use client"

import { createContext, useState, useContext, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"

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
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Konwertuj sesję NextAuth na nasz format użytkownika
  const user = session?.user ? {
    id: session.user.email || "",
    name: session.user.name || "",
    email: session.user.email || "",
    role: "instructor", // domyślna rola
  } : null

  useEffect(() => {
    setIsLoading(status === "loading")

    // Przekieruj do dashboardu, jeśli użytkownik jest zalogowany i próbuje wejść na stronę logowania
    if (session && pathname === "/login") {
      router.push("/dashboard")
    }

    // Przekieruj do strony głównej, jeśli użytkownik nie jest zalogowany i próbuje wejść na dashboard
    if (!session && status === "unauthenticated" && pathname?.startsWith("/dashboard")) {
      router.push("/")
    }
  }, [session, status, pathname, router])

  const login = () => {
    window.location.href = "/signin"
  }

  // Funkcja wylogowania
  const logout = () => {
    signOut({ callbackUrl: "/" })
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
